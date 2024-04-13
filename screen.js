const body = document.querySelector('body');
const $wrapper = document.querySelector('#wrapper');

const $menu = document.querySelector('#menu');
const $menuBtn = document.querySelector('.menuBtn');
const $menuChangeBtn = document.querySelector('#menuChangeBtn');
const $deco1 = document.querySelector('#menu-deco1');
const $deco2 = document.querySelector('#menu-deco2');

const $clock = document.querySelector('#clock');
const $customNoti = document.querySelector('#customNoti');
const $madedAlarms = document.querySelector('#madedAlarms');
const $time = document.querySelector("#time");

const $hours = document.querySelector('#hours');
const $minutes = document.querySelector('#minutes');
const $seconds = document.querySelector('#seconds');

const $form = document.querySelector('form');
const $apInput = document.querySelector("#apInput");
const $titleInput = document.querySelector('#titleInput');
const $timeInput = document.querySelector('#timeInput');

const $deleteBtn = $madedAlarms.querySelector(".deleteBtn");

const $apTable = document.querySelector("#ap-table");
const $timeTable = document.querySelector("#time-table");
const $apSelect = document.querySelector("#ap-select");
const $timeSelect = document.querySelector("#time-select");


let stateMenu = 'clock';
let stateClockMenu = 'digital';
let scheduledAlarms = [];
let scheduledHours;
let scheduledMinutes;

let apSelectState = false;
let timeSelectState = false;

let items = [];
let left = 15;
let right = 45;
const endTime = 40;




const clearList = () => {
  while ($madedAlarms.firstChild) {
    $madedAlarms.removeChild($madedAlarms.firstChild);
  }
}

const drawList = () => {
  for(i = 1;  i <= localStorage.length; i++)  {
    let value = localStorage.getItem(i);
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const li = document.createElement("li");
    const $deleteBtn = document.createElement('button');
    $deleteBtn.classList = "deleteBtn";
    $deleteBtn.innerText = 'X';
    let newValue = value.split(",");
    const ap = newValue[0];
    const time = newValue[1];
    const title= newValue[2];
    span1.textContent = `${ap}\u00a0${time}\u00a0\u00a0`;
    span2.textContent = `${title}\u00a0\u00a0`;
    li.appendChild(span1);
    li.appendChild(span2);
    li.dataset.key = i;
    li.appendChild($deleteBtn);
    $madedAlarms.appendChild(li);
  }
}
  

  $madedAlarms.addEventListener('click', (event) => {
    event.preventDefault();
    if(event.target.classList.contains('deleteBtn')) {
      const li = event.target.parentElement;
      const liNumber = li.dataset.key;
      localStorage.removeItem(liNumber);
      items.splice(liNumber-1, 1);
      const keys = Object.keys(localStorage);
      keys.sort((a,b) => parseInt(a) - parseInt(b));
      
      for(i = 0; i < items.length; i++) {
        let currentKey = keys[i];
        const value = localStorage.getItem(currentKey);
        localStorage.removeItem(currentKey);
        localStorage.setItem(i+1,value );
      }
      clearList();
      drawList();
    } 
  })




//메뉴 바꾸기
const changeMenu = () => {
  if (stateMenu === 'clock') {
    $clock.style.display = 'none';
    $clockChangeBtn.style.display = 'none';
    $customNoti.style.display = 'block';
    $menuChangeBtn.textContent = "A"
    $menuChangeBtn.style.backgroundColor = "#464646";
    $deco1.style.backgroundColor = "#464646";
    $deco2.style.backgroundColor = "#464646";
    
    $menuChangeBtn.style.color = "white";
    
    $menu.style.backgroundColor = "#c4c4c4";

    stateMenu = 'customNoti';
    clearList();
    drawList();
  } else if (stateMenu === 'customNoti'){
    $customNoti.style.display = 'none';
    $clock.style.display = 'block';
    $clockChangeBtn.style.display = 'block';
    $menuChangeBtn.textContent = "C"
    $menu.style.backgroundColor = "black";
    $menuChangeBtn.style.backgroundColor = "#b1b1b1";
    $deco1.style.backgroundColor = "#b1b1b1";
    $deco2.style.backgroundColor = "#b1b1b1";
    $menuChangeBtn.style.color = "black";
    stateMenu = 'clock';
  }
}  

//toggle
//1. input창 안에 있는 아래화살표를 누르면 그리드 버튼들이 나온다
//2. 그 버튼을 클릭하면 시간이 선택되고 그 값이 input값이 된다.
const formHandler = (event) => {
  event.preventDefault();
  const listItem = `${$apInput.value},${$timeInput.value},${$titleInput.value}`;
  
  items.push(listItem);
  localStorage.setItem(items.length, listItem);
  clearList();
  drawList();
  
}


$menuChangeBtn.addEventListener('click', changeMenu);
$apSelect.addEventListener('click', () => {

  if(apSelectState === false ) {
    apSelectState = true;
    $apTable.style.display = 'block';
  } else {
    apSelectState = false;
    $apTable.style.display = 'none';
  }
});



$timeSelect.addEventListener('click', () => {
  if(timeSelectState === false ) {
    timeSelectState = true;
    $timeTable.style.display = 'block';
  } else {
    timeSelectState = false;
    $timeTable.style.display = 'none';
  }
});
$timeTable.addEventListener('click', (event) => {
  $timeInput.value = event.target.textContent;
})
$apTable.addEventListener('click', (event) => {
  $apInput.value = event.target.textContent;
})

$form.addEventListener('submit', formHandler);

body.addEventListener("click", (e) => {
  const selects = document.querySelectorAll("select");
  if (!Array.from(selects).includes(e.target)) {
    $timeTable.style.display = 'none';
    $apTable.style.display = 'none';
  }
});

