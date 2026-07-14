import { useEffect, useState } from 'react';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
          : 'http://localhost:8000/api/teams/';

        const response = await fetch(apiUrl);
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
