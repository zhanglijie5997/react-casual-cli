import { useEffect, useCallback, useState } from 'react';
import styles from './App.scss';
import test from '@Static/Images/test.jpg'
const App = () => {
    const [getNum, setNum] = useState(0); 
    useEffect(() => {  
        fetch("/api/data/getIndexRumorList")
            .then(res => res.json())
            .then(data => {
                console.log(data, ',,,');
            })
        console.log("_44vvfff",process.env, process.env.REACT_APP_URL, process.env.BASE_URL);
        changeState();
    }, []);

    const changeState = useCallback(() => {
        setNum(getNum + 1);
    }, [getNum]);
    
    return (
        <div className={styles.App}>
            <h1>🔥React-Casual-Cli🔥</h1>
            <h2>一款精简的, 不依赖create-react-app的脚手架, 可配置化高</h2>
            <img src={test} className={styles.img} />

        </div>
    );
}

export default App;
