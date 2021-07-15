import logo from './logo.svg';
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


const Results = ({text, count}) => {

  return (
    <p>{text} {count}</p>
  )
}




const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = (value) => setGood(value)
  const addNeutral = (value) => setNeutral(value)
  const addBad = (value) => setBad(value)
  

  return (
    <div>
      <Header  text='Give Feedback'/>
      <Button text="good" handleClick ={()=> addGood(good +1)}  />
      <Button text="neutral" handleClick ={()=> addNeutral(neutral +1)}  />
      <Button text="bad" handleClick ={()=> addBad(bad +1)}  />
      <Header text='Statistics'/>
      <Results   text="good" count={good}/>
      <Results   text="neutral" count={neutral}/>
      <Results   text="bad" count={bad}/>
    </div>
  );
}

export default App;
