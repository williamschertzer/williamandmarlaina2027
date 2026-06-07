import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ExternalLink,
  Gift,
  LockKeyhole,
  MapPin,
  Menu,
  Utensils,
  X,
} from 'lucide-react';
import './styles.css';

const site = {
  date: 'November 14, 2027',
  location: 'Atlanta',
  fullLocation: 'Swan House at Atlanta History Center',
  locationCity: 'Atlanta, Georgia',
  registryUrl:
    'https://withjoy.com/william-schertzer-and-marlaina/registry?utm_medium=web&utm_source=joy&utm_campaign=share_website_dialog',
  rsvpUrl: 'https://withjoy.com/',
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

const faqs = [
  {
    question: 'When should I RSVP?',
    answer: 'The RSVP deadline will be shared with invited guests when invitations are sent.',
  },
  {
    question: 'Can I bring a guest?',
    answer:
      'Your WithJoy RSVP will display every person included in your invitation. Only the guests listed there are invited.',
  },
  {
    question: 'Are children invited?',
    answer:
      'Please refer to the names shown in your WithJoy party. We are only able to accommodate the guests included on each invitation.',
  },
  {
    question: 'What should I wear?',
    answer: 'Dress-code details will be added here when invitations are sent.',
  },
  {
    question: 'Where should I stay?',
    answer:
      'Hotel and transportation details will be available here once the room blocks are finalized.',
  },
];

const recommendations = [
  {
    type: 'Eat',
    name: 'Atlanta dining',
    description: 'Our favorite restaurants and coffee shops will be added here.',
  },
  {
    type: 'Explore',
    name: 'Things to do',
    description: 'A short list of museums, parks, and neighborhoods is coming soon.',
  },
  {
    type: 'Stay',
    name: 'Where to stay',
    description: 'Hotel blocks and suggested neighborhoods will be shared here.',
  },
];

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
      text: 'Ceremony time, attire, hotel information, transportation, and weekend schedule will be added here.',
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
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

function StoryPage() {
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
          This page is ready for the story of how you met, the moments that brought you together,
          and the road to Atlanta.
        </PageIntro>
      </div>
    </main>
  );
}

function FaqPage() {
  return (
    <main className="content-page narrow-page">
      <PageIntro eyebrow="Guest Information" title="Frequently Asked Questions">
        We’ll keep this page updated as the wedding gets closer.
      </PageIntro>
      <div className="faq-list">
        {faqs.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <ChevronDown aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </main>
  );
}

function RecommendationsPage() {
  return (
    <main className="content-page">
      <PageIntro eyebrow="Welcome to Atlanta" title="Local Recommendations">
        A few of our favorite places to help you make a weekend of it.
      </PageIntro>
      <div className="recommendations-grid">
        {recommendations.map((item, index) => (
          <article className="recommendation" key={item.type}>
            <span className="recommendation-number">0{index + 1}</span>
            {item.type === 'Eat' ? <Utensils /> : <MapPin />}
            <p className="eyebrow">{item.type}</p>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
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
