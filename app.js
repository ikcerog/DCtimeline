// DC Comics Timeline Application
// Uses Wikipedia REST API for copyright-compliant data sourcing

class DCTimeline {
    constructor() {
        this.events = timelineEvents;
        this.filteredEvents = this.events;
        this.currentFilter = 'all';
        this.wikiCache = new Map();
        this.init();
    }

    init() {
        this.renderTimeline();
        this.attachEventListeners();
        this.hideLoading();
        this.animateTimelineItems();
    }

    attachEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');

        searchBtn.addEventListener('click', () => this.handleSearch());
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        searchInput.addEventListener('input', (e) => {
            if (e.target.value === '') this.handleSearch();
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

    handleFilter(e) {
        const filter = e.target.dataset.filter;
        this.currentFilter = filter;

        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Filter events
        if (filter === 'all') {
            this.filteredEvents = this.events;
        } else {
            this.filteredEvents = this.events.filter(event => event.category === filter);
        }

        this.renderTimeline();
        this.animateTimelineItems();
    }

    handleSearch() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();

        if (searchTerm === '') {
            this.filteredEvents = this.events;
        } else {
            this.filteredEvents = this.events.filter(event => {
                return event.title.toLowerCase().includes(searchTerm) ||
                       event.description.toLowerCase().includes(searchTerm) ||
                       event.year.toString().includes(searchTerm);
            });
        }

        this.renderTimeline();
        this.animateTimelineItems();
    }

    renderTimeline() {
        const timeline = document.getElementById('timeline');

        if (this.filteredEvents.length === 0) {
            timeline.innerHTML = `
                <div class="no-results">
                    <p>No events found matching your criteria.</p>
                </div>
            `;
            return;
        }

        timeline.innerHTML = this.filteredEvents.map((event, index) => `
            <div class="timeline-item" style="animation-delay: ${index * 0.1}s" data-index="${index}">
                <div class="timeline-year">${event.year}</div>
                <div class="timeline-dot"></div>
                <div class="timeline-content" onclick="dcTimeline.showEventDetail(${index})">
                    <div class="event-category">${this.formatCategory(event.category)}</div>
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-description">${event.shortDescription}</p>
                    <a href="#" class="event-link" onclick="event.preventDefault();">
                        Learn more from Wikipedia →
                    </a>
                </div>
            </div>
        `).join('');
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
                    <span class="event-category">${this.formatCategory(event.category)}</span>
                </div>
                <div class="event-full-description">
                    <p>${event.description}</p>
                </div>
                <div class="wiki-content">
                    <h3>From Wikipedia:</h3>
                    <p>${wikiData.extract}</p>
                    ${wikiData.thumbnail ? `
                        <img src="${wikiData.thumbnail}" alt="${event.title}" class="wiki-image">
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
                <style>
                    .event-meta {
                        display: flex;
                        gap: 1rem;
                        margin: 1rem 0;
                        flex-wrap: wrap;
                    }
                    .event-year-badge {
                        background: linear-gradient(135deg, var(--accent-blue), var(--accent-red));
                        color: white;
                        padding: 0.5rem 1rem;
                        border-radius: 50px;
                        font-weight: 700;
                    }
                    .event-full-description {
                        margin: 1.5rem 0;
                        padding: 1.5rem;
                        background: var(--bg-card);
                        border-left: 4px solid var(--accent-blue);
                        border-radius: 8px;
                    }
                    .wiki-content {
                        margin-top: 2rem;
                        padding-top: 2rem;
                        border-top: 1px solid var(--border-color);
                    }
                    .wiki-content h3 {
                        color: var(--accent-blue);
                        margin-bottom: 1rem;
                    }
                    .wiki-content p {
                        line-height: 1.8;
                        color: var(--text-secondary);
                    }
                    .wiki-image {
                        width: 100%;
                        max-width: 400px;
                        height: auto;
                        margin: 1.5rem 0;
                        border-radius: 8px;
                        border: 1px solid var(--border-color);
                    }
                    .modal-links {
                        margin-top: 2rem;
                        padding-top: 1.5rem;
                        border-top: 1px solid var(--border-color);
                    }
                    .wiki-link {
                        display: inline-block;
                        padding: 1rem 2rem;
                        background: linear-gradient(135deg, var(--accent-blue), var(--accent-red));
                        color: white;
                        text-decoration: none;
                        border-radius: 50px;
                        font-weight: 600;
                        transition: transform 0.2s, box-shadow 0.3s;
                    }
                    .wiki-link:hover {
                        transform: translateY(-2px);
                        box-shadow: var(--glow);
                    }
                    .no-results {
                        text-align: center;
                        padding: 3rem;
                        color: var(--text-secondary);
                    }
                </style>
            `;
        } catch (error) {
            console.error('Error fetching Wikipedia data:', error);
            modalBody.innerHTML = `
                <h2>${event.title}</h2>
                <div class="event-meta">
                    <span class="event-year-badge">${event.year}</span>
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
