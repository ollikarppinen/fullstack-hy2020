import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0)
  )

  const onNext = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const onVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }
  const mostPoints = points.indexOf(Math.max(...points))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={props.anecdotes[selected]} points={points[selected]} />
      <button onClick={onVote}>vote</button>
      <button onClick={onNext}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={props.anecdotes[mostPoints]} points={points[mostPoints]} />
    </div>
  )
}

const Anecdote = ({ anecdote, points }) => <>
  <div>{anecdote}</div>
  <div>has {points} votes</div>
</>

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
