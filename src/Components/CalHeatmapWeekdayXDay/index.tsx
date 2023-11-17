import Iframe from 'react-iframe'
import './style.css';

function CalHeatmapWeekdayXDay(props: {
  queryString: string
}) {
  const panelId = 26;
  const theme = 'light';
  const height = `${127 + 50}px`;
  const {
    queryString
  } = props;
  return (
    <Iframe url={`${queryString}&theme=${theme}&panelId=${panelId}`}
      styles={{ position: 'relative', height: height, width: '100%' }} />
  );
}

export default CalHeatmapWeekdayXDay;