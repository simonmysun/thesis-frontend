import Iframe from 'react-iframe'
import './style.css';

function CalHeatmapHourXDay(props: {
  queryString: string
}) {
  const panelId = 29;
  const theme = 'light';
  const height = `${892 + 50}px`;
  const {
    queryString
  } = props;
  return (
    <Iframe url={`${queryString}&theme=${theme}&panelId=${panelId}`}
      styles={{ position: 'relative', height: height, width: '100%' }} />
  );
}

export default CalHeatmapHourXDay;