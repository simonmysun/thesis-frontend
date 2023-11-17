import Multiselect from 'multiselect-react-dropdown';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker';
import moment, { Moment } from 'moment';
import { useState, useEffect } from 'react';
import {
  Outlet,
  NavLink,
} from 'react-router-dom';
import { backendApi, grafanaApi, tagList } from './../../../API';

import './style.css';

function LayoutQuery() {
  const [deviceList, setDeviceList] = useState<DeviceObject[]>([]);
  const [deviceListLoading, setDeviceListLoading] = useState<boolean>(true);
  useEffect(() => {
    backendApi.devices.list().then(res => {
      setDeviceList(res);
      setDeviceListLoading(false);
    });
  }, []);
  const [SelectedDevices, setSelectedDevices] = useState<{ name: string, id: number }[]>([]);
  const [SelectedTags, setSelectedTags] = useState<{ name: string, id: number }[]>([]);
  const prefix = grafanaApi.endPoint;
  const orgId = 1;
  const refresh = '30s';
  const updateSelectedDevices = (selectedList: any, selectedItem: any) => {
    setSelectedDevices(selectedList);
  };
  const updateSelectedTags = (selectedList: any, selectedItem: any) => {
    setSelectedTags(selectedList);
  };
  let now = new Date();
  let dayStart = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
  const [rangeFrom, setRangeFrom] = useState<Moment>(moment(now).subtract(15, 'minutes'));
  const [rangeTo, setRangeTo] = useState<Moment>(moment(now));
  let ranges = {
    'Last 15 Minutes': [moment(now).subtract(15, 'minutes'), moment(now)],
    'Today Only': [moment(dayStart).subtract(1, 'days'), moment(dayStart).subtract(1, 'seconds')],
    'Yesterday Only': [moment(dayStart).subtract(2, 'days'), moment(dayStart).subtract(1, 'days')],
    'Last 24 Hours': [moment(now).subtract(1, 'days'), moment(now)],
    'Last 3 Days': [moment(dayStart).subtract(3, 'days'), moment(dayStart).subtract(1, 'seconds')],
    'Last Week': [moment(dayStart).subtract(7, 'days'), moment(dayStart).subtract(1, 'seconds')],
    'Last 14 Days': [moment(dayStart).subtract(14, 'days'), moment(dayStart).subtract(1, 'seconds')],
    'Last Month': [moment(dayStart).subtract(1, 'month'), moment(dayStart).subtract(1, 'seconds')],
    'Last Year': [moment(dayStart).subtract(1, 'year'), moment(dayStart).subtract(1, 'seconds')],
  };
  let local = {
    'format': 'DD-MM-YYYY HH:mm',
    'sundayFirst': false
  };
  let maxDate = moment(now);
  const setRange = (startDate: Moment, endDate: Moment) => {
    setRangeFrom(startDate);
    setRangeTo(endDate);
  };
  return (
    <div>
      <span className="hidden">App layout query</span>
      <div className='scroll-container'>
        <div className='stick-top row'>
          <div className='col-md-4 col-sm-12'>
            <Multiselect
              options={deviceList.map((device, id) => ({
                name: device.name,
                id: id
              }))} // Options to display in the dropdown
              selectedValues={SelectedDevices} // Preselected value to persist in dropdown
              onSelect={updateSelectedDevices} // Function will trigger on select event
              onRemove={updateSelectedDevices} // Function will trigger on remove event
              displayValue='name' // Property name to display in the dropdown options
              placeholder='Select device'
              loading={deviceListLoading}
              singleSelect={true}
              showArrow={true}
            />
          </div>
          <div className='col-md-4 col-sm-12'>
            <Multiselect
              options={tagList.map((tag, id) => ({
                name: tag,
                id: id
              }))} // Options to display in the dropdown
              selectedValues={SelectedTags} // Preselected value to persist in dropdown
              onSelect={updateSelectedTags} // Function will trigger on select event
              onRemove={updateSelectedTags} // Function will trigger on remove event
              displayValue='name' // Property name to display in the dropdown options
              placeholder='Select tags'
              showArrow={true}
            />
          </div>
          <div className='col-md-4 col-sm-12'>
            <DateTimeRangeContainer
              ranges={ranges}
              start={rangeFrom}
              end={rangeTo}
              local={local}
              maxDate={maxDate}
              applyCallback={setRange}
            >
              <input type='text' className='form-control' id='time-range' placeholder='' value={`From ${rangeFrom.format()} to ${rangeTo.format()}`} readOnly={true} />
            </DateTimeRangeContainer>
          </div>
        </div>
        <div className="btn-group" role="group" aria-label="query type buttons">
          <NavLink to="/query/status-timeline" className={({ isActive }) => "query-type-link btn btn-outline-primary" + (isActive ? " active" : "")} end>Status Timeline</NavLink>
          <NavLink to="/query/calendar-hour-day" className={({ isActive }) => "query-type-link btn btn-outline-primary" + (isActive ? " active" : "")} end>Heatmap (hour x day)</NavLink>
          <NavLink to="/query/calendar-weekday-day" className={({ isActive }) => "query-type-link btn btn-outline-primary" + (isActive ? " active" : "")} end>Heatmap (weekday x day)</NavLink>
          <NavLink to="/query/hourly-heatmap" className={({ isActive }) => "query-type-link btn btn-outline-primary" + (isActive ? " active" : "")} end>Heatmap (hourly)</NavLink>
          <NavLink to="/query/line-chart" className={({ isActive }) => "query-type-link btn btn-outline-primary" + (isActive ? " active" : "")} end>Line Chart</NavLink>
          <NavLink to="/query/all" className={({ isActive }) => "query-type-link btn btn-outline-primary" + (isActive ? " active" : "")} end>All</NavLink>
        </div>
        <Outlet context={{ queryString: `${prefix}?orgId=${orgId}&from=${rangeFrom.valueOf()}&to=${rangeTo.valueOf()}&refresh=${refresh}${(SelectedDevices.length > 0 ? SelectedDevices.map(option => option.name) : ['All']).map(id => `&var-device_id=${id}`).join('')}${(SelectedTags.length > 0 ? SelectedTags.map(option => option.name) : ['All']).map(tag => `&var-tag=${tag}`).join('')}` }} />
      </div>
    </div>
  );
}

export default LayoutQuery;
