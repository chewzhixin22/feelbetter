import { useLocalStorage } from '../hooks/useLocalStorage'
import '../styles/ProgressDashboard.css'

export default function ProgressDashboard() {
  const [goals] = useLocalStorage('feelbetter_goals', [])
  const [completedExercises] = useLocalStorage('feelbetter_exercises', [])

  // Calculate streaks
  const getStreak = () => {
    if (completedExercises.length === 0) return 0

    const dates = completedExercises.map((c) => new Date(c.date).toDateString())
    const uniqueDates = [...new Set(dates)].sort()

    if (uniqueDates.length === 0) return 0

    let streak = 1
    for (let i = uniqueDates.length - 1; i > 0; i--) {
      const current = new Date(uniqueDates[i])
      const prev = new Date(uniqueDates[i - 1])
      const diff = (current - prev) / (1000 * 60 * 60 * 24)

      if (diff === 1) {
        streak++
      } else {
        break
      }
    }

    return streak
  }

  // Calculate daily engagement
  const getTodayCompletions = () => {
    const today = new Date().toDateString()
    return completedExercises.filter((c) => new Date(c.date).toDateString() === today).length
  }

  // Calculate goal progress average
  const getAverageGoalProgress = () => {
    if (goals.length === 0) return 0
    const total = goals.reduce((sum, goal) => sum + goal.progress, 0)
    return Math.round(total / goals.length)
  }

  // Get last 7 days activity
  const getLast7DaysActivity = () => {
    const activity = {}
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toDateString()
      const completions = completedExercises.filter((c) =>
        new Date(c.date).toDateString() === dateStr
      ).length
      activity[dateStr] = completions
    }
    return activity
  }

  // Get milestones achieved
  const getMilestones = () => {
    const streak = getStreak()
    const totalExercises = new Set(completedExercises.map((c) => c.exerciseId)).size
    const goalsCreated = goals.length
    const milestonesAchieved = []

    if (streak >= 3) milestonesAchieved.push('🔥 3-Day Streak!')
    if (streak >= 7) milestonesAchieved.push('🚀 7-Day Streak!')
    if (streak >= 14) milestonesAchieved.push('⭐ 14-Day Streak!')
    if (totalExercises >= 5) milestonesAchieved.push('✨ Tried 5 Different Exercises')
    if (totalExercises >= 10) milestonesAchieved.push('🌟 Tried 10 Different Exercises')
    if (goalsCreated >= 3) milestonesAchieved.push('🎯 3 Goals Created')
    if (goalsCreated >= 5) milestonesAchieved.push('💪 5 Goals Created')
    if (completedExercises.length >= 10) milestonesAchieved.push('📈 10 Exercises Completed')
    if (completedExercises.length >= 25) milestonesAchieved.push('🏆 25 Exercises Completed')

    return milestonesAchieved
  }

  const todayCompletions = getTodayCompletions()
  const streak = getStreak()
  const avgGoalProgress = getAverageGoalProgress()
  const last7Days = getLast7DaysActivity()
  const milestones = getMilestones()

  return (
    <div className="progress-dashboard">
      <div className="dashboard-header">
        <h2>📊 Your Progress</h2>
        <p className="subtitle">Celebrate how far you've come</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {/* Today's Completions */}
        <div className="stat-card card">
          <div className="stat-icon">📌</div>
          <h3>Today</h3>
          <div className="stat-value">{todayCompletions}</div>
          <p className="stat-label">exercises completed</p>
        </div>

        {/* Streak */}
        <div className="stat-card card">
          <div className="stat-icon">🔥</div>
          <h3>Streak</h3>
          <div className="stat-value">{streak}</div>
          <p className="stat-label">
            {streak === 0 ? 'Start your journey today!' : `day${streak !== 1 ? 's' : ''} in a row`}
          </p>
        </div>

        {/* Total Exercises */}
        <div className="stat-card card">
          <div className="stat-icon">✨</div>
          <h3>Exercises Done</h3>
          <div className="stat-value">{completedExercises.length}</div>
          <p className="stat-label">small wins</p>
        </div>

        {/* Goals Progress */}
        <div className="stat-card card">
          <div className="stat-icon">🎯</div>
          <h3>Goals</h3>
          <div className="stat-value">{goals.length}</div>
          <p className="stat-label">
            {goals.length === 0 ? 'Create your first goal' : `avg. progress: ${avgGoalProgress}%`}
          </p>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="activity-section">
        <h3>📅 Last 7 Days</h3>
        <div className="activity-grid">
          {Object.entries(last7Days).map(([date, count]) => {
            const dateObj = new Date(date)
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' })
            return (
              <div key={date} className="activity-day">
                <div className="day-label">{dayName}</div>
                <div className="activity-bar-wrapper">
                  <div
                    className="activity-bar"
                    style={{ height: `${Math.max(20, count * 30)}px` }}
                    title={`${count} exercise${count !== 1 ? 's' : ''}`}
                  >
                    {count > 0 && <span className="activity-count">{count}</span>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Milestones */}
      {milestones.length > 0 && (
        <div className="milestones-section">
          <h3>🏅 Achievements Unlocked</h3>
          <div className="milestones-grid">
            {milestones.map((milestone) => (
              <div key={milestone} className="milestone card">
                <div className="milestone-emoji">{milestone.split(' ')[0]}</div>
                <p>{milestone.substring(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Goals Breakdown */}
      {goals.length > 0 && (
        <div className="goals-section">
          <h3>🎯 Goal Progress</h3>
          <div className="goals-breakdown">
            {goals.map((goal) => (
              <div key={goal.id} className="goal-progress-item">
                <div className="goal-title">
                  <span>{goal.text}</span>
                  <span className="goal-pct">{goal.progress}%</span>
                </div>
                <div className="progress-bar full-width">
                  <div
                    className="progress-fill"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Encouragement */}
      <div className="encouragement-section card">
        <h3>✨ Keep Going</h3>
        {completedExercises.length === 0 ? (
          <p>
            You haven't started yet—and that's okay. Start with just <strong>one exercise</strong> today. 
            Small steps lead to big changes. You've got this.
          </p>
        ) : streak === 0 ? (
          <p>
            Great start! You've completed <strong>{completedExercises.length} exercise{completedExercises.length !== 1 ? 's' : ''}</strong>. 
            Come back tomorrow to start a streak. Consistency is the secret sauce. 🌟
          </p>
        ) : streak < 7 ? (
          <p>
            Amazing! You're on a <strong>{streak}-day streak</strong>. Keep this momentum going—
            you're building a powerful habit. Just {7 - streak} more days to a week! 🚀
          </p>
        ) : (
          <p>
            🎉 <strong>You're on a {streak}-day streak!</strong> This is incredible. You're proving 
            to yourself that change is possible. Keep showing up for yourself. You matter. ✨
          </p>
        )}
      </div>
    </div>
  )
}
