import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadEntries() {
      try {
        const response = await fetch(buildApiUrl('leaderboard'));
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.results || [];
        setEntries(items);
      } catch (err) {
        setError(err.message);
      }
    }

    loadEntries();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Leaderboard</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {entries.map((entry) => (
            <li key={entry._id || entry.rank} className="list-group-item">
              <strong>#{entry.rank}</strong> {entry.name} — {entry.score} pts
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
