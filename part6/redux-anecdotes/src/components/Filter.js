import React from "react";
import { changeFilter } from "../reducers/filterReducer";
import { connect } from "react-redux";

export const Filter = ({ changeFilter }) => {
  const style = {
    marginBottom: 10,
    marginTop: 10,
  };

  return (
    <div style={style}>
      filter
      <input
        type="text"
        name="filter"
        onChange={(e) => changeFilter(e.target.value)}
      />
    </div>
  );
};

const mapDispatchToProps = { changeFilter };

const ConnectedFilter = connect(() => {}, mapDispatchToProps)(Filter);

export default ConnectedFilter;
