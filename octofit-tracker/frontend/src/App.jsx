import { useEffect, useState } from 'react'
import './App.css'

const apiBase = 'http://localhost:8000/api'

function App() {
  const [profile, setProfile] = useState(null)
  const [activities, setActivities] = useState([])
  const [teams, setTeams] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const [profileRes, activitiesRes, teamsRes, leaderboardRes, workoutsRes] = await Promise.all([
        fetch(`${apiBase}/profile`),
        fetch(`${apiBase}/activities`),
        fetch(`${apiBase}/teams`),
        fetch(`${apiBase}/leaderboard`),
        fetch(`${apiBase}/workouts`),
      ])

      setProfile(await profileRes.json())
      setActivities(await activitiesRes.json())
      setTeams(await teamsRes.json())
      setLeaderboard(await leaderboardRes.json())
      setWorkouts(await workoutsRes.json())
    }

    fetchData()
  }, [])

  return (
    <div className="app-shell">
      <header className="hero-card">
        <div>
          <p className="eyebrow">OctoFit Tracker</p>
          <h1>Keep every student moving with friendly momentum.</h1>
          <p className="lead">
            Track activity, celebrate streaks, and turn fitness goals into a team challenge.
          </p>
        </div>
        <div className="hero-pill">
          <span className="fw-bold">Weekly goal</span>
          <span>180 minutes</span>
        </div>
      </header>

      <main className="row g-4">
        <section className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <p className="eyebrow">Student snapshot</p>
              <h2>{profile?.name ?? 'Loading...'}</h2>
              <p className="text-muted">{profile?.grade}</p>
              <div className="stat-grid mt-3">
                <div>
                  <strong>{profile?.streak ?? 0}</strong>
                  <div>day streak</div>
                </div>
                <div>
                  <strong>{profile?.weeklyMinutes ?? 0}</strong>
                  <div>minutes</div>
                </div>
              </div>
              <p className="mt-3 mb-0">Focus: {profile?.focus}</p>
            </div>
          </div>
        </section>

        <section className="col-lg-8">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">Recent activity</h3>
                <span className="badge bg-success">Live sync</span>
              </div>
              <div className="activity-list">
                {activities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div>
                      <strong>{activity.type}</strong>
                      <div className="text-muted">{activity.note}</div>
                    </div>
                    <div className="text-end">
                      <div>{activity.duration} min</div>
                      <div className="text-muted small">{activity.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="row g-4 mt-1">
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h3>Teams</h3>
              <ul className="list-group list-group-flush">
                {teams.map((team) => (
                  <li key={team.id} className="list-group-item px-0">
                    <div className="d-flex justify-content-between">
                      <strong>{team.name}</strong>
                      <span className="text-muted">{team.members} members</span>
                    </div>
                    <div className="text-muted small">{team.challenge}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h3>Leaderboard</h3>
              <ol className="list-group list-group-numbered">
                {leaderboard.map((entry) => (
                  <li key={entry.name} className="list-group-item d-flex justify-content-between align-items-start">
                    <span>{entry.name}</span>
                    <span className="badge bg-primary rounded-pill">{entry.points} pts</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="card shadow-sm mt-4">
        <div className="card-body">
          <h3>Suggested workouts</h3>
          <div className="row g-3 mt-1">
            {workouts.map((workout) => (
              <div key={workout.title} className="col-md-4">
                <div className="border rounded p-3 h-100">
                  <h5>{workout.title}</h5>
                  <p className="text-muted small mb-2">{workout.description}</p>
                  <span className="badge bg-secondary">{workout.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
