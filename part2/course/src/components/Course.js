import React from 'react';

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

export default Course
