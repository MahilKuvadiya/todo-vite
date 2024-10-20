import './App.css';
import { auth, provider, signInWithPopup } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import Todo from './components/Todo';

function App() {
  const [user, setUser] = useState(null);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error during Google login: ", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center text-white">
      {user ? (
        <Todo />
      ) : (
        <div className="max-w-4xl p-12 bg-gray-900 shadow-lg rounded-lg text-center">
          <h1 className="text-4xl font-bold text-gray-100 mb-6">
            Task Manager
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            by Mahil.
          </p>
          <button
            className="flex items-center justify-center mx-auto bg-gray-800 hover:bg-gray-700 text-white font-semibold text-lg py-3 px-6 rounded-full transition-transform transform hover:scale-105"
            onClick={signInWithGoogle}
          >
            <img
              className="w-8 h-5 mr-3"
              src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png"
              alt="Google Logo"
            />
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
