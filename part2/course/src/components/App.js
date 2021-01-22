import React from 'react';

import Course from './Course'

const App = ({ courses }) => <div>
    {courses.map(Course)}
</div>

export default App
