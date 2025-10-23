// Gallery Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-gallery-btn');
    const searchInput = document.getElementById('gallery-search');
    const galleryContainer = document.getElementById('gallery-container');

    // Function to load images
    async function loadGalleryImages(query) {
        try {
            const response = await fetch(`/api/gallery/search-images?query=${encodeURIComponent(query)}`);
            const images = await response.json();

            if (!response.ok) {
                throw new Error(images.error || 'Failed to fetch images');
            }

            // Clear existing gallery
            galleryContainer.innerHTML = '';

            // Add new images
            images.forEach(image => {
                const col = document.createElement('div');
                col.className = 'col-md-4 mb-4';
                col.innerHTML = `
                    <div class="gallery-item card h-100">
                        <img src="${image.url}" 
                             class="card-img-top" 
                             alt="${image.title}"
                             loading="lazy">
                        <div class="card-body">
                            <h5 class="card-title">${image.title}</h5>
                            <a href="${image.context}" 
                               class="btn btn-sm btn-outline-primary" 
                               target="_blank">
                               View Source
                            </a>
                        </div>
                    </div>
                `;
                galleryContainer.appendChild(col);
            });
        } catch (error) {
            console.error('Error loading images:', error);
            showNotification('Error loading images. Please try again.', 'error');
        }
    }

    // Search button click handler
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            loadGalleryImages(query);
        }
    });

    // Enter key handler
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                loadGalleryImages(query);
            }
        }
    });
});