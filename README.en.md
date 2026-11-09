# TFP-Bundle

[Українською](README.md)

A feed of listings for beauty professionals, photographers, videographers, and local offers. It collects TFP shoots (time for print: work traded for photos), promotions, giveaways, and new arrivals: makeup, nails, hair, clothing, pet grooming, cafes, and crafts.

The cards in the feed are sample listings. Anyone can browse them without an account. Sign-in is required to save a listing, follow a professional, or book a service.

## Look at it

Open [https://tfp-bundle.vercel.app](https://tfp-bundle.vercel.app).

The home page has horizontal rows by offer type and a vertical feed. A card opens the professional's profile or the booking page. The TFP row on its own: [https://tfp-bundle.vercel.app/feed/tfp](https://tfp-bundle.vercel.app/feed/tfp).

## Run it locally

You need Node.js 20+ and npm.

```bash
npm install
```

Copy `.env.example` to `.env` and fill in the values. `.env` is not committed.

- `DATABASE_URL` and `DIRECT_URL` connect to the shared Supabase database. Ask the project owner for the lines that include the password, and do not commit them.
- `AUTH_SECRET` encrypts the session. Generate one with `npx auth secret`.
- `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` come from the Google Cloud OAuth client.
- `AUTH_URL` for a local run is `http://localhost:3000`.

In Google Cloud, on the Web application client, Authorized redirect URIs needs both addresses:

```text
http://localhost:3000/api/auth/callback/google
https://tfp-bundle.vercel.app/api/auth/callback/google
```

Start the app:

```bash
npm run dev
```

It opens at [http://localhost:3000](http://localhost:3000).

## Sign-in

An account is created on the first Google sign-in. The email-and-password form on the registration page does not save anything.

The Google app is not published yet: the Branding page blocks Publish app. While the status stays Testing, only addresses listed under Test users can sign in. The test address works on `localhost`. On the Vercel address, any other Gmail account is rejected by Google, even when the redirect URI is already added.

To allow someone now: Google Cloud, Audience, Test users, Add users. After the app is published, that list no longer limits sign-in.

## What is on the screen

- Feed: TFP, promotions, giveaways, and new arrivals, with photos and short video.
- Professional profile: services, a grid or a post feed, city, and niche.
- Booking with a calendar. A visit is pending, confirmed, or cancelled.
- User profile: follows, saved posts, and your bookings. This page is available only after sign-in.
