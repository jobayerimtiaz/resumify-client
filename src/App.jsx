import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import "./index.css";
import { useDispatch } from "react-redux";
import api from "./configs/api.js";
import { login, setLoading } from "./app/features/authSlice.js";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const data = await api.get("/api/users/data", {
          headers: { Authorization: token },
        });
        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    } catch (err) {
      dispatch(setLoading(false));
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Toaster></Toaster>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="app" element={<Layout></Layout>}>
          <Route index element={<Dashboard></Dashboard>} />
          <Route
            path="builder/:resumeId"
            element={<ResumeBuilder></ResumeBuilder>}
          />
        </Route>
        <Route path="view/:resumeId" element={<Preview></Preview>} />
      </Routes>
    </>
  );
};
export default App;
