import { Link } from 'react-router-dom';
import './style.css';

function LiveList() {
  return (
    <div>
      <span className="hidden">App Live List</span>
      <Link to="/live/fake_datasource">fake_datasource</Link>,
    </div>
  );
}

export default LiveList;
