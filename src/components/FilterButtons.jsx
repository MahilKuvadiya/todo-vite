// FilterButtons.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterTodos, markAllCompleted } from '../redux/actions';

const FilterButtons = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.filter);

  const handleFilter = (filter) => {
    dispatch(filterTodos(filter));
  };

  return (
    <div className="flex space-x-4 items-center">
      <button
        className="text-sm px-2 py-1 bg-gray-500 text-white rounded ml-2"
        onClick={() => dispatch(markAllCompleted())}
      >
        Mark All Completed
      </button>
    </div>
  );
};

export default FilterButtons;