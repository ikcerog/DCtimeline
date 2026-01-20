# DC Comics Timeline

An interactive, mobile-friendly timeline showcasing major events in DC Comics history. This project uses Wikipedia's REST API to provide copyright-compliant, factual information about DC's most significant milestones.

## Features

### 🎨 Contemporary Design
- Dark mode interface with gradient accents
- Glassmorphism effects and smooth animations
- Mobile-first responsive design
- Accessible and keyboard-navigable

### 📱 Mobile-Friendly
- Fully responsive layout adapting from mobile to desktop
- Touch-optimized interactions
- Optimized performance for all devices

### 🔍 Interactive Features
- **Search**: Find events by year, title, or description
- **Filter**: View events by category (Publications, Characters, Media)
- **Detail View**: Click any event to see expanded information from Wikipedia
- **Real-time Data**: Fetches summaries and images directly from Wikipedia API

### 📚 Copyright Compliant
- All data sourced from Wikipedia under CC BY-SA 3.0
- No copyrighted DC Comics content stored locally
- Direct attribution to sources
- Uses public domain/fair use historical facts

## Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with custom properties, animations, and responsive design
- **Vanilla JavaScript**: No dependencies, pure ES6+ implementation
- **Wikipedia REST API**: Real-time data fetching from Wikipedia

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd DCtimeline
   ```

2. Open `index.html` in a web browser:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve

   # Or simply open the file
   open index.html
   ```

3. Navigate to `http://localhost:8000` (if using a local server)

### Deployment

This is a static site that can be deployed to any hosting platform:

- **GitHub Pages**: Push to `gh-pages` branch
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **Any static host**: Upload all files

## Project Structure

```
DCtimeline/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── app.js              # Application logic and Wikipedia API integration
├── timeline-data.js    # Curated timeline events with Wikipedia references
├── LICENSE             # Project license
└── README.md           # This file
```

## API Usage

This project uses the Wikipedia REST API:

```javascript
// Example API call
const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${articleTitle}`;
const response = await fetch(url);
const data = await response.json();
```

**API Endpoint**: `https://en.wikipedia.org/api/rest_v1/`

**Rate Limiting**: The API includes built-in caching to minimize requests.

## Data Sources

All timeline events reference specific Wikipedia articles:

- [DC Comics](https://en.wikipedia.org/wiki/DC_Comics)
- [Superman](https://en.wikipedia.org/wiki/Superman)
- [Batman](https://en.wikipedia.org/wiki/Batman)
- [Wonder Woman](https://en.wikipedia.org/wiki/Wonder_Woman)
- And many more...

## Contributing

To add new events to the timeline:

1. Edit `timeline-data.js`
2. Add a new event object with these properties:
   ```javascript
   {
       year: 2024,
       title: "Event Title",
       category: "publication|character|media",
       description: "Full description",
       wikipediaTitle: "Wikipedia_Article_Title",
       shortDescription: "Brief summary"
   }
   ```
3. Ensure the Wikipedia article exists and is relevant
4. Test the event loads correctly

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color scheme
- Semantic HTML structure
- Screen reader compatible

## License

This project is open source and available under the terms specified in the LICENSE file.

### Third-Party Attributions

- **Wikipedia Content**: Licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)
- **DC Comics**: All characters and properties are © DC Comics. This is a fan project for educational purposes.

## Future Enhancements

Potential features for future development:

- [ ] Timeline zoom controls
- [ ] Export timeline as image
- [ ] Social sharing functionality
- [ ] More detailed filtering options
- [ ] User-submitted events (with moderation)
- [ ] Integration with additional APIs
- [ ] Multilingual support

## Resources

- [Wikipedia REST API Documentation](https://www.mediawiki.org/wiki/API:REST_API)
- [DC Comics Wikipedia](https://en.wikipedia.org/wiki/DC_Comics)
- [MediaWiki API Reference](https://www.mediawiki.org/wiki/API:REST_API/Reference)

---

Made with passion for DC Comics history 🦸‍♂️🦸‍♀️
