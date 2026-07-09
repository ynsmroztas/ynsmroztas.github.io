---
title: "AndroScope — Building a Rootless Android Dynamic Analysis Framework from Scratch"
description: "The story of rethinking mobile security testing with Frida Gadget, an opt-in module architecture, and zero pip dependencies."
pubDate: "2026-07-09"
tags: ["android", "frida", "mobile-security", "reverse-engineering", "tooling"]
draft: false
---

![AndroScope — Rootless Android Dynamic Analysis Framework](/androscope/01_hero.png)

> **TL;DR** — AndroScope is a framework I built to dynamically analyze Android apps *without* root. It rides Frida Gadget straight into the target APK's own process, maps the attack surface with a radar scan, ranks findings by exploitability with ⭐, and splits every capability into opt-in module groups. This post walks through the architecture, the workflow, and the modules I reach for most.

Let me start with a sentence every mobile security tester knows by heart: **"First, root the device."**

That single sentence is the biggest barrier to inspecting an app dynamically. Running `frida-server` requires a rooted device; rooted devices don't represent how a stock phone behaves, they get blocked by plenty of apps, and we don't always have a device we're willing to sacrifice. That's exactly why I wrote AndroScope: **to remove the barrier entirely.**

Below I walk through how the framework works, why I made the design decisions I did, and what's actually in the box.

---

## Why rootless?

In the classic setup, Frida runs as a separate server binary with `root` privileges and injects into processes that way. The problem:

- **Loss of realism.** A rooted device isn't the real user's environment. Root detection fires, behavior changes.
- **Access barriers.** Most banking, payment, and enterprise-MDM apps either refuse to launch or lock up on a rooted device.
- **Device cost.** A dedicated, rooted device isn't always on hand for every engagement.

Frida's **Gadget** mode exists for precisely this. The Gadget isn't a separate server; it's a shared library (`.so`) placed *inside* the target app. When the app launches, the Gadget wakes up inside that same process and becomes reachable from the outside via Frida. **The device never needs to be rooted** — you just sideload the repackaged APK.

AndroScope's entire architecture is built on this idea.

---

## Architecture: how the injection works

![AndroScope rootless injection pipeline](/androscope/02_arch.png)

The pipeline has six stages:

1. **Release APK** — The app's signed APK is taken as input.
2. **Decode** — `apktool d` unpacks resources and smali.
3. **Carrier select** — Decide *where* the Gadget rides in (two-tier priority system, below).
4. **Inject gadget** — `libgadget.so`, the config, and the `onCreate` hook are placed.
5. **Rebuild & sign** — `apktool b` → `zipalign` → `apksigner` re-signs it.
6. **Run & attach** — Sideload, the Gadget boots on app launch, Frida attaches.

Three things land inside the APK:

```
lib/<abi>/libgadget.so        → Frida Gadget: the in-process instrumentation engine
libgadget.config.so           → listen/script mode, port and interaction config
Application.onCreate()         → smali patch that boots the Gadget at app start
```

### Gadget carrier selection — a two-tier priority

The most critical injection decision is this: **exactly where does the Gadget attach inside the app?** A bad carrier choice either crashes the app or leaves unnecessary traces. AndroScope solves it with a two-tier priority system:

```python
# Tier 1 — prefer a native carrier the app ALREADY ships.
# Lowest footprint: we add nothing new, we ride what's there.
ENGINE_PRIORITY  = ["flutter", "unity", "reactnative", "jsc"]

# Tier 2 — if none exist, synthesize our own carrier and
# wire it into the Application class by hand.
RUNTIME_PRIORITY = ["application_class", "synthetic_loader"]

def select_carrier(apk):
    # Try existing engines first
    for engine in ENGINE_PRIORITY:
        if apk.has_native_lib(engine):
            return NativeCarrier(engine)          # lowest footprint

    # Fallback: find the Application class and touch loadLibrary() into onCreate
    app_cls = _find_application_class(apk.manifest)
    return _append_oncreate_override(app_cls)
```

