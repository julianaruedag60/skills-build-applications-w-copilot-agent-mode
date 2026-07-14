import { useEffect, useState } from 'react';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';

        const response = await fetch(apiUrl);
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.results || [];
        setWorkouts(items);
      } catch (err) {
        setError(err.message);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Workouts</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {workouts.map((workout) => (
            <li key={workout._id || workout.id} className="list-group-item">
              <strong>{workout.title}</strong> — {workout.difficulty}, {workout.durationMinutes} min
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
