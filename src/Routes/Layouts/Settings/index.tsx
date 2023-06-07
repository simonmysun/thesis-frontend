import { 
  Outlet, 
} from 'react-router-dom';
import './style.css';

function LayoutSettings() {
  return (
    <div>
      <span className="hidden">App layout settings</span>
      <Outlet/>
    </div>
  );
}

export default LayoutSettings;
