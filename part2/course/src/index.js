import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course: { name } }) => {
  return (
    <h1>{name}</h1>
  )
}

const Total = ({ course: { parts = [] } }) => {
  const sum = parts.reduce((sum, { exercises = 0 }) => sum + exercises, 0)
  return (
    <p>Number of exercises {sum}</p>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ course: { parts = [] } }) => {
  return (
    <div>
      {parts.map(Part)}
    </div>
  )
}

const Course = ({ course = {} }) => <div>
  <Header course={course} />
  <Content course={course} />
  <Total course={course} />
</div>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))