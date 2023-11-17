import { useOutletContext } from 'react-router-dom';
import {
  CalHeatmapHourXDay,
} from './../../../Components';

import './style.css';

function QueryCalHeatmapHourXDay() {
  const { queryString }: { queryString: string } = useOutletContext();
  return (
    <div className='non-stick-top'>
      <span className="hidden">QueryCalHeatmapHourXDay</span>
      <div className='row'>
        <div className='col-sm-12'>
          <CalHeatmapHourXDay queryString={queryString} />
        </div>
      </div>
    </div>
  );
}

export default QueryCalHeatmapHourXDay;
