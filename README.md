# ⚡ Glitches and Giggles: The Worst UI/UX Challenge

> **Presented by Google Developer Groups (GDG)**  
> *90 minutes. Zero design dignity. Infinite possibilities.*  
> 📅 **Date:** 2 November 2026 | 📍 **Venue:** Computer Centre, J.C. Bose UST, YMCA Faridabad  
> 🔗 **Registration Form:** [https://forms.gle/WNKL94UAcj32yx446](https://forms.gle/WNKL94UAcj32yx446)

---

## 🚀 How to Run the Website Locally

You have several easy ways to run the project on your machine:

### Option 1: Using Node.js (Recommended)
Open your terminal in this folder and run:
```bash
npm start
```
or directly:
```bash
node server.js
```
Then open your browser and go to:
👉 **`http://localhost:3000`**

---

### Option 2: Using Python
If you have Python installed:
```bash
python -m http.server 3000
```
Then visit:
👉 **`http://localhost:3000`**

---

### Option 3: Direct File Opening / VS Code Live Server
- **Double click:** Simply double-click `index.html` in your file explorer to open it in Chrome / Edge / Firefox.
- **VS Code:** Right-click `index.html` and click **"Open with Live Server"**.

---

## 📁 Project Structure

```
Glitch_gdg/
├── index.html           # Main semantic HTML structure, modals, FAQs & event info
├── style.css            # Dark cyber-glitch design system, CSS variables & animations
├── app.js               # Web Audio synth, 3D card tilt, countdown, modal logic & Chaos Lab
├── server.js            # Zero-dependency local Node.js development server
├── package.json         # NPM scripts (npm start, npm run dev)
├── assets/
│   └── images/
│       └── glitch_hero.jpg # High-res chromatic glitch banner
└── README.md            # Project run guide & documentation
```

---

## ✏️ How to Modify Event Details, Rules & FAQs

All text is organized in [index.html](index.html):

| Section | Location in `index.html` |
| :--- | :--- |
| **Event Brief & Judging Rubric** | Search `<div class="modal-backdrop" id="brief-modal">` (around line 380) |
| **Rules Timeline** | Search `<div class="rules-timeline">` (around line 240) |
| **FAQs Accordion** | Search `<div class="faq-accordion" id="faq-accordion">` (around line 460) |
| **Google Form Link** | Search `https://forms.gle/WNKL94UAcj32yx446` and replace if needed |
| **Venue & Date** | Search `2 NOV 2026` or `Computer Centre` |

> 💡 *Whenever you edit and save `index.html`, simply refresh your browser to see the changes immediately.*

---

## 🌐 How to Deploy (Free Hosting)

When you deploy, your site gets a public URL (e.g. `https://glitches-and-giggles.vercel.app`), and any future updates you push will automatically update on the same link!

### Option A: Vercel (Fastest & Simplest)
1. Install Vercel CLI (optional) or push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repo (or drag and drop the folder).
4. Click **Deploy**. Your site is live with a free SSL certificate!

### Option B: GitHub Pages
1. Push this folder to a GitHub repository (e.g. `your-username/glitches-and-giggles`).
2. In the repository, go to **Settings** > **Pages**.
3. Under **Build and deployment**, set the branch to `main` (or `master`) and folder to `/ (root)`.
4. Click **Save**. Your site will be live at:
   `https://<your-username>.github.io/glitches-and-giggles/`

### Option C: Netlify Drop (No Git Required)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `Glitch_gdg` folder into the upload box.
3. Your site is instantly live with a custom shareable link.

---

## 🎮 Key Features Included

- **Poster-Matched Hero Card**: 3D mouse tilt, scanlines, and neon lime glow.
- **Audio Synthesizer**: Native Web Audio API sounds for glitch clicks and success tones.
- **Interactive Chaos Lab**:
  - The Cowardly Button (flees from the cursor)
  - The Catastrophic Slider (erratic volume control)
  - Impossible Password Checker (Roman numerals, sweets, prime length)
  - Philosophical CAPTCHA
- **Chaos Mode Switch**: Navbar button that triggers hilarious bad UX popups and effects.
- **Accessible Modals & Accordions**: Instructions, judging rubric, and FAQs.
