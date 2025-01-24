
  // Data for navbar links with icons
  const navLinks = [
    { name: "Home", href: "index.html", icon: "fas fa-home" },
    { name: "Publications", href: "publication.html", icon: "fas fa-book" },
    { name: "Research Lab", href: "https://www.cs.utep.edu/stalukder/supremelab/index.html", icon: "fas fa-flask", external: true },
    { name: "Programming", href: "programming.html", icon: "fas fa-code" },
    { name: "Achievements", href: "achievements.html", icon: "fas fa-trophy" },
    { name: "Education", href: "education.html", icon: "fas fa-graduation-cap" },
    { name: "About", href: "about.html", icon: "fas fa-user" },
    { name: "Blog", href: "blog.html", icon: "fas fa-blog" },
    { name: "Resources", href: "resources.html", icon: "fas fa-folder-open" },
    { name: "Gallery", href: "gallery.html", icon: "fas fa-images" },
 ];
  function initNavBar() {
  // Get the navbar container
  const navbarContainer = document.getElementById("navbar-links");

  // Generate links dynamically with icons
  navLinks.forEach(link => {
     const li = document.createElement("li");
     li.classList.add("nav-item");

     const a = document.createElement("a");
     a.classList.add("nav-link", "text-color");
     a.href = link.href;

     // Add icon
     const icon = document.createElement("i");
     icon.className = link.icon;
     a.appendChild(icon);

     // Add text
     const text = document.createTextNode(` ${link.name}`);
     a.appendChild(text);

     // Open external links in a new tab
     if (link.external) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
     }

     li.appendChild(a);
     navbarContainer.appendChild(li);
  });
  }

document.addEventListener('DOMContentLoaded', function() {
    initNavBar();
});
