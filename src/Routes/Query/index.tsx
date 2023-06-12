import Multiselect from 'multiselect-react-dropdown';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker';
import moment, { Moment } from 'moment';
import { useState, useEffect } from 'react';
import {
  CalHeatmapHourXDay,
  CalHeatmapDayXDay,
  HourlyHeatmap,
  StatusTimeline,
  Prediction,
} from './../../Components';
import { backendApi } from './../../API';

import './style.css';

const tagList = ['Alarmsignal', 'AstmaHusten', 'Blending', 'Bohren', 'CovidHusten', 'Doseöffnen', 'Electronic_Zahnbürste', 'Etwas-am-Boden-ziehen', 'Fenster', 'Feuerzeug', 'Flöte', 'Fußstapfen-gehen', 'GesunderHusten', 'Gitarre', 'Glas', 'Haartrockner', 'Hahn', 'Handsäge', 'Huhn', 'Hund', 'Katze', 'Klarinette', 'Klassenname', 'klatschen', 'Klingelton', 'Küssen', 'Lachen', 'Mausklick', 'Metall-auf-Metall', 'Möbelrücken', 'Niesen', 'Pfeifen', 'Presslufthammer', 'Ruhe', 'Schlag', 'Schlagzeug', 'Schnarchen', 'Sirene', 'Sitar', 'SprechendeFrau', 'SprechenderMann', 'Staubsauger', 'Tastatur-tippen', 'Toilettenspülung', 'Trampler', 'Trinken', 'Türklingel', 'Türklopfen', 'Uhr-ticken', 'Vandalismus', 'Waschmaschine', 'Wasser', 'Weinen', 'Wimmern', 'Wind', 'Zahnbürste', 'Zerbrechen', 'ZwitscherndeVögel'];

function Query() {
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
  const prefix = `https://thesis-backend-grafana-mys-karlsruhe-0.makelove.expert/d-solo/s4WuoHlVz/indoor-sound-classification`;
  const orgId = 1;
  const refresh = '30s';
  const updateSelectedDevices = (selectedList: any, selectedItem: any) => {
    setSelectedDevices(selectedList);
  }
  const updateSelectedTags = (selectedList: any, selectedItem: any) => {
    setSelectedTags(selectedList);
  }
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
      <span className='hidden'>App Query</span>
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
              showArrow={true}
              className='col-md-4 col-sm-12'
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
              <input type='text' className='form-control' id='time-range' placeholder='' value={`From ${rangeFrom.format()} to ${rangeTo.format()}`} readOnly={true}/>
            </DateTimeRangeContainer>
          </div>
        </div>
        <div className='non-stick-top'>
          <div className='row'>
            <div className='col-sm-12'>
              <Prediction
                prefix={prefix}
                orgId={orgId}
                rangeFrom={rangeFrom.valueOf()}
                rangeTo={rangeTo.valueOf()}
                refresh={refresh}
                deviceId={SelectedDevices.length > 0 ? SelectedDevices.map(option => option.name) : ['All']}
                tags={SelectedTags.length > 0 ? SelectedTags.map(option => option.name) : ['All']} />
            </div>
            <div className='col-sm-12'>
              <CalHeatmapHourXDay
                prefix={prefix}
                orgId={orgId}
                rangeFrom={rangeFrom.valueOf()}
                rangeTo={rangeTo.valueOf()}
                refresh={refresh}
                deviceId={SelectedDevices.length > 0 ? SelectedDevices.map(option => option.name) : ['All']}
                tags={SelectedTags.length > 0 ? SelectedTags.map(option => option.name) : ['All']} />
            </div>
            <div className='col-sm-12'>
              <CalHeatmapDayXDay
                prefix={prefix}
                orgId={orgId}
                rangeFrom={rangeFrom.valueOf()}
                rangeTo={rangeTo.valueOf()}
                refresh={refresh}
                deviceId={SelectedDevices.length > 0 ? SelectedDevices.map(option => option.name) : ['All']}
                tags={SelectedTags.length > 0 ? SelectedTags.map(option => option.name) : ['All']} />
            </div>
            <div className='col-sm-12 col-md-8'>
              <StatusTimeline
                prefix={prefix}
                orgId={orgId}
                rangeFrom={rangeFrom.valueOf()}
                rangeTo={rangeTo.valueOf()}
                refresh={refresh}
                deviceId={SelectedDevices.length > 0 ? SelectedDevices.map(option => option.name) : ['All']}
                tags={SelectedTags.length > 0 ? SelectedTags.map(option => option.name) : ['All']} />
            </div>
            <div className='col-sm-12 col-md-4'>
              <HourlyHeatmap
                prefix={prefix}
                orgId={orgId}
                rangeFrom={rangeFrom.valueOf()}
                rangeTo={rangeTo.valueOf()}
                refresh={refresh}
                deviceId={SelectedDevices.length > 0 ? SelectedDevices.map(option => option.name) : ['All']}
                tags={SelectedTags.length > 0 ? SelectedTags.map(option => option.name) : ['All']} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Query;
