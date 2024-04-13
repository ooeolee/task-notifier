const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const radius = 70;
const backgroundColor = 'black'; // 배경색
const lineColor = '#adadad'; // 선의 색상
const interval = 1000; // 갱신 간격 (1초)
let angle = -Math.PI / 2; // 시작 각도를 위쪽을 바라보도록 설정
let isTimerRunning = false;
let timerInterval;
let leftTimeInterval;
const passedAngles = []; // 선이 지나간 각도를 저장하는 배열
const $canvas = document.querySelector("canvas");
const wrapper = document.querySelector(".wrapper");
const $startBtn = document.querySelector("#startBtn");
const $setTimeInput = document.querySelector("#setTimeInput");
const $resetBtn = document.querySelector("#resetBtn");

const $timefin1 = document.querySelector("#timefin1");
const $timefin2 = document.querySelector("#timefin2");
const $timefin3 = document.querySelector("#timefin3");
const $timefin4 = document.querySelector("#timefin4");

let stateStart = false;
let minutes = 0; // 사용자가 설정한 분
let seconds = 0; // 분을 초로 변환
let pomodoroFinish = true;


function startTimer() {
  stateStart = true;
  console.log('start시작');
  $timefin1.textContent = minutes;
  $timefin2.textContent = minutes * (1/4);
  $timefin3.textContent = minutes * (3/4);
  $timefin4.textContent = minutes * (2/4);

  if (!isTimerRunning) {
    isTimerRunning = true;
    timerInterval = setInterval(updateTimer, interval);
    leftTimeInterval = setInterval(updateLeftTimer, 60000);
  }
}

function pauseTimer() {
  stateStart = false;
  console.log("멈췄습니다");
  if (isTimerRunning) {
    isTimerRunning = false;
    clearInterval(timerInterval);
  }
}

function resetTimer() {
  minutes = 0;
  seconds = 0;
  stateStart = false;
  isTimerRunning = false;
  clearInterval(timerInterval);
  angle = -Math.PI / 2; // 시작 각도를 초기화
  passedAngles.length = 0; // 배열 비우기
  draw();
}
function updateLeftTimer() {
  console.log("updateLectTimer시작");
  let value = Number($setTimeInput.value);
  console.log(value);
  value -= 1;
  $setTimeInput.value = value;
  if($setTimeInput.value == 0){
    pomodoroFinish = false;
    clearInterval(timerInterval);
    minutes  = 0;
    return;
  }
}

function updateTimer() {
  const degreesPerSecond = 360 / seconds; // 초당 회전 각도
  angle += degreesPerSecond * (Math.PI / 180); // 라디안으로 변환하여 각도 증가
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 배경 색상 설정
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 원 그리기
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();

  // 선 그리기
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  const startX = canvas.width / 2 + radius * Math.cos(angle);
  const startY = canvas.height / 2 + radius * Math.sin(angle);
  ctx.lineTo(startX, startY);
  ctx.stroke();

  // 선이 지나간 각도를 배열에 저장
  passedAngles.push(angle);

  // 선이 지나간 부분을 채우기
  ctx.fillStyle = lineColor;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  for (let i = 0; i < passedAngles.length; i++) {
    const x = canvas.width / 2 + radius * Math.cos(passedAngles[i]);
    const y = canvas.height / 2 + radius * Math.sin(passedAngles[i]);
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

// 초기 그리기 실행
draw();

//1.시간 입력을 받는다 (25분)
//2.그 받은 시간이 원 전체가 되고
//3.



wrapper.addEventListener('click',(e) => {
  e.stopPropagation();
  if(e.target == $setTimeInput) {
    return;
  }
  if(stateStart === true) {
    pauseTimer();
  } else {
    minutes =  $setTimeInput.value;
    seconds = minutes * 60;
    startTimer();
  }
});
$resetBtn.addEventListener('click', resetTimer);