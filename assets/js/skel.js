(function () {
  if (document.querySelector(".skel")) return;
  var file = (location.pathname.split("/").pop() || "index.html");
  var map = {
    "creds-query.html": [
      ["01 Problem", "Login POST put email and the password in the query string."],
      ["02 Move", "AndroScope hooked the RN networking bridge on an unrooted lab build."],
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
