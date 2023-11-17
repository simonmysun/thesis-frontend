import { useOutletContext } from "react-router-dom";
import {
  CalHeatmapHourXDay,
  CalHeatmapWeekdayXDay,
  HourlyHeatmap,
  StatusTimeline,
  Prediction,
} from './../../Components';

import './style.css';

function Query() {
  const { queryString }: { queryString: string } = useOutletContext();
  return (
    <div className='non-stick-top'>
      <span className="hidden">Query</span>
      <div className='row'>
        <div className='col-sm-12'>
          <Prediction queryString={queryString} />
        </div>
        <div className='col-sm-12'>
          <CalHeatmapHourXDay queryString={queryString} />
        </div>
        <div className='col-sm-12'>
          <CalHeatmapWeekdayXDay queryString={queryString} />
        </div>
        <div className='col-sm-12 col-md-8'>
          <StatusTimeline queryString={queryString} />
        </div>
        <div className='col-sm-12 col-md-4'>
          <HourlyHeatmap queryString={queryString} />
        </div>
      </div>
    </div>
  );
}

export default Query;
