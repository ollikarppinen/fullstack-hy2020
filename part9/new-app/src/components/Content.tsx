import React from "react";

import { CoursePart, CourseType } from "../App";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return <>{courseParts.map(Part)}</>;
};

const Part = (coursePart: CoursePart) => {
  let str;
  switch (coursePart.type) {
    case CourseType.GroupProject:
      str = `${coursePart.name} ${coursePart.exerciseCount} ${coursePart.type} ${coursePart.groupProjectCount}`;
      break;
    case CourseType.Normal:
      str = `${coursePart.name} ${coursePart.exerciseCount} ${coursePart.type}`;
      break;
    case CourseType.Submission:
      str = `${coursePart.name} ${coursePart.exerciseCount} ${coursePart.type} ${coursePart.description} ${coursePart.exerciseSubmissionLink}`;
      break;
    case CourseType.Special:
      str = `${coursePart.name} ${coursePart.exerciseCount} ${coursePart.type} ${coursePart.description} ${coursePart.requirements}`;
      break;
  }
  return <p>{str}</p>;
};

export default Content;
