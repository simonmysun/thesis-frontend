// import { useState, useEffect, useRef, useCallback } from 'react';
import CalendarHeatmap from 'reactjs-calendar-heatmap';
// import * as d3 from 'd3';
import './style.css';

function Calendar(props: {
  currentData: any,
  startDate: Date,
  endDate: Date
}) {
  const { currentData, startDate, endDate } = props;
  return (
    <CalendarHeatmap
      data={currentData}
      color={'#005f50'}
      overview={'year'}
      handler={console.log()}>
    </CalendarHeatmap>
  );
}

export default Calendar;
