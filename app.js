// DC Comics Timeline Application - Enhanced Edition
// Multi-dimensional filtering with era badges, creator credits, and advanced search

class DCTimeline {
    constructor() {
        this.events = timelineEvents;
        this.filteredEvents = this.events;
        this.filters = {
            category: 'all',
            era: 'all',
            character: '',
            writer: '',
            artist: '',
            storyArc: '',
            publicDomain: false,
            search: ''
        };
        this.sortOrder = 'year-asc';
        this.wikiCache = new Map();
        this.init();
    }

    init() {
        this.populateFilterOptions();
        this.renderEraButtons();
        this.updateStats();
        this.applyFilters();
        this.renderTimeline();
        this.attachEventListeners();
        this.hideLoading();
        this.animateTimelineItems();
    }

    populateFilterOptions() {
        // Populate character dropdown
        const characterSelect = document.getElementById('characterFilter');
        filterOptions.characters.forEach(char => {
            const option = document.createElement('option');
            option.value = char;
            option.textContent = char;
            characterSelect.appendChild(option);
        });

        // Populate writer dropdown
        const writerSelect = document.getElementById('writerFilter');
        filterOptions.writers.forEach(writer => {
            const option = document.createElement('option');
            option.value = writer;
            option.textContent = writer;
            writerSelect.appendChild(option);
        });

        // Populate artist dropdown
        const artistSelect = document.getElementById('artistFilter');
        filterOptions.artists.forEach(artist => {
            const option = document.createElement('option');
            option.value = artist;
            option.textContent = artist;
            artistSelect.appendChild(option);
        });

        // Populate story arc dropdown
        const storyArcSelect = document.getElementById('storyArcFilter');
        filterOptions.storyArcs.forEach(arc => {
            const option = document.createElement('option');
            option.value = arc;
            option.textContent = arc;
            storyArcSelect.appendChild(option);
        });
    }

    renderEraButtons() {
        const eraFilters = document.getElementById('eraFilters');
        const allButton = eraFilters.querySelector('[data-filter="all"]');

        Object.entries(eras).forEach(([key, era]) => {
            const button = document.createElement('button');
            button.className = 'era-btn';
            button.dataset.filterType = 'era';
            button.dataset.filter = key;
            button.innerHTML = `
                <span class="era-badge" style="background: ${era.color}"></span>
                ${era.name}
            `;
            eraFilters.appendChild(button);
        });
    }

