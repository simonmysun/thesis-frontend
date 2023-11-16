import {
  Outlet,
  NavLink,
  Link,
} from 'react-router-dom';
import './style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  return (
    <div>
      <header className={"navbar navbar-dark sticky-top bg-tuc flex-md-nowrap p-0 shadow"}>
        <Link className={"navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6"} to="/">Indoor Sound Classification</Link>
        <button className={"navbar-toggler position-absolute d-md-none collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className={"navbar-toggler-icon"}></span>
        </button>
        <input className={"form-control form-control-dark w-100 rounded-0 border-0"} type="text" placeholder="Command" aria-label="Command" />
        <div className={"navbar-nav"}>
          <div className={"nav-item text-nowrap"}>
            <Link className={"nav-link px-3"} to="/logout">Exit</Link>
          </div>
        </div>
      </header>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={"container-fluid"}>
        <div className={"row"}>
          <nav id="sidebarMenu" className={"col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"}>
            <div className={"position-sticky pt-3 sidebar-sticky"}>
              <ul className={"nav flex-column"}>
                <li className={"nav-item"}>
                  <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end><i className={"bi bi-house-fill"}></i>&nbsp;&nbsp;Home</NavLink>
                </li>
                <li className={"nav-item"}>
                  <NavLink to="/live" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}><i className={"bi bi-display"}></i>&nbsp;&nbsp;Watch Live Data</NavLink>
                </li>
                <li className={"nav-item"}>
                  <NavLink to="/device" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}><i className={"bi bi-router"}></i>&nbsp;&nbsp;Manage Devices</NavLink>
                </li>
                <li className={"nav-item"}>
                  <NavLink to="/alert" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}><i className={"bi bi-house-fill"}></i>&nbsp;&nbsp;Manage Alerts</NavLink>
                </li>
                <li className={"nav-item"}>
                  <NavLink to="/query" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}><i className={"bi bi-database"}></i>&nbsp;&nbsp;Query Historical Data</NavLink>
                </li>
                <li className={"nav-item"}>
                  <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}><i className={"bi bi-sliders"}></i>&nbsp;&nbsp;Settings</NavLink>
                </li>
              </ul>
            </div>
          </nav>
          <main className={"col-md-9 ms-sm-auto col-lg-10 px-md-4 p-3"}>
            <Outlet />
          </main>
          <footer className={"text-muted py-5 col-md-9 ms-sm-auto col-lg-10 px-md-4"}>
            <div className={"container"}>
              <p className={"float-end mb-1"}>
                <Link to="/">Back to home</Link>
              </p>
              <p>     </p>
              <p className={"mb-1"}>Discover the power of acoustic event classification. User-friendly, scalable, and robust. </p>
              <p className={"mb-0"}>For support, contact <Link to="mailto:simonmysun@gmail.com">simonmysun@gmail.com</Link>. &copy; <Link to="https://maoyin.eu">Maoyin Sun</Link>. Stay tuned for more innovations in audio technology from <Link to="https://www.tu-chemnitz.de/informatik/mc/index.php.en">TU Chemnitz</Link>. </p>
            </div>
          </footer>
        </div>
      </div>
      <span className={"hidden"}>App layout</span>
    </div >
  );
}

export default Layout;
