
````markdown
# Pomodoro for StudyWithMe (OBS Overlay)

A lightweight Pomodoro Timer overlay designed for **OBS Studio**, hosted via **GitHub Pages**.  
You can control timer behavior using **URL parameters** and display it as a browser source in your stream.

---

## 🌟 Features
- Configurable **Focus, Short Break, Long Break** durations.
- **Sessions logic**: (1 Focus + 1 Short Break = 1 session, repeat until Long Break).
- **AutoStart** option for continuous sessions until Long Break.
- **Customizable UI**:
  - Text message display
  - Font, color, and background
  - Shape (square or rectangle layout)
- **Optional chime sound** with volume control.
- **Lightweight**: pure HTML, CSS, JS. Hosted easily on GitHub Pages.

---

## 🚀 How to Use

1. Clone this repository:
   ```bash
   git clone https://github.com/<your-username>/pomodoro-studywithme.git
   cd pomodoro-studywithme
````

2. Push it to GitHub and enable **GitHub Pages**:

   * Go to **Settings → Pages**
   * Select branch: `main` (or `master`), folder: `/root`
   * Save → You’ll get a live link like:
     `https://<your-username>.github.io/pomodoro-studywithme/`

3. In OBS Studio:

   * Add a **Browser Source**
   * Enter your GitHub Pages link with parameters, e.g.:

     ```
     https://<your-username>.github.io/pomodoro-studywithme/?focus=25&sb=5&lb=15&sessions=4&autoStart=1&chime=1&volume=0.5&text=Welcome!&shape=rectangle&color=black&bgcolor=white&font=2
     ```

---

## ⚙️ URL Parameters

| Parameter   | Type             | Example   | Description                                    |
| ----------- | ---------------- | --------- | ---------------------------------------------- |
| `focus`     | number           | 25        | Focus duration (minutes)                       |
| `sb`        | number           | 5         | Short break duration (minutes)                 |
| `lb`        | number           | 15        | Long break duration (minutes)                  |
| `sessions`  | number           | 4         | Number of focus sessions before long break     |
| `autoStart` | 0/1              | 1         | Auto-start next timer (1=yes, 0=no)            |
| `chime`     | 0/1              | 1         | Play chime sound when timer ends               |
| `volume`    | float            | 0.5       | Chime volume (0.0 → 1.0)                       |
| `text`      | string           | "Hi!"     | Display text (max \~50 chars)                  |
| `shape`     | square/rectangle | rectangle | Widget layout                                  |
| `color`     | string           | aqua      | Clock font color (16 basic HTML colors)        |
| `bgcolor`   | string           | navy      | Widget background color (16 basic HTML colors) |
| `font`      | number (1–9)     | 2         | Selects one of 9 web-safe fonts                |

---

## 🎨 Fonts Reference (for `font` param)

1. Arial
2. Verdana
3. Trebuchet MS
4. Georgia
5. Times New Roman
6. Courier New
7. Lucida Console
8. Tahoma
9. Impact

---

## 🔄 Auto-Update on GitHub Pages

Every time you push code to GitHub, GitHub Pages auto-builds and publishes it.
Here’s a simple workflow:

### Option 1: Manual Push

```bash
git add .
git commit -m "Update timer logic"
git push origin main
```

→ GitHub Pages updates automatically within 1-2 minutes.

### Option 2: GitHub Actions (Auto Deploy on Push)

1. Create `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: ["main"]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v3
         - name: Setup Pages
           uses: actions/configure-pages@v3
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v2
           with:
             path: '.'
         - name: Deploy to GitHub Pages
           uses: actions/deploy-pages@v2
   ```
2. Commit & push → Deployment will be automatic.

---

## 📸 Example OBS Setup

1. Browser Source → Width: `600`, Height: `200` (rectangle mode).
2. URL with parameters:

   ```
   https://<your-username>.github.io/pomodoro-studywithme/?focus=25&sb=5&lb=15&sessions=4&autoStart=1&chime=1&text=Let's Focus!&shape=rectangle&color=lime&bgcolor=black&font=3
   ```
3. Resize/position in your scene. Done ✅

---

## 📜 License

MIT License. Free to use & modify.

```

---

Do you also want me to generate the `.github/workflows/deploy.yml` file for auto-update so you don’t need to write it manually?
```
