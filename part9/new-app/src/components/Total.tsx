import React from "react";

interface TotalProps {
  exerciseCountSum: number;
}

const Total = ({ exerciseCountSum }: TotalProps) => {
  return <p>Number of exercises {exerciseCountSum}</p>;
};

export default Total;
