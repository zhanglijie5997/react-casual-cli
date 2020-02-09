import React, { lazy, Suspense } from 'react';
import ReactDom from 'react-dom';
// import App from './App';
import "@Static/Css/reset.css"
// 预加载 /* webpackPreload: true */
// 预先拉取 /* webpackPrefetch: true */
const App = lazy(() => import(/* webpackPreload: true */'./App'))
ReactDom.render(
    <Suspense fallback="loading..."> 
        <App />
    </Suspense>
    , document.getElementById('app'));