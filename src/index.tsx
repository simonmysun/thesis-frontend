import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createHashRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import ErrorPage from "./Routes/Error";
import Layout from './Routes/Layouts/App';
import LayoutAlerts from './Routes/Layouts/Alerts';
import LayoutDevices from './Routes/Layouts/Devices';
import LayoutLive from './Routes/Layouts/Live';
import App from './Routes/App';
import LiveList from './Routes/Live/List';
import LiveView from './Routes/Live/View';
import DeviceList from './Routes/Devices/List';
import DeviceEdit from './Routes/Devices/Edit';
import AlertList from './Routes/Alerts/List';
import AlertEdit from './Routes/Alerts/Edit';
import Query from './Routes/Query';

import reportWebVitals from './reportWebVitals';

const router = createHashRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="live" element={<LayoutLive />}>
                <Route index element={<LiveList />} />
                <Route path=":deviceId" element={<LiveView />} />
            </Route>
            <Route path="devices" element={<LayoutDevices />}>
                <Route index element={<DeviceList />} />
                <Route path="new" element={<DeviceEdit />} />
            </Route>
            <Route path="alert" element={<LayoutAlerts />}>
                <Route index element={<AlertList />} />
                <Route path=":alertId" element={<AlertEdit />} />
                <Route path="new" element={<AlertEdit />} />
            </Route>
            <Route path="query" element={<Query />} />
            <Route path="*" element={<ErrorPage />} />
        </Route>
    )
);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
