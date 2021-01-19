import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const voteCount = good + neutral + bad

  return <>
    <h1>statistics</h1>
    {voteCount ? (
      <>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {voteCount}</div>
        <div>average {(good - bad) / voteCount}</div>
        <div>positive {good / voteCount} %</div>
      </>
    ): 'No feedback given'}
    
  </>
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
