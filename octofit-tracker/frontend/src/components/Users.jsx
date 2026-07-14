import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl('users'));
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.results || [];
        setUsers(items);
      } catch (err) {
        setError(err.message);
      }
    }

    loadUsers();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Users</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {users.map((user) => (
            <li key={user._id || user.id} className="list-group-item">
              <strong>{user.name}</strong> — {user.email} ({user.role})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
