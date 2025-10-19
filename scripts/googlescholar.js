const domainColors = {
  "Medical Imaging & Healthcare AI": { background: "#3498db", color: "#fff" },   // blue
  "Federated Learning": { background: "#9b59b6", color: "#fff" },                // purple-indigo
  "Privacy": { background: "#94ad24ff", color: "#fff" },                           // violet
  "Social Networks": { background: "#2ecc71", color: "#fff" },                   // green
  "Generative AI, LLMs & NLP": { background: "#e67e22", color: "#fff" },         // orange
  "Cybersecurity": { background: "#34495e", color: "#fff" },                     // dark gray-blue
  "Nuclear Power": { background: "#f1c40f", color: "#000" }                      // yellow (dark text for contrast)
};


const paperkeyworkdsmap = {
    "papers": {
        "Introduction of Medical Imaging Modalities": ["Medical Imaging & Healthcare AI"],
        "Active Learning on Medical Image": ["Medical Imaging & Healthcare AI"],
        "AutoML Systems For Medical Imaging": ["Medical Imaging & Healthcare AI"],
        "Data Driven Approaches on Medical Imaging": ["Medical Imaging & Healthcare AI"],
        "Collaborative Differentially Private Federated Learning Framework for the Prediction of Diabetic Retinopathy": ["Medical Imaging & Healthcare AI", "Federated Learning"],
        "Prediction of Childhood and Pregnancy Lead Poisoning Using Deep Learning": ["Medical Imaging & Healthcare AI"],
        "Machine Learning and Sentiment Analysis for Predicting Environmental Lead Toxicity in Children at the ZIP Code Level": ["Medical Imaging & Healthcare AI"],
        "SCAN: A HealthCare Personalized ChatBot with Federated Learning Based GPT": ["Medical Imaging & Healthcare AI", "Federated Learning", "Generative AI, LLMs & NLP"],

        "Towards Federated Learning Based Contraband Detection Within Airport Baggage X-Rays": ["Federated Learning"],
        "Federated Learning-based Contraband Detection within Airport Baggage X-Rays": ["Federated Learning"],
        "A Novel Hierarchical Federated Learning with Self-Regulated Decentralized Clustering": ["Federated Learning"],
        "SCALE: Self-regulated Clustered Federated Learning in a Homogeneous Environment": ["Federated Learning"],
        "SAFARI: Self-regulAted Clustered FederAted Learning in a HeteRogeneous EnvIronment": ["Federated Learning"],
        "FLASH: Federated Learning-Based LLMs for Advanced Query Processing in Social Networks Analysis through RAG": ["Federated Learning", "Social Networks Analysis"],
        "SocFedGPT: Federated GPT-based Adaptive Content Filtering System Leveraging User Interactions in Social Networks Analysis": ["Federated Learning", "Generative AI, LLMs & NLP", "Social Networks Analysis"],

        "A Visual Approach to Tracking Emotional Sentiment Dynamics in Social Network Commentaries": ["Social Networks Analysis"],
        "Monitoring Dynamics of Emotional Sentiment in Social Network Commentaries": ["Social Networks Analysis"],
        "Towards Addressing Identity Deception in Social Media using Bangla Text-Based Gender Identification": ["Social Networks Analysis", "Cybersecurity"],
        "SocialRec: User Activity Based Post Weighted Dynamic Personalized Post Recommendation System in Social Media": ["Social Networks Analysis"],
        "EVOLVE: Predicting User Evolution and Network Dynamics in Social Media Using Fine-Tuned GPT-like Model": ["Social Networks Analysis", "Generative AI, LLMs & NLP"],
        "Comprehensive Privacy Risk Assessment in Social Networks Using User Attributes Social Graphs and Text Analysis": ["Social Networks Analysis", "Privacy"],
        "Combating Identity Attacks in Online Social Networks Analysis: A Multi-Layered Framework Using Zero-Knowledge Proof and Permissioned Blockchain": ["Social Networks Analysis", "Cybersecurity"],
        "Socialguard: Bangla text-based gender identification for enhancing integrity in Social Networks Analysis": ["Social Networks Analysis"],
        "Privacy Control in Social Networks: Integrating Behavioral Patterns and Content Sensitivity for Audience Recommendation": ["Social Networks Analysis", "Privacy"],
        "Combating Echo Chambers In Online Social Network By Increasing Content Diversity In Recommendation": ["Social Networks Analysis"],

        "Advancements in Multimodal Social Media Post Summarization: Integrating GPT-4 for Enhanced Understanding": ["Generative AI, LLMs & NLP"],
        "Generative AI like ChatGPT in Blockchain Federated Learning: Use Cases, Opportunities and Future": ["Generative AI, LLMs & NLP", "Federated Learning", "Cybersecurity"],
        "LLMs Against Digital Deviance: Scalable Hate Speech Detection in Low-Resource and Code-Mixed Social Media": ["Generative AI, LLMs & NLP", "Social Networks Analysis"],
        "Toward Empathetic AI: Neural-Symbolic LLMs for Emotionally Aligned Conversations": ["Generative AI, LLMs & NLP"],
        "Beyond Transformers: Leveraging Large Language Models and Encoder-Decoder Architectures for Emotion Detection in Low-Resource Language": ["Generative AI, LLMs & NLP"],
        "4WHContext: A Context Based Hate Speech Detection Framework from Social Media Posts": ["Generative AI, LLMs & NLP", "Social Networks Analysis"],
        "CAMERA: Context Based Emotion Detection Framework and Its Evaluation": ["Generative AI, LLMs & NLP"],
        "Bangla Emotion Detection Dataset with an Extended Taxonomy and Its Evaluation": ["Generative AI, LLMs & NLP"],
        "AI-in-the-Loop: Privacy Preserving Real-Time Scam Detection and Conversational Scambaiting by Leveraging LLMs and Federated Learning": ["Generative AI, LLMs & NLP", "Federated Learning", "Privacy"],

        "Blockchain-integrated secure framework for enhanced e-government services": ["Cybersecurity"],
        "LAMDA: A Longitudinal Android Malware Benchmark for Concept Drift Analysis": ["Cybersecurity"],

        "Natural Language Processing for Predictive Maintenance in Nuclear Power Plant: Digital Twin Context": ["Nuclear Power"],
        "Enhancing the Cybersecurity of Advanced Nuclear Power Plants through Generative AI and Large Language Models": ["Nuclear Power", "Generative AI, LLMs & NLP", "Cybersecurity"],
        "ContextGPT: Predictive Monitoring of Nuclear Power Plant with Contextually-Informed Situational Understanding": ["Nuclear Power", "Generative AI, LLMs & NLP"],
        "LLM-Powered Chatbot for Safety Compliance Assistance in Nuclear Power Plants": ["Nuclear Power", "Generative AI, LLMs & NLP"],
        "Secure Anomaly Detection in Advanced Reactor through Quantum Federated Learning with Advanced Cryptography": ["Nuclear Power", "Cybersecurity", "Federated Learning"],
        "A Privacy-Aware Cyber Attack Detection Framework for Advanced Reactors Using Data Fusion and Quantum Deep Learning": ["Nuclear Power", "Cybersecurity"],
        "Proactive Cybersecurity Framework for Nuclear Power Plants Using Quantum Large Language Models": ["Nuclear Power", "Generative AI, LLMs & NLP", "Cybersecurity"],
        "Securing SDN-Based Advanced Reactors Against DDoS Attacks Using Quantum-Inspired Ensemble Models": ["Nuclear Power", "Cybersecurity"],
        "Optimus-Q: Utilizing Blockchain Federated Learning in Adaptive Human Robots for Intelligent NPP Operations through Quantum Cryptography": ["Nuclear Power", "Cybersecurity", "Federated Learning"]
    }
}


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

