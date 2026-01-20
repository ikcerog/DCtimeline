// DC Comics Timeline Events
// Data structure with Wikipedia article references for copyright-compliant sourcing

const timelineEvents = [
    {
        year: 1934,
        title: "Major Malcolm Wheeler-Nicholson founds National Allied Publications",
        category: "publication",
        description: "The company that would eventually become DC Comics is founded, marking the beginning of one of the most influential publishers in comic book history.",
        wikipediaTitle: "DC_Comics",
        shortDescription: "Foundation of the company that became DC Comics"
    },
    {
        year: 1938,
        title: "Superman debuts in Action Comics #1",
        category: "character",
        description: "Created by Jerry Siegel and Joe Shuster, Superman's first appearance revolutionizes the comic book industry and creates the superhero genre.",
        wikipediaTitle: "Superman",
        shortDescription: "The first appearance of Superman, launching the superhero genre"
    },
    {
        year: 1939,
        title: "Batman debuts in Detective Comics #27",
        category: "character",
        description: "Created by Bob Kane and Bill Finger, Batman becomes one of the most iconic characters in popular culture.",
        wikipediaTitle: "Batman",
        shortDescription: "Batman's first appearance in Detective Comics"
    },
    {
        year: 1940,
        title: "The Flash (Jay Garrick) debuts",
        category: "character",
        description: "The first Flash appears in Flash Comics #1, introducing the concept of super-speed to comics.",
        wikipediaTitle: "Flash_(Jay_Garrick)",
        shortDescription: "Introduction of the first Flash"
    },
    {
        year: 1940,
        title: "Green Lantern (Alan Scott) debuts",
        category: "character",
        description: "The original Green Lantern appears in All-American Comics #16, introducing the power ring concept.",
        wikipediaTitle: "Alan_Scott",
        shortDescription: "First Green Lantern character introduced"
    },
    {
        year: 1941,
        title: "Wonder Woman debuts in All Star Comics #8",
        category: "character",
        description: "Created by William Moulton Marston, Wonder Woman becomes the most prominent female superhero in comics.",
        wikipediaTitle: "Wonder_Woman",
        shortDescription: "Wonder Woman's first appearance"
    },
    {
        year: 1956,
        title: "The Silver Age begins with Showcase #4",
        category: "publication",
        description: "Barry Allen debuts as the new Flash, marking the beginning of the Silver Age of Comics and revival of superhero comics.",
        wikipediaTitle: "Flash_(Barry_Allen)",
        shortDescription: "Silver Age of Comics begins with new Flash"
    },
    {
        year: 1960,
        title: "Justice League of America debuts",
        category: "character",
        description: "The premier superhero team of DC Comics is formed in The Brave and the Bold #28, uniting the greatest heroes.",
        wikipediaTitle: "Justice_League",
        shortDescription: "Formation of the Justice League"
    },
    {
        year: 1970,
        title: "Green Lantern/Green Arrow series addresses social issues",
        category: "publication",
        description: "Dennis O'Neil and Neal Adams create groundbreaking stories tackling racism, drug abuse, and political corruption.",
        wikipediaTitle: "Green_Lantern/Green_Arrow",
        shortDescription: "Comics begin addressing real-world social issues"
    },
    {
        year: 1985,
        title: "Crisis on Infinite Earths published",
        category: "publication",
        description: "This landmark 12-issue series streamlines DC continuity and remains one of the most influential comic book events ever.",
        wikipediaTitle: "Crisis_on_Infinite_Earths",
        shortDescription: "Major crossover event reshaping DC Universe"
    },
    {
        year: 1986,
        title: "The Dark Knight Returns published",
        category: "publication",
        description: "Frank Miller's dark, mature take on Batman revolutionizes the character and influences all future adaptations.",
        wikipediaTitle: "The_Dark_Knight_Returns",
        shortDescription: "Frank Miller's groundbreaking Batman story"
    },
    {
        year: 1986,
        title: "Watchmen begins publication",
        category: "publication",
        description: "Alan Moore and Dave Gibbons create what many consider the greatest graphic novel ever, deconstructing superhero tropes.",
        wikipediaTitle: "Watchmen",
        shortDescription: "Alan Moore's deconstruction of superhero genre"
    },
    {
        year: 1989,
        title: "Batman film directed by Tim Burton released",
        category: "media",
        description: "Michael Keaton stars as Batman in this dark, gothic interpretation that proves superhero films can be serious cinema.",
        wikipediaTitle: "Batman_(1989_film)",
        shortDescription: "Tim Burton's Batman launches modern superhero films"
    },
    {
        year: 1992,
        title: "The Death of Superman storyline",
        category: "publication",
        description: "Superman dies fighting Doomsday in one of the best-selling comic book storylines, creating mainstream media attention.",
        wikipediaTitle: "The_Death_of_Superman",
        shortDescription: "Superman's death becomes cultural phenomenon"
    },
    {
        year: 1996,
        title: "Kingdom Come published",
        category: "publication",
        description: "Mark Waid and Alex Ross create a masterpiece exploring the future of DC heroes and generational conflict.",
        wikipediaTitle: "Kingdom_Come_(comics)",
        shortDescription: "Painted epic examining future of superheroes"
    },
    {
        year: 2005,
        title: "Batman Begins launches Dark Knight Trilogy",
        category: "media",
        description: "Christopher Nolan begins his critically acclaimed trilogy, redefining Batman for a new generation.",
        wikipediaTitle: "Batman_Begins",
        shortDescription: "Christopher Nolan's realistic Batman interpretation"
    },
    {
        year: 2008,
        title: "The Dark Knight released",
        category: "media",
        description: "Heath Ledger's Joker performance in Nolan's sequel becomes legendary, film grosses over $1 billion.",
        wikipediaTitle: "The_Dark_Knight",
        shortDescription: "Heath Ledger's iconic Joker performance"
    },
    {
        year: 2011,
        title: "The New 52 initiative launches",
        category: "publication",
        description: "DC reboots entire line with 52 #1 issues, modernizing characters for new readers in digital and print.",
        wikipediaTitle: "The_New_52",
        shortDescription: "Complete reboot of DC Comics continuity"
    },
    {
        year: 2013,
        title: "Man of Steel film released",
        category: "media",
        description: "Zack Snyder's Superman reboot launches the DC Extended Universe film franchise.",
        wikipediaTitle: "Man_of_Steel_(film)",
        shortDescription: "Launch of DC Extended Universe"
    },
    {
        year: 2016,
        title: "DC Rebirth initiative begins",
        category: "publication",
        description: "DC partially reverses New 52 changes, restoring legacy and history while keeping modernization.",
        wikipediaTitle: "DC_Rebirth",
        shortDescription: "Restoration of DC Comics legacy and continuity"
    },
    {
        year: 2017,
        title: "Wonder Woman film released",
        category: "media",
        description: "Gal Gadot stars in the first female-led superhero film of modern era, directed by Patty Jenkins.",
        wikipediaTitle: "Wonder_Woman_(2017_film)",
        shortDescription: "First modern female-led superhero blockbuster"
    },
    {
        year: 2019,
        title: "Joker film wins Golden Lion and grosses $1 billion",
        category: "media",
        description: "Joaquin Phoenix's portrayal earns critical acclaim and Oscar, proving comic book films can be high art.",
        wikipediaTitle: "Joker_(2019_film)",
        shortDescription: "Character study earns awards and cultural impact"
    },
    {
        year: 2021,
        title: "Zack Snyder's Justice League released",
        category: "media",
        description: "Fan campaign results in release of director's 4-hour vision, becoming cultural phenomenon on HBO Max.",
        wikipediaTitle: "Zack_Snyder's_Justice_League",
        shortDescription: "Director's cut released after fan campaign"
    },
    {
        year: 2022,
        title: "The Batman released",
        category: "media",
        description: "Matt Reeves directs Robert Pattinson in noir-influenced detective story, earning critical praise.",
        wikipediaTitle: "The_Batman_(film)",
        shortDescription: "Detective noir interpretation of Batman"
    },
    {
        year: 2023,
        title: "Blue Beetle film released",
        category: "media",
        description: "First Latino-led superhero film from DC, introducing Jaime Reyes to theatrical audiences.",
        wikipediaTitle: "Blue_Beetle_(film)",
        shortDescription: "First Latino-led DC superhero film"
    }
];

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = timelineEvents;
}
