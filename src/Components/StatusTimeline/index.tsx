import Iframe from 'react-iframe'
import './style.css';

function StatusTimeline(props: {
  queryString: string
}) {
  const panelId = 24;
  const theme = 'light';
  const height = `${600}px`;
  const {
    queryString
  } = props;
  return (
    <Iframe url={`${queryString}&theme=${theme}&panelId=${panelId}`}
      styles={{ position: 'relative', height: height, width: '100%' }} />
  );
}

export default StatusTimeline;