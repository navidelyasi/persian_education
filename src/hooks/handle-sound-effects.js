import brightnotification from "../sounds/bright-notifications-151766.mp3";
import clickButton from "../sounds/click-button-menu-147349.mp3";
import dynamo from "../sounds/dynamo-163602.mp3";
import errorcall from "../sounds/error-call-to-attention-129258.mp3";
import interface12 from "../sounds/interface-124464.mp3";
import levelpassed from "../sounds/level-passed-143039.mp3";
import notification2 from "../sounds/notification-2-125763.mp3";
import notification4 from "../sounds/notification-4-126507.mp3";
import wronganswer from "../sounds/wrong-answer-126515.mp3";

export function playbrightnotification() {
  const myAudio = new Audio(brightnotification);
  playMyAudio(myAudio);
}

export function playclickButton() {
  const myAudio = new Audio(clickButton);
  playMyAudio(myAudio);
}

export function playnotification2() {
  const myAudio = new Audio(notification2);
  playMyAudio(myAudio);
}

export function playdynamo() {
  const myAudio = new Audio(dynamo);
  playMyAudio(myAudio);
}

export function playinterface12() {
  const myAudio = new Audio(interface12);
  playMyAudio(myAudio);
}

export function playwronganswer() {
  const myAudio = new Audio(wronganswer);
  playMyAudio(myAudio);
}

export function playerrorcall() {
  const myAudio = new Audio(errorcall);
  playMyAudio(myAudio);
}

export function playlevelpassed() {
  const myAudio = new Audio(levelpassed);
  playMyAudio(myAudio);
}

export function playnotification4() {
  const myAudio = new Audio(notification4);
  playMyAudio(myAudio);
}

function playMyAudio(a) {
  a.volume = 0.1;
  a.play();
}
