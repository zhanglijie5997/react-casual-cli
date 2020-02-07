import { lazy, Suspense } from 'react';
import ReactDom from 'react-dom';
// import App from './App';
import "@Static/Css/reset.css"
const App = lazy(() => import(/* webpackChunkName:"App" */'./App'))
ReactDom.render(
    <Suspense fallback="loading..."> 
        <App />
    </Suspense>
    , document.getElementById('app'));