import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from './TodoList';
import FilterButtons from './FilterButtons';
import { BsSearch, BsPlus } from 'react-icons/bs';
import { addTodo, updateSearchTerm, setTodos } from '../redux/actions';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';

const Todo = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      const todosList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      dispatch(setTodos(todosList));
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleAddTodo = async (text) => {
    await addDoc(collection(db, 'todos'), { text, completed: false });
  };

  const handleAddTodoClick = () => {
    if (newTodoText.trim() !== '') {
      handleAddTodo(newTodoText.trim());
      setNewTodoText('');
    }
  };

  const handleDeleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  const handleToggleComplete = async (id, completed) => {
    const todoDoc = doc(db, 'todos', id);
    await updateDoc(todoDoc, { completed: !completed });
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    dispatch(updateSearchTerm(value));
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      window.location.reload();
    }).catch((error) => {
      console.error("Error during sign-out: ", error);
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between bg-black py-4 px-6 shadow-lg border-b border-gray-700">
        <h1 className="text-xl font-bold">Todo App</h1>
        <div className="relative">
          {user && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
          )}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-20 border border-gray-700">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto mt-8 p-4 bg-gray-900 rounded">
        <h2 className="mt-3 mb-6 text-2xl font-bold text-center uppercase">Personal TODO APP</h2>
        <div className="flex items-center mb-4">
          <input
            className="flex-grow p-2 border-b-2 border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-white"
            type="text"
            placeholder="Add Todo"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
          />
          <button
            className="ml-4 p-2 bg-white text-black rounded hover:bg-gray-400 focus:outline-none"
            onClick={handleAddTodoClick}
          >
            <BsPlus size={20} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <FilterButtons />
          <div className="flex items-center mb-4">
            <input
              className="flex-grow p-2 border-b-2 border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-white"
              type="text"
              placeholder="Search Todos"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <button className="ml-4 p-2 bg-white text-black rounded hover:bg-gray-400 focus:outline-none">
              <BsSearch size={20} />
            </button>
          </div>
        </div>

        <TodoList 
          onDeleteTodo={handleDeleteTodo}
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </div>
  );
};

export default Todo;
