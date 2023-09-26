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
    } else {
      _questions[selectedQuestion].result = 0;
    }

    return _questions;
  }
}
