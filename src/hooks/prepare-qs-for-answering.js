import React from "react";

export function prepareFillingTextQs(questions) {
  let _allQuestions = [...questions];
  if (_allQuestions) {
    _allQuestions.forEach((question, questionIndex) => {
      let _body = question.body.split("\n");
      _body.forEach((line, lineIndex) => {
        if (line.startsWith("@")) {
          _body[lineIndex] = " " + line;
        }
        if (line.endsWith("@")) {
          _body[lineIndex] = line + " ";
          _body[lineIndex] = " " + line;
        }
      });
      _body = _body.map((val) => {
        return val.split("@");
      });
      _allQuestions[questionIndex].body = _body;

      let _ans = [];
      let _score = 0;
      _body.forEach((line) => {
        if (line.length === 1) _ans.push([""]);
        else {
          let _a = [];
          line.forEach((str, i) => {
            if (i % 2) {
              // console.log("before concat : ", _a, str);
              _a = _a.concat([str, ""]);
              _score++;
            }
          });

          _ans.push(_a);
        }
      });

      _allQuestions[questionIndex].answers = _ans;
      _allQuestions[questionIndex].result = "--" + _score;
      _allQuestions[questionIndex].submitted = false;
      _allQuestions[questionIndex].helped = false;
    });
  }

  return _allQuestions;
}

export function prepareMultiChoiceQs(questions) {
  let _allQuestions = [...questions];
  if (_allQuestions) {
    _allQuestions.forEach((question, questionIndex) => {
      _allQuestions[questionIndex].choosen = -1;
      _allQuestions[questionIndex].submitted = false;
      _allQuestions[questionIndex].helped = false;
    });
  }

  return _allQuestions;
}

export function prepareExercises(exercises) {
  let _exercises = [...exercises];
  _exercises.forEach((exercise, exerciseIndex) => {
    if (exercise.type === "multi-choice") {
      _exercises.questions = prepareMultiChoiceQs(exercise.questions);
    } else if (exercise.type === "filling-text") {
      _exercises.questions = prepareFillingTextQs(exercise.questions);
    }
  });

  return _exercises;
}
