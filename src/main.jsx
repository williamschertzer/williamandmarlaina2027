import React from 'react';
import ReactDOM from 'react-dom/client';
import { CalendarDays, Camera, Gift, Heart, Mail, MapPin, Waves } from 'lucide-react';
import './styles.css';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=85',
    alt: 'A waterfall framed by deep green forest',
    label: 'Waterfall weekend',
  },
  {
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    alt: 'A calm river running through a mountain valley',
    label: 'River light',
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85',
    alt: 'Sunlight filtering through a quiet forest',
    label: 'Forest walks',
  },
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85',
    alt: 'A natural landscape at golden hour',
    label: 'Golden hour',
  },
];

const navItems = ['Story', 'Photos', 'Registry', 'RSVP'];

function App() {
  return (
    <main className="min-h-screen bg-mist text-bark">
      <Hero />
      <Nav />
      <Story />
      <Details />
      <Photos />
      <Registry />
      <Rsvp />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1800&q=90"
        alt="Waterfall and forest landscape"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-moss/75" />
      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-between px-5 py-8 text-white sm:px-8 lg:px-10">
        <div className="flex items-center justify-between text-sm uppercase tracking-[0.22em]">
          <span>William & Marlaina</span>
          <span>2027</span>
        </div>
        <div className="max-w-3xl pb-10">
          <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-mist">
            <Waves size={18} />
            William Schertzer & Marlaina Horewitz
          </p>
          <h1 className="font-serif text-6xl leading-none sm:text-7xl lg:text-8xl">
            William & Marlaina
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl">
            A wedding celebration shaped by forest paths, river light, and the sound of waterfalls.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="button button-light" href="#rsvp">
              <Mail size={18} />
              RSVP
            </a>
            <a className="button button-ghost" href="#details">
              <CalendarDays size={18} />
              Details
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-20 border-b border-moss/15 bg-mist/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a className="font-serif text-2xl text-moss" href="#">
          W + M
        </a>
        <div className="flex gap-2 text-sm font-semibold text-bark/80">
          {navItems.map((item) => (
            <a
              className="rounded-full px-3 py-2 transition hover:bg-white hover:text-moss"
              href={`#${item.toLowerCase()}`}
              key={item}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-river">{eyebrow}</p>
      <h2 className="font-serif text-4xl text-moss sm:text-5xl">{title}</h2>
      {children && <p className="mt-5 text-lg leading-8 text-bark/75">{children}</p>}
    </div>
  );
}

function Story() {
  return (
    <section id="story" className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="overflow-hidden rounded-lg shadow-soft">
          <img
            className="h-full min-h-[420px] w-full object-cover"
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85"
            alt="Warm landscape light over trees and water"
          />
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-river">Our Story</p>
          <h2 className="font-serif text-4xl text-moss sm:text-5xl">
            Rooted in the quiet places.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-bark/78">
            <p>
              This site is ready for the story of how William and Marlaina met, the small moments
              that became traditions, and the places that made the relationship feel like home.
            </p>
            <p>
              The design uses earth tones, forest textures, and water imagery so the wedding feels
              connected to nature from the first page view.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Details() {
  return (
    <section id="details" className="bg-white px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Celebration" title="Wedding Details">
          Save-the-date information can live here once the venue, ceremony time, and weekend events
          are finalized.
        </SectionHeader>
        <div className="grid gap-5 md:grid-cols-3">
          <InfoCard icon={<CalendarDays />} title="Date">
            2027 wedding date to be announced.
          </InfoCard>
          <InfoCard icon={<MapPin />} title="Location">
            Venue and travel details coming soon.
          </InfoCard>
          <InfoCard icon={<Heart />} title="Weekend">
            Ceremony, reception, and welcome event schedule will be added here.
          </InfoCard>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, children }) {
  return (
    <article className="rounded-lg border border-moss/15 bg-mist p-6">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-river text-white">
        {React.cloneElement(icon, { size: 22 })}
      </div>
      <h3 className="font-serif text-2xl text-moss">{title}</h3>
      <p className="mt-3 leading-7 text-bark/75">{children}</p>
    </article>
  );
}

function Photos() {
  return (
    <section id="photos" className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Photos" title="Nature-Inspired Gallery">
          These placeholders give the page its waterfall and woodland atmosphere. Replace them with
          engagement or wedding-weekend photos when they are ready.
        </SectionHeader>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((image) => (
            <figure className="group overflow-hidden rounded-lg bg-white shadow-soft" key={image.src}>
              <img
                className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                src={image.src}
                alt={image.alt}
              />
              <figcaption className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-moss">
                <Camera size={16} />
                {image.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Registry() {
  return (
    <section id="registry" className="bg-[#f7f5ef] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl text-center">
        <SectionHeader eyebrow="Registry" title="Gifts & Registry">
          Your presence is the most important gift. Registry links can be added here when they are
          ready.
        </SectionHeader>
        <div className="grid gap-5 md:grid-cols-3">
          {['Zola', 'The Knot', 'Honeymoon Fund'].map((name) => (
            <a
              className="rounded-lg border border-clay/20 bg-white p-6 text-left shadow-soft transition hover:-translate-y-1 hover:border-river/50"
              href="#registry"
              key={name}
            >
              <Gift className="mb-5 text-clay" size={28} />
              <h3 className="font-serif text-2xl text-moss">{name}</h3>
              <p className="mt-3 leading-7 text-bark/70">Registry link coming soon.</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Rsvp() {
  return (
    <section id="rsvp" className="relative overflow-hidden bg-moss px-5 py-20 text-white sm:px-8 lg:px-10">
      <img
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85"
        alt="River valley"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-white/75">RSVP</p>
        <h2 className="font-serif text-4xl sm:text-5xl">Join Us By The Water</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/82">
          This section is ready for a hosted RSVP form, Google Form, Airtable form, or a custom
          backend later.
        </p>
        <form
          className="mt-9 grid gap-4 rounded-lg bg-white p-5 text-left text-bark shadow-soft sm:grid-cols-2"
          name="rsvp"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="rsvp" />
          <label className="hidden">
            Do not fill this out
            <input name="bot-field" />
          </label>
          <label className="field">
            Name
            <input name="name" type="text" placeholder="Guest name" required />
          </label>
          <label className="field">
            Email
            <input name="email" type="email" placeholder="guest@example.com" required />
          </label>
          <label className="field sm:col-span-2">
            Response
            <select name="response" defaultValue="" required>
              <option value="" disabled>
                Select your response
              </option>
              <option>Joyfully attending</option>
              <option>Regretfully declining</option>
            </select>
          </label>
          <label className="field sm:col-span-2">
            Note
            <textarea name="note" placeholder="Dietary notes or message" rows="4" />
          </label>
          <button className="button button-dark sm:col-span-2" type="submit">
            <Mail size={18} />
            Send RSVP
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-bark px-5 py-8 text-center text-sm text-white/70 sm:px-8 lg:px-10">
      <p>williamandmarlaina2027.com</p>
      <p className="mt-2 font-serif text-2xl text-white">William & Marlaina</p>
    </footer>
  );
}

export default App;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
