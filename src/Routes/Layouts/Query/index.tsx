import { 
  Outlet, 
} from 'react-router-dom';
import './style.css';

function LayoutQuery() {
  return (
    <div>
      <span className="hidden">App layout query</span>
      <Outlet/>
    </div>
  );
}

export default LayoutQuery;
