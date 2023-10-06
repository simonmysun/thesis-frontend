import { useOutletContext } from 'react-router-dom';
import {
  StatusTimeline,
} from './../../Components';

import './style.css';

function QueryStatusTimeline() {
  const { queryString } : { queryString: string } = useOutletContext();
  return (
    <div className='non-stick-top'>
      <span className="hidden">QueryStatusTimeline</span>
      <div className='row'>
        <div className='col-sm-12'>
          <StatusTimeline queryString={queryString} />
        </div>
      </div>
    </div>
  );
}

export default QueryStatusTimeline;