The idea is simple but effective: **if the app already carries a native runtime (Flutter, Unity, React Native…), we ride it.** That minimizes the footprint. If none exist, Tier 2 kicks in and we synthesize the carrier ourselves.

### Targeting the Application class

The heart of Tier 2 is two functions:

- **`_find_application_class()`** — Resolves the `<application android:name="...">` value in `AndroidManifest.xml`. If the app defines no custom `Application` class, it injects a default carrier.
- **`_append_oncreate_override()`** — Adds the call that loads the Gadget into the resolved class's `onCreate()` at the smali level:

```smali
# Call injected into Application.onCreate() (simplified)
const-string v0, "gadget"
invoke-static {v0}, Ljava/lang/System;->loadLibrary(Ljava/lang/String;)V
```

The moment the app launches, `onCreate` runs, `loadLibrary("gadget")` loads the Gadget into the process, and instrumentation begins — without touching a single system file on the device.

---

## The workflow: PREPARE → ASSESS → RUNTIME → TOOLS

![The four-phase operator workflow](/androscope/03_workflow.png)

A framework matters as much for the cognitive load it imposes as for its raw power. In early versions everything was piled into a single menu and the operator couldn't tell where to begin. So I split the whole experience into four clear phases:

- **`01 PREPARE`** — Rig the app: pull the APK, decode, select carrier, inject, sign, sideload. Output: an **instrumented build ready to attach.**
- **`02 ASSESS`** — Map the attack surface: SurfaceMap radar scan, exported components, deeplinks, ContentProviders, Lottie/asset surfaces. Output: a **⭐-ranked target list.**
- **`03 RUNTIME`** — Hook it live: SSL pinning bypass, native tracer, live interaction tracer, memory secret sweep, auto-exploit chain. Output: **live traffic + secrets + a reproducible PoC.**
- **`04 TOOLS`** — Off-device utilities: batch APK scanners, `lottie_scan.py`, reporting. Output: **triage at scale, no device required.**

The key point: **the framework never fires everything at once.** You walk the app from prep to payload by hand. That cuts both noise and false positives.

---

## Module architecture: five super-groups

