import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coffee,
  ExternalLink,
  Gift,
  Hotel,
  Landmark,
  LockKeyhole,
  MapPin,
  Menu,
  Trees,
  Utensils,
  X,
} from 'lucide-react';
import './styles.css';
import { adventures } from './story';

const site = {
  date: 'November 14, 2027',
  location: 'Atlanta',
  fullLocation: 'Swan House at Atlanta History Center',
  locationCity: 'Atlanta, Georgia',
  registryUrl:
    'https://withjoy.com/william-schertzer-and-marlaina/registry?utm_medium=web&utm_source=joy&utm_campaign=share_website_dialog',
  rsvpUrl: 'https://withjoy.com/william-schertzer-and-marlaina/rsvp?utm_medium=web&utm_source=joy&utm_campaign=share_website_dialog',
  guestPassword: import.meta.env.VITE_GUEST_PASSWORD || 'celebrate',
};

const pages = [
  { path: '/', label: 'Home' },
  { path: '/details', label: 'Details', protected: true },
  { path: '/story', label: 'Our Story' },
  { path: '/faq', label: 'FAQs' },
  { path: '/recommendations', label: 'Atlanta' },
  { path: '/registry', label: 'Registry' },
  { path: '/rsvp', label: 'RSVP' },
];

const diningRecommendations = [
  { label: 'Will’s favorite', name: 'Nam Phuong', query: 'Nam Phuong Restaurant Atlanta GA' },
  { label: 'Marlie’s favorite', name: 'Barcelona Wine Bar', query: 'Barcelona Wine Bar Atlanta GA' },
  { label: 'Our favorite brunch', name: 'The Daily Chew', query: 'The Daily Chew Atlanta GA' },
  { label: 'Classic crowd-pleaser', name: 'Ponce City Market', query: 'Ponce City Market Atlanta GA' },
  { label: 'Barbecue', name: 'Fat Matt’s Rib Shack', query: "Fat Matt's Rib Shack Atlanta GA" },
  { label: 'Close to the hotel', name: 'Coming soon', muted: true },
];

const coffeeRecommendations = [
  {
    label: 'Atlanta History Center',
    name: 'BRASH Coffee',
    description: 'Locally roasted coffee right inside our wedding venue—no museum admission required.',
    query: 'BRASH Coffee Atlanta History Center Atlanta GA',
  },
  {
    label: 'Midtown · Piedmont Park',
    name: 'Stroll Coffee',
    description: 'An Airstream coffee stop beside Piedmont Park and the Atlanta BeltLine.',
    query: 'Stroll Coffee Piedmont Park Atlanta GA',
  },
];

const atlantaActivities = [
  {
    name: 'Atlanta History Center',
    description:
      'This is where we’re getting married! Explore 33 acres of beautiful gardens, historic houses, exhibitions, and Atlanta stories—including the Swan House before the celebration begins.',
    url: 'https://www.atlantahistorycenter.com/',
  },
  {
    name: 'Downtown Atlanta',
    description: 'Make a day of the Georgia Aquarium and World of Coca-Cola, two Atlanta favorites located next door to one another.',
    links: [
      { label: 'Georgia Aquarium', url: 'https://www.georgiaaquarium.org/' },
      { label: 'World of Coca-Cola', url: 'https://www.worldofcoca-cola.com/' },
    ],
  },
  {
    name: 'Piedmont Park & Atlanta Botanical Garden',
    description: 'A beautiful pair of Midtown destinations—and the place where we got engaged!',
    url: 'https://atlantabg.org/',
  },
  {
    name: 'Bamboo Forest at East Palisades',
    description: 'An easy, scenic hike along the Chattahoochee River, close to the hotel area.',
    mapQuery: 'East Palisades Trail Bamboo Forest Atlanta GA',
  },
  {
    name: 'Stone Mountain Park',
    description: 'Hike, explore the park, and take in a sweeping view of Atlanta from the summit.',
    url: 'https://www.stonemountainpark.com/',
  },
  {
    name: 'Martin Luther King, Jr. National Historical Park',
    description: 'Visit Dr. King’s birth home neighborhood, historic Ebenezer Baptist Church, and the King Center.',
    url: 'https://www.nps.gov/malu/index.htm',
  },
  {
    name: 'Atlanta Beltline',
    description: 'Walk or bike the trail for public art, parks, restaurants, shops, and some of the best people-watching in the city.',
    url: 'https://beltline.org/visitor-information/',
  },
];

const mapSearchUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [unlocked, setUnlocked] = useState(
    window.sessionStorage.getItem('wedding-site-unlocked') === 'true',
  );

  useEffect(() => {
    const handleLocation = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  const currentPage = pages.find((page) => page.path === path) || pages[0];
  const isProtected = currentPage.protected;

  return (
    <div className="site-shell">
      <Header path={currentPage.path} />
      {isProtected && !unlocked ? (
        <PasswordGate
          onUnlock={() => {
            window.sessionStorage.setItem('wedding-site-unlocked', 'true');
            setUnlocked(true);
          }}
        />
      ) : (
        <Page path={currentPage.path} />
      )}
      <Footer />
    </div>
  );
}

function Link({ to, className = '', children, onClick }) {
  return (
    <a
      className={className}
      href={to}
      onClick={(event) => {
        event.preventDefault();
        navigate(to);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}

function Mark({ light = false }) {
  const [logoReady, setLogoReady] = useState(true);

  return (
    <span className={`mark ${light ? 'mark-light' : ''}`} aria-label="William and Marlaina">
      {logoReady && (
        <img
          src="/logo.png"
          alt=""
          onError={() => setLogoReady(false)}
        />
      )}
      {!logoReady && (
        <>
          <span>W</span>
          <i>&amp;</i>
          <span>M</span>
        </>
      )}
    </span>
  );
}

function Header({ path }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-link" to="/" onClick={() => setMenuOpen(false)}>
          <Mark />
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={`primary-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {pages.map((page) => (
            <Link
              className={path === page.path ? 'active' : ''}
              to={page.path}
              key={page.path}
              onClick={() => setMenuOpen(false)}
            >
              {page.label}
              {page.protected && <LockKeyhole size={12} aria-label="Password protected" />}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Page({ path }) {
  if (path === '/details') return <DetailsPage />;
  if (path === '/story') return <StoryPage />;
  if (path === '/faq') return <FaqPage />;
  if (path === '/recommendations') return <RecommendationsPage />;
  if (path === '/registry') return <RegistryPage />;
  if (path === '/rsvp') return <RsvpPage />;
  return <HomePage />;
}

function HomePage() {
  return (
    <main className="home-page">
      <img
        className="hero-image"
        src="/iceland.png"
        alt="William and Marlaina together in front of a waterfall in Iceland"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-mark">
          <Mark light />
        </div>
        <div className="hero-copy">
          <h1>William <span>&amp;</span> Marlaina</h1>
        </div>
        <div className="hero-details" aria-label="Wedding details">
          <div>
            <CalendarDays aria-hidden="true" />
            <span>{site.date}</span>
          </div>
          <div>
            <MapPin aria-hidden="true" />
            <span>{site.location}</span>
          </div>
          <Link className="text-link light-link" to="/rsvp">
            Guest RSVP <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </main>
  );
}

function PageIntro({ eyebrow, title, children }) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children && <p className="intro-copy">{children}</p>}
    </div>
  );
}

function DetailsPage() {
  const detailItems = [
    {
      icon: <CalendarDays aria-hidden="true" />,
      title: 'Date',
      text: site.date,
    },
    {
      icon: <MapPin aria-hidden="true" />,
      title: 'Location',
      text: `${site.fullLocation}, ${site.locationCity}`,
    },
    {
      icon: <LockKeyhole aria-hidden="true" />,
      title: 'More Details',
      text: 'Attire — Formal',
      description: <p>More questions? <Link className="text-link" to="/faq">Check out our FAQ</Link>.</p>,
    },
  ];

  return (
    <main className="content-page">
      <PageIntro eyebrow="Wedding Details" title={site.fullLocation}>
        We will celebrate on {site.date} in {site.locationCity}. More guest information will be
        added here as plans are finalized.
      </PageIntro>
      <div className="details-list">
        {detailItems.map((item) => (
          <article className="detail-item" key={item.title}>
            <div className="detail-icon">{item.icon}</div>
            <div>
              <p className="eyebrow">{item.title}</p>
              <h2>{item.text}</h2>
              {item.description}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

function StoryPage() {
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(adventures[0].id);
  const filteredAdventures = useMemo(() => filter === 'all'
    ? adventures
    : adventures.filter((adventure) => adventure.type === filter), [filter]);
  const selectedAdventure = filteredAdventures.find((adventure) => adventure.id === selectedId)
    || filteredAdventures[0];

  function chooseFilter(nextFilter) {
    setFilter(nextFilter);
    const firstMatch = nextFilter === 'all'
      ? adventures[0]
      : adventures.find((adventure) => adventure.type === nextFilter);
    setSelectedId(firstMatch.id);
  }

  return (
    <main className="content-page story-page">
      <div className="content-grid">
        <div className="portrait-frame">
          <img
            src="/w_m.png"
            alt="William and Marlaina"
          />
        </div>
        <PageIntro eyebrow="William & Marlaina" title="Our Story">
          We have built our life together one adventure at a time—from trails close to home to
          waterfalls across the ocean. Explore a few of the places that have become part of our story.
        </PageIntro>
      </div>

      <section className="adventure-section" aria-labelledby="adventure-title">
        <div className="adventure-heading">
          <div>
            <p className="eyebrow">Our adventures</p>
            <h2 id="adventure-title">Places we’ve wandered</h2>
          </div>
          <div className="map-filters" aria-label="Filter adventures">
            {[
              ['all', 'All places'],
              ['visit', 'Trips'],
              ['hike', 'Hikes'],
              ['milestone', 'Milestones'],
            ].map(([value, label]) => (
              <button
                className={filter === value ? 'active' : ''}
                type="button"
                onClick={() => chooseFilter(value)}
                aria-pressed={filter === value}
                key={value}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="adventure-explorer">
          <AdventureMap
            adventures={filteredAdventures}
            selectedId={selectedAdventure.id}
            onSelect={setSelectedId}
          />
          <AdventureCard adventure={selectedAdventure} key={selectedAdventure.id} />
        </div>

        <div className="adventure-list" aria-label="Choose a place">
          {filteredAdventures.map((adventure, index) => (
            <button
              className={adventure.id === selectedAdventure.id ? 'active' : ''}
              type="button"
              onClick={() => setSelectedId(adventure.id)}
              aria-pressed={adventure.id === selectedAdventure.id}
              key={adventure.id}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{adventure.place}</strong>
              <small>{adventure.region}</small>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

function AdventureCard({ adventure }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photo = adventure.photos[photoIndex];

  return (
    <article className="adventure-card" aria-label={adventure.place}>
      {photo && (
        <div className="adventure-gallery">
          <div className="adventure-photo-wrap">
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </div>
          {adventure.photos.length > 1 && (
            <div className="adventure-photo-controls">
              <button type="button" aria-label="Previous photo" onClick={() => setPhotoIndex((index) => (index - 1 + adventure.photos.length) % adventure.photos.length)}>
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <span aria-live="polite">Photo {photoIndex + 1} of {adventure.photos.length}</span>
              <button type="button" aria-label="Next photo" onClick={() => setPhotoIndex((index) => (index + 1) % adventure.photos.length)}>
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}
      <div className="adventure-card-copy" aria-live="polite">
        <p className="eyebrow">{adventure.region}</p>
        <h3>{adventure.place}</h3>
        {adventure.address && <p>{adventure.address}</p>}
        <p>{adventure.description}</p>
      </div>
    </article>
  );
}

function AdventureMap({ adventures: visibleAdventures, selectedId, onSelect }) {
  const mapElement = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    const map = L.map(mapElement.current, {
      center: [32, -28],
      zoom: 2,
      minZoom: 2,
      maxZoom: 16,
      worldCopyJump: true,
      scrollWheelZoom: false,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);
    mapInstance.current = map;
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(mapElement.current);
    return () => {
      observer.disconnect();
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // Only rebuild markers and fit the view when the category changes.
  useEffect(() => {
    const map = mapInstance.current;
    const layer = L.layerGroup().addTo(map);
    const coordinates = [];
    markers.current = [];
    visibleAdventures.forEach((adventure) => {
      if (!adventure.coordinates) return;
      [adventure.coordinates, ...(adventure.additionalCoordinates || [])].forEach((point) => {
        coordinates.push(point);
        const marker = L.marker(point, {
          icon: L.divIcon({
            className: 'adventure-marker-shell',
            html: '<span class="adventure-marker"></span>',
            iconSize: [34, 34],
            iconAnchor: [17, 17],
          }),
          title: adventure.place,
          alt: adventure.place,
          keyboard: true,
        }).addTo(layer);
        marker.on('click', () => onSelect(adventure.id));
        markers.current.push({ id: adventure.id, marker });
      });
    });
    if (coordinates.length) {
      map.fitBounds(L.latLngBounds(coordinates), { padding: [45, 45], maxZoom: 11 });
    }
    return () => { layer.remove(); };
  }, [visibleAdventures, onSelect]);

  // Highlight the chosen place without discarding the visitor’s zoom level.
  useEffect(() => {
    markers.current.forEach(({ id, marker }) => {
      marker.getElement()?.querySelector('.adventure-marker')?.classList.toggle('is-selected', id === selectedId);
      marker.setZIndexOffset(id === selectedId ? 1000 : 0);
    });
    const selected = visibleAdventures.find((adventure) => adventure.id === selectedId);
    if (selected?.coordinates) mapInstance.current.panInside(selected.coordinates, { padding: [45, 45] });
  }, [selectedId, visibleAdventures]);

  return <div className="adventure-map" ref={mapElement} aria-label="Interactive map of places William and Marlaina have visited" />;
}

function FaqPage() {
  const faqItems = [
    {
      question: 'What do Will and Marlaina want you to know?',
      answer: (
        <>
          <p>We are so incredibly happy to be celebrating this milestone with you! We are both very sentimental people and we hope that you will see big emotions reflected in our day.</p>
          <p>We expect you to dance! Dancing is an important part of our relationship, and we would love to celebrate with you on the dance floor.</p>
          <p>
            This will be an Orthodox Jewish wedding with lots of symbolism and unique traditions. You can{' '}
            <a href="https://www.chabad.org/library/article_cdo/aid/476757/jewish/Jewish-Wedding-Ceremony-Traditions.htm" target="_blank" rel="noreferrer">
              learn more about Jewish wedding traditions <ExternalLink size={14} />
            </a>.
            {' '}Most importantly, please come prepared to Hora!
          </p>
        </>
      ),
    },
    {
      question: 'What is the Hora?',
      answer: (
        <p>
          The Hora is a joyful group dance—and you’re invited to join in.{' '}
          <a href="https://www.youtube.com/watch?v=DN6A3uBLhKQ" target="_blank" rel="noreferrer">
            Watch the Hora in action <ExternalLink size={14} />
          </a>.
        </p>
      ),
    },
    {
      question: 'What celebrations begin at 4:30 p.m.?',
      answer: (
        <div className="faq-rich-answer">
          <p>The Tisch and Bedeken begin at 4:30 p.m., before the wedding ceremony.</p>
          <p>
            The <strong>tisch</strong> and <strong>bedeken</strong> are two vibrant pre-wedding customs in Jewish tradition, especially common in Ashkenazi communities, that take place just before the wedding ceremony.
          </p>
          <p className="faq-note"><strong>Please note:</strong> these events will be gender separated. All are welcome, but please feel no pressure to participate.</p>
          <h3>Tisch · Men</h3>
          <p>During the tisch, William will gather with guests to sing, celebrate, and sign the ketubah, our Jewish wedding contract, alongside our rabbis and witnesses.</p>
          <h3>Bedeken · Women</h3>
          <p>The bedeken centers on the veiling ceremony, when the groom confirms the identity of his bride and then places a veil over her. Before this takes place, the bride traditionally receives guests and offers blessings.</p>
          <p>On her wedding day, the bride is considered closer to G-d than on any other day. Marlaina will sit on a throne, surrounded by her mom and future mother-in-law, and will be delighted to greet you and offer blessings.</p>
        </div>
      ),
    },
    {
      question: 'Where should I stay?',
      answer: <p>Visit our <Link to="/recommendations">Atlanta page</Link> for hotel information and local recommendations.</p>,
    },
    {
      question: 'What should I wear?',
      answer: (
        <>
          <p><strong>Put on your fancy pants and celebrate with us! Formal attire, please.</strong></p>
          <p>Formal attire is expected. Think floor-length dresses and dark-colored suits with ties. Weather permitting, the ceremony will be outdoors on grass, so please keep that in mind when choosing shoes and sleeves.</p>
        </>
      ),
    },
    {
      question: 'Can I bring my children or significant other?',
      answer: <p>While we would love to include everybody on our special day, our guest list is limited by the venue’s capacity. Your invitation and RSVP page list the invited members of your party.</p>,
    },
    {
      question: 'What food will be served?',
      answer: <p>We will provide a kosher dairy meal, hors d’oeuvres, and a full open bar. Come hungry and ready to party!</p>,
    },
    {
      question: 'Where is the venue?',
      answer: <p>The Swan House at Atlanta History Center in Buckhead. Admission to the Atlanta History Center is free for all wedding guests for the entire weekend—including during cocktail hour—so leave time to enjoy the beautiful gardens and museum.</p>,
    },
    {
      question: 'How will I get to the venue?',
      answer: (
        <>
          <p>Final transportation details are still to come.</p>
          <p>The venue is about a 30-minute walk from our hotel block, so we recommend driving or using a rideshare service. Free parking is available on-site.</p>
        </>
      ),
    },
    {
      question: 'What if I have more questions?',
      answer: <p>Email us at <a href="mailto:williamandmarlaina2027@gmail.com">williamandmarlaina2027@gmail.com</a>.</p>,
    },
  ];

  return (
    <main className="content-page narrow-page">
      <PageIntro eyebrow="Guest Information" title="Frequently Asked Questions">
        We’ll keep this page updated as the wedding gets closer.
      </PageIntro>
      <div className="faq-list">
        {faqItems.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <ChevronDown aria-hidden="true" />
            </summary>
            <div className="faq-answer">{item.answer}</div>
          </details>
        ))}
      </div>
    </main>
  );
}

function RecommendationsPage() {
  return (
    <main className="content-page atlanta-page">
      <PageIntro eyebrow="Welcome to Atlanta" title="Local Recommendations">
        We love this city. Here are our favorite places to eat, explore, and make a wedding weekend of it.
      </PageIntro>

      <section className="atlanta-section stay-section">
        <div className="section-heading">
          <Hotel aria-hidden="true" />
          <div><p className="eyebrow">01 · Rest easy</p><h2>Where to stay</h2></div>
        </div>
        <div className="coming-soon-panel">
          <p className="eyebrow">Hotel block</p>
          <h3>Details are coming soon</h3>
          <p>We’ll share our hotel block and booking information here as soon as it is finalized.</p>
        </div>
      </section>

      <section className="atlanta-section">
        <div className="section-heading">
          <Utensils aria-hidden="true" />
          <div><p className="eyebrow">02 · Come hungry</p><h2>What to eat</h2></div>
        </div>
        <div className="dining-grid">
          {diningRecommendations.map((item) => (
            <article className={`dining-card ${item.muted ? 'is-muted' : ''}`} key={item.label}>
              <Coffee aria-hidden="true" />
              <p className="eyebrow">{item.label}</p>
              <h3>{item.name}</h3>
              {!item.muted && (
                <a href={mapSearchUrl(item.query)} target="_blank" rel="noreferrer">
                  View on map <ExternalLink size={14} />
                </a>
              )}
            </article>
          ))}
        </div>

        <div className="coffee-heading">
          <Coffee aria-hidden="true" />
          <div>
            <p className="eyebrow">Coffee break</p>
            <h3>Where to get coffee</h3>
          </div>
        </div>
        <div className="coffee-grid">
          {coffeeRecommendations.map((item) => (
            <article className="coffee-card" key={item.name}>
              <div>
                <p className="eyebrow">{item.label}</p>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <a href={mapSearchUrl(item.query)} target="_blank" rel="noreferrer">
                View on map <ExternalLink size={14} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="atlanta-section">
        <div className="section-heading">
          <Trees aria-hidden="true" />
          <div><p className="eyebrow">03 · See the city</p><h2>What to do</h2></div>
        </div>
        <div className="activity-list">
          {atlantaActivities.map((item, index) => (
            <article className="activity-card" key={item.name}>
              <span className="activity-number">{String(index + 1).padStart(2, '0')}</span>
              <Landmark aria-hidden="true" />
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                {item.links ? item.links.map((link) => (
                  <a href={link.url} target="_blank" rel="noreferrer" key={link.label}>{link.label} <ExternalLink size={14} /></a>
                )) : (
                  <a href={item.url || mapSearchUrl(item.mapQuery)} target="_blank" rel="noreferrer">
                    Plan your visit <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function RegistryPage() {
  return (
    <main className="centered-page">
      <div className="centered-content">
        <Gift className="page-icon" aria-hidden="true" />
        <PageIntro eyebrow="Registry" title="Gifts & Registry">
          Your presence is the most important gift.
        </PageIntro>
        <a className="primary-button" href={site.registryUrl} target="_blank" rel="noreferrer">
          View our registry on WithJoy <ExternalLink size={17} />
        </a>
      </div>
    </main>
  );
}

function RsvpPage() {
  return (
    <main className="centered-page rsvp-page">
      <div className="centered-content">
        <LockKeyhole className="page-icon" aria-hidden="true" />
        <PageIntro eyebrow="Kindly Reply" title="RSVP">
          Enter your name on WithJoy to find your invitation and RSVP for each member of your
          party.
        </PageIntro>
        <a className="primary-button" href={site.rsvpUrl} target="_blank" rel="noreferrer">
          Find my invitation <ExternalLink size={17} />
        </a>
      </div>
    </main>
  );
}

function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    if (password === site.guestPassword) {
      setError('');
      onUnlock();
      return;
    }
    setError('That password does not match. Please check your invitation and try again.');
  }

  return (
    <main className="password-page">
      <div className="password-panel">
        <LockKeyhole className="page-icon" aria-hidden="true" />
        <p className="eyebrow">For Invited Guests</p>
        <h1>Enter the wedding password</h1>
        <p>Wedding details are private. The password will be included with your invitation.</p>
        <form onSubmit={submit}>
          <label htmlFor="guest-password">Password</label>
          <div className="password-row">
            <input
              id="guest-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
            <button type="submit" aria-label="Submit password">
              <ArrowRight />
            </button>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
        </form>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <Mark light />
      <p>William &amp; Marlaina · {site.date} · {site.locationCity}</p>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
