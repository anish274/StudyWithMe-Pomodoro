# Pomodoro for StudyWithMe

A lightweight **Pomodoro Timer** designed for OBS Studio livestream overlays.  
This tool runs entirely on **GitHub Pages** (static hosting). No server required.

---

## ✨ Features
- Standard Pomodoro cycle: **Focus → Short Break → Long Break**
- On-screen buttons: ▶️ Play/Pause, 🔄 Reset, 🔔 Toggle Chime
- Transparent background with black text + shadow (works on any stream background)
- Keyboard shortcuts:
  - **Space** → Play/Pause
  - **R** → Reset
  - **M** → Mute/Unmute chime
- Configurable via URL parameters
- Built-in chime (WebAudio, no external file)

---

## 🚀 Setup

1. Fork or clone this repo.
2. Push to your GitHub account.
3. Enable **GitHub Pages** in repository settings:
   - Source: `main` (or `master`) branch
   - Folder: `/ (root)`
4. Your Pomodoro will be available at:  
   `https://<your-username>.github.io/<repo-name>/`

---

## 🔗 Usage in OBS

1. Open **OBS Studio**.
2. Add **Browser Source** → paste your GitHub Pages link.
3. Set desired size (e.g., 400×200).
4. Enable **“Control with Interact”** to use keyboard inside OBS.

---

## ⚙️ URL Parameters

You can customize durations and behavior with query parameters:

| Parameter     | Type    | Example          | Description                                |
|---------------|---------|------------------|--------------------------------------------|
| `focus`       | number  | `focus=30`       | Focus duration (minutes)                   |
| `shortBreak`  | number  | `shortBreak=5`   | Short break duration (minutes)             |
| `longBreak`   | number  | `longBreak=15`   | Long break duration (minutes)              |
| `autoStart`   | 0/1     | `autoStart=1`    | Auto-start next session                    |
| `chime`       | 0/1     | `chime=1`        | Enable/disable chime                       |
| `volume`      | float   | `volume=0.5`     | Chime volume (0.0 → 1.0)                   |

**Example:**  

https://yourusername.github.io/pomodoro/?focus=50&shortBreak=10&longBreak=30&autoStart=1&chime=1&volume=0.3


---

## 🛠️ Project Structure
/
├── index.html
├── css/
│ └── style.css
├── js/
│ └── app.js
└── README.md


---

## 🔮 Roadmap
- OBS hotkey integration (via `obs-websocket`)
- More visual themes
- Sound selection for chime

---

## 📜 License
MIT License © 2025

