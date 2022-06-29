'use strict';

// Selecting elements

const bestScore = document.getElementById('best-score');
const bestScore0 = document.getElementById('best-score-0');
const firstScore = document.getElementById('first-score');
const firstScore0 = document.getElementById('first-score-0');
const avgScore = document.getElementById('avg-score');
const avgScore0 = document.getElementById('avg-score-0');
const questions = document.getElementById('questions');
const current = document.getElementById('current');
const markList = [document.getElementById('m1'),
document.getElementById('m2'),
document.getElementById('m3'),
document.getElementById('m4'),
document.getElementById('m5'),
document.getElementById('m6'),
document.getElementById('m7'),
document.getElementById('m8'),
document.getElementById('m9'),
document.getElementById('m10'),
document.getElementById('m11'),
document.getElementById('m12')];

const denomList = [document.getElementById('d1'),
document.getElementById('d2'),
document.getElementById('d3'),
document.getElementById('d4'),
document.getElementById('d5'),
document.getElementById('d6'),
document.getElementById('d7'),
document.getElementById('d8'),
document.getElementById('d9'),
document.getElementById('d10'),
document.getElementById('d11'),
document.getElementById('d12')];

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');

let mark, denom, scores, totMarks, totDenom, check, avg, indexArr;
let objMark;
// Starting conditions
const init = function () {
  objMark = [];
  scores = " 0 / 0 ";
  for (let index = 0; index < markList.length; index++) {
    //markList[index].value = "";
    //denomList[index].value = "";

    mark = Math.trunc(Math.random() * 10) + 1;
    markList[index].value = mark;
    denomList[index].value = 13;
    //denomList[index].value = Math.max(mark, Math.trunc(Math.random() * 13) + 1);
  }
  questions.textContent = "";
  bestScore.textContent = scores;
  firstScore.textContent = scores;
  avgScore.textContent = scores;

};
init();

const calculate = function () {

  for (let i = 0; i < objMark.length; i++) {
    let target = objMark[i];
    mark = Number(objMark[i].mark);
    let j;
    for (j = i - 1; j >= 0 && (objMark[j].avg < target.avg) && (objMark[j].mark < target.mark); j--) {
      objMark[j + 1] = objMark[j];

    }
    objMark[j + 1] = target;

  }
  console.log(objMark);

  totDenom = 0;
  totMarks = 0;
  let questionSelected = "", queLength;
  const type = document.querySelector('input[name="same"]:checked');
  console.log(type.value);
  if (type.value === "Best 6")
    queLength = 6;
  else
    queLength = 12

  for (let index = 0; index < objMark.length; index++) {
    if (totDenom < 80) {
      mark = Number(objMark[index].mark);
      denom = Number(objMark[index].denom);
      totMarks += mark;
      totDenom += denom;


      questionSelected += "Que-" + (objMark[index].pos) + "  " + mark + " / " + denom + "<br>";
      if (index == 5) {
        bestScore0.textContent = totMarks + " / " + totDenom;
        mark = totMarks;
        denom = 80;
        if (totDenom > 80) {
          mark = Math.ceil(totMarks * (80 / totDenom));
          denom = totDenom * (80 / totDenom);
        }

        bestScore.textContent = mark + " / " + denom;
      }
    }
    questions.innerHTML = questionSelected;
    if (totDenom > 80) {
      firstScore0.textContent = totMarks + " / " + totDenom;

      totMarks = Math.ceil(totMarks * (80 / totDenom));
      totDenom = totDenom * (80 / totDenom);
    }
    firstScore.textContent = totMarks + " / " + totDenom;


  }


}


// Rolling dice functionality
btnRoll.addEventListener('click', function () {

  totMarks = 0;
  totDenom = 0;
  check = true;
  objMark = [];
  avg = [];
  indexArr = [];

  for (let index = 0; index < markList.length; index++) {
    mark = Number(markList[index].value);
    denom = Number(denomList[index].value);

    if (mark > denom) {
      check = false;
      break;
    }

    objMark[index] = { "mark": mark, "denom": denom, "avg": mark / denom, "pos": (index + 1) };


    totMarks += mark;
    totDenom += denom;
    avg[index] = mark / denom;
    indexArr[index] = index;
  }
  if (check) {
    console.log("Original", objMark);
    current.textContent = totMarks + " / " + totDenom;
    avgScore0.textContent = current.textContent;
    if (totDenom <= 80) {
      firstScore.textContent = totMarks + " / 80";
    }

    else {
      totMarks = Math.ceil(totMarks * (80 / totDenom));
      totDenom = totDenom * (80 / totDenom);
      avgScore.textContent = totMarks + " / " + totDenom;
      calculate();

    }
    //score.textContent = "" + Number(document.getElementById('m1').value);
  }
  else {
    alert("Please Check Marks Entry");
  }

});


btnNew.addEventListener('click', init);
