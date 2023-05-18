import {
  Outlet,
  NavLink,
} from 'react-router-dom';
import './style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Layout() {
  return (
    <div>
      <header className={"navbar navbar-dark sticky-top bg-tuc flex-md-nowrap p-0 shadow"}>
        <a className={"navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6"} href="#">Indoor Sound Classification</a>
        <button className={"navbar-toggler position-absolute d-md-none collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className={"navbar-toggler-icon"}></span>
        </button>
        <input className={"form-control form-control-dark w-100 rounded-0 border-0"} type="text" placeholder="Command" aria-label="Command" />
        <div className={"navbar-nav"}>
          <div className={"nav-item text-nowrap"}>
            <a className={"nav-link px-3"} href="#">Exit</a>
          </div>
        </div>
      </header>
      <div className={"container-fluid"}>
        <div className={"row"}>
          <nav id="sidebarMenu" className={"col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"}>
            <div className={"position-sticky pt-3 sidebar-sticky"}>
              <ul className={"nav flex-column"}>
                <li className={"nav-item"}>
                  <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end><i className={"bi bi-house-fill"}></i> Home</NavLink>
                </li>
                <li className={"nav-item"}>
                  <NavLink to="/live" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}><i className={"bi bi-display"}></i> Watch Live Data</NavLink>
                </li>
                <li className={"nav-item"}>
                  <NavLink to="/devices" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}><i className={"bi bi-router"}></i> Manage Devices</NavLink>
                </li>
                <li className={"nav-item"}>
                  <NavLink to="/alert" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}><i className={"bi bi-house-fill"}></i> Manage Alerts</NavLink>
                </li>
                <li className={"nav-item"}>
                  <NavLink to="/query" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}><i className={"bi bi-database"}></i> Query Historical Data</NavLink>
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
                <a href="#">Back to home</a>
              </p>
              <p>     </p>
              <p className={"mb-1"}>Lorem ipsum dolor sit amet, consectetur adipiscing &copy; elit, quis nostrud exercitation.</p>
              <p className={"mb-0"}>Sed do eiusmod tempor <a href="/">incididunt</a> ut labore et <a href="/">dolore magna aliqua</a> Ut enim ad minim veniam,</p>
            </div>
          </footer>
        </div>
      </div>
      <span className={"hidden"}>App layout</span>
    </div >
  );
}

export default Layout;
