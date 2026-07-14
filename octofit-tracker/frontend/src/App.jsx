import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
        <p className="text-muted">
          Connect your activity, team, and workout data from the backend API.
        </p>
        <div className="alert alert-info small" role="status">
          Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URLs.
          If it is unset, the app falls back to localhost.
        </div>
        <nav className="nav nav-pills flex-wrap gap-2 mt-3">
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/users">Users</NavLink>
          <NavLink className="nav-link" to="/teams">Teams</NavLink>
          <NavLink className="nav-link" to="/activities">Activities</NavLink>
          <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
          <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<div className="card shadow-sm"><div className="card-body"><h2 className="h4">Welcome</h2><p>Explore the OctoFit Tracker data views.</p></div></div>} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
