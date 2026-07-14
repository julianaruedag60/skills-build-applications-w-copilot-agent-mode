import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(buildApiUrl('teams'));
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.results || [];
        setTeams(items);
      } catch (err) {
        setError(err.message);
      }
    }

    loadTeams();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Teams</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {teams.map((team) => (
            <li key={team._id || team.id} className="list-group-item">
              <strong>{team.name}</strong> — {team.goal} ({team.members} members)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
