import { useEffect, useState } from 'react';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
          : 'http://localhost:8000/api/activities/';

        const response = await fetch(apiUrl);
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.results || [];
        setActivities(items);
      } catch (err) {
        setError(err.message);
      }
    }

    loadActivities();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Activities</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {activities.map((activity) => (
            <li key={activity._id || activity.id} className="list-group-item">
              <strong>{activity.type}</strong> — {activity.durationMinutes} min, {activity.calories} cal
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
