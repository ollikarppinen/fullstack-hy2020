import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ course }) => <h1>{course}</h1>
const Content = ({ parts }) => <>{parts.map(Part)}</>
const Part = ({ name, exercises }) => <p>{name} {exercises}</p>
const Total = ({ parts }) => <p>Number of exercises {parts.reduce((sum, { exercises }) => sum + exercises, 0)}</p>

ReactDOM.render(<App />, document.getElementById('root'))
