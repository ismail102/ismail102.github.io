 // Data for navbar links
 const navLinks = [
    { name: "Home", href: "index.html" },
    { name: "Publications", href: "publication.html" },
    { name: "Research Lab", href: "https://www.cs.utep.edu/stalukder/supremelab/index.html", external: true },
    { name: "Programming", href: "programming.html" },
    { name: "Achievements", href: "achievements.html" },
    { name: "Education", href: "education.html" },
    { name: "About", href: "about.html" },
    { name: "Blog", href: "blog.html" },
    { name: "Resources", href: "resources.html" },
    { name: "Gallery", href: "gallery.html" },
  ];
  
  function initNavBar() {
    // Get the navbar container
    const navbarContainer = document.getElementById("navbar-links");
    
    // Generate links dynamically
    navLinks.forEach(link => {
        const li = document.createElement("li");
        li.classList.add("nav-item");
    
        const a = document.createElement("a");
        a.classList.add("nav-link", "text-color");
        a.href = link.href;
        a.textContent = link.name;
    
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
