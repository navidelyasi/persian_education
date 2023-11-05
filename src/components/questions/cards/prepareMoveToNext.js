import {
  playbrightnotification,
  playwronganswer,
  playinterface12,
} from "../../../hooks/handle-sound-effects";
import Swal from "sweetalert2";

export default function prepareMoveToNext(
  nextQuestionTimeoutRef,
  questions,
  qindex,
  choices,
  i
) {
  playinterface12();
  if (nextQuestionTimeoutRef.current) {
    clearTimeout(nextQuestionTimeoutRef.current);
  }
  return new Promise((resolve, reject) => {
    nextQuestionTimeoutRef.current = setTimeout(() => {
      let _questions = [...questions];
      _questions[qindex].submitted = true;
      if (choices[i].questionIndex === qindex) {
        _questions[qindex].result = 1;
        playbrightnotification();
        Swal.fire("Good job!", "You selected currect one!");
      } else {
        _questions[qindex].result = 0;
        playwronganswer();
        Swal.fire("No", "You selected wrong!");
      }

      resolve(_questions);
    }, 1500);
  });
}