// Example: check if a paper exists and get its domains
function getDomainsForPaper(title, data = paperkeyworkdsmap) {
    console.log("Checking domains for paper:", title);
    return data.papers[title] || ["Not found"];
}

function getDomainStyle(domain) {
  const style = domainColors[domain] || { background: "#bdc3c7", color: "#000" }; // fallback = gray
  return `background:${style.background}; color:${style.color};`;
}


// // Example usage
// console.log(getDomainsForPaper(
//   "AI-in-the-Loop: Privacy Preserving Real-Time Scam Detection and Conversational Scambaiting by Leveraging LLMs and Federated Learning", 
//   paperData
// ));

async function loadScholarArticles() {
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        // Simple client-side caching using localStorage.
        // Key versioning lets you invalidate the cache by changing the key.
        const cacheKey = "scholarDataCache_v1";

        try {
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                // Use cached JSON instead of the freshly fetched response
                data = JSON.parse(cached);
                // console.log("Loaded scholar data from cache.");
            } else {
                // First time: save fetched data to cache for future loads
                localStorage.setItem(cacheKey, JSON.stringify(data));
                // console.log("Saved scholar data to cache.");
            }
        } catch (cacheErr) {
            console.warn("Cache operation failed:", cacheErr);
        }
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
            <!-- Year -->
            <span class="badge year">${article.year || "N/A"}</span>
            
            <!-- Citations -->
            <span class="badge citations">Cited by ${article.cited_by?.value || 0}</span>
            
              <!-- Domains -->
            ${
                getDomainsForPaper(article.title)
                .map(domain => `<span class="badge" style="${getDomainStyle(domain)}">${domain}</span>`)
                .join("")
            }
            </div>
            `;

            container.appendChild(card);
        });
    } catch (err) {
        console.error("Error:", err);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // createAchievementsGroup();
    loadScholarStats();
    loadScholarArticles();
});