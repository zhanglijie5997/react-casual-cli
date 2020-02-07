import { useEffect, useCallback, useState } from 'react';
import styles from './App.scss';
import test from '@Static/Images/test.jpg'
const App = () => {
    const [getNum, setNum] = useState(0); 
    useEffect(() => {  
        console.log("_44vvfff",process.env, process.env.REACT_APP_URL, process.env.BASE_URL);
        changeState();
    }, []);

    const changeState = useCallback(() => {
        setNum(getNum + 1);
    }, [getNum]);

    return (
        <div className={styles.App}>
            react 项目2244433fff
            <dd onClick={changeState}>{ getNum }</dd>
            <img src={test} className={styles.img} />
        </div>
    );
}

export default App;
