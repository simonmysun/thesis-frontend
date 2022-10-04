import { 
  Outlet, 
} from 'react-router-dom';
import './style.css';

function LayoutLive() {
  return (
    <div>
      App layout live
      <Outlet/>
    </div>
  );
}

export default LayoutLive;
