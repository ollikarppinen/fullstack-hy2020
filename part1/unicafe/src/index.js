import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} label={'good'} />
      <Button onClick={() => setNeutral(neutral + 1)} label={'neutral'} />
      <Button onClick={() => setBad(bad + 1)} label={'bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({ onClick, label }) => <button onClick={onClick}>{label}</button>

const Statistics = ({ good, neutral, bad }) => {
  const voteCount = good + neutral + bad

  return <div>
    <h1>statistics</h1>
    {voteCount ? (
      <table>
        <tbody>
          <Statistic text='good' value={good}/>
          <Statistic text='neutral' value={neutral}/>
          <Statistic text='bad' value={bad}/>
          <Statistic text='all' value={voteCount}/>
          <Statistic text='average' value={(good - bad) / voteCount}/>
          <Statistic text='positive' value={`${good / voteCount} %`}/>
        </tbody>
      </table>
    ): 'No feedback given'}
    
  </div>
}

const Statistic = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

ReactDOM.render(<App />,
  document.getElementById('root')
)
