
import './App.css';
import React, {useState} from 'react';

const Header = ({text}) => {

  return (
    <h1>{text}</h1>
  )
}


const Button = (props) => {
  let handleClick = props.handleClick
  let text = props.text


  return(
    <button onClick={handleClick}>

      {text}
    </button>
  )
}


const Statistic = (props) => {

  return (
    <tr><td>{props.text}</td> <td>{props.clicks}</td></tr>
  )
}

const Statistics = ({text, clicks}) => {

  const total = clicks.good + clicks.neutral + clicks.bad
  const avg = (clicks.good - clicks.bad)/total
  const pos = clicks.good/total
if (clicks.good ===0 && clicks.neutral===0 && clicks.bad===0){
  return (
  <div>
    <p>No feedback given</p>
  </div>
  )
}else{
  return (
    <table>
      <Header text='Statistics'/>
      <Statistic text="good" clicks={clicks.good}/>
      <Statistic text="neutral" clicks={clicks.neutral}/>
      <Statistic text="bad" clicks={clicks.bad}/>
      <Statistic text ="average" clicks={avg}/>
      <Statistic text ="positive" clicks={pos}/>
    </table>
  )

}
}




const App = () => {
const [clicks, setClicks] = useState({
  good : 0, neutral : 0, bad : 0
}) 

  const goodClick = () =>
  setClicks({...clicks, good : clicks.good + 1})

  const badClick = () =>
  setClicks({...clicks, bad : clicks.bad + 1})

  const neutralClick = () =>
  setClicks({...clicks, neutral : clicks.neutral + 1})

  


  return (
    <div>
      <Header  text='Give Feedback'/>
      <Button text="good" handleClick ={goodClick} />
      <Button text="neutral" handleClick ={neutralClick}  />
      <Button text="bad" handleClick ={badClick}  />
      <Statistics clicks={clicks}/>


    </div>
  );
}

export default App;
