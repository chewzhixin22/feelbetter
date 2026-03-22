import { useState } from 'react'
import '../styles/FeelBetter.css'

const ACTIVITIES = [
  {
    id: 1,
    icon: '💧',
    title: 'Drink Water',
    description: 'Hydration improves mood and focus. Have a glass of water right now.',
    category: 'self-care',
    time: '2 min',
  },
  {
    id: 2,
    icon: '🍕',
    title: 'Eat Something That Makes You Happy',
    description: 'Treat yourself to something delicious. Food is comfort. You deserve it.',
    category: 'self-care',
    time: '10 min',
  },
  {
    id: 3,
    icon: '🚶',
    title: 'Take a Walk',
    description: 'Step outside for even 5 minutes. Fresh air and movement heal.',
    category: 'movement',
    time: '15 min',
  },
  {
    id: 4,
    icon: '☀️',
    title: 'Get Sunlight',
    description: 'Vitamin D and natural light boost mood. Sit by a window or go outside.',
    category: 'self-care',
    time: '10 min',
  },
  {
    id: 5,
    icon: '🛏️',
    title: 'Rest & Sleep',
    description: 'If you\'re tired, rest is not lazy—it\'s healing. Take a nap or go to bed early.',
    category: 'self-care',
    time: 'varies',
  },
  {
    id: 6,
    icon: '🎵',
    title: 'Listen to Music You Love',
    description: 'Put on your favorite songs. Let music move you.',
    category: 'mindfulness',
    time: '15 min',
  },
  {
    id: 7,
    icon: '🤗',
    title: 'Hug Someone (or Yourself)',
    description: 'Physical touch releases oxytocin. A hug matters. Self-hugs count too.',
    category: 'connection',
    time: '5 min',
  },
  {
    id: 8,
    icon: '📞',
    title: 'Call or Text a Friend',
    description: 'Reach out. Sometimes just knowing someone cares changes everything.',
    category: 'connection',
    time: '10 min',
  },
  {
    id: 9,
    icon: '🐕',
    title: 'Pet an Animal',
    description: 'If you have a pet, spend time with them. If not, watch videos of cute animals.',
    category: 'self-care',
    time: '10 min',
  },
  {
    id: 10,
    icon: '📖',
    title: 'Read or Watch Something Comforting',
    description: 'Escape into a story, book, or show that brings you joy.',
    category: 'self-care',
    time: '30 min',
  },
  {
    id: 11,
    icon: '🎨',
    title: 'Doodle or Color',
    description: 'Creative play soothes the mind. No skill needed. Just create.',
    category: 'creativity',
    time: '15 min',
  },
  {
    id: 12,
    icon: '🛁',
    title: 'Take a Warm Shower/Bath',
    description: 'Warm water relaxes tension. Light a candle if you have one.',
    category: 'self-care',
    time: '20 min',
  },
]

export default function FeelBetter() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [completedActivities, setCompletedActivities] = useState([])

  const categories = ['All', ...new Set(ACTIVITIES.map((a) => a.category))]

  const filteredActivities =
    selectedCategory === 'All'
      ? ACTIVITIES
      : ACTIVITIES.filter((a) => a.category === selectedCategory)

  const toggleActivityComplete = (id) => {
    if (completedActivities.includes(id)) {
      setCompletedActivities(completedActivities.filter((a) => a !== id))
    } else {
      setCompletedActivities([...completedActivities, id])
      // Show celebration
      alert('💚 You did it! You care about yourself. That matters.')
    }
  }

  return (
    <div className="feel-better">
      <div className="feel-better-header">
        <h2>💚 Right Now: Feel Better</h2>
        <p className="subtitle">
          Pick one thing. Just one. You deserve to feel better.
        </p>
      </div>

      <div className="category-filter">
        <h3>Filter by Category</h3>
        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={selectedCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="activities-grid">
        {filteredActivities.map((activity) => {
          const isCompleted = completedActivities.includes(activity.id)

          return (
            <div
              key={activity.id}
              className={`activity-card card ${isCompleted ? 'completed' : ''}`}
            >
              <div className="activity-icon">{activity.icon}</div>
              <h3>{activity.title}</h3>
              <p className="activity-description">{activity.description}</p>
              <small className="activity-time">⏱️ {activity.time}</small>

              <button
                className={`activity-btn ${isCompleted ? 'completed-btn' : 'btn-primary'}`}
                onClick={() => toggleActivityComplete(activity.id)}
              >
                {isCompleted ? '✅ Done' : 'Do This Now'}
              </button>
            </div>
          )
        })}
      </div>

      <div className="motivation-box card">
        <h3>💭 Remember</h3>
        <p>
          Feeling empty is valid. It's your mind saying "I need something." Taking care of yourself 
          is an act of rebellion against the emptiness. Drink water. Eat. Rest. Call someone. 
          <strong> You matter.</strong>
        </p>
      </div>
    </div>
  )
}
