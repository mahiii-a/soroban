import {useEffect, useState, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Abacus from './Abacus';
import './GameScreen.css'
function GameScreen({setUnlockedLevels, lessonProgress, setLessonProgress}){
    //lessons
    // const lessons=[
    //     {id:1,
    //     title: 'Ones',
    //     challenges:[3,7,1,5,9]
    //     },
    //     {id:2,
    //     title:'Tens',
    //     challenges:[10, 40, 70, 30, 90]
    //     },
    //     {id:3,
    //     title:'Hundreds',
    //     challenges:[100, 400, 200, 800, 500]
    //     },
    // ]
    const location=useLocation();
    const level=location.state?.level;
    const timerDuration= level === 'beginner'? 10
    : level==='intermediate' ? 7
    : 5

    const [timeLeft, setTimeLeft] = useState(timerDuration);
    const ref=useRef(null);
    
    const navigate=useNavigate();
    //accessing its state and storig under level
    

    const beginnerLessons = [
        { id: 1, title: 'Ones', challenges: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
        { id: 2, title: 'Tens', challenges: [10, 20, 30, 40, 50, 60, 70, 80, 90] },
        { id: 3, title: 'Hundreds', challenges: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
        { id: 4, title: 'Mixed Ones & Tens', challenges: [11, 23, 35, 47, 52, 64, 76, 88, 19] },
        { id: 5, title: 'Mixed Tens & Hundreds', challenges: [110, 220, 350, 470, 520, 640, 760, 880, 190] },
        { id: 6, title: 'Mixed All', challenges: [123, 456, 789, 321, 654, 987, 213, 546, 879] },
    ]
    const intermediateLessons = [
        { id: 1, title: 'Thousands', challenges: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000] },
        { id: 2, title: 'Mixed Hundreds & Thousands', challenges: [1100, 2200, 3300, 4400, 5500, 6600, 7700, 8800, 9900] },
        { id: 3, title: 'Mixed Three Digits', challenges: [387, 546, 219, 873, 654, 921, 438, 765, 192] },
        { id: 4, title: 'Mixed Four Digits', challenges: [1234, 5678, 3456, 7891, 2345, 6789, 4321, 8765, 1357] },
        { id: 5, title: 'Thousands Challenge', challenges: [1387, 2546, 4219, 6873, 8654, 3921, 5438, 7265, 9192] },
        { id: 6, title: 'Mixed Mastery', challenges: [2468, 1357, 9753, 8642, 7531, 6420, 5319, 4208, 3197] },
        { id: 7, title: 'Speed Round', challenges: [1111, 2222, 3333, 4444, 5555, 6666, 7777, 8888, 9999] },
    ]

    const advancedLessons = [
        { id: 1, title: 'Ten Thousands', challenges: [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000] },
        { id: 2, title: 'Mixed Five Digits', challenges: [11111, 22222, 33333, 44444, 55555, 66666, 77777, 88888, 99999] },
        { id: 3, title: 'Large Mixed', challenges: [12387, 34546, 56219, 78873, 91654, 23765, 45192, 67438, 89321] },
        { id: 4, title: 'Speed Round', challenges: [23456, 67891, 45678, 89123, 34567, 78912, 56789, 12345, 90123] },
        { id: 5, title: 'Near Max', challenges: [91234, 82345, 73456, 64567, 55678, 46789, 37890, 28901, 19012] },
        { id: 6, title: 'Random Chaos', challenges: [98765, 43210, 76543, 21098, 54321, 87654, 32109, 65432, 10987] },
        { id: 7, title: 'Master Round 1', challenges: [19283, 47561, 83920, 56174, 72938, 61482, 39275, 84716, 25893] },
        { id: 8, title: 'Master Round 2', challenges: [91827, 36450, 74829, 18273, 63948, 52716, 84039, 27465, 59382] },
    ]
    const lessons = level === 'beginner' ? beginnerLessons
                : level === 'intermediate' ? intermediateLessons
                : advancedLessons
    

    
    const[currentChallenge, setCurrentChallenge]=useState(0)

    //progress bar
    //deriving progress as a percentage
    const progress=(currentChallenge/lessons[lessonProgress[level]].challenges.length) *100

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

    
    // the exercise part
    // const [target, setTarget]=useState(42); 
    
    const[result, setResult]=useState(null); //correct or wrong

    //checking score now
    const[score, setScore]=useState(0);

    //lives left
    const[lives, setLives]=useState(3);

    //creating timerrr
    //set interval
    function decrementTimer(){
        setTimeLeft(timerDuration)
            //access the ref pointing to the timer element
            ref.current = setInterval(() => {
                    setTimeLeft(prev => {
                        if(prev <=1){
                            //clear the value in ref
                            clearInterval(ref.current);
                            setLives(prev => prev -1);
                            //recursively call timer again 
                            decrementTimer();
                        }
                        return prev-1
                    }
                )
            
            }, 1000)
            //CLEANUP so prev timers stop before next lesson
            return() => clearInterval(ref.current)
    }

    //now using above function
    useEffect(() => {
        decrementTimer();
        //cleanup
        return() => clearInterval(ref.current);

    }, [currentChallenge, lessonProgress[level]])

    if(lessonProgress[level] >= lessons.length){
        if(level == 'beginner'){
            setUnlockedLevels( prev => [...prev, 'intermediate'])
        }else if(level == 'intermediate'){
            setUnlockedLevels(prev => [...prev,'advanced'])
        }
        return(
            <div className="end-screen-container">
                <div className='end-screen-card'>
                    <div className='end-screen-title'>Lessons Complete!</div>
                    <p className='end-screen-subtext'>You finished all challenges in this level.</p>
                    <button className='end-screen-button' onClick={() => navigate('/')}>Back to Home</button>
                </div>
            </div>
        )
    }

    if(lives === 0){
        return(
            <div className='end-screen-container'>
                <div className='end-screen-card'>
                    <h2 className='end-screen-title'>Game Over!</h2>
                    <p className='end-screen-subtext'>You ran out of lives. Final score: {score}</p>
                    <button className='end-screen-button' onClick={RestartGame}>Play Again</button>
                </div>
            </div>
        )
    }
    const target=lessons[lessonProgress[level]].challenges[currentChallenge]
    //creating seperate arrays for beginner, intermediate and advance
    
    
    //format is setInterval(callback, milliseconds so 1000 = 1sec)

    function checkResult(){
        if(total==target){
        setResult('correct');
        setScore(prev => prev + 1)
        }else{
        setResult('wrong');
        setLives(prev => prev -1)
        }
    }

    function clearAbacus() {
        setOnesUpper([false]);
        setOnesLower([false, false, false, false]);
        setTensUpper([false]);
        setTensLower([false, false, false, false]);
        setHundredsUpper([false]);
        setHundredsLower([false, false, false, false]);
        setThousandsUpper([false])
        setThousandsLower([false, false, false, false])
        setTenThousandsUpper([false])
        setTenThousandsLower([false, false, false, false])
        setResult(null); // also we reset the result message
    }

    function newChallenge(){
        // const randomNumber = Math.floor(Math.random() * 999) + 1;
        clearAbacus()
        if(currentChallenge <lessons[lessonProgress[level]].challenges.length-1){
        setCurrentChallenge(prev => prev + 1)
        }
        else{
        setCurrentChallenge(0);
        setLessonProgress(prev => ({
            ...prev,
            [level]: prev[level]+1
        }))
        }
        
    }

    function newGame(){
        newChallenge()
        setScore(0)
    }

    function RestartGame(){
        setLives(3);
        setScore(0)
        setCurrentChallenge(0)
        setLessonProgress(prev => ({
            ...prev,
            [level]: 0
        }));
        clearAbacus();
    }

    function Heart() {
        return (
            <svg
            className="heart"
            viewBox="0 0 24 24"
            width="34"
            height="34"
            >
            <path
                fill="#ff4d6d"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
            </svg>
        );
    }

    return(
        <div className='game-container'>
            <div className='progress-bar-bg'>
                <div className='progress-bar-fill' style={{width: `${progress}%`}}/>
            </div>

            <div className='top-bar'>
                <p className='timer-display'>⏱ {timeLeft}s</p>
                <div className="lives-display">
                    {Array.from({ length: lives }).map((_, i) => (
                        <Heart key={i} />
                    ))}
                </div>
                <div className='score-display'>Score: {score}</div>
            </div>

            <div className='main-app'>
                <div className='soroban-divider'></div>
                {level === 'advanced' && 
                    <Abacus upperBead={tenthousandsUpper} lowerBeads={tenthousandsLower} onUpperChange={setTenThousandsUpper} onLowerChange={setTenThousandsLower} placeValue={10000} onValueChange={setTenThousandsValue}/>
                }
                {(level === 'intermediate' || level === 'advanced') && 
                    <Abacus upperBead={thousandsUpper} lowerBeads={thousandsLower} onUpperChange={setThousandsUpper} onLowerChange={setThousandsLower} placeValue={1000} onValueChange={setThousandsValue}/>
                }
                <Abacus upperBead={hundredsUpper} lowerBeads={hundredsLower} onUpperChange={setHundredsUpper} onLowerChange={setHundredsLower} placeValue={100} onValueChange={setHundredsValue}/>
                <Abacus upperBead={tensUpper} lowerBeads={tensLower} onUpperChange={setTensUpper} onLowerChange={setTensLower} placeValue={10} onValueChange={setTensValue}/>
                <Abacus upperBead={onesUpper} lowerBeads={onesLower} onUpperChange={setOnesUpper} onLowerChange={setOnesLower} placeValue={1} onValueChange={setOnesValue}/>
            </div>

            <p className='target-text'>Set rods to this number: {target}</p>

            <div className='result-banner'>
                {result === 'correct' && <span className='result-correct'> Correct!</span>}
                {result === 'wrong' && <span className='result-wrong'> Try again</span>}
            </div>

            <div className='button-row'>
                <button className='clear-button' onClick={clearAbacus}>Clear</button>
                <button className='check-button' onClick={checkResult} disabled={result!==null}>Check</button>
                <button className='next-button' onClick={newChallenge}>Next</button>
            </div>

            <button className='new-game-button' onClick={newGame}>New Game</button>
        </div>
    )
}

export default GameScreen