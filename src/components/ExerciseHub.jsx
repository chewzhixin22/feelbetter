import { useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import '../styles/ExerciseHub.css'

// Exercise library organized by category
const EXERCISES = [
  // Reflection
  {
    id: 1,
    category: 'Reflection',
    icon: '📝',
    title: 'What small win happened today?',
    description: 'Even tiny victories matter. Reflect on something you did well, learned, or felt good about.',
    duration: '5 min',
    type: 'journaling',
  },
  {
    id: 2,
    category: 'Reflection',
    icon: '🤔',
    title: 'What drained you today? What recharged you?',
    description: 'Notice what affects your energy. Understanding this helps you protect your peace.',
    duration: '10 min',
    type: 'journaling',
  },
  {
    id: 3,
    category: 'Reflection',
    icon: '💭',
    title: 'What are 3 things you\'re grateful for?',
    description: 'Gratitude shifts perspective. They can be big (people, health) or small (good coffee, sunshine).',
    duration: '5 min',
    type: 'journaling',
  },
  {
    id: 4,
    category: 'Reflection',
    icon: '🎯',
    title: 'What\'s one thing you want to improve?',
    description: 'Growth starts with self-awareness. Pick ONE small area to focus on.',
    duration: '10 min',
    type: 'journaling',
  },
  {
    id: 5,
    category: 'Reflection',
    icon: '💫',
    title: 'What does your best self look like?',
    description: 'Imagine the version of you that feels alive, purposeful, and at peace. What does that look like?',
    duration: '15 min',
    type: 'journaling',
  },

  // Mindfulness
  {
    id: 6,
    category: 'Mindfulness',
    icon: '🌬️',
    title: '5-Minute Breathing Exercise',
    description: 'Breathe in for 4 counts, hold for 4, exhale for 4. Repeat 10 times. Notice how you feel.',
    duration: '5 min',
    type: 'mindfulness',
  },
  {
    id: 7,
    category: 'Mindfulness',
    icon: '🧘',
    title: 'Body Scan Meditation',
    description: 'Close your eyes. Slowly scan your body from head to toe. Notice any tension or comfort.',
    duration: '10 min',
    type: 'mindfulness',
  },
  {
    id: 8,
    category: 'Mindfulness',
    icon: '🌍',
    title: '5-4-3-2-1 Grounding Technique',
    description: 'Notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. Stay present.',
    duration: '5 min',
    type: 'mindfulness',
  },
  {
    id: 9,
    category: 'Mindfulness',
    icon: '🎵',
    title: 'Mindful Listen',
    description: 'Put on music. Just listen. No multitasking. Let the sounds move through you.',
    duration: '10 min',
    type: 'mindfulness',
  },
  {
    id: 10,
    category: 'Mindfulness',
    icon: '🌿',
    title: 'Nature Observation',
    description: 'Spend time outside. Notice colors, textures, sounds, smells. Be fully present.',
    duration: '15 min',
    type: 'mindfulness',
  },

  // Action
  {
    id: 11,
    category: 'Action',
    icon: '🚶',
    title: 'Micro-Movement Break',
    description: 'Do 20 jumping jacks, a short walk, or stretch. Movement releases endorphins.',
    duration: '5 min',
    type: 'action',
  },
  {
    id: 12,
    category: 'Action',
    icon: '🎨',
    title: 'Create Something (Anything)',
    description: 'Draw, write, build, cook, rearrange. Creating combats emptiness. No skill needed.',
    duration: '20 min',
    type: 'action',
  },
  {
    id: 13,
    category: 'Action',
    icon: '📚',
    title: 'Learn One New Thing',
    description: 'Read one article, watch one video, or try one tutorial on something that interests you.',
    duration: '15 min',
    type: 'action',
  },
  {
    id: 14,
    category: 'Action',
    icon: '🧹',
    title: 'Tidy One Small Area',
    description: 'Clean your desk, make your bed, or organize a drawer. Order calms the mind.',
    duration: '10 min',
    type: 'action',
  },
  {
    id: 15,
    category: 'Action',
    icon: '🎯',
    title: 'Work on One Goal for 15 Min',
    description: 'Pick any goal you set. Work on it for just 15 minutes. Progress over perfection.',
    duration: '15 min',
    type: 'action',
  },

  // Connection
  {
    id: 16,
    category: 'Connection',
    icon: '💬',
    title: 'Reach Out to Someone',
    description: 'Text, call, or message someone you care about. Even a small "thinking of you" matters.',
    duration: '5 min',
    type: 'connection',
  },
  {
    id: 17,
    category: 'Connection',
    icon: '💌',
    title: 'Write a Message of Gratitude',
    description: 'Tell someone specifically why you appreciate them. Kindness helps both of you.',
    duration: '10 min',
    type: 'connection',
  },
  {
    id: 18,
    category: 'Connection',
    icon: '🤝',
    title: 'Help Someone Small',
    description: 'Hold a door, offer help, listen deeply to a friend. Small acts of kindness matter.',
    duration: '15 min',
    type: 'connection',
  },
  {
    id: 19,
    category: 'Connection',
    icon: '👨‍👩‍👧‍👦',
    title: 'Quality Time with Someone',
    description: 'Spend time with someone you care about. Put phones away. Be fully present.',
    duration: '30 min',
    type: 'connection',
  },
  {
    id: 20,
    category: 'Connection',
    icon: '📖',
    title: 'Ask Someone Their Story',
    description: 'Ask a friend, family member, or new person about their dreams, challenges, or passions.',
    duration: '20 min',
    type: 'connection',
  },
]

export default function ExerciseHub() {
  const [completedExercises, setCompletedExercises] = useLocalStorage('feelbetter_exercises', [])
  const [exerciseResponses, setExerciseResponses] = useLocalStorage('feelbetter_responses', {})
  const [selectedCategory, setSelectedCategory] = useLocalStorage('feelbetter_selected_category', 'All')
  const [expandedExerciseId, setExpandedExerciseId] = useState(null)
  const [userResponse, setUserResponse] = useState('')
  const [todayExercise, setTodayExercise] = useState(null)

  useEffect(() => {
    // Set "Exercise of the Day" - pick a different one each day
    const today = new Date().toDateString()
    const lastDay = localStorage.getItem('feelbetter_last_exercise_day')

    if (lastDay !== today) {
      const randomExercise = EXERCISES[Math.floor(Math.random() * EXERCISES.length)]
      setTodayExercise(randomExercise)
      localStorage.setItem('feelbetter_last_exercise_day', today)
      localStorage.setItem('feelbetter_today_exercise', JSON.stringify(randomExercise))
    } else {
      const stored = localStorage.getItem('feelbetter_today_exercise')
      if (stored) {
        setTodayExercise(JSON.parse(stored))
      }
    }
  }, [])

  const categories = ['All', ...new Set(EXERCISES.map((ex) => ex.category))]

  const filteredExercises =
    selectedCategory === 'All'
      ? EXERCISES
      : EXERCISES.filter((ex) => ex.category === selectedCategory)

  const isCompletedToday = (exerciseId) => {
    const today = new Date().toDateString()
    return completedExercises.some(
      (c) => c.exerciseId === exerciseId && new Date(c.date).toDateString() === today
    )
  }

  const toggleExerciseComplete = (exercise) => {
    const today = new Date().toDateString()

    if (isCompletedToday(exercise.id)) {
      // Remove completion
      setCompletedExercises(
        completedExercises.filter(
          (c) => !(c.exerciseId === exercise.id && new Date(c.date).toDateString() === today)
        )
      )
    } else {
      // Add completion
      setCompletedExercises([
        ...completedExercises,
        {
          exerciseId: exercise.id,
          exerciseTitle: exercise.title,
          date: new Date().toISOString(),
        },
      ])

      // Show encouragement message
      alert('🎉 Great job! You\'re building momentum. Keep going!')
    }
  }

  const handleSaveResponse = (exerciseId) => {
    if (userResponse.trim()) {
      setExerciseResponses({
        ...exerciseResponses,
        [exerciseId]: {
          text: userResponse,
          date: new Date().toISOString(),
        },
      })
      setUserResponse('')
      setExpandedExerciseId(null)
      // Mark as completed
      toggleExerciseComplete(EXERCISES.find((ex) => ex.id === exerciseId))
    }
  }

  const todayCount = completedExercises.filter((c) =>
    new Date(c.date).toDateString() === new Date().toDateString()
  ).length

  return (
    <div className="exercise-hub">
      <div className="exercise-header">
        <h2>🌟 Daily Exercises</h2>
        <p className="subtitle">
          Small acts, big impact. Today you've completed <strong>{todayCount} exercise{todayCount !== 1 ? 's' : ''}</strong>
        </p>
      </div>

      {todayExercise && (
        <div className="exercise-of-the-day">
          <h3>✨ Today's Suggested Exercise</h3>
          <div className="featured-exercise card">
            <div className="exercise-header-content">
              <span className="exercise-icon">{todayExercise.icon}</span>
              <div>
                <h4>{todayExercise.title}</h4>
                <span className="exercise-category">{todayExercise.category}</span>
              </div>
            </div>
            <p>{todayExercise.description}</p>
            <small className="exercise-duration">⏱️ {todayExercise.duration}</small>
            <button
              className={`btn-primary btn-full-width ${
                isCompletedToday(todayExercise.id) ? 'completed' : ''
              }`}
              onClick={() => {
                setSelectedCategory(todayExercise.category)
                setExpandedExerciseId(todayExercise.id)
              }}
            >
              {isCompletedToday(todayExercise.id) ? '✅ Completed' : 'Start Exercise'}
            </button>
          </div>
        </div>
      )}

      <div className="category-filter">
        <h3>Browse by Category</h3>
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

      <div className="exercises-grid">
        {filteredExercises.map((exercise) => {
          const completed = isCompletedToday(exercise.id)
          const expanded = expandedExerciseId === exercise.id
          const hasResponse = exerciseResponses[exercise.id]

          return (
            <div
              key={exercise.id}
              className={`exercise-card card ${completed ? 'completed' : ''} ${expanded ? 'expanded' : ''}`}
            >
              <div className="exercise-card-header">
                <div className="exercise-title-group">
                  <span className="exercise-icon">{exercise.icon}</span>
                  <div>
                    <h4>{exercise.title}</h4>
                    <small className="exercise-meta">
                      {exercise.category} • {exercise.duration}
                    </small>
                  </div>
                </div>
                <button
                  className={`checkbox-btn ${completed ? 'checked' : ''}`}
                  onClick={() => toggleExerciseComplete(exercise)}
                  aria-label={`Mark ${exercise.title} as ${completed ? 'incomplete' : 'complete'}`}
                >
                  {completed ? '✓' : '○'}
                </button>
              </div>

              <p className="exercise-description">{exercise.description}</p>

              {!expanded ? (
                <button
                  className="btn-secondary btn-small"
                  onClick={() => setExpandedExerciseId(exercise.id)}
                >
                  Start or Log Response
                </button>
              ) : (
                <div className="exercise-response-form">
                  <label htmlFor={`response-${exercise.id}`}>
                    What happened? (optional)
                  </label>
                  <textarea
                    id={`response-${exercise.id}`}
                    placeholder="Share your experience, thoughts, or feelings..."
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    maxLength={500}
                  />
                  <small className="char-count">{userResponse.length}/500</small>
                  <div className="response-actions">
                    <button
                      className="btn-primary btn-small"
                      onClick={() => handleSaveResponse(exercise.id)}
                    >
                      Save & Complete
                    </button>
                    <button
                      className="btn-secondary btn-small"
                      onClick={() => {
                        setExpandedExerciseId(null)
                        setUserResponse('')
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {hasResponse && (
                <div className="saved-response">
                  <small className="response-date">
                    Logged {new Date(hasResponse.date).toLocaleDateString()}
                  </small>
                  <p className="response-text">"{hasResponse.text}"</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
