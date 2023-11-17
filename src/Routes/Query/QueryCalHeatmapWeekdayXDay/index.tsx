import { useOutletContext } from 'react-router-dom';
import {
  CalHeatmapWeekdayXDay,
} from './../../../Components';

import './style.css';

function QueryCalHeatmapWeekdayXDay() {
  const { queryString }: { queryString: string } = useOutletContext();
  return (
    <div className='non-stick-top'>
      <span className="hidden">QueryCalHeatmapWeekdayXDay</span>
      <div className='row'>
        <div className='col-sm-12'>
          <CalHeatmapWeekdayXDay queryString={queryString} />
        </div>
      </div>
    </div>
  );
}

export default QueryCalHeatmapWeekdayXDay;
