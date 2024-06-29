import Quora from "./components/Quora";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./feature/userSlice";
import Login from "./components/auth/Login";
import React, { useEffect } from "react";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
// import QuoraBox from "./components/QuoraBox";


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(login({
          userName: authUser.displayName,
          photo: authUser.photoURL,
          email: authUser.email,
          uid: authUser.uid,
        }))
        localStorage.setItem("user",JSON.stringify(authUser))
        // console.log("hii baby", authUser);
      }
    })
  },[dispatch]);
  return (
    <div className="App">
      {
        user ?<><button onClick={() => { console.log("button clicked");}}>click me</button> <Quora /> </>: <Login />
      }
    </div>
  );
}

export default App;
