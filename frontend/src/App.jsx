import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import SignIn from "./components/auth/signIn";
import SignUp from "./components/auth/signUp";
import Home from "./pages/Home";
import useStore from "./zustand/store";

function App() {
  const { isAuthenticated, getProfile } = useStore();
  const fetchProfile = async () => {
    const response = await getProfile();
    console.log(response);
  };
  useEffect(() => {
    if (!isAuthenticated) {
      fetchProfile();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/signin" />}
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
