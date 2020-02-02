import React, { useEffect } from 'react';
import styles from './App.scss';
import test from './static/images/test.png'
const App = () => {
    useEffect(() => {
        console.log(2299993332222333);
        for (let index = 0; index < 10; index++) {
            const element = index;
            console.log(element, "igndex111");
        }
    },[])
    return (
        <div className={styles.App}>
            react 项目2244433fff
            <dd>222</dd>
            <img src={test} alt="" className={styles.img}/>
        </div>
    );
}

export default App;
