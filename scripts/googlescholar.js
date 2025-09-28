const authorId = "FexryyIAAAAJ";   // Your Scholar ID
const apiKey = "808ec3561f54be07e8553e3c6872f709d130bde95cd768461b3d92ddb511cb1e";
const apiUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${authorId}&hl=en&api_key=${apiKey}&num=100`
)}`;

async function loadScholarStats() {
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        // console.log("Scholar data:", data);

        // ===== TABLE =====
        document.getElementById("citations-all").textContent = data.cited_by?.table?.[0]?.citations?.all || "0";
        // document.getElementById("citations-since").textContent = data.cited_by?.table?.[0]?.citations?.since_2020 || "0";

        document.getElementById("hindex-all").textContent = data.cited_by?.table?.[1]?.h_index?.all || "0";
        // document.getElementById("hindex-since").textContent = data.cited_by?.table?.[1]?.h_index?.since_2020 || "0";

        document.getElementById("i10-all").textContent = data.cited_by?.table?.[2]?.i10_index?.all || "0";
        // document.getElementById("i10-since").textContent = data.cited_by?.table?.[2]?.i10_index?.since_2020 || "0";

    } catch (err) {
        console.error("Error:", err);
    }
}

async function loadScholarArticles() {
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        // console.log("Scholar data:", data);
              // ===== CHART =====
        articles = data.articles || [];
        // console.log("Articles:", articles);
        // Sort articles by year (descending)
        articles.sort((a, b) => parseInt(b.year) - parseInt(a.year));

        // Render articles dynamically
        const container = document.getElementById("articles-container");
        articles.forEach(article => {
        const card = document.createElement("div");
        card.className = "article-card";

        card.innerHTML = `
            <a href="${article.link}" target="_blank">
            <div class="title">${article.title}</div>
            </a>
            <div class="authors">${article.authors}</div>
            <div class="conference">${article.publication || "Unknown Publication"}</div>
            <div class="badges">
              <span class="badge year">${article.year || "N/A"}</span>
              <span class="badge citations">Cited by ${article.cited_by?.value || 0}</span>
            </div>
            `;

        container.appendChild(card);
        });
    } catch (err) {
        console.error("Error:", err);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // createAchievementsGroup();
    loadScholarStats();
    loadScholarArticles();
});