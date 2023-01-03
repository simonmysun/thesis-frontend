import { 
  Outlet, 
} from 'react-router-dom';
import './style.css';

function LayoutAlerts() {
  return (
    <div>
      <span className="hidden">App layout alerts</span>
      <Outlet/>
    </div>
  );
}

export default LayoutAlerts;
