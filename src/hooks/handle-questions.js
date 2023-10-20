import {
  playbrightnotification,
  playwronganswer,
} from "./handle-sound-effects";
import Swal from "sweetalert2";

export function doSubmitQAnswer(questions, selectedQuestion, qType) {
  if (qType === "filling-text") {
    let _score = 0;
    let _result = "";
    questions[selectedQuestion].answers.map((line) => {
      if (line.length > 1)
        line.map((str, strIndex) => {
          if (str === line[strIndex - 1]) _score++;
        });
    });
    let _questions = [...questions];
    if (_questions[selectedQuestion].result.startsWith("-")) {
      _result = _score + _questions[selectedQuestion].result.slice(1);

      const arrResult = _result.split("-");
      const resultPercent =
        Math.round((parseInt(arrResult[0]) / parseInt(arrResult[1])) * 100) +
        "%";
      console.log("result in percent : ___ ", resultPercent);

      if (parseInt(arrResult[0]) / parseInt(arrResult[1]) > 0.5) {
        playbrightnotification();
        Swal.fire(
          "Good job!",
          "You answered above 51%  (your score is " + resultPercent + ")"
        );
      } else {
        playwronganswer();
        Swal.fire(
          "No",
          "You answered less than 51%!  (your score is " + resultPercent + ")"
        );
      }

      _questions[selectedQuestion].result = _result;
      _questions[selectedQuestion].submitted = true;
    }

    return _questions;
  } else if (qType === "multi-choice") {
    let _questions = [...questions];
    _questions[selectedQuestion].submitted = true;
    if (
      _questions[selectedQuestion].correct ===
      _questions[selectedQuestion].choosen
    ) {
      _questions[selectedQuestion].result = 1;

      playbrightnotification();
      Swal.fire("Good job!", "You selected currect one!");
    } else {
      _questions[selectedQuestion].result = 0;

      playwronganswer();
      Swal.fire("No", "You selected wrong!");
    }

    return _questions;
  }
}
