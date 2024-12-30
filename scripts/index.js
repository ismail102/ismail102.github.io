// data.js
const tableData = [
    {
        id: "C",
        title: "SocFedGPT: Federated GPT-based Adaptive Content Filtering System Leveraging User Interactions in Social Networks",
        link: "#",
        publisher: "Springer"
    },
    {
        id: "W",
        title: "Bangla Emotion Detection Dataset With An Extended Taxonomy And Its Evaluation",
        link: "#",
        publisher: "Springer"
    },
    {
        id: "W",
        title: "FLASH: Federated Learning-Based LLMs for Advanced Query Processing in Social Networks through RAG",
        link: "#",
        publisher: "Springer"
    },
    {
        id: "W",
        title: "4WHContext: A Context Based Hate Speech Detection Framework From Social Media Posts",
        link: "#",
        publisher: "Springer"
    },
    {
        id: "W",
        title: "Combating Echo Chambers In Online Social Network By Increasing Content Diversity In Recommendation",
        link: "#",
        publisher: "Springer"
    },
    {
        id: "W",
        title: "CAMERA: Context Based Emotion Detection Framework And Its Evaluation",
        link: "#",
        publisher: "Springer"
    },
    {
        id: "W",
        title: "EVOLVE: Predicting User Evolution and Network Dynamics in Social Media Using Fine-Tuned GPT-like Model",
        link: "https://arxiv.org/abs/2407.09691",
        publisher: "Springer"
    },
    {
        id: "W",
        title: "SocialRec: User Activity Based Post Weighted Dynamic Personalized Post Recommendation System in Social Media",
        link: "https://arxiv.org/abs/2407.09747",
        publisher: "Springer"
    },
    // Add the rest of your table rows here
];

// Function to generate table rows dynamically
function generateTableRows() {
    // Select the table body
    const tableBody = document.getElementById("table-publications");

    // Loop through the tableData array and populate the rows
    tableData.forEach((row) => {
        const tr = document.createElement("tr");
        tr.style.fontSize = "12px";

        tr.innerHTML = `
            <th scope="row">${row.id}</th>
            <td>${row.title}</td>
            <td><a href="${row.link}" target="_blank">Link</a></td>
            <td>${row.publisher}</td>
        `;
        tableBody.appendChild(tr);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    generateTableRows();
});
