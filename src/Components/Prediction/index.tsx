import Iframe from 'react-iframe'
import './style.css';

function Prediction(props: {
  queryString: string
}) {
  const panelId = 2;
  const theme = 'light';
  const height = `${200 + 50}px`;
  const { 
    queryString
   } = props;
  return (
    <Iframe url={`${queryString}&theme=${theme}&panelId=${panelId}`}
      styles={{ position: 'relative', height: height, width: '100%' }} />
  );
}

export default Prediction;