import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Level1 from "./pages/Level1";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./hooks/ProtectedRoutes";
import useAuthListener from "./hooks/use-auth-listener";
import Level2 from "./pages/Level2";
import CreateExerciseMulti from "./pages/Questions/CreateExerciseMulti";
import CreateExerciseFilling from "./pages/Questions/CreateExerciseFilling";
import CreateExerciseCards from "./pages/Questions/CreateExerciseCards";
import AnswerExercises from "./pages/Questions/AnswerExercises";
import UserContext from "./database/user";
import AnswerMusic from "./pages/Questions/AnswerMusic";

function App() {
  let { user } = useAuthListener();

  return (
    <>
      <UserContext.Provider value={user}>
        <Router>
          <Routes>
            <Route element={<ProtectedRoutes user={user} />}>
              <Route path="/" element={<Level1 />} />
              <Route path="/level2" element={<Level2 />} />
              <Route
                path="/create-exercise-multi"
                element={<CreateExerciseMulti />}
              />
              <Route
                path="/create-exercise-filling"
                element={<CreateExerciseFilling />}
              />
              <Route
                path="/create-exercise-cards-study"
                element={<CreateExerciseCards />}
              />
              <Route path="/music" element={<AnswerMusic />} />
              <Route path="/answer-exercises" element={<AnswerExercises />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
