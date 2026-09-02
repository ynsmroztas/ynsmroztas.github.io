(function () {
  var box = document.querySelector("[data-tool-feed]");
  if (!box) return;
  fetch("https://api.github.com/users/ynsmroztas/repos?sort=created&per_page=20&type=owner")
    .then(function (r) { return r.json(); })
    .then(function (repos) {
      if (!Array.isArray(repos)) return;
      repos.filter(function (r) {
        return r && !r.fork && r.name !== "ynsmroztas.github.io" && r.description;
      }).slice(0, 16).forEach(function (r) {
        var a = document.createElement("a");
        a.className = "tool";
        a.href = r.html_url;
        a.target = "_blank";
        a.rel = "noopener me";
        var pill = /CVE/i.test(r.name + (r.description || "")) ? "cve" : (r.language || "repo");
        a.innerHTML =
          '<div class="top"><h3></h3><span class="pill"></span></div>' +
          "<p></p><div class=\"meta\"></div>";
        a.querySelector("h3").textContent = r.name;
        a.querySelector(".pill").textContent = String(pill).toLowerCase();
        a.querySelector("p").textContent = r.description;
        a.querySelector(".meta").textContent =
          (r.language || "GitHub") + " · " + (r.updated_at || "").slice(0, 10);
        box.appendChild(a);
      });
    })
    .catch(function () {});
})();
