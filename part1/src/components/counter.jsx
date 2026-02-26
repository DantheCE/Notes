import {useState} from 'react'

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the button
            </div>
        )
    }
    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])
    const [total, setTotal] = useState(0)
    
    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        const updatedLeft = left + 1
        setLeft(updatedLeft)
        setTotal(updatedLeft + right)
    }

    const handleRightClick = () =>  {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
        setTotal(left + right)
    }

    return (
        <div>
            {left}
            <Button onClick={handleLeftClick} text='left'/>
            <Button onClick={handleRightClick} text='right'/>
            {right}
            <History allClicks={allClicks} />
        </div>
    )
}

// const Display = ({counter}) => <div>{counter}</div>


// const App = (props) => {
//     const [ counter, setCounter ] = useState(0)

//     const increaseByOne = () => setCounter(counter + 1)
//     const decreaseByOne = () => setCounter(counter - 1)
//     const setToZero = () => setCounter(0)
    
//     return (
//         <div>
//             <Display counter={counter} />
//             <Button onClick={increaseByOne} text='plus' />
//             <Button onClick={decreaseByOne} text='minus' />
//             <Button onClick={setToZero} text='zero' />
//         </div>
//     )
// }

export default App