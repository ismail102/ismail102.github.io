const images = [
    "images/figures/27.png",
    "images/figures/26.png",
    "images/figures/25.png",
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
        title: "AI-in-the-Loop: Privacy Preserving Real-Time Scam Detection and Conversational Scambaiting by Leveraging LLMs and Federated Learning",
        link: "https://arxiv.org/pdf/2509.05362",
        publisher: "arXiv",
        conf: "PoPETs 2026",
        year: 2025
    },
    {
        id: "C",
        title: "Comprehensive Privacy Risk Assessment in Social Networks Using User Attributes Social Graphs and Text Analysis",
        link: "https://dl.acm.org/doi/full/10.1145/3720553.3746686",
        publisher: "ACM",
        conf: "Hypertext 2025",
        year: 2025
    },
    {
        id: "C",
        title: "LAMDA: A Longitudinal Android Malware Benchmark for Concept Drift Analysis",
        link: "https://arxiv.org/abs/2505.18551",
        publisher: "arXiv",
        conf: "ICLR 2026",
        year: 2025
    },
    {
        id: "W",
        title: "Toward Empathetic AI: Neural-Symbolic LLMs for Emotionally Aligned Conversations",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 2025",
        year: 2025
    },
    {
        id: "W",
        title: "Real-Time Personalized Content Adaptation through Matrix Factorization and Context-Aware Federated Learning",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 2025",
        year: 2025
    },
    {
        id: "W",
        title: "LLMs Against Digital Deviance: Scalable Hate Speech Detection in Low-Resource and Code-Mixed Social Media",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 2025",
        year: 2025
    },
    {
        id: "W",
        title: "Beyond Transformers: Leveraging Large Language Models and Encoder-Decoder Architectures for Emotion Detection in Low-Resource Language",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 2025",
        year: 2025
    },
    {
        id: "W",
        title: "Privacy Control in Social Networks: Integrating Behavioral Patterns and Content Sensitivity for Audience Recommendation",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 2025",
        year: 2025
    },
    {
        id: "W",
        title: "A Visual Approach to Tracking Emotional Sentiment Dynamics in Social Network Commentaries",
        link: "#",
        publisher: "arXiv",
        conf: "ICWSM 2024",
        year: 2024
    },
    {
        id: "W",
        title: "SocialRec: User Activity Based Post Weighted Dynamic Personalized Post Recommendation System in Social Media",
        link: "https://arxiv.org/abs/2407.09747",
        publisher: "arXiv",
        conf: "ASONAM 2024",
        year: 2024
    },
    {
        id: "W",
        title: "EVOLVE: Predicting User Evolution and Network Dynamics in Social Media Using Fine-Tuned GPT-like Model",
        link: "https://arxiv.org/abs/2407.09691",
        publisher: "arXiv",
        conf: "ASONAM 2024",
        year: 2024
    },
    {
        id: "W",
        title: "4WHContext: A Context Based Hate Speech Detection Framework from Social Media Posts",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 2024",
        year: 2024
    },
    {
        id: "W",
        title: "Bangla Emotion Detection Dataset with an Extended Taxonomy and Its Evaluation",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 2024",
        year: 2024
    },
    {
        id: "W",
        title: "SocFedGPT: Federated GPT-based Adaptive Content Filtering System Leveraging User Interactions in Social Networks",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 2024",
        year: 2024
    },
    {
        id: "W",
        title: "FLASH: Federated Learning-Based LLMs for Advanced Query Processing in Social Networks through RAG",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 2024",
        year: 2024
    },
    {
        id: "W",
        title: "Combating Echo Chambers In Online Social Network By Increasing Content Diversity In Recommendation",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 2024",
        year: 2024
    },
    {
        id: "W",
        title: "CAMERA: Context Based Emotion Detection Framework And Its Evaluation",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 2024",
        year: 2024
    },
    {
        id: "W",
        title: "Enhancing the Cybersecurity of Advanced Nuclear Power Plants through Generative AI and Large Language Models",
        link: "#",
        publisher: "arXiv",
        conf: "ANS 2024",
        year: 2024
    },
    {
        id: "W",
        title: "Natural Language Processing for Predictive Maintenance in Nuclear Power Plant: Digital Twin Context",
        link: "#",
        publisher: "arXiv",
        conf: "ANS 2024",
        year: 2024
    },
    {
        id: "W",
        title: "Blockchain-Integrated Secure Framework for Enhanced E-Government Services",
        link: "#",
        publisher: "arXiv",
        conf: "BlockchainApps 2024",
        year: 2024
    },
    {
        id: "W",
        title: "Generative AI like ChatGPT in Blockchain Federated Learning: use cases, opportunities and future",
        link: "#",
        publisher: "arXiv",
        conf: "arXiv",
        year: 2024
    },
    {
        id: "W",
        title: "SCALE: Self-regulated Clustered federAted LEarning in a Homogeneous Environment",
        link: "#",
        publisher: "arXiv",
        conf: "arXiv",
        year: 2024
    },
    {
        id: "W",
        title: "Monitoring Dynamics of Emotional Sentiment in Social Network Commentaries",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 2023",
        year: 2023
    },
    {
        id: "W",
        title: "Combating Identity Attacks in Online Social Networks: A Multi-Layered Framework Using Zero-Knowledge Proof and Permissioned Blockchain",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 2023",
        year: 2023
    },
    {
        id: "W",
        title: "Towards Addressing Identity Deception in Social Media using Bangla Text-Based Gender Identification",
        link: "#",
        publisher: "arXiv",
        conf: "ASONAM 2023",
        year: 2023
    },
    {
        id: "W",
        title: "Collaborative Differentially Private Federated Learning Framework for the Prediction of Diabetic Retinopathy",
        link: "#",
        publisher: "arXiv",
        conf: "ICAIC 2023",
        year: 2023
    },
    {
        id: "W",
        title: "Machine Learning and Sentiment Analysis for Predicting Environmental Lead Toxicity in Children at the ZIP Code Level",
        link: "#",
        publisher: "arXiv",
        conf: "ICAIC 2023",
        year: 2023
    },
    {
        id: "W",
        title: "Prediction of Childhood and Pregnancy Lead Poisoning Using Deep Learning",
        link: "#",
        publisher: "arXiv",
        conf: "JCSC",
        year: 2023
    },
    {
        id: "W",
        title: "Federated Learning-based Contraband Detection within Airport Baggage X-Rays",
        link: "#",
        publisher: "arXiv",
        conf: "JCSC",
        year: 2023
    },
    {
        id: "W",
        title: "A Novel Hierarchical Federated Learning with Self-Regulated Decentralized Clustering",
        link: "#",
        publisher: "arXiv",
        conf: "JCSC",
        year: 2023
    },
    {
        id: "W",
        title: "Active learning on medical image",
        link: "#",
        publisher: "arXiv",
        conf: "DDAMI 2023",
        year: 2023
    },
    {
        id: "W",
        title: "Towards Federated Learning Based Contraband Detection Within Airport Baggage X-Rays",
        link: "#",
        publisher: "arXiv",
        conf: "ICMLANT 2023",
        year: 2023
    },
    {
        id: "W",
        title: "Introduction of Medical Imaging Modalities",
        link: "#",
        publisher: "arXiv",
        conf: "",
        year: 2023
    },
    {
        id: "W",
        title: "AutoML Systems For Medical Imaging",
        link: "#",
        publisher: "arXiv",
        conf: "",
        year: 2023
    },
    {
        id: "W",
        title: "The Survey of Recommendation System: Past, Present and Future",
        link: "#",
        publisher: "arXiv",
        conf: "",
        year: 2024
    }
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

function generateTableRows() {
    const listWrapper = document.querySelector('.list-wrapper');

    // Group publications by year
    const groupedByYear = {};

    publicationsData.forEach((pub, index) => {
        const year = pub.year;
        if (!groupedByYear[year]) {
            groupedByYear[year] = [];
        }
        groupedByYear[year].push({ ...pub, id: index + 1 });
    });

    // Sort years descending
    const sortedYears = Object.keys(groupedByYear).sort((a, b) => b - a);

    // Generate HTML
    sortedYears.forEach((year) => {
        const heading = document.createElement('h5');
        heading.textContent = year;
        listWrapper.appendChild(heading);

        const ul = document.createElement('ul');
        ul.className = "publication-list";

        groupedByYear[year].forEach((pub) => {
            const li = document.createElement('li');
            li.innerHTML = `[${pub.id}] "${pub.title}" [<a href="${pub.link}" target="_blank">${pub.publisher}</a>] [${pub.conf}]`;
            ul.appendChild(li);
        });

        listWrapper.appendChild(ul);
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
    // createAchievementsGroup();
    createSlider();
    generateTableRows();
});
