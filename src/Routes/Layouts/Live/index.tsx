import {
  Outlet,
} from 'react-router-dom';
import './style.css';

function LayoutLive() {
  return (
    <div>
      <span className="hidden">App layout live</span>
      <Outlet />
    </div>
  );
}

export default LayoutLive;
