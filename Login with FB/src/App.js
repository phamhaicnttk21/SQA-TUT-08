import "./App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { authentication } from "./firebase";

function App() {
  const navigate = useNavigate(); // Hook for navigation

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(authentication, provider)
      .then((resolve) => {
        console.log(resolve);
        navigate("/dashboard"); // Redirect to dashboard on success
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='App'>
      <button onClick={signInWithFacebook}>Sign in with Facebook</button>
    </div>
  );
}

export default App;
