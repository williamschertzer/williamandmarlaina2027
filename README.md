# William & Marlaina 2027

React + Vite + Tailwind CSS wedding website for `williamandmarlaina2027.com`.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The production files are generated in `dist/`.

## Wedding Site Settings

The editable wedding details are grouped at the top of `src/main.jsx` in the `site` object.

- Replace `Date to be announced` with the wedding date.
- Replace `https://withjoy.com/` with the couple's exact WithJoy website URL. The Registry and
  RSVP buttons both use this value.
- Set `VITE_GUEST_PASSWORD` in Netlify to choose the guest password. For local development, create
  a `.env.local` file containing `VITE_GUEST_PASSWORD=your-password`.

The built-in password screen is intended to keep casual visitors away from private pages. Because
this is a static website, use Netlify site-level password protection if the information must be
secured at the server level.

Add the wedding logo at `public/logo.png`. The site will automatically use `/logo.png` in the
header, hero, and footer. Until that file exists, it falls back to a simple `W & M` monogram.

## Deployment Recommendation

Use Netlify for this wedding site. It is a simple static Vite site, and Netlify has especially convenient static-site deploys, custom domains, automatic HTTPS, and built-in form handling for the RSVP section.

Build settings:

- Build command: `npm run build`
- Publish directory: `dist`
- Domain: `williamandmarlaina2027.com`
