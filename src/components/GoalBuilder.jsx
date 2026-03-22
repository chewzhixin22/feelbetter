import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import '../styles/GoalBuilder.css'

// Prompts to help users articulate their goals
const GOAL_PROMPTS = [
  "What's something you want to learn?",
  "What skill would make you feel proud?",
  "What would bring joy to your daily life?",
  "Who or what do you want to contribute to?",
  "What's a small habit you want to build?",
  "What adventure excites you?",
  "What problem in the world do you want to help solve?",
]

export default function GoalBuilder() {
  const [goals, setGoals] = useLocalStorage('feelbetter_goals', [])
  const [newGoal, setNewGoal] = useState('')
  const [selectedPrompt, setSelectedPrompt] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [expandedGoalId, setExpandedGoalId] = useState(null)
  const [newSubtask, setNewSubtask] = useState({})
  const [celebratingGoalId, setCelebratingGoalId] = useState(null)

  const addGoal = (e) => {
    e.preventDefault()
    if (!newGoal.trim()) return

    const goal = {
      id: Date.now(),
      text: newGoal,
      createdAt: new Date().toISOString(),
      progress: 0, // 0-100
      subtasks: [],
    }

    setGoals([...goals, goal])
    setNewGoal('')
    setSelectedPrompt('')
    setShowForm(false)
  }

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const updateGoalProgress = (id, progress) => {
    const newProgress = Math.min(100, Math.max(0, progress))
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, progress: newProgress } : goal
      )
    )
    
    // Trigger celebration if goal completed
    if (newProgress === 100) {
      setCelebratingGoalId(id)
      setTimeout(() => setCelebratingGoalId(null), 3000)
    }
  }

  const addSubtask = (goalId, subtaskText) => {
    if (!subtaskText.trim()) return

    setGoals(
      goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              subtasks: [
                ...goal.subtasks,
                {
                  id: Date.now(),
                  text: subtaskText,
                  completed: false,
                },
              ],
            }
          : goal
      )
    )
    setNewSubtask({ ...newSubtask, [goalId]: '' })
  }

  const toggleSubtaskComplete = (goalId, subtaskId) => {
    setGoals(
      goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              subtasks: goal.subtasks.map((st) =>
                st.id === subtaskId ? { ...st, completed: !st.completed } : st
              ),
            }
          : goal
      )
    )
  }

  const deleteSubtask = (goalId, subtaskId) => {
    setGoals(
      goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              subtasks: goal.subtasks.filter((st) => st.id !== subtaskId),
            }
          : goal
      )
    )
  }

  return (
    <div className="goal-builder">
      <div className="goal-header">
        <h2>🎯 Your Goals & Dreams</h2>
        <p className="subtitle">
          {goals.length === 0
            ? 'Start here: What matters to you? What do you want to build?'
            : `${goals.length} goal${goals.length !== 1 ? 's' : ''} you're working on`}
        </p>
      </div>

      {!showForm ? (
        <button className="btn-primary btn-large" onClick={() => setShowForm(true)}>
          + Add a Goal or Dream
        </button>
      ) : (
        <form onSubmit={addGoal} className="goal-form">
          <div className="form-group">
            <label htmlFor="goal-input">What's your goal?</label>
            <input
              id="goal-input"
              type="text"
              placeholder="e.g., Learn guitar, start a blog, volunteer..."
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              maxLength={200}
            />
            <small className="char-count">
              {newGoal.length}/200
            </small>
          </div>

          <div className="form-group">
            <label>Need inspiration?</label>
            <div className="prompt-grid">
              {GOAL_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`prompt-btn ${selectedPrompt === prompt ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedPrompt(prompt)
                    setNewGoal(prompt.replace('?', ''))
                  }}
                  aria-pressed={selectedPrompt === prompt}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              💯 Add Goal
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setShowForm(false)
                setNewGoal('')
                setSelectedPrompt('')
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {goals.length > 0 && (
        <div className="goals-list">
          {goals.map((goal) => {
            const subtaskTotal = goal.subtasks.length
            const subtaskCompleted = goal.subtasks.filter((st) => st.completed).length
            const isCelebrating = celebratingGoalId === goal.id

            return (
              <div key={goal.id} className={`goal-card card ${isCelebrating ? 'celebrating' : ''}`}>
                {isCelebrating && (
                  <div className="celebration">
                    <div className="confetti">🎉</div>
                    <div className="confetti">🌟</div>
                    <div className="confetti">✨</div>
                    <div className="confetti">💜</div>
                    <div className="confetti">🚀</div>
                    <div className="celebration-text">Goal Complete! You did it! 🎊</div>
                  </div>
                )}

                <div className="goal-content">
                  <h3>{goal.text}</h3>
                  <div className="goal-progress-wrapper">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <span className="progress-text">{goal.progress}%</span>
                  </div>
                  <small className="goal-date">
                    Started {new Date(goal.createdAt).toLocaleDateString()}
                  </small>

                  {/* Subtasks Section */}
                  <div className="goal-subtasks">
                    <div className="subtasks-header">
                      <h4>Milestones & Steps ({subtaskCompleted}/{subtaskTotal})</h4>
                      <button
                        type="button"
                        className="expand-btn"
                        onClick={() =>
                          setExpandedGoalId(expandedGoalId === goal.id ? null : goal.id)
                        }
                      >
                        {expandedGoalId === goal.id ? '−' : '+'}
                      </button>
                    </div>

                    {expandedGoalId === goal.id && (
                      <div className="subtasks-list">
                        {goal.subtasks.map((subtask) => (
                          <div key={subtask.id} className="subtask-item">
                            <input
                              type="checkbox"
                              checked={subtask.completed}
                              onChange={() =>
                                toggleSubtaskComplete(goal.id, subtask.id)
                              }
                              aria-label={`Mark "${subtask.text}" as ${subtask.completed ? 'incomplete' : 'complete'}`}
                            />
                            <span className={subtask.completed ? 'completed' : ''}>
                              {subtask.text}
                            </span>
                            <button
                              type="button"
                              className="btn-danger btn-tiny"
                              onClick={() => deleteSubtask(goal.id, subtask.id)}
                              aria-label={`Delete subtask: ${subtask.text}`}
                            >
                              ✕
                            </button>
                          </div>
                        ))}

                        {/* Add Subtask Form */}
                        <div className="add-subtask-form">
                          <input
                            type="text"
                            placeholder="Add a step or milestone..."
                            value={newSubtask[goal.id] || ''}
                            onChange={(e) =>
                              setNewSubtask({
                                ...newSubtask,
                                [goal.id]: e.target.value,
                              })
                            }
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addSubtask(goal.id, newSubtask[goal.id] || '')
                              }
                            }}
                            maxLength={150}
                          />
                          <button
                            type="button"
                            className="btn-secondary btn-tiny"
                            onClick={() =>
                              addSubtask(goal.id, newSubtask[goal.id] || '')
                            }
                          >
                            Add Step
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="goal-actions">
                  <div className="progress-controls">
                    <button
                      type="button"
                      className="btn-secondary btn-small"
                      onClick={() => updateGoalProgress(goal.id, goal.progress - 10)}
                    >
                      −
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={goal.progress}
                      onChange={(e) =>
                        updateGoalProgress(goal.id, parseInt(e.target.value))
                      }
                      className="progress-slider"
                      aria-label={`Progress for goal: ${goal.text}`}
                    />
                    <button
                      type="button"
                      className="btn-secondary btn-small"
                      onClick={() => updateGoalProgress(goal.id, goal.progress + 10)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn-danger btn-small"
                    onClick={() => deleteGoal(goal.id)}
                    aria-label={`Delete goal: ${goal.text}`}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {goals.length === 0 && !showForm && (
        <div className="empty-state">
          <p>✨ Your journey starts with one goal. What's calling to you?</p>
        </div>
      )}
    </div>
  )
}
