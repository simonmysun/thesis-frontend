import { 
  Outlet, 
} from 'react-router-dom';
import './style.css';

function LayoutAlerts() {
  return (
    <div>
      App layout alerts
      <Outlet/>
    </div>
  );
}

export default LayoutAlerts;
