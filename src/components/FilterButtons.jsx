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
    <div className="flex flex-col gap-y-2 justify-between items-center bg-gray-800 p-4 rounded-md shadow-lg">
      <select
        className="text-base px-3 py-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:border-gray-400 transition duration-300 ease-in-out"
        value={currentFilter}
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="ALL">Default</option>
        <option value="COMPLETED">Completed</option>
        <option value="INCOMPLETE">Incomplete</option>
      </select>

      <button
        className="text-base px-4 py-2 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-600 transition-all duration-300 ease-in-out"
        onClick={() => dispatch(markAllCompleted())}
      >
        Mark All Completed
      </button>
    </div>
  );
};

export default FilterButtons;