![AndroScope's five super-groups with A–E opt-in loading](/androscope/04_groups.png)

Modules are organized under five "super-groups," each loaded **on demand** with the `A`–`E` keys:

- **`A` · SURFACE & RECON** — SurfaceMap, exported enum, deeplink discovery, manifest recon.
- **`B` · APP ATTACK SURFACE** — Confused-Deputy provider probe, auto-exploit chain, Lottie surface probe, WebView audit.
- **`C` · TRAFFIC & SECRETS** — TLS unpinning, memory secret sweep, traffic tap, storage scan.
- **`D` · NATIVE & RUNTIME** — Native tracer, live interaction, memory scan, `.so` introspection.
- **`E` · DEFENSE BYPASS** — Root detection, Flutter SSL bypass, emulator evasion, anti-frida bypass.

**Why opt-in?** Three reasons. First, *footprint*: a hook you never load leaves no trace in the process. Second, *focus*: in an engagement you load only the relevant group. Third, *stability*: every script that fires is a chance to break something — you run only what you need.

---

## UX: *seeing* the attack surface

![SurfaceMap radar scan and ranked findings in the terminal](/androscope/05_terminal.png)

This is the part I obsessed over the most. A scan can hand you 200 lines of raw output — or it can tell you where to start. I wanted the second.

The **`SurfaceMap`** class sweeps the app's entrypoints with a `radar_scan()` animation and grades each one by a **relevance/exploitability score** with ⭐. Then it produces a numbered **"START HERE"** list:

```
ATTACK SURFACE  ·  com.demo.wallet  ·  v4.2.1
──────────────────────────────────────────────
★★★★★  [1] deeplink  wallet://pay/confirm    EXPORTED
★★★★   [2] provider  .FileProvider           grantUriPermission
★★★★   [3] webview   PaymentActivity         addJavascriptInterface
★★★    [4] lottie    assets/anim/splash.lottie  dotLottie · zip
★★     [5] activity  DebugMenuActivity       exported=true

▸ START HERE
  1) auto-exploit chain   deeplink → WebView → JS bridge
  2) provider probe       confused-deputy file read
  3) tls unpin + tap      capture /v2/pay traffic
```

The logic behind the scoring is to weight classic Android attack-surface signals: being exported, `grantUriPermission`, a JS bridge like `addJavascriptInterface`, zip-based assets, debug components… Conceptually it looks like this:

```javascript
// Enumerate exported components and score by exploitability
function scoreComponent(c) {
  let s = 0;
  if (c.exported)                 s += 2;   // externally triggerable
  if (c.hasJsBridge)              s += 2;   // addJavascriptInterface
  if (c.grantsUriPermission)      s += 2;   // confused-deputy candidate
  if (c.handlesDeeplink)          s += 1;   // attacker-controlled input
  if (c.isDebugSurface)           s += 1;   // debug/menu/test
  return Math.min(s, 5);                    // ⭐ 0–5
}
```

The goal isn't to drown the operator; it's to **rank and guide.**

---

## Modules worth highlighting

The framework's body is in its modules. Let me quickly cover a few I use most.

### Provider Confused-Deputy Probe

When an app hands temporary access to another component via `grantUriPermission`, a misconfigured `ContentProvider` can turn into a "confused deputy" — using its authority on someone else's behalf. The module scans exported providers and URI-permission flows to flag these deputy scenarios.

### Auto-Exploit Chain (deeplink → WebView)

A classic, high-impact chain: an attacker-controlled **deeplink** carries content into a **WebView**; if that WebView has a **JS bridge** opened via `addJavascriptInterface`, the chain completes. The module probes each link of that chain (the deeplink entry, the WebView settings, the bridge surface) to show whether the chain is actually constructable.

### Native Function Tracer

The Java layer is half the story. The critical logic often lives inside a `.so`. The native tracer attaches to exported native functions with Frida's `Interceptor` and captures arguments and return values live:

```javascript
// Trace a native export
const lib = "libnative-core.so";
const sym = Module.getExportByName(lib, "verify_signature");

Interceptor.attach(sym, {
  onEnter(args) {
    this.input = args[0].readUtf8String();
    console.log(`[native] verify_signature("${this.input}")`);
  },
  onLeave(ret) {
    console.log(`[native]   → ${ret.toInt32()}`);
  }
});
```

### Memory Secret Sweep

Secrets have to materialize somewhere in memory. This module scans process memory for key/token/credential patterns (high-entropy strings, JWT shapes, known prefixes) and extracts them. A key that surfaces at runtime is one you'd never catch in static analysis.

### Live Interaction Tracer

Tap a button on screen — and watch the method call graph it triggers, live. It's the fastest way to understand which code paths an action actually walks. Is it the deeplink, and which handler is it calling? Tap and see.

### Flutter SSL Bypass (strengthened)

Flutter doesn't use the system trust store; it performs TLS verification through its own embedded **BoringSSL**. That's why standard pinning bypasses don't work on Flutter. The module locates BoringSSL's `ssl_verify` path in memory and turns verification into a no-op to make traffic visible — in this version I strengthened the pattern match to cover multiple Flutter build variants.

> **Note:** All of these modules are for *observing* traffic and behavior in apps you are authorized to test. SSL unpinning and native tracing are standard, well-documented techniques in mobile security testing; the goal is to validate an app's own security assumptions.

---

## Module spotlight: the Lottie attack surface

![Spotlight — the Lottie/dotLottie attack surface](/androscope/06_lottie.png)

One of my favorite recent additions. A splash animation is innocent — until you notice that a **`.dotLottie`** file is actually a **ZIP archive.**

Here's the flow: `.lottie` files are JSON, while the `.dotLottie` extension is a zip container. Inside it you'll find `manifest.json`, `animations/`, `images/` — and the paths inside that archive are **controlled by whoever authored it.** If the app extracts that archive unsafely (classic **zip-slip**), an entry containing `../../../` can write outside the intended directory:

```
flagged entry:
  ../../../databases/app.db
```

AndroScope inventories every Lottie asset and ranks the zip-based ones as the highest-risk candidates:

```
ranked by risk:
  ★★★  .dotLottie (zip)     ← zip-slip candidate
  ★    .lottie   (json)
```

**A regression story.** In the first implementation, `_detect_lottie` read the asset's dex content for detection — and that caused blocking dex reads on the *connect path*; connecting slowed down and sometimes stalled. The fix: reduce detection to a **namelist-only** check. Telling zip-based Lottie apart by looking only at file names, without unpacking the archive's contents, is both fast and safe. A small change, but it cleaned up the connect path entirely.

I carried the same logic off-device too: **`lottie_scan.py`** — a standalone, stdlib-only, Termux-compatible batch scanner. It walks an entire APK corpus and floats dotLottie-based apps to the top as zip-slip candidates. No pip, no venv, no device.

---

## Design DNA

![AndroScope's design DNA — five guiding principles](/androscope/07_dna.png)

Five rules shape every module:

1. **Rootless by default** — No `su`, no Magisk, no custom ROM. Instrument a stock retail device.
2. **Zero-pip-dependency tooling** — HTTP via `curl` subprocess. No venv conflicts, no supply chain to trust.
3. **Opt-in, never everything-at-once** — Capability groups load on demand; the app stays quiet until you engage.
4. **Lowest possible footprint** — Ride the native carrier the app already ships before synthesizing a new one.
5. **Pipeline-friendly & portable** — Stdlib scanners, Termux compatibility, scriptability — triage at scale, off-device.

The second rule has a real story behind it. For a while, ProjectDiscovery's Go-based `httpx` binary and Python's `httpx` library kept colliding in my venv — same name, two worlds. At some point I made the call: **trust no Python dependency for HTTP, shell out to `curl` in the background.** That single decision fundamentally changed the tool's portability. On Kali, on Termux, in CI — it runs unchanged, with no setup. The same principle runs through the rest of AndroScope: the off-device `lottie_scan.py` ships as pure stdlib for exactly this reason — drop it on any box and it just runs, no environment to prepare.

`0` pip installs. The most beautiful form a dependency graph can take.

---

## Responsible use

AndroScope is a security *research* framework. Use all of its capabilities only against apps you are explicitly authorized to test: your own apps, bug bounty programs with a defined scope, or engagements with written permission. The techniques I use — Frida instrumentation, SSL unpinning, native tracing — are standard, well-documented methods in mobile security testing; the goal is to validate an app's own security assumptions and to report vulnerabilities responsibly. Don't touch systems you aren't authorized to.

---

## Roadmap

What's next:

- Detection for more native runtime carriers (Kotlin/Native, Xamarin).
- A learning layer that feeds SurfaceMap scoring with past findings.
- Extending the auto-exploit chain's chain discovery to more component types.
- Merging the off-device scanners (Lottie, JS) into a single triage report.

---

## Closing

AndroScope started as an effort to take "first, root the device" out of the equation and grew into an attack-surface mapping + dynamic analysis framework. The part I'm proudest of isn't the capability list — it's the UX that **guides the operator without drowning them** and the **zero-dependency** philosophy that runs anywhere without setup.

Rootless, opt-in, low-footprint, and portable. That's what I think a tool should be.

*If you have questions, suggestions, or notes from your own mobile security workflow, I'd love to hear them.*

**Let's connect:**

- GitHub — [github.com/ynsmroztas](https://github.com/ynsmroztas)
- X — [x.com/ynsmroztas](https://x.com/ynsmroztas)

---

*— mitsec ([@ynsmroztas](https://x.com/ynsmroztas))*
