import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <section className={"py-5 text-center container"}>
        <div className={"row py-lg-5"}>
          <div className={"col-lg-6 col-md-8 mx-auto"}>
            <h1 className={"fw-light"}>Album example</h1>
            <p className={"lead text-muted"}>Welcome to our web-based demonstration of an advanced Acoustic Event Classification model. Explore the robustness and efficiency of our model, designed for optimal usability and accessibility.</p>
            <p>
              <Link to="." className={"btn btn-primary my-2"}>Main call to action</Link>&nbsp;
              <Link to="." className={"btn btn-secondary my-2"}>Secondary action</Link>
            </p>
          </div>
        </div>
      </section>

      <div className={"album py-5 bg-light"}>
        <div className={"container"}>

          <div className={"row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"}>
            <div className={"col"}>
              <div className={"card shadow-sm"}>
                <svg className={"bd-placeholder-img card-img-top"} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Scalable Architecture</text></svg>
                <div className={"card-body"}>
                  <p className={"card-text"}>Discover the scalability at the core of our solution architecture. We've engineered a system that grows with your needs, ensuring seamless performance as your acoustic event data expands.</p>
                  <div className={"d-flex justify-content-between align-items-center"}>
                    <div className={"btn-group"}>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>View</button>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>Edit</button>
                    </div>
                    <small className={"text-muted"}>9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col"}>
              <div className={"card shadow-sm"}>
                <svg className={"bd-placeholder-img card-img-top"} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Usability Redefined</text></svg>
                <div className={"card-body"}>
                  <p className={"card-text"}>Experience a redesigned website crafted with user-friendliness in mind. Our intuitive interface makes navigating and interacting with the acoustic event classification model effortless for users of all levels.</p>
                  <div className={"d-flex justify-content-between align-items-center"}>
                    <div className={"btn-group"}>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>View</button>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>Edit</button>
                    </div>
                    <small className={"text-muted"}>9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col"}>
              <div className={"card shadow-sm"}>
                <svg className={"bd-placeholder-img card-img-top"} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Real-Time Insights</text></svg>
                <div className={"card-body"}>
                  <p className={"card-text"}>Delve into the power of real-time insights with our acoustic event classification model. Stay informed and respond swiftly to changing audio landscapes, thanks to our model's ability to provide instant results.</p>
                  <div className={"d-flex justify-content-between align-items-center"}>
                    <div className={"btn-group"}>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>View</button>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>Edit</button>
                    </div>
                    <small className={"text-muted"}>9 mins</small>
                  </div>
                </div>
              </div>
            </div>

            <div className={"col"}>
              <div className={"card shadow-sm"}>
                <svg className={"bd-placeholder-img card-img-top"} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Efficiency in Action</text></svg>
                <div className={"card-body"}>
                  <p className={"card-text"}>Witness the efficiency of our model in action. From swift classification to real-time results, we prioritize performance to deliver a seamless and responsive experience.</p>
                  <div className={"d-flex justify-content-between align-items-center"}>
                    <div className={"btn-group"}>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>View</button>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>Edit</button>
                    </div>
                    <small className={"text-muted"}>9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col"}>
              <div className={"card shadow-sm"}>
                <svg className={"bd-placeholder-img card-img-top"} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Accessibility Focus</text></svg>
                <div className={"card-body"}>
                  <p className={"card-text"}>Our commitment to accessibility shines through in every aspect. Explore how our redesigned website prioritizes accessibility, making the acoustic event classification model available to a broader audience.</p>
                  <div className={"d-flex justify-content-between align-items-center"}>
                    <div className={"btn-group"}>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>View</button>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>Edit</button>
                    </div>
                    <small className={"text-muted"}>9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col"}>
              <div className={"card shadow-sm"}>
                <svg className={"bd-placeholder-img card-img-top"} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Configurability Unleashed</text></svg>
                <div className={"card-body"}>
                  <p className={"card-text"}>Tailor the acoustic event classification model to your specific needs with our configurable settings. Empower users to fine-tune parameters for a personalized and optimized experience.</p>
                  <div className={"d-flex justify-content-between align-items-center"}>
                    <div className={"btn-group"}>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>View</button>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>Edit</button>
                    </div>
                    <small className={"text-muted"}>9 mins</small>
                  </div>
                </div>
              </div>
            </div>

            <div className={"col"}>
              <div className={"card shadow-sm"}>
                <svg className={"bd-placeholder-img card-img-top"} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Innovative Demonstration</text></svg>
                <div className={"card-body"}>
                  <p className={"card-text"}>Step into an innovative demonstration that goes beyond the basics. We showcase cutting-edge techniques and technologies in acoustic event classification, pushing the boundaries of what's possible.</p>
                  <div className={"d-flex justify-content-between align-items-center"}>
                    <div className={"btn-group"}>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>View</button>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>Edit</button>
                    </div>
                    <small className={"text-muted"}>9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col"}>
              <div className={"card shadow-sm"}>
                <svg className={"bd-placeholder-img card-img-top"} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">User-Centric Design</text></svg>
                <div className={"card-body"}>
                  <p className={"card-text"}>Our user-centric design philosophy ensures that every interaction with the demonstration is intuitive and delightful. Discover how thoughtful design enhances the overall user experience.</p>
                  <div className={"d-flex justify-content-between align-items-center"}>
                    <div className={"btn-group"}>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>View</button>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>Edit</button>
                    </div>
                    <small className={"text-muted"}>9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col"}>
              <div className={"card shadow-sm"}>
                <svg className={"bd-placeholder-img card-img-top"} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Reliability at its Core</text></svg>
                <div className={"card-body"}>
                  <p className={"card-text"}>Trust in the reliability of our acoustic event classification model. We've engineered a solution that delivers consistent and accurate results, contributing to a dependable user experience.</p>
                  <div className={"d-flex justify-content-between align-items-center"}>
                    <div className={"btn-group"}>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>View</button>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>Edit</button>
                    </div>
                    <small className={"text-muted"}>9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col"}>
              <div className={"card shadow-sm"}>
                <svg className={"bd-placeholder-img card-img-top"} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Smart Configuration Options</text></svg>
                <div className={"card-body"}>
                  <p className={"card-text"}>Explore intelligent configuration options that adapt to your evolving requirements. Our solution offers smart, dynamic configurations that enhance the adaptability of the acoustic event classification process.</p>
                  <div className={"d-flex justify-content-between align-items-center"}>
                    <div className={"btn-group"}>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>View</button>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>Edit</button>
                    </div>
                    <small className={"text-muted"}>9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col"}>
              <div className={"card shadow-sm"}>
                <svg className={"bd-placeholder-img card-img-top"} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Technological Excellence</text></svg>
                <div className={"card-body"}>
                  <p className={"card-text"}>Immerse yourself in a demonstration that reflects technological excellence. From state-of-the-art algorithms to innovative features, our acoustic event classification model is a testament to excellence in technology and design.</p>
                  <div className={"d-flex justify-content-between align-items-center"}>
                    <div className={"btn-group"}>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>View</button>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>Edit</button>
                    </div>
                    <small className={"text-muted"}>9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col"}>
              <div className={"card shadow-sm"}>
                <svg className={"bd-placeholder-img card-img-top"} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Interactive Visualizations</text></svg>
                <div className={"card-body"}>
                  <p className={"card-text"}>Engage with interactive visualizations that bring acoustic data to life. Our redesigned website incorporates visual elements for a more immersive understanding of the acoustic event classification process.</p>
                  <div className={"d-flex justify-content-between align-items-center"}>
                    <div className={"btn-group"}>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>View</button>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>Edit</button>
                    </div>
                    <small className={"text-muted"}>9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col"}>
              <div className={"card shadow-sm"}>
                <svg className={"bd-placeholder-img card-img-top"} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Intuitive Controls</text></svg>
                <div className={"card-body"}>
                  <p className={"card-text"}>Take control with our intuitive user interface. Effortlessly configure and navigate through settings, putting the power of our acoustic event classification model at your fingertips.</p>
                  <div className={"d-flex justify-content-between align-items-center"}>
                    <div className={"btn-group"}>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>View</button>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>Edit</button>
                    </div>
                    <small className={"text-muted"}>9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col"}>
              <div className={"card shadow-sm"}>
                <svg className={"bd-placeholder-img card-img-top"} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Customizable Alerts</text></svg>
                <div className={"card-body"}>
                  <p className={"card-text"}>Set up customizable alerts for specific acoustic events. Tailor notifications to your preferences, enhancing the model's usability for monitoring and responding to critical audio occurrences.</p>
                  <div className={"d-flex justify-content-between align-items-center"}>
                    <div className={"btn-group"}>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>View</button>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>Edit</button>
                    </div>
                    <small className={"text-muted"}>9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col"}>
              <div className={"card shadow-sm"}>
                <svg className={"bd-placeholder-img card-img-top"} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Future-Ready Framework</text></svg>
                <div className={"card-body"}>
                  <p className={"card-text"}>Embrace a future-ready framework that anticipates advancements in acoustic event classification. Our model is designed to accommodate emerging technologies and methodologies, ensuring long-term relevance.</p>
                  <div className={"d-flex justify-content-between align-items-center"}>
                    <div className={"btn-group"}>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>View</button>
                      <button type="button" className={"btn btn-sm btn-outline-secondary"}>Edit</button>
                    </div>
                    <small className={"text-muted"}>9 mins</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="hidden">App index</span>
    </div>
  );
}

export default App;
