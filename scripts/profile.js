// profile-card.js

async function loadProfileCard() {
    const container = document.getElementById("profileCard");
    if (!container) return;

    container.innerHTML = `
        <div class="profile-card">
            <img src="images/profile2.jpg" class="profile-img" alt="Profile Photo">

            <h2 class="profile-name">Ismail Hossain</h2>

            <p class="profile-title">Ph.D Candidate</p>

            <p class="profile-affiliation">
                <strong>Researcher Assistant</strong>, 
                <a href="#" class="lab-link">
                    SUPREME Lab
                </a>
            </p>

            <p class="profile-email">
                <i class="fas fa-envelope"></i> ihossain@miners.utep.edu
            </p>

            <div class="profile-social">
                    <a href="https://scholar.google.com/citations?user=FexryyIAAAAJ&hl=en" class="icon">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Scholar_logo.svg" alt="Scholar">
                    </a>

                    <a href="https://github.com/ismail102" class="icon">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub">
                    </a>

                    <a href="https://orcid.org/0000-0001-8954-1150" class="icon">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/06/ORCID_iD.svg" alt="ORCID">
                    </a>

                    <a href="https://www.linkedin.com/in/ismail-hossain-utep/" class="icon">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LinkedIn">
                    </a>
            </div>
        </div>
    `;
}

// window.addEventListener("DOMContentLoaded", loadProfileCard);


document.addEventListener('DOMContentLoaded', function () {
    loadProfileCard();
})