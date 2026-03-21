import { useState } from 'react'
import GoalBuilder from './components/GoalBuilder'
import ExerciseHub from './components/ExerciseHub'
import ProgressDashboard from './components/ProgressDashboard'
import './App.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState('goals')

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-container">
          <div className="logo">
            <h1>Feel Better</h1>
            <p className="tagline">Find Your Path Forward</p>
          </div>
          <nav className="main-nav">
            <button
              className={`nav-btn ${currentPage === 'goals' ? 'active' : ''}`}
              onClick={() => setCurrentPage('goals')}
              aria-current={currentPage === 'goals' ? 'page' : undefined}
            >
              🎯 Goals
            </button>
            <button
              className={`nav-btn ${currentPage === 'exercises' ? 'active' : ''}`}
              onClick={() => setCurrentPage('exercises')}
              aria-current={currentPage === 'exercises' ? 'page' : undefined}
            >
              🌟 Exercises
            </button>
            <button
              className={`nav-btn ${currentPage === 'progress' ? 'active' : ''}`}
              onClick={() => setCurrentPage('progress')}
              aria-current={currentPage === 'progress' ? 'page' : undefined}
            >
              📊 Progress
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {currentPage === 'goals' && <GoalBuilder />}
        {currentPage === 'exercises' && <ExerciseHub />}
        {currentPage === 'progress' && <ProgressDashboard />}
      </main>

      <footer className="app-footer">
        <p>
          Made with 💜 for people looking for meaning. 
          <br />
          You are not alone. Small steps count. Keep going.
        </p>
        <p className="footer-version">Feel Better v0.1 • March 2026</p>
      </footer>
    </div>
  )
}
