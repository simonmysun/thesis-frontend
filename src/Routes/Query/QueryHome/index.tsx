import './style.css';
import { NavLink } from 'react-router-dom';

const visualizations = [
  {
    title: 'Status Timeline',
    imgUrl: 'status-timeline.png',
    link: '/query/status-timeline',
    content: ''
  },
  {
    title: 'Heatmap (hour x day)',
    imgUrl: 'calendar-hour-day-2.png',
    link: '/query/calendar-hour-day',
    content: ''
  },
  {
    title: 'Heatmap (weekday x day)',
    imgUrl: 'calendar-weekday-day.png',
    link: '/query/calendar-weekday-day',
    content: ''
  },
  {
    title: 'Heatmap (hourly)',
    imgUrl: 'hourly-heatmap-2.png',
    link: '/query/hourly-heatmap',
    content: ''
  },
  {
    title: 'Line Chart',
    imgUrl: 'line-chart.png',
    link: '/query/line-chart',
    content: ''
  },
  {
    title: 'All in one',
    imgUrl: 'all-vis.png',
    link: '/query/all',
    content: ''
  },
];

function QueryHome() {
  return (
    <div className='non-stick-top'>
      <span className="hidden">QueryHome</span>
      <div className={"row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3"}>
        {
          visualizations.map(card =>
            <NavLink to={card.link} className={"text-decoration-none"} end>
              <div className={"col"} key={card.title}>
                <div className={"album py-2"}>
                  <div className={"container"}>
                    <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4" style={{ backgroundImage: `url('/img/${card.imgUrl}')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
                      <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-2 square">
                        <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{card.title}</h3>
                        <p className="text-shadow-1">{card.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          )
        }
      </div>
    </div>
  );
}

export default QueryHome;
