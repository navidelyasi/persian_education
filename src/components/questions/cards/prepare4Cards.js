import { shuffle } from "../../../hooks/prepare-qs-for-answering";

export default function prepare4Cards(questions, qindex) {
  let _choices = [
    {
      ...questions[qindex],
      questionIndex: qindex,
      rotate: 0,
      source: require(`../../../data/icons/unit11/${questions[qindex].name1}.png`),
    },
  ];
  for (let i = 1; i < 4; i++) {
    let myRand = -1;
    while (myRand === -1) {
      let _myRand = Math.floor(Math.random() * questions.length);
      let repeated = false;
      _choices.forEach((item) => {
        if (item.questionIndex === _myRand) {
          repeated = true;
        }
      });
      if (!repeated) {
        myRand = _myRand;
        _choices.push({
          ...questions[myRand],
          questionIndex: myRand,
          rotate: 0,
          source: require(`../../../data/icons/unit11/${questions[myRand].name1}.png`),
        });
      }
    }
  }

  return shuffle(_choices);
}