    attachEventListeners() {
        // Category filters
        document.querySelectorAll('[data-filter-type="category"]').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCategoryFilter(e));
        });

        // Era filters
        document.querySelectorAll('[data-filter-type="era"]').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleEraFilter(e));
        });

        // Search
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const clearBtn = document.getElementById('clearBtn');

        searchBtn.addEventListener('click', () => this.handleSearch());
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        searchInput.addEventListener('input', (e) => {
            if (e.target.value === '') {
                this.filters.search = '';
                clearBtn.style.display = 'none';
                this.applyFilters();
            } else {
                clearBtn.style.display = 'block';
            }
        });
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            this.filters.search = '';
            clearBtn.style.display = 'none';
            this.applyFilters();
        });

        // Advanced filters
        document.getElementById('toggleAdvanced').addEventListener('click', () => {
            const advancedFilters = document.getElementById('advancedFilters');
            const isHidden = advancedFilters.style.display === 'none';
            advancedFilters.style.display = isHidden ? 'block' : 'none';
            document.getElementById('toggleAdvanced').textContent = isHidden ? '▲' : '▼';
        });

        document.getElementById('characterFilter').addEventListener('change', (e) => {
            this.filters.character = e.target.value;
            this.applyFilters();
        });

        document.getElementById('writerFilter').addEventListener('change', (e) => {
            this.filters.writer = e.target.value;
            this.applyFilters();
        });

        document.getElementById('artistFilter').addEventListener('change', (e) => {
            this.filters.artist = e.target.value;
            this.applyFilters();
        });

        document.getElementById('storyArcFilter').addEventListener('change', (e) => {
            this.filters.storyArc = e.target.value;
            this.applyFilters();
        });

        document.getElementById('publicDomainFilter').addEventListener('change', (e) => {
            this.filters.publicDomain = e.target.checked;
            this.applyFilters();
        });

        // Sort options
        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSort(e));
        });

        // Clear all filters
        document.getElementById('clearAllFilters').addEventListener('click', () => {
            this.resetFilters();
        });

        // Modal close
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('eventModal');
            if (e.target === modal || e.target.classList.contains('modal-close')) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    handleCategoryFilter(e) {
        const filter = e.target.dataset.filter;
        this.filters.category = filter;

        document.querySelectorAll('[data-filter-type="category"]').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        this.applyFilters();
    }

    handleEraFilter(e) {
        const filter = e.target.dataset.filter;
        this.filters.era = filter;

        document.querySelectorAll('[data-filter-type="era"]').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        this.applyFilters();
    }

    handleSearch() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        this.filters.search = searchTerm;
        this.applyFilters();
    }

    handleSort(e) {
        this.sortOrder = e.target.dataset.sort;

        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        this.sortFilteredEvents();
        this.renderTimeline();
        this.animateTimelineItems();
    }

    applyFilters() {
        let filtered = this.events;

        // Category filter
        if (this.filters.category !== 'all') {
            filtered = filtered.filter(event => event.category === this.filters.category);
        }

        // Era filter
        if (this.filters.era !== 'all') {
            filtered = filtered.filter(event => event.era === this.filters.era);
        }

        // Character filter
        if (this.filters.character) {
            filtered = filtered.filter(event =>
                event.characters && event.characters.includes(this.filters.character)
            );
        }

        // Writer filter
        if (this.filters.writer) {
            filtered = filtered.filter(event =>
                event.writers && event.writers.includes(this.filters.writer)
            );
        }

        // Artist filter
        if (this.filters.artist) {
            filtered = filtered.filter(event =>
                event.artists && event.artists.includes(this.filters.artist)
            );
        }

        // Story arc filter
        if (this.filters.storyArc) {
            filtered = filtered.filter(event => event.storyArc === this.filters.storyArc);
        }

        // Public domain filter
        if (this.filters.publicDomain) {
            filtered = filtered.filter(event => event.isPublicDomain === true);
        }

        // Search filter
        if (this.filters.search) {
            filtered = filtered.filter(event => {
                const searchStr = this.filters.search.toLowerCase();
                return event.title.toLowerCase().includes(searchStr) ||
                       event.description.toLowerCase().includes(searchStr) ||
                       event.year.toString().includes(searchStr) ||
                       (event.characters && event.characters.some(c => c.toLowerCase().includes(searchStr))) ||
                       (event.writers && event.writers.some(w => w.toLowerCase().includes(searchStr))) ||
                       (event.artists && event.artists.some(a => a.toLowerCase().includes(searchStr)));
            });
        }

        this.filteredEvents = filtered;
        this.sortFilteredEvents();
        this.updateStats();
        this.updateActiveFilters();
        this.renderTimeline();
        this.animateTimelineItems();
    }

    sortFilteredEvents() {
        if (this.sortOrder === 'year-asc') {
            this.filteredEvents.sort((a, b) => a.year - b.year);
        } else if (this.sortOrder === 'year-desc') {
            this.filteredEvents.sort((a, b) => b.year - a.year);
        }
    }

    updateStats() {
        document.getElementById('totalEvents').textContent = this.filteredEvents.length;

        // Current filter display
        let currentFilter = 'All';
        if (this.filters.era !== 'all') {
            currentFilter = eras[this.filters.era].name;
        } else if (this.filters.category !== 'all') {
            currentFilter = this.filters.category.charAt(0).toUpperCase() + this.filters.category.slice(1);
        }
        document.getElementById('currentEra').textContent = currentFilter;

        // Public domain count
        const publicDomainCount = this.filteredEvents.filter(e => e.isPublicDomain).length;
        document.getElementById('publicDomainCount').textContent = publicDomainCount;

        // Year span
        if (this.filteredEvents.length > 0) {
            const years = this.filteredEvents.map(e => e.year);
            const minYear = Math.min(...years);
            const maxYear = Math.max(...years);
            const span = maxYear - minYear;
            document.getElementById('yearSpan').textContent = `${span}+ yrs`;
        }
    }

    updateActiveFilters() {
        const activeFilterTags = document.getElementById('activeFilterTags');
        const activeFiltersSection = document.getElementById('activeFilters');
        const tags = [];

        if (this.filters.category !== 'all') {
            tags.push({ type: 'category', value: this.filters.category });
        }
        if (this.filters.era !== 'all') {
            tags.push({ type: 'era', value: eras[this.filters.era].name });
        }
        if (this.filters.character) {
            tags.push({ type: 'character', value: this.filters.character });
        }
        if (this.filters.writer) {
            tags.push({ type: 'writer', value: this.filters.writer });
        }
        if (this.filters.artist) {
            tags.push({ type: 'artist', value: this.filters.artist });
        }
        if (this.filters.storyArc) {
            tags.push({ type: 'storyArc', value: this.filters.storyArc });
        }
        if (this.filters.publicDomain) {
            tags.push({ type: 'publicDomain', value: 'Public Domain' });
        }
        if (this.filters.search) {
            tags.push({ type: 'search', value: `"${this.filters.search}"` });
        }

        if (tags.length > 0) {
            activeFiltersSection.style.display = 'block';
            activeFilterTags.innerHTML = tags.map(tag => `
                <span class="filter-tag" data-type="${tag.type}">
                    ${tag.value}
                    <button onclick="dcTimeline.removeFilter('${tag.type}')" aria-label="Remove filter">×</button>
                </span>
            `).join('');
        } else {
            activeFiltersSection.style.display = 'none';
        }
    }

    removeFilter(type) {
        switch(type) {
            case 'category':
                this.filters.category = 'all';
                document.querySelector('[data-filter-type="category"][data-filter="all"]').click();
                break;
            case 'era':
                this.filters.era = 'all';
                document.querySelector('[data-filter-type="era"][data-filter="all"]').click();
                break;
            case 'character':
                this.filters.character = '';
                document.getElementById('characterFilter').value = '';
                break;
            case 'writer':
                this.filters.writer = '';
                document.getElementById('writerFilter').value = '';
                break;
            case 'artist':
                this.filters.artist = '';
                document.getElementById('artistFilter').value = '';
                break;
            case 'storyArc':
                this.filters.storyArc = '';
                document.getElementById('storyArcFilter').value = '';
                break;
            case 'publicDomain':
                this.filters.publicDomain = false;
                document.getElementById('publicDomainFilter').checked = false;
                break;
            case 'search':
                this.filters.search = '';
                document.getElementById('searchInput').value = '';
                document.getElementById('clearBtn').style.display = 'none';
                break;
        }
        this.applyFilters();
    }

    resetFilters() {
        this.filters = {
            category: 'all',
            era: 'all',
            character: '',
            writer: '',
            artist: '',
            storyArc: '',
            publicDomain: false,
            search: ''
        };

        // Reset UI
        document.querySelector('[data-filter-type="category"][data-filter="all"]').click();
        document.querySelector('[data-filter-type="era"][data-filter="all"]').click();
        document.getElementById('characterFilter').value = '';
        document.getElementById('writerFilter').value = '';
        document.getElementById('artistFilter').value = '';
        document.getElementById('storyArcFilter').value = '';
        document.getElementById('publicDomainFilter').checked = false;
        document.getElementById('searchInput').value = '';
        document.getElementById('clearBtn').style.display = 'none';

        this.applyFilters();
    }

    renderTimeline() {
        const timeline = document.getElementById('timeline');

        if (this.filteredEvents.length === 0) {
            timeline.innerHTML = `
                <div class="no-results">
                    <h3>No events found</h3>
                    <p>Try adjusting your filters or search terms.</p>
                </div>
            `;
            return;
        }

        timeline.innerHTML = this.filteredEvents.map((event, index) => {
            const eraData = eras[event.era];
            const publicDomainBadge = event.isPublicDomain ?
                '<span class="public-domain-badge" title="Public Domain">🔓 Public Domain</span>' : '';

            return `
                <div class="timeline-item" style="animation-delay: ${index * 0.05}s" data-index="${index}">
                    <div class="timeline-year">${event.year}</div>
                    <div class="timeline-dot" style="background: ${eraData.color}"></div>
                    <div class="timeline-content" onclick="dcTimeline.showEventDetail(${index})">
                        <div class="event-header">
                            <span class="era-badge-inline" style="background: ${eraData.color}">${eraData.name}</span>
                            <span class="event-category-badge">${this.formatCategory(event.category)}</span>
                            ${publicDomainBadge}
                        </div>
                        <h3 class="event-title">${event.title}</h3>
                        <p class="event-description">${event.shortDescription}</p>
                        ${event.characters && event.characters.length > 0 ? `
                            <div class="event-metadata">
                                <strong>Characters:</strong> ${event.characters.slice(0, 3).join(', ')}${event.characters.length > 3 ? '...' : ''}
                            </div>
                        ` : ''}
                        ${event.writers && event.writers.length > 0 && event.writers[0] !== 'Various' ? `
                            <div class="event-metadata">
                                <strong>Writer${event.writers.length > 1 ? 's' : ''}:</strong> ${event.writers.slice(0, 2).join(', ')}${event.writers.length > 2 ? '...' : ''}
                            </div>
                        ` : ''}
                        ${event.storyArc ? `
                            <div class="event-metadata">
                                <strong>Story Arc:</strong> ${event.storyArc}
                            </div>
                        ` : ''}
                        <a href="https://en.wikipedia.org/wiki/${event.wikipediaTitle}" target="_blank" rel="noopener noreferrer" class="event-link">
                            Learn more from Wikipedia →
                        </a>
                    </div>
                </div>
            `;
        }).join('');
    }

    formatCategory(category) {
        const categories = {
            'publication': '📚 Publication',
            'character': '🦸 Character',
            'media': '🎬 Media'
        };
        return categories[category] || category;
    }

    async showEventDetail(index) {
        const event = this.filteredEvents[index];
        const modal = document.getElementById('eventModal');
        const modalBody = document.getElementById('modalBody');
        const eraData = eras[event.era];

        // Show modal with loading state
        modal.style.display = 'flex';
        modalBody.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading details from Wikipedia...</p>
            </div>
        `;

        try {
            const wikiData = await this.fetchWikipediaData(event.wikipediaTitle);

            modalBody.innerHTML = `
                <h2>${event.title}</h2>
                <div class="event-meta">
                    <span class="event-year-badge">${event.year}</span>
                    <span class="era-badge-modal" style="background: ${eraData.color}; color: ${eraData.color === '#FFD700' || eraData.color === '#C0C0C0' ? '#000' : '#fff'}">
                        ${eraData.name}
                    </span>
                    <span class="event-category">${this.formatCategory(event.category)}</span>
                    ${event.isPublicDomain ? '<span class="public-domain-badge">🔓 Public Domain</span>' : ''}
                </div>

                <div class="event-full-description">
                    <p>${event.description}</p>
                </div>

                ${event.publicDomainImageUrl ? `
                    <div class="public-domain-image-section">
                        <h3>Public Domain Image</h3>
                        <img src="${event.publicDomainImageUrl}" alt="${event.title}" class="public-domain-image" loading="lazy">
                        <p class="public-domain-notice">🔓 This image is in the public domain</p>
                    </div>
                ` : ''}

                ${event.youtubeUrl ? `
                    <div class="youtube-section">
                        <h3>Official Video</h3>
                        <div class="youtube-embed">
                            <iframe
                                width="100%"
                                height="400"
                                src="https://www.youtube.com/embed/${this.getYouTubeId(event.youtubeUrl)}"
                                title="${event.title} - YouTube video"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                                loading="lazy">
                            </iframe>
                        </div>
                        <a href="${event.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="youtube-link">
                            Watch on YouTube →
                        </a>
                    </div>
                ` : ''}

                ${event.characters && event.characters.length > 0 ? `
                    <div class="metadata-section">
                        <h3>Characters</h3>
                        <div class="metadata-tags">
                            ${event.characters.map(char => `<span class="metadata-tag">${char}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${event.writers && event.writers.length > 0 && event.writers[0] !== 'Various' ? `
                    <div class="metadata-section">
                        <h3>Writer${event.writers.length > 1 ? 's' : ''}</h3>
                        <div class="metadata-tags">
                            ${event.writers.map(writer => `<span class="metadata-tag">✍️ ${writer}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${event.artists && event.artists.length > 0 && event.artists[0] !== 'Various' ? `
                    <div class="metadata-section">
                        <h3>Artist${event.artists.length > 1 ? 's' : ''}</h3>
                        <div class="metadata-tags">
                            ${event.artists.map(artist => `<span class="metadata-tag">🎨 ${artist}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${event.storyArc ? `
                    <div class="metadata-section">
                        <h3>Story Arc</h3>
                        <div class="story-arc-badge">${event.storyArc}</div>
                    </div>
                ` : ''}

                <div class="wiki-content">
                    <h3>From Wikipedia:</h3>
                    <p>${wikiData.extract}</p>
                    ${wikiData.thumbnail ? `
                        <img src="${wikiData.thumbnail}" alt="${event.title}" class="wiki-image" loading="lazy">
                    ` : ''}
                </div>

                <div class="modal-links">
                    <a href="https://en.wikipedia.org/wiki/${event.wikipediaTitle}"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="wiki-link">
                        Read full Wikipedia article →
                    </a>
                </div>
            `;
        } catch (error) {
            console.error('Error fetching Wikipedia data:', error);
            modalBody.innerHTML = `
                <h2>${event.title}</h2>
                <div class="event-meta">
                    <span class="event-year-badge">${event.year}</span>
                    <span class="era-badge-modal" style="background: ${eraData.color}">
                        ${eraData.name}
                    </span>
                    <span class="event-category">${this.formatCategory(event.category)}</span>
                </div>
                <div class="event-full-description">
                    <p>${event.description}</p>
                </div>
                <div class="error">
                    <p>Unable to load additional information from Wikipedia.</p>
                </div>
                <div class="modal-links">
                    <a href="https://en.wikipedia.org/wiki/${event.wikipediaTitle}"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="wiki-link">
                        View on Wikipedia →
                    </a>
                </div>
            `;
        }
    }

    async fetchWikipediaData(title) {
        // Check cache first
        if (this.wikiCache.has(title)) {
            return this.wikiCache.get(title);
        }

        // Wikipedia REST API endpoint
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Wikipedia API error: ${response.status}`);
            }

            const data = await response.json();

            const result = {
                extract: data.extract || 'No summary available.',
                thumbnail: data.thumbnail ? data.thumbnail.source : null,
                url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${title}`
            };

            // Cache the result
            this.wikiCache.set(title, result);

            return result;
        } catch (error) {
            console.error('Wikipedia fetch error:', error);
            throw error;
        }
    }

    getYouTubeId(url) {
        // Extract YouTube video ID from various URL formats
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    closeModal() {
        const modal = document.getElementById('eventModal');
        modal.style.display = 'none';
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
    }

    animateTimelineItems() {
        const items = document.querySelectorAll('.timeline-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(item);
        });
    }
}

// Initialize the timeline when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.dcTimeline = new DCTimeline();
    });
} else {
    window.dcTimeline = new DCTimeline();
}
