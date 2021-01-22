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
    <p><strong>Number of exercises {sum}</strong></p>
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

const Course = course => <div>
  <Header course={course} />
  <Content course={course} />
  <Total course={course} />
</div>

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <div>
    {courses.map(Course)}
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))