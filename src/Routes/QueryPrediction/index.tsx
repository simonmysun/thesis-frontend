import { useOutletContext } from 'react-router-dom';
import {
  Prediction,
} from './../../Components';

import './style.css';

function QueryPrediction() {
  const { queryString } : { queryString: string } = useOutletContext();
  return (
    <div className='non-stick-top'>
      <span className="hidden">QueryPrediction</span>
      <div className='row'>
        <div className='col-sm-12'>
          <Prediction queryString={queryString} />
        </div>
      </div>
    </div>
  );
}

export default QueryPrediction;
