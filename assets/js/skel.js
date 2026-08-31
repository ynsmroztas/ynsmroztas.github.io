(function () {
  if (document.querySelector(".skel")) return;
  var file = (location.pathname.split("/").pop() || "index.html");
  var map = {
    "conscrypt-mainline.html": [
      ["01 Problem", "User CA installed. Handshake still dies. Conscrypt APEX store won."],
      ["02 Move", "AndroScope TLS observer + request intelligence on the lab process."],
      ["03 Evidence", "Provider Conscrypt. APEX cacerts present. User CA not in the loaded list."],
      ["04 Outcome", "Write the store path. Pin what you mean. No remount recipe here."]
    ],
    "wallet-link.html": [
      ["01 Problem", "Static PIN client id plus an unlink that resets merchant eligibility."],
      ["02 Move", "Public-artifact review plus lab posture. No charge."],
      ["03 Evidence", "Client id accepted. Linking had no bot gate. App ran on a spoofed handset fingerprint."],
      ["04 Outcome", "Rotate the id. Persist pay-state. Step-up on unlink."]
    ],
    "intent-redir.html": [
      ["01 Problem", "Exported router started a nested Intent extra as itself."],
      ["02 Move", "Manifest + sink on an authorized lab build."],
      ["03 Evidence", "getParcelableExtra → startActivity. targetSdk 34."],
      ["04 Outcome", "Do not start foreign Intents. targetSdk 36."]
    ],
    "fileprovider.html": [
      ["01 Problem", "FileProvider mapped / and handed out grants."],
      ["02 Move", "Manifest + paths.xml on the authorized lab APK."],
      ["03 Evidence", "root-path path=. grantUriPermissions=true."],
      ["04 Outcome", "files-path only. Revoke the grant."]
    ],
    "webview-intent.html": [
      ["01 Problem", "WebView parsed a document URL into startActivity."],
      ["02 Move", "Hook shouldOverrideUrlLoading on the lab build."],
      ["03 Evidence", "Intent.parseUri. intent:// accepted."],
      ["04 Outcome", "https only. Never parseUri into startActivity."]
    ],
    "sdk-proxy.html": [
      ["01 Problem", "The AAR exported the proxy. The host did not."],
      ["02 Move", "Merged manifest + DEX on the lab APK."],
      ["03 Evidence", "lab.engage.ProxyActivity. Nested Intent sink."],
      ["04 Outcome", "Bump the AAR or tools:node=remove."]
    ],
    "creds-query.html": [
      ["01 Problem", "Login POST put email and the password in the query string."],
      ["02 Move", "AndroScope hooked the RN networking bridge on an authorized lab build."],
      ["03 Evidence", "URL + error-SDK breadcrumb + keychain write. Password redacted here."],
      ["04 Outcome", "Move the fields into the POST body. Scrub the login path."]
    ],
    "oauth-scheme.html": [
      ["01 Problem", "Custom-scheme OAuth redirect with no PKCE on a public Android client."],
      ["02 Move", "Intent.getData during Sign in on an authorized lab build."],
      ["03 Evidence", "Authorize URL lacked code_challenge. Return carried code= on vulnauth://."],
      ["04 Outcome", "PKCE S256 + verified App Links. No public intercept kit."]
    ],
    "mtls-lab.html": [
      ["01 Problem", "Client key lived in a software PKCS12, not AndroidKeyStore."],
      ["02 Move", "AndroScope mTLS observer on the authorized lab process."],
      ["03 Evidence", "Store class printed. KeyStore unused for that alias."],
      ["04 Outcome", "Keep the key in KeyStore / StrongBox. No extraction recipe here."]
    ],
    "wireless-adb.html": [
      ["01 Problem", "Wireless debugging left on a LAN. adbd can trust a peer too soon."],
      ["02 Move", "Read posture only. No connect, no shell."],
      ["03 Evidence", "CVE-2026-0073 class. Patch older than 2026-05-01."],
      ["04 Outcome", "Patch. Turn the feature off off-lab."]
    ],
    "deeplink-auth.html": [
      ["01 Problem", "Exported deeplink gate forwarded raw extras into a private auth activity."],
      ["02 Move", "Module 14 on an authorized lab build. Filter plus the runtime Intent."],
      ["03 Evidence", "host=*. pathPrefix /auth. .AuthFlow not exported."],
      ["04 Outcome", "Allowlist host and path. Do not start auth from raw extras."]
    ],
    "androscope.html": [
      ["01 Problem", "Public labs assume Magisk + USB frida-server."],
      ["02 Move", "Gadget inside an authorized lab APK. PREPARE → ASSESS → RUNTIME."],
      ["03 Evidence", "Surface map, FH-IDs, live transcript. No invented findings."],
      ["04 Outcome", "Operator console. Not a Play Store ghost app."]
    ]
  };
  var rows = map[file];
  var article = document.querySelector("article.prose");
  if (!rows || !article) return;
  var box = document.createElement("div");
  box.className = "skel";
  rows.forEach(function (r) {
    var a = document.createElement("article");
    a.innerHTML = "<b>" + r[0] + "</b><p>" + r[1] + "</p>";
    box.appendChild(a);
  });
  var tags = article.querySelector(".tag-row");
  if (tags) article.insertBefore(box, tags.nextSibling);
  else article.insertBefore(box, article.firstChild);
})();
