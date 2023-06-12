import Multiselect from 'multiselect-react-dropdown';
import { DateRangePicker } from 'react-date-range';
import { useState, useEffect } from 'react';
import {
  CalHeatmapHourXDay,
  CalHeatmapWeekXMonth,
  HourlyHeatmap,
  StatusTimeline,
  Prediction,
} from './../../Components';
import { backendApi } from './../../API';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
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
  const rangeFrom = 1685692275647;
  const rangeTo = 1686297075647
  const refresh = '30s';
  const updateSelectedDevices = (selectedList: any, selectedItem: any) => {
    setSelectedDevices(selectedList);
  }
  const updateSelectedTags = (selectedList: any, selectedItem: any) => {
    setSelectedTags(selectedList);
  }
  return (
    <div>
      <span className="hidden">App Query</span>
      <div className='scroll-container'>
        <div className='stick-top'>
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
          />
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
        <div className='non-stick-top'>
          <Prediction
            prefix={prefix}
            orgId={orgId}
            rangeFrom={rangeFrom}
            rangeTo={rangeTo}
            refresh={refresh}
            deviceId={SelectedDevices.map(option => option.name)}
            tags={SelectedTags.map(option => option.name)} />
          <CalHeatmapHourXDay
            prefix={prefix}
            orgId={orgId}
            rangeFrom={rangeFrom}
            rangeTo={rangeTo}
            refresh={refresh}
            deviceId={SelectedDevices.map(option => option.name)}
            tags={SelectedTags.map(option => option.name)} />
          <CalHeatmapWeekXMonth
            prefix={prefix}
            orgId={orgId}
            rangeFrom={rangeFrom}
            rangeTo={rangeTo}
            refresh={refresh}
            deviceId={SelectedDevices.map(option => option.name)}
            tags={SelectedTags.map(option => option.name)} />
          <StatusTimeline
            prefix={prefix}
            orgId={orgId}
            rangeFrom={rangeFrom}
            rangeTo={rangeTo}
            refresh={refresh}
            deviceId={SelectedDevices.map(option => option.name)}
            tags={SelectedTags.map(option => option.name)} />
          <HourlyHeatmap
            prefix={prefix}
            orgId={orgId}
            rangeFrom={rangeFrom}
            rangeTo={rangeTo}
            refresh={refresh}
            deviceId={SelectedDevices.map(option => option.name)}
            tags={SelectedTags.map(option => option.name)} />
        </div>
      </div>
    </div>
  );
}

export default Query;
