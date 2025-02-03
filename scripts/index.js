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
  "images/resources/achievements/llm-fine-tune-deepai.png",
  "images/resources/achievements/icwsm-aaai.png",
  "images/resources/achievements/siu-award.jpg",
  "images/resources/achievements/samsung-outstanding-award.jpg",
  "images/resources/achievements/handon-devops.jpg",
  "images/resources/achievements/networking-basics.png",
  "images/resources/achievements/bsc-certificate.png",
  "images/resources/achievements/programming-camp.jpg"
]

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
});
