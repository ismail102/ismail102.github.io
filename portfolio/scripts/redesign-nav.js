/* redesign-nav.js — injects the shared editorial nav + footer on every page.
   Active tab is detected from the current filename. */
(function () {
  var TABS = [
    { name: "Home",         href: "index.html" },
    { name: "Publications", href: "publication.html" },
    { name: "Research Lab", href: "https://www.cs.utep.edu/stalukder/supremelab/index.html", external: true },
    { name: "Programming",  href: "programming.html" },
    { name: "Achievements", href: "achievements.html" },
    { name: "Education",    href: "education.html" },
    { name: "About",        href: "about.html" },
    { name: "Blog",         href: "blog.html" },
    { name: "Resources",    href: "resources.html" },
    { name: "Gallery",      href: "gallery.html" }
  ];

  var SOCIALS = [
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=FexryyIAAAAJ&hl=en", icon: "fa-graduation-cap" },
    { label: "GitHub",         href: "https://github.com/ismail102", icon: "fa-github", brand: true },
    { label: "ORCID",          href: "https://orcid.org/0000-0001-8954-1150", icon: "fa-orcid", brand: true },
    { label: "LinkedIn",       href: "https://www.linkedin.com/in/ismail-hossain-utep/", icon: "fa-linkedin", brand: true }
  ];

  function currentFile() {
    var p = location.pathname.split("/").pop() || "index.html";
    return p === "" || p === "index.html" ? "index.html" : p;
  }

  function buildNav() {
    var here = currentFile();
    var nav = document.createElement("header");
    nav.className = "site-nav";

    var tabsHtml = TABS.map(function (t) {
      var active = (t.href === here) ? " active" : "";
      var ext = t.external ? ' target="_blank" rel="noopener"' : "";
      return '<a class="' + active.trim() + '" href="' + t.href + '"' + ext + '>' + t.name + "</a>";
    }).join("");

    nav.innerHTML =
      '<div class="site-nav-inner">' +
        '<a class="site-brand" href="index.html"><span class="dot"></span>Ismail&nbsp;<b>Hossain</b></a>' +
        '<button class="nav-toggle" aria-label="Menu"><i class="fas fa-bars"></i></button>' +
        '<nav class="site-tabs">' + tabsHtml + "</nav>" +
      "</div>";

    document.body.insertBefore(nav, document.body.firstChild);

    var toggle = nav.querySelector(".nav-toggle");
    var tabs = nav.querySelector(".site-tabs");
    toggle.addEventListener("click", function () { tabs.classList.toggle("open"); });
  }

  function buildFooter() {
    var foot = document.createElement("footer");
    foot.className = "site-foot";
    var socials = SOCIALS.map(function (s) {
      var cls = (s.brand ? "fab " : "fas ") + s.icon;
      return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + '"><i class="' + cls + '"></i></a>';
    }).join("");
    foot.innerHTML =
      '<div class="site-foot-inner">' +
        '<div class="who">Ismail Hossain</div>' +
        '<div class="socials">' + socials + "</div>" +
        '<div class="meta">PhD Candidate · UTEP SUPREME Lab · © 2024</div>' +
      "</div>";
    document.body.appendChild(foot);
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildNav();
    buildFooter();
  });
})();
