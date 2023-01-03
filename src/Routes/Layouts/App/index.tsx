import {
  Outlet,
  Link,
} from 'react-router-dom';
import './style.css';

function Layout() {
  return (
    <div>
      <span className="hidden">App layout</span>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/live">Watch Live Data</Link></li>
          <li><Link to="/devices">Manage Devices</Link></li>
          <li><Link to="/alert">Manage Alerts</Link></li>
          <li><Link to="/query">Query Historical Data</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
