import React from "react";

import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

export enum CourseType {
  Normal = "normal",
  Submission = "submission",
  GroupProject = "groupProject",
  Special = "special",
}

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: CourseType;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseWithDescription {
  type: CourseType.Normal;
}
interface CourseProjectPart extends CoursePartBase {
  type: CourseType.GroupProject;
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseWithDescription {
  type: CourseType.Submission;
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseWithDescription {
  type: CourseType.Special;
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: CourseType.Normal,
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: CourseType.Normal,
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: CourseType.GroupProject,
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: CourseType.Submission,
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: CourseType.Special,
  },
];

const App = () => {
  const courseName = "Half Stack application development";

  const exerciseCountSum = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total exerciseCountSum={exerciseCountSum} />
    </div>
  );
};

export default App;
