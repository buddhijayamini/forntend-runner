import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Auth/Login";
import Profile from "./Auth/Dashboard";
import Register from "./Auth/Register";
import Meeting from "./Meeting/Add";
import ViewMeeting from "./Meeting/View";
import Racing from "./Race/Add";
import ViewRace from "./Race/View";
import Runner from "./Runner/Add";
import ViewRunner from "./Runner/View";
import ViewFormData from "./Runner/FormData";

function App() {
  const token = localStorage.getItem("access_token");

  // if (!token) {
  //   return <SignIn />;
  // }

  return (
    <Router>
      <Fragment>
        <Routes>
         
          {!token ? (
            <>
              <Route exact path="/" element={<SignIn />} />
              <Route exact path="/register" element={<Register />} />
              {/* <Route exact path="/" element={<SignIn />} />
              <Route exact path="/addMeeting" element={<SignIn />} />
              <Route exact path="/viewMeeting" element={<SignIn />} />
              <Route exact path="/addRacing" element={<SignIn />} />
              <Route exact path="/addRunner" element={<SignIn />} /> */}
            </>
           
          ) : (
            <>
              <Route exact path="/" element={<Profile />} />
              <Route exact path="/addMeeting" element={<Meeting />} />
              <Route exact path="/viewMeeting" element={<ViewMeeting />} />
              <Route exact path="/addRacing" element={<Racing />} />
              <Route exact path="/viewRacing" element={<ViewRace />} />
              <Route exact path="/addRunner" element={<Runner />} />
              <Route exact path="/viewRunner" element={<ViewRunner />} />
              <Route exact path="/viewFormData" element={<ViewFormData />} />
            </>
          )}
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
