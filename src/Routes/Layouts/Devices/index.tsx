import { 
  Outlet, 
} from 'react-router-dom';
import './style.css';

function LayoutDevices() {
  return (
    <div>
      App layout devices
      <Outlet/>
    </div>
  );
}

export default LayoutDevices;
