import {useState} from 'react';
import Abacus from './Abacus'
import './OnBoarding.css'
// import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
function onboardingScreen(){
    
    const steps = [
    { type: "text", content: "This is a soroban — an ancient Japanese calculator used for counting." },
    { type: "text", content: "Each column has a label above it — Ones, Tens, or Hundreds. That tells you what each bead in that column is worth." },
    { type: "action", content: "Try it! Click any bead in the Ones column to activate it.", check: () => onesUpper.includes(true) || onesLower.includes(true) },
    { type: "text", content: "Notice the bar splitting each column. The single bead above it is worth 5. The four beads below are worth 1 each." },
    { type: "action", content: "Click the upper bead (above the bar) in any column.", check: () => onesUpper.includes(true) || tensUpper.includes(true) || hundredsUpper.includes(true) },
    { type: "text", content: "Lower beads stack together — if you slide up 3 lower beads, that's 1+1+1 = 3, not just 1." },
    { type: "action", content: "Click the lower beads in the Ones column until you've activated exactly 3 of them.", check: () => onesLower.filter(Boolean).length === 3 },
    { type: "text", content: "Now let's combine columns. The number shown is the total across every column added together." },
    { type: "action", content: "Clear your beads, then set the abacus to show exactly 1.", check: () => total === 1 },
    { type: "action", content: "Now set the abacus to show exactly 10. (Hint: use the Tens column!)", check: () => total === 10 },
    { type: "action", content: "Last one — set the abacus to show exactly 100.", check: () => total === 100 },
    { type: "text", content: "Perfect! You understand the basics. Click Next to start solving real challenges." },
    ]
    
    const [onesValue, setOnesValue] = useState(0);
    const [tensValue, setTensValue] = useState(0);
    const [hundredsValue, setHundredsValue] = useState(0);

    const [onesUpper, setOnesUpper] = useState([false]);
    const [onesLower, setOnesLower] = useState([false, false, false, false]);

    const [tensUpper, setTensUpper] = useState([false]);
    const [tensLower, setTensLower] = useState([false, false, false, false]);

    const [hundredsUpper, setHundredsUpper] = useState([false]);
    const [hundredsLower, setHundredsLower] = useState([false, false, false, false]);

     const total=onesValue + tensValue  + hundredsValue ;

    const[currentStep, setCurrentStep]=useState(0);
    const navigate = useNavigate();
    const actionDone= steps[currentStep].type === 'text' || steps[currentStep].check?.()
    function nextButton(){
        if(currentStep != steps.length -1){
            setCurrentStep(prev => prev + 1);
        }
        else{
            skipButton();
        }
        clearAbacus()
        
    }

    function skipButton(){
        navigate('/game', {state: {level: 'beginner'}})
    }

    function clearAbacus(){
        setOnesUpper([false]);
        setOnesLower([false, false, false, false]);
        setTensUpper([false]);
        setTensLower([false, false, false, false]);
        setHundredsUpper([false]);
        setHundredsLower([false, false, false, false]);
        
    }

    return(
        <div className='onboarding-container'>
            <p className='step-text'>{steps[currentStep].content}</p>
            <div className='main-app-onboarding'>
                <div className='soroban-divider-onboarding'></div>
                <Abacus upperBead={hundredsUpper} lowerBeads={hundredsLower} onUpperChange={setHundredsUpper} onLowerChange={setHundredsLower} placeValue={100} onValueChange={setHundredsValue}/>
                <Abacus upperBead={tensUpper} lowerBeads={tensLower} onUpperChange={setTensUpper} onLowerChange={setTensLower} placeValue={10} onValueChange={setTensValue}/>
                <Abacus upperBead={onesUpper} lowerBeads={onesLower} onUpperChange={setOnesUpper} onLowerChange={setOnesLower} placeValue={1} onValueChange={setOnesValue}/>
            </div>
            <div className='onboarding-button-row'>
                <button className='onboarding-skip-button' onClick={skipButton}>Skip</button>
                <button className='onboarding-next-button' onClick={nextButton} disabled={!actionDone}>Next</button>
            </div>
        </div>
    )
}

export default onboardingScreen