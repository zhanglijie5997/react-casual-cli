import React, { useEffect } from 'react';
import styles from './App.scss';
import test from './static/images/test.png'
const App = () => {
    useEffect(() => {
        console.log(`object`);
        console.log(222222333);
    },[])
    return (
        <div className={styles.App}>
            react 项目2244433fff
            <img src={test} alt="" className={styles.img}/>
        </div>
    );
}

export default App;
