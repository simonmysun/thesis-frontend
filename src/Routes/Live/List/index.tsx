import { Link, Outlet } from 'react-router-dom';
import './style.css';

function LiveList() {
  return (
    <div>
      <span className="hidden">App Live List</span>
      <Link to="/live/demo">demo</Link>
    </div>
  );
}

export default LiveList;
