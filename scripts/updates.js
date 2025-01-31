// I am awarded an incoming $500,000 U.S. Nuclear Regulatory Commission (NRC) grant on 
// “Real-Time cyber threat monitoring.” With this grant, I will hire a new Ph.D. student (US citizen or Permanent Resident).

// Sample data for dynamic generation
const updates = [  
    {
      title: "$500,000 U.S. Nuclear Regulatory Commission (NRC) Grant",
      description: "Our Lab received $500,000 grant on “Real-Time cyber threat monitoring.”",
      badges: ["SUPREME LAB", "GRANT", "NRC"],
      date: "31-Jan-2025",
      location: "USA",
      link: "#",
      isActive: true
    },
    {
      
      title: "Submitted two papers to USENIX Security'25",
      description: "These two papers are related to ML and AI applications to security and privacy",
      badges: ["SUPREME LAB", "USENIX"],
      date: "22-Jan-2025",
      location: "Seattle, WA, USA",
      link: "#",
      isActive: false
    },
    {
      title: "Submitted two papers to ICWSM'25",
      description: "These two papers are related to ML and AI applications to security and privacy",
      badges: ["SUPREME LAB", "ICWSM", "AAAI"],
      date: "15-Jan-2025",
      location: "Copenhagen, Denmark",
      link: "#",
      isActive: false
    },
    {
      title: "Started PhD in University of Texas at El Paso",
      description: "My Professor joined the CS Faculty at UTEP along with his PhD students.",
      badges: ["SUPREME LAB", "UTEP"],
      date: "",
      location: "",
      link: "#",
      isActive: false
    },
    {
      title: "ICWSM'24 Student Travel Award",
      description: "I have received $1300, ICWSM Student Travel Award.",
      badges: ["ICWSM", "Conference"],
      date: "",
      location: "",
      link: "#",
      isActive: false
    },
    {
      title: "ASONAM 2024",
      description: "Six of our papers got accepted in Spring ASONAM 2024, one of the top-tier conferences in social network analysis.",
      badges: ["Accepted", "Springer"],
      date: "",
      location: "",
      link: "https://ieeecompsac.computer.org/2024/",
      isActive: false
    },
    {
      title: "COMPSAC 2024",
      description: "Four of our papers got accepted in IEEE COMPSAC 2024, one of the top-tier conferences in social network analysis.",
      badges: ["Accepted", "IEEE"],
      date: "",
      location: "",
      link: "https://ieeecompsac.computer.org/2024/",
      isActive: false
    },
    {
      title: "ICWSM'24 AAAI",
      description: "THE 18TH INTERNATIONAL AAAI CONFERENCE ON WEB AND SOCIAL MEDIA",
      badges: ["Conference", "ICWSM", "AAAI"],
      date: "June 3-6, 2024",
      location: "Buffalo, New York, USA",
      link: "https://www.icwsm.org/2024/index.html/",
      isActive: false
    },
    {
      title: "CyberForce 2023",
      description: "DOE CyberForce Competition® 2023",
      badges: ["Competition"],
      date: "Oct 16-Nov 03, 2023",
      location: "St. Charles, Illinois, USA",
      link: "https://cyberforce.energy.gov/cyberforce-competition/prior-competitions/doe-cyberforce-competition-2023/",
      isActive: false
    },
    {
      title: "ACM/IEEE ASONAM 2023",
      description: "Three of our papers got accepted in ACM/IEEE ASONAM 2023, one of the top-tier conferences in social network analysis.",
      badges: ["Published", "IEEE", "ACM"],
      date: "",
      location: "",
      link: "#",
      isActive: false
    },
    {
      title: "Data-driven approaches to Medical Imaging",
      description: "Seven of our book chapters got published in the book 'Data-driven approaches to Medical Imaging' by Springer.",
      badges: ["Published", "Springer"],
      date: "",
      location: "",
      link: "#",
      isActive: false
    },
    {
      title: "Expert Opinion on Cybersecurity and Ransomware",
      description: "Our Professor Dr. Sajedul Talukder was contacted by KMOV (Channel 4), a prominent television station in St. Louis, Missouri, affiliated with CBS and MyNetworkTV to provide expert opinion on cybersecurity and ransomware.",
      badges: ["TV Interview"],
      date: "",
      location: "St. Louis, Missouri, USA",
      link: "#",
      isActive: false
    },
    {
      title: "ANS Transactions",
      description: "Two papers published in ANS Transactions in ANS Winter Conference and Expo 2023.",
      badges: ["Published"],
      date: "",
      location: "",
      link: "#",
      isActive: false
    },
    {
      title: "IEEE ICAIC 2023",
      description: "Two papers published in IEEE International Conference on AI in Cybersecurity (ICAIC 2023).",
      badges: ["Published", "IEEE"],
      date: "",
      location: "",
      link: "#",
      isActive: false
    },
    {
      title: "Blockchain and Smart-Contract Technologies",
      description: "Two book chapters published in the book 'Blockchain and Smart-Contract Technologies for Innovative Applications' by Springer.",
      badges: ["Published", "Springer"],
      date: "",
      location: "",
      link: "#",
      isActive: false
    },
    {
      title: "CyberForce 2022",
      description: "DOE CyberForce Competition® 2022",
      badges: ["Competition", "Rank: 16th"],
      date: "Oct 20-Nov 07, 2022",
      location: "Virtual",
      link: "https://cyberforce.energy.gov/cyberforce-competition/prior-competitions/doe-cyberforce-competition-2022/",
      isActive: false
    }
  ];


  function createListForUpdates() {
    // Get the container element
      const listGroup = document.querySelector(".list-group");

      // Loop through the achievements array to dynamically create list items
      updates.forEach((item) => {
        // Create the main anchor element
        const listItem = document.createElement("a");
        listItem.href = item.link;
        listItem.className = `list-group-item list-group-item-action flex-column align-items-start ${
          item.isActive ? "active" : ""
        }`;

        // Create the title and description container
        const titleContainer = document.createElement("div");
        titleContainer.className = "d-flex w-100 justify-content-between";

        // Add the title
        const title = document.createElement("h6");
        title.className = "mb-1";
        title.textContent = item.title;
        titleContainer.appendChild(title);

        // Add the title container to the list item
        listItem.appendChild(titleContainer);

        // Add the description
        const description = document.createElement("p");
        description.className = "mb-1";
        description.textContent = item.description + (item.date !== "" ? " [Date: " + item.date + "]" : "");

        listItem.appendChild(description);

        // Add the badges
        const badgeContainer = document.createElement("div");
        item.badges.forEach((badgeText) => {
          const badge = document.createElement("span");
          badge.className = "badge badge-primary"; // You can adjust the badge style dynamically
          badge.textContent = badgeText;
          badgeContainer.appendChild(badge);
        });

        listItem.appendChild(badgeContainer);

        // Append the list item to the list group
        listGroup.appendChild(listItem);
      });
}

document.addEventListener('DOMContentLoaded', function() {
    createListForUpdates();
});
