const images = [
  "images/figures/18.jpg",
  "images/figures/21.jpg",
  "images/figures/22.png",
  "images/figures/23.png",
  "images/figures/24.png",
  "images/figures/17.png",
  "images/figures/13.svg",
  "images/figures/14.svg",
  "images/figures/15.svg",
  "images/figures/19.png",
  "images/figures/20.png",
  "images/figures/16.png",
  "images/figures/1.svg",
  "images/figures/2.svg",
  "images/figures/3.svg",
  "images/figures/4.svg",
  "images/figures/5.svg",
  "images/figures/6.svg",
  "images/figures/7.svg",
  "images/figures/8.svg",
  "images/figures/9.svg",
  "images/figures/10.svg",
  "images/figures/11.svg",
  "images/figures/12.svg"
];

const achievements = [
  "images/resources/achievements/samsung-outstanding-award.jpg",
  "images/resources/achievements/icwsm-aaai.png",
  "images/resources/achievements/siu-award.jpg",
  "images/resources/achievements/programming-camp.jpg",
  "images/resources/achievements/bsc-certificate.png",

]

// Sample data for dynamic generation
const updates = [
  {
    title: "Submitted two papers to USENIX Security'25",
    description: "These two papers are related to ML and AI applications to security and privacy",
    badges: ["SUPREME LAB", "USENIX"],
    date: "22-Jan-2025",
    location: "Seattle, WA, USA",
    link: "#",
    isActive: true
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

// data.js
const publicationsData = [
    {
        id: "C",
        title: "SocFedGPT: Federated GPT-based Adaptive Content Filtering System Leveraging User Interactions in Social Networks",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 24"
    },
    {
        id: "W",
        title: "Bangla Emotion Detection Dataset With An Extended Taxonomy And Its Evaluation",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 24"
    },
    {
        id: "W",
        title: "FLASH: Federated Learning-Based LLMs for Advanced Query Processing in Social Networks through RAG",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 24"
    },
    {
        id: "W",
        title: "4WHContext: A Context Based Hate Speech Detection Framework From Social Media Posts",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 24"
    },
    {
        id: "W",
        title: "Combating Echo Chambers In Online Social Network By Increasing Content Diversity In Recommendation",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 24"
    },
    {
        id: "W",
        title: "CAMERA: Context Based Emotion Detection Framework And Its Evaluation",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 24"
    },
    {
        id: "W",
        title: "EVOLVE: Predicting User Evolution and Network Dynamics in Social Media Using Fine-Tuned GPT-like Model",
        link: "https://arxiv.org/abs/2407.09691",
        publisher: "arXiv",
        conf: "ASONAM 24"
    },
    {
        id: "W",
        title: "SocialRec: User Activity Based Post Weighted Dynamic Personalized Post Recommendation System in Social Media",
        link: "https://arxiv.org/abs/2407.09747",
        publisher: "arXiv",
        conf: "ASONAM 24"
    },
    // Add the rest of your table rows here
];

function createAchievementsGroup() {
  const achievementsGroup = document.getElementById("achievements-group");

  achievements.forEach((src, index) => {
    const div = document.createElement("div");
    div.className = "card";
    
    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = src;
    
    div.appendChild(img);
    achievementsGroup.appendChild(div);
  });
}


function createSlider() {
  const carouselContainer = document.getElementById("carousel-container");

  images.forEach((src, index) => {
    const div = document.createElement("div");
    div.className = `carousel-item ${index === 0 ? "active" : ""}`;
    
    const img = document.createElement("img");
    img.className = "d-block w-100 slider-img";
    img.src = src;
    img.alt = `Slide ${index + 1}`;
    
    div.appendChild(img);
    carouselContainer.appendChild(div);
  });
}

// Function to generate table rows dynamically
function generateTableRows() {
    // // Select the table body
    // const tableBody = document.getElementById("table-publications");

    // // Loop through the tableData array and populate the rows
    // tableData.forEach((row) => {
    //     const tr = document.createElement("tr");
    //     tr.style.fontSize = "12px";

    //     tr.innerHTML = `
    //         <th scope="row">${row.id}</th>
    //         <td>${row.title}</td>
    //         <td><a href="${row.link}" target="_blank">Link</a></td>
    //         <td>${row.publisher}</td>
    //     `;
    //     tableBody.appendChild(tr);
    // });
      
      const listContainer = document.querySelector('.publication-list');
      
      publicationsData.forEach((publication, index) => {
        const listItem = document.createElement('li');
        // listItem.classList.add('publication-item');
        listItem.innerHTML  = `[${index+1}] "${publication.title}" [<a href="${publication.link}">${publication.publisher}</a>] [${publication.conf}]`;
        listContainer.appendChild(listItem);
      });

}

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
    createAchievementsGroup();
    createSlider();
    generateTableRows();
    createListForUpdates();
});
