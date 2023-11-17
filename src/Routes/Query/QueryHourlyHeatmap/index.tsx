import { useOutletContext } from 'react-router-dom';
import {
  HourlyHeatmap,
} from './../../../Components';

import './style.css';

function QueryHourlyHeatmap() {
  const { queryString }: { queryString: string } = useOutletContext();
  return (
    <div className='non-stick-top'>
      <span className="hidden">QueryHourlyHeatmap</span>
      <div className='row'>
        <div className='col-sm-12'>
          <HourlyHeatmap queryString={queryString} />
        </div>
      </div>
    </div>
  );
}

export default QueryHourlyHeatmap;
