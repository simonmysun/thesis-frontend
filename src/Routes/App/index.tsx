import { Link } from 'react-router-dom';
import './App.css';

const text = [
  {
    title: 'Scalable Architecture',
    imgUrl: 'scalable-architecture-2.webp',
    content: 'Discover the scalability at the core of our solution architecture. We\'ve engineered a system that grows with your needs, ensuring seamless performance as your acoustic event data expands.'
  },
  {
    title: 'Usability Redefined',
    imgUrl: 'usability-redefined-1.webp',
    content: 'Experience a redesigned website crafted with user-friendliness in mind. Our intuitive interface makes navigating and interacting with the acoustic event classification model effortless for users of all levels.'
  },
  {
    title: 'Real-Time Insights',
    imgUrl: 'real-time-insights-1.webp',
    content: 'Delve into the power of real-time insights with our acoustic event classification model. Stay informed and respond swiftly to changing audio landscapes, thanks to our model\'s ability to provide instant results.'
  },
  {
    title: 'Efficiency in Action',
    imgUrl: 'efficiency-in-action.webp',
    content: 'Witness the efficiency of our model in action. From swift classification to real-time results, we prioritize performance to deliver a seamless and responsive experience.'
  },
  {
    title: 'Configurability Unleashed',
    imgUrl: 'configurability-unleashed-2.webp',
    content: 'Tailor the acoustic event classification model to your specific needs with our configurable settings. Empower users to fine-tune parameters for a personalized and optimized experience.'
  },
  {
    title: 'Accessibility Focus',
    imgUrl: 'accessibility-focus.webp',
    content: 'Our commitment to accessibility shines through in every aspect. Explore how our redesigned website prioritizes accessibility, making the acoustic event classification model available to a broader audience.'
  },
  {
    title: 'Innovative Demonstration',
    imgUrl: 'innovative-demonstration.webp',
    content: 'Step into an innovative demonstration that goes beyond the basics. We showcase cutting-edge techniques and technologies in acoustic event classification, pushing the boundaries of what\'s possible.'
  },
  {
    title: 'Customizable Alerts',
    imgUrl: 'customizable-alerts.webp',
    content: 'Set up customizable alerts for specific acoustic events. Tailor notifications to your preferences, enhancing the model\'s usability for monitoring and responding to critical audio occurrences.'
  },
  {
    title: 'User-Centric Design',
    imgUrl: 'user-centric-design.webp',
    content: 'Our user-centric design philosophy ensures that every interaction with the demonstration is intuitive and delightful. Discover how thoughtful design enhances the overall user experience.'
  },
  {
    title: 'Reliability at its Core',
    imgUrl: 'reliability-at-its-core.webp',
    content: 'Trust in the reliability of our acoustic event classification model. We\'ve engineered a solution that delivers consistent and accurate results, contributing to a dependable user experience.'
  },
  {
    title: 'Smart Configuration',
    imgUrl: 'smart-configuration-options.webp',
    content: 'Explore intelligent configuration options that adapt to your evolving requirements. Our solution offers smart, dynamic configurations that enhance the adaptability of the acoustic event classification process.'
  },
  {
    title: 'Technological Excellence',
    imgUrl: 'technological-excellence.webp',
    content: 'Immerse yourself in a demonstration that reflects technological excellence. From state-of-the-art algorithms to innovative features, our acoustic event classification model is a testament to excellence in technology and design.'
  },
  {
    title: 'Interactive Visualizations',
    imgUrl: 'interactive-visualizations.webp',
    content: 'Engage with interactive visualizations that bring acoustic data to life. Our redesigned website incorporates visual elements for a more immersive understanding of the acoustic event classification process.'
  },
  {
    title: 'Intuitive Controls',
    imgUrl: 'intuitive-controls-1.webp',
    content: 'Take control with our intuitive user interface. Effortlessly configure and navigate through settings, putting the power of our acoustic event classification model at your fingertips.'
  },
  {
    title: 'Future-Ready Framework',
    imgUrl: 'future-ready-framework-3.webp',
    content: 'Embrace a future-ready framework that anticipates advancements in acoustic event classification. Our model is designed to accommodate emerging technologies and methodologies, ensuring long-term relevance.'
  }
];

function App() {
  return (
    <div>
      <div className={"heading-container"} style={{
        backgroundImage: `url('/img/heading-bg.webp')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'
      }}>
        <section className={"py-5 text-center container heading"}>
          <div className={"row py-lg-5"}>
            <div className={"col-lg-6 col-md-8 mx-auto"}>
              <h1 className={"fw-light"}>Live Views and Alerts for <br />Indoor Sound Classification</h1>
              <p className={"lead text-muted"}>Welcome to our web-based demonstration of an advanced Acoustic Event Classification model. Explore the robustness and efficiency of our model, designed for optimal usability and accessibility.</p>
              <p>
                <Link to="/live" className={"btn btn-primary my-2"} role="button">Goto Live View</Link>&nbsp;
                <Link to="/device" className={"btn btn-secondary my-2"} role="button">Add New Device</Link>
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className={"row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"}>
        {
          text.map(card =>
            <div className={"col"} key={card.title}>
              <div className={"album py-5"}>
                <div className={"container"}>
                  <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4" style={{ backgroundImage: `url('/img/${card.imgUrl}')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
                    <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-2 square">
                      <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{card.title}</h2>
                      <p className="text-shadow-1">{card.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
      <span className="hidden">App index</span>
    </div>
  );
}

export default App;
