import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    HashRouter,
    Routes,
    Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './Routes/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<App />} />
                <Route path="live" element={<App />}>
                    <Route index element={<App />} />
                    <Route path=":deviceId" element={<App />} />
                </Route>
                <Route path="devices" element={<App />}>
                    <Route index element={<App />} />
                    <Route path=":deviceId" element={<App />} />
                    <Route path="new" element={<App />} />
                </Route>
                <Route path="alert" element={<App />}>
                    <Route index element={<App />} />
                    <Route path=":alertId" element={<App />} />
                    <Route path="new" element={<App />} />
                </Route>
                <Route path="historical_data" element={<App />}/>
            </Route>
        </Routes>
    </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
