# Lift log

Your 4-day training log. It remembers every session and tells you when to go up in weight.

## 1. Put it online (free, about 5 minutes)

Easiest on a computer.

1. Unzip `lift-log.zip`. You get 8 files.
2. Sign in or sign up at [github.com](https://github.com).
3. Create a repository: **+** (top right) → **New repository**.
   - Name: `lift-log`
   - Set it to **Public** (needed for free hosting; only the app's code is public, your workouts stay on your phone)
   - Tick **Add a README file**
   - **Create repository**
4. Upload the app: **Add file** → **Upload files** → drag in all 8 files (the files themselves, not the folder) → **Commit changes**.
5. Turn on hosting: **Settings** → **Pages**.
   - Source: **Deploy from a branch**
   - Branch: **main**, folder **/ (root)** → **Save**
6. Wait a minute or two and refresh. Your link appears at the top:
   `https://YOUR-USERNAME.github.io/lift-log/`

## 2. Add it to your phone

**iPhone**
1. Open your link in **Safari**.
2. Tap **Share** → **Add to Home Screen** → **Add**.
3. Always open it from the new icon.
   - iPhone keeps home-screen apps separate from Safari tabs, so log from the icon.
   - Using the icon also stops your data being cleared automatically.

**Android**
1. Open your link in **Chrome**.
2. Menu → **Install app** (or **Add to Home screen**).

Once installed, it works with no signal.

## 3. Keep your log safe

- Your log is stored on your phone, inside the app.
- Every few weeks: **Settings** → **Save backup** → save to Files or iCloud Drive.
- New phone: install the app, then **Settings** → **Restore from backup**.
- Deleting the app from your home screen deletes its log, so back up first.

## Changing the app later

1. Upload the new files to the same repository. They replace the old ones.
2. In `sw.js`, change `liftlog-v1` to `liftlog-v2` (then `v3`, and so on) each time.
3. Open the app twice while online. The first time downloads the update, the second shows it.
