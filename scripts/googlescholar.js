const authorId = "FexryyIAAAAJ";   // Your Scholar ID
const apiKey = "808ec3561f54be07e8553e3c6872f709d130bde95cd768461b3d92ddb511cb1e";
const apiUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${authorId}&hl=en&api_key=${apiKey}`
)}`;

async function loadScholarStats() {
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log("Scholar data:", data);

        // ===== TABLE =====
        document.getElementById("citations-all").textContent = data.cited_by?.table?.[0]?.citations?.all || "0";
        // document.getElementById("citations-since").textContent = data.cited_by?.table?.[0]?.citations?.since_2020 || "0";

        document.getElementById("hindex-all").textContent = data.cited_by?.table?.[1]?.h_index?.all || "0";
        // document.getElementById("hindex-since").textContent = data.cited_by?.table?.[1]?.h_index?.since_2020 || "0";

        document.getElementById("i10-all").textContent = data.cited_by?.table?.[2]?.i10_index?.all || "0";
        // document.getElementById("i10-since").textContent = data.cited_by?.table?.[2]?.i10_index?.since_2020 || "0";

        // ===== CHART =====
        // const years = data.cited_by_graph?.points?.map(p => p.year) || [];
        // const citations = data.cited_by_graph?.points?.map(p => p.citations) || [];

        // const ctx = document.getElementById("citationsChart").getContext("2d");
        // new Chart(ctx, {
        //     type: "bar",
        //     data: {
        //         labels: years,
        //         datasets: [{
        //             label: "Citations",
        //             data: citations,
        //             backgroundColor: "rgba(100, 100, 100, 0.8)"
        //         }]
        //     },
        //     options: {
        //         responsive: true,
        //         plugins: { legend: { display: false } },
        //         scales: {
        //             y: { beginAtZero: true }
        //         }
        //     }
        // });

    } catch (err) {
        console.error("Error:", err);
    }
}

document.addEventListener("DOMContentLoaded", loadScholarStats);