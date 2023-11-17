import {
  Outlet,
} from 'react-router-dom';
import './style.css';

function LayoutDevices() {
  return (
    <div>
      <span className="hidden">App layout devices</span>
      <Outlet />
    </div>
  );
}

export default LayoutDevices;
