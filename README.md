# Feel Better 💜

A web app designed to help people—especially young adults and teens—find meaning, build goals, and develop meaningful habits.

**Live at:** `http://localhost:5174/` (development)

---

## 🎯 Purpose

Feel Better addresses a real struggle many young people face: **feeling empty, directionless, and meaningless.** This app provides:

- **Goal setting** to articulate what matters to you
- **Daily guided exercises** for reflection, mindfulness, action, and connection
- **Progress tracking** with streaks, milestones, and visual encouragement
- **Warm, non-judgmental design** that emphasizes small wins

---

## ✨ Features

### 🎯 Goals & Dreams
- Create goals with inspiring prompts
- Track progress visually (0-100%)
- Keep your dreams visible and actionable

### 🌟 Daily Exercises
- **20 guided exercises** across 4 categories:
  - 📝 **Reflection** (journaling, gratitude, self-awareness)
  - 🧘 **Mindfulness** (breathing, meditation, grounding)
  - 🚶 **Action** (movement, creativity, learning)
  - 💬 **Connection** (reaching out, helping, listening)
- Exercise of the Day (rotates daily)
- Journal responses & mark exercises complete
- Automatic encouragement messages

### 📊 Progress Dashboard
- **Streak tracking** (consecutive days of engagement)
- **Activity chart** (last 7 days)
- **Milestone achievements** (badges for reaching goals)
- **Goal progress breakdown**
- **Personalized encouragement** based on your journey

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/feelbetter.git
cd feelbetter

# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npm run dev
```

The app will open at `http://localhost:5174/`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 💾 Data Storage

- **All data persists in browser localStorage**
- No backend server needed—data stays on your device
- Clear browser cache to reset (or use DevTools → Applications → Local Storage)

---

## 🛠️ Tech Stack

- **React 18** — UI framework
- **Vite** — Lightning-fast build tool
- **CSS3** — Custom styles (accessibility-first)
- **localStorage API** — Client-side persistence

---

## 📁 Project Structure

```
feelbetter/
├── src/
│   ├── components/
│   │   ├── App.jsx              # Main app with routing
│   │   ├── GoalBuilder.jsx      # Goal creation & management
│   │   ├── ExerciseHub.jsx      # Exercise library & tracking
│   │   └── ProgressDashboard.jsx # Stats & milestones
│   ├── styles/
│   │   ├── App.css
│   │   ├── GoalBuilder.css
│   │   ├── ExerciseHub.css
│   │   └── ProgressDashboard.css
│   ├── hooks/
│   │   └── useLocalStorage.js   # Persistence hook
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                # Global styles
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

---

## 🎨 Design Philosophy

- **Warm, accessible colors** (browns, tans, peachy tones)
- **Large, readable fonts** (WCAG AA compliant)
- **Keyboard navigation** throughout
- **Mobile-first responsive design**
- **Dark mode support** (respects system preferences)
- **Encouraging tone** — celebrates small wins, emphasizes progress over perfection

---

## 🔄 Roadmap (Future Features)

- [ ] Backend with user authentication
- [ ] Cloud sync across devices
- [ ] Social features (share progress, accountability partners)
- [ ] Mood tracking integration
- [ ] Goal action logging (step tracking)
- [ ] Customizable exercises
- [ ] Notifications & reminders
- [ ] Export data (PDF, CSV)
- [ ] Offline support (PWA)

---

## 🤝 Contributing

This is an open-source project designed with **compassion**. If you have ideas to improve it or want to adapt it for your community, please fork and contribute!

---

## 📜 License

MIT License — free to use, modify, and distribute.

---

## 💬 Support

**For you, right now:** If you're struggling with emptiness or feeling lost, know that:
- You're not alone
- Small steps count
- This app exists because your struggle matters
- Keep showing up for yourself ✨

**Questions?** Open an issue or reach out.

---

**Made with 💜 for people looking for meaning.**  
*Feel Better v0.1 • March 2026*
