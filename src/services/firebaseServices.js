import { firestore } from "../lib/firebase";
import {
  doc,
  collection,
  where,
  addDoc,
  getDocs,
  query,
  deleteDoc,
  updateDoc,
  orderBy,
} from "firebase/firestore";

// #########################################################################
// ##################                Excercise          ####################
// #########################################################################
export async function insertExercise(exercise) {
  try {
    const docRef = await addDoc(collection(firestore, "exercises"), {
      level: exercise.level,
      unit: exercise.unit,
      number: exercise.number,
      type: exercise.type,
      title: exercise.title,
      questions: exercise.questions,
      dateCreated: Date.now(),
    });
    return docRef;
  } catch (e) {
    return e;
  }
}

export async function getAllExercises(level, unit) {
  const q = query(
    collection(firestore, "exercises"),
    where("level", "==", level),
    where("unit", "==", unit),
    orderBy("number")
  );

  const result = await getDocs(q);
  return result.docs.map((item) => ({ ...item.data(), docId: item.id }));
}

// #########################################################################
// ##################                Answers Log        ####################
// #########################################################################
export async function insertNewAnswerLog(userId, levelUnit, qType, qsIds) {
  try {
    const docRef = await addDoc(collection(firestore, "answer-log"), {
      userId,
      levelUnit,
      qType,
      qsIds,
      result: "",
      score: "",
      dateCreated: Date.now(),
    });
    return docRef.id;
  } catch (e) {
    return e;
  }
}

export async function updateAnswerLog(id, result, score) {
  const myDoc = doc(firestore, "answer-log", id);
  await updateDoc(myDoc, {
    result: result,
    score: score,
  });
}

// #########################################################################
// ##################        Multi Choice Questions     ####################
// #########################################################################
export async function insertMultiChoice(question) {
  try {
    const docRef = await addDoc(collection(firestore, "multi-choice"), {
      level: question.level,
      unit: question.unit,
      title: question.title,
      choices: question.choices,
      correct: question.correct,
      dateCreated: Date.now(),
    });
    return docRef;
  } catch (e) {
    return e;
  }
}

export async function getAllMultiChoice(level, unit) {
  const q = query(
    collection(firestore, "multi-choice"),
    where("level", "==", level),
    where("unit", "==", unit)
  );

  const result = await getDocs(q);
  return result.docs.map((item) => ({ ...item.data(), docId: item.id }));
}

export async function deleteMultiChoice(docId) {
  await deleteDoc(doc(firestore, "multi-choice", docId));
}

export async function updateMultiChoice(question) {
  const myDoc = doc(firestore, "multi-choice", question.docId);
  await updateDoc(myDoc, {
    title: question.title,
    choices: question.choices,
    correct: question.correct,
  });
}

// #########################################################################
// ##################        Filling Text Questions     ####################
// #########################################################################
export async function insertFillingText(question) {
  try {
    const docRef = await addDoc(collection(firestore, "filling-text"), {
      level: question.level,
      unit: question.unit,
      title: question.title,
      body: question.body,
      dateCreated: Date.now(),
    });
    return docRef;
  } catch (e) {
    return e;
  }
}

export async function getAllFillingText(level, unit) {
  const q = query(
    collection(firestore, "filling-text"),
    where("level", "==", level),
    where("unit", "==", unit)
  );

  const result = await getDocs(q);
  return result.docs.map((item) => ({ ...item.data(), docId: item.id }));
}

export async function deleteFillingText(docId) {
  await deleteDoc(doc(firestore, "filling-text", docId));
}

export async function updateFillingText(question) {
  const myDoc = doc(firestore, "filling-text", question.docId);
  await updateDoc(myDoc, {
    title: question.title,
    body: question.body,
  });
}
