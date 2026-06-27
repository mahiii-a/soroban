import Abacus from './Abacus';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './FreeMode.css'
function FreeMode(){
    const navigate=useNavigate()
    const [onesValue, setOnesValue] = useState(0);
    const [tensValue, setTensValue] = useState(0);
    const [hundredsValue, setHundredsValue] = useState(0);
    const [thousandsValue, setThousandsValue] = useState(0);
    const [tenthousandsValue, setTenThousandsValue] = useState(0);

    //LIFTING THE STATE UP SO EACH BUTTON ACTS DEPENDENT OF THE LATTER

    const [onesUpper, setOnesUpper] = useState([false]);
    const [onesLower, setOnesLower] = useState([false, false, false, false]);

    const [tensUpper, setTensUpper] = useState([false]);
    const [tensLower, setTensLower] = useState([false, false, false, false]);
    
    const [hundredsUpper, setHundredsUpper] = useState([false]);
    const [hundredsLower, setHundredsLower] = useState([false, false, false, false]);
    
    const [thousandsUpper, setThousandsUpper] = useState([false]);
    const [thousandsLower, setThousandsLower] = useState([false, false, false, false]);
    
    const [tenthousandsUpper, setTenThousandsUpper] = useState([false]);
    const [tenthousandsLower, setTenThousandsLower] = useState([false, false, false, false]);
    const total=onesValue + tensValue  + hundredsValue + thousandsValue + tenthousandsValue;
    return(
        <>
            <div className='main-app-free'>
                <div className='soroban-divider-free'></div>
                <Abacus upperBead={tenthousandsUpper} lowerBeads={tenthousandsLower} onUpperChange={setTenThousandsUpper} onLowerChange={setTenThousandsLower} placeValue={10000} onValueChange={setTenThousandsValue}/>
                <Abacus upperBead={thousandsUpper} lowerBeads={thousandsLower} onUpperChange={setThousandsUpper} onLowerChange={setThousandsLower} placeValue={1000} onValueChange={setThousandsValue}/>
                <Abacus upperBead={hundredsUpper} lowerBeads={hundredsLower} onUpperChange={setHundredsUpper} onLowerChange={setHundredsLower} placeValue={100} onValueChange={setHundredsValue}/>
                <Abacus upperBead={tensUpper} lowerBeads={tensLower} onUpperChange={setTensUpper} onLowerChange={setTensLower} placeValue={10} onValueChange={setTensValue}/>
                <Abacus upperBead={onesUpper} lowerBeads={onesLower} onUpperChange={setOnesUpper} onLowerChange={setOnesLower} placeValue={1} onValueChange={setOnesValue}/>
                
            </div>
            <p className='freemode-total'>Total: {total}</p>
            <button className='freemode-back-button' onClick={() => navigate('/')}>Back to Home</button>
        </>
    )
}

export default FreeMode