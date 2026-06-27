import { useEffect} from 'react';
import './Abacus.css'
function Abacus({ upperBead, lowerBeads, onUpperChange, onLowerChange, placeValue, onValueChange }) {
    

    function calculateValue() {
        let total = 0;

        if (upperBead[0]) {
            total += 5;
        }

        for (let i = 0; i < lowerBeads.length; i++) {
            if (lowerBeads[i]) {
                total += 1;
            }
        }

        return total * placeValue;
    }

    function changeUpperBead(index) {
        const newUpperBead = [...upperBead];
        newUpperBead[index] = !newUpperBead[index];
        onUpperChange(newUpperBead);
        
    }

    function changeLowerBead(index) {
        const isLastActive = lowerBeads[index] && !lowerBeads[index + 1];
        const newLowerBeads = lowerBeads.map((_, i) => {
            if (isLastActive) return false;  // toggle all off
            return i <= index;               // activate 0 to index
        });
        onLowerChange(newLowerBeads);
    }

    const value = calculateValue();
    useEffect(() => {
        onValueChange(value)
    }, [value])

    return (
        <div>
            <p className='place-label'>
            {placeValue === 1 ? 'Ones'
            : placeValue === 10 ? 'Tens'
            : placeValue === 100 ? 'Hundreds'
            : placeValue === 1000 ? 'Thousands'
            : 'Ten Thousands'}
            </p>
            <div className='beads-combo'>
            <div className='upper-beads'>
            {upperBead.map((isActive, index) => (
                <button className="beads-button"
                    key={index}
                    onClick={() => changeUpperBead(index)}
                
                    className={`beads-button ${isActive ? 'active' : ''}`}
                />
            ))}
            </div>
            
            <div className='lower-beads'>
            {lowerBeads.map((isActive, index) => (
                <button className='beads-button'
                    key={index}
                    onClick={() => changeLowerBead(index)}
                
                    className={`beads-button ${isActive ? 'active' : ''}`}
                />
            ))}
            </div>
            </div>
            <p className='beads-value'>Value: {value}</p>
        </div>
    );
}

export default Abacus;