// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Gallery data - Add your photos and videos here
    const galleryData = [
        {
            type: 'image',
            src: 'images/gallery/1.jpg',
            title: 'PhD Dissertation Proposal',
            description: 'Beautiful snowy mountains at sunset'
        },
        {
            type: 'image',
            src: 'images/gallery/2.jpg',
            title: 'ICWSM Conference Poster Presentation',
            description: 'An unforgettable experience captured on video'
        },
        {
            type: 'image',
            src: 'images/gallery/3.jpg',
            title: 'Short Trip to White Sand, New Mexico, USA',
            description: 'Downtown at night with stunning reflections'
        },
        {
            type: 'image',
            src: 'images/gallery/4.jpg',
            title: 'Poster Presentation at UTEP with Md. Jahangir Alam',
            description: 'Golden hour by the beach'
        },
        {
            type: 'image',
            src: 'images/gallery/5.jpg',
            title: 'Poster for ICWSM Conference',
            description: 'Exploring new places and making memories'
        },
        {
            type: 'video',
            src: 'images/gallery/6.mp4',
            title: 'UTEP Coding Interview Practice Club',
            description: 'Peaceful forest walk in autumn'
        },
        {
            type: 'image',
            src: 'images/gallery/7.jpg',
            title: 'Poster Presentation at UTEP with Md. Jahangir Alam',
            description: 'Serene coastal views at dawn'
        }
    ];

    // Get DOM elements
    const previewMedia = document.getElementById('previewMedia');
    const mediaTitle = document.getElementById('mediaTitle');
    const mediaDescription = document.getElementById('mediaDescription');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentIndexEl = document.getElementById('currentIndex');
    const totalItemsEl = document.getElementById('totalItems');
    const thumbnailList = document.getElementById('thumbnailList');

    // Gallery state
    let currentIndex = 0;
    const totalItems = galleryData.length;

    // Set total items counter
    totalItemsEl.textContent = totalItems;

    // Generate thumbnails
    galleryData.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'mb-3';
        
        if (item.type === 'image') {
            div.innerHTML = `<img src="${item.src}" class="rounded border border-2 thumbnail ${index === 0 ? 'active' : ''}" alt="${item.title}" style="width: 100%; height: 120px; object-fit: cover;">`;
        } else {
            div.innerHTML = `
                <div class="position-relative">
                    <video src="${item.src}" class="rounded border border-2 thumbnail ${index === 0 ? 'active' : ''}" muted style="width: 100%; height: 120px; object-fit: cover;"></video>
                    <span class="position-absolute top-0 end-0 badge bg-primary m-2">
                        <i class="fas fa-play-circle"></i> Video
                    </span>
                </div>
            `;
        }
        
        div.querySelector('.thumbnail').addEventListener('click', () => goToSlide(index));
        thumbnailList.appendChild(div);
    });

    const thumbnails = document.querySelectorAll('.thumbnail');

    // Update gallery display
    function updateGallery() {
        const currentItem = galleryData[currentIndex];
        
        // Update preview media
        if (currentItem.type === 'image') {
            previewMedia.innerHTML = `<img src="${currentItem.src}" alt="${currentItem.title}">`;
        } else {
            previewMedia.innerHTML = `
                <video src="${currentItem.src}" controls autoplay></video>
                <span class="position-absolute top-0 end-0 badge bg-primary m-3 fs-6">
                    <i class="fas fa-play-circle"></i> Video
                </span>
            `;
        }

        // Update caption
        mediaTitle.textContent = currentItem.title;
        mediaDescription.textContent = currentItem.description;

        // Update counter
        currentIndexEl.textContent = currentIndex + 1;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalItems - 1;

        // Update active thumbnail
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });

        // Scroll thumbnail into view
        thumbnails[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Navigate to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateGallery();
    }

    // Previous button click handler
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateGallery();
        }
    });

    // Next button click handler
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalItems - 1) {
            currentIndex++;
            updateGallery();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateGallery();
        } else if (e.key === 'ArrowRight' && currentIndex < totalItems - 1) {
            currentIndex++;
            updateGallery();
        }
    });

    // Initialize gallery
    updateGallery();
});