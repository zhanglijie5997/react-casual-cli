import React, { useEffect } from 'react';
import styles from './App.scss';
import test from './static/images/test.png'
const App = () => {
    useEffect(() => { 
        console.log("_");
    }, []);
    return (
        <div className={styles.App}>
            react 项目2244433fff
            <dd>222</dd>
            {/* <img src={test} className={styles.img} /> */}
        </div>
    );
}

export default App;
