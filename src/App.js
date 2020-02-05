import { useEffect, useCallback, useState } from 'react';
import styles from './App.scss';
import test from './static/images/test.png'
const App = () => {
    const [getNum, setNum] = useState(0); 
    useEffect(() => {  
        console.log("_444", 666);
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
