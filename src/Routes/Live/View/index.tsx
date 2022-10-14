import { useParams } from 'react-router-dom';

import './style.css';
import { Heatmap, Ridgeline } from './../../../Components';

function LiveView(props: any) {
  const { deviceID } = useParams();
  return (
    <div>
      App LiveView
      <div className="heatmap-container">
        <Heatmap source={ deviceID } />
      </div>
      <div className="ridgeline-container">
        <Ridgeline source="{ deviceID }" />
      </div>
    </div>
  );
}

export default LiveView;
