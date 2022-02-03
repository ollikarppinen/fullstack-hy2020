import React from "react";

type CoursePart = {
  name: string;
  exerciseCount: number;
};

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return <>{courseParts.map(CoursePart)}</>;
};

const CoursePart = ({ name, exerciseCount }: CoursePart) => (
  <p>
    {name} {exerciseCount}
  </p>
);

export default Content;
