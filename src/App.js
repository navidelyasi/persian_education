import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./services/ProtectedRoutes";
import useAuthListener from "./hooks/use-auth-listener";
import Levels from "./pages/Levels";
import CreateExerciseMultiChoiceQs from "./pages/Questions/CreateExerciseMultiChoiceQs";
import CreateExerciseFilling from "./pages/Questions/CreateExerciseFilling";
import CreateExerciseCardsStudy from "./pages/Questions/CreateExerciseCardsStudy";
import AnswerExercises from "./pages/Questions/AnswerExercises";
import AnswerOneExercise from "./pages/Questions/AnswerOneExercise";
import UserContext from "./context/user";
import AnswerMusic from "./pages/Questions/AnswerMusic";
// for test
import { signOut } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useState } from "react";
import {
  insertNewAnswerLog,
  getAllFillingText,
} from "./services/firebaseServices";
import AlertSubmit from "./components/AlertSubmit";

function App() {
  let { user } = useAuthListener();

  const doSomething = () => {};

  return (
    <>
      <>
        {/* <button
          className="btn btn-secondary"
          onClick={() => {
            doSomething();
          }}
        >
          do Something
        </button> 
        <br /> <hr />*/}
        <UserContext.Provider value={user}>
          <Router>
            <Routes>
              <Route element={<ProtectedRoutes user={user} />}>
                <Route path="/" element={<Home />} />
                <Route path="/levels" element={<Levels />} />
                <Route
                  path="/create-exercise-multi"
                  element={<CreateExerciseMultiChoiceQs />}
                />
                <Route
                  path="/create-exercise-filling"
                  element={<CreateExerciseFilling />}
                />
                <Route
                  path="/create-exercise-cards-study"
                  element={<CreateExerciseCardsStudy />}
                />
                <Route path="/music" element={<AnswerMusic />} />
                <Route path="/answer-exercises" element={<AnswerExercises />} />
                <Route
                  path="/answer-one-exercise"
                  element={<AnswerOneExercise />}
                />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </UserContext.Provider>
      </>
    </>
  );
}

export default App;
