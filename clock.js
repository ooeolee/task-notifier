const $clockChangeBtn = document.querySelector("#clockChangeBtn");
const $body =  document.querySelector("body");



const clock = () => {
  const date = new Date();
  let hours = Number(date.getHours());
  let minutes = Number(date.getMinutes());
  let seconds = Number(date.getSeconds());
  if(hours > 12) {
    hours -= 12;
  }
  const time = `지금 시각은 ${hours}시 ${minutes}분 입니다`;
  if(minutes === 0 && seconds === 0){
    notify(time);
  }
  
  if(hours < 10) {
    hours = "0" + hours;
  }
  if( minutes < 10) {
    minutes = "0" + minutes;
  }
  if(seconds <10) {
    seconds = "0" + seconds;
  }

  if (stateClockMenu === 'digital') {
    wrapper.style.display = "none"
    $time.style.display = "block";
    $hours.textContent = `${hours}h`;
    $minutes.textContent = `${minutes}m`;
    $seconds.textContent = ` ${seconds}`; 
  } else {
    $time.style.display = 'none';
    wrapper.style.display = 'block';
    }
    //pomodoro check
    if(pomodoroFinish === false) {
      const notifyText = "시간이 종료 되었습니다 휴식하세요";
      notifyCustom(notifyText);
      pomodoroFinish = true;

    }
    //scheduleTimes를 한번씩 돌면서
    items.forEach(item => {
      const newItemValue = item.split(",");
      console.log(newItemValue);
      const newTimeValue = newItemValue[1].split(":");
      const itemHour = parseInt(newTimeValue[0]);
      const itemMinutes = parseInt(newTimeValue[1]);
      const notifyText = `현재시각${itemHour}시 ${itemMinutes}분 ${newItemValue[2]} 시간입니다.`;
      console.log(`itemHour : ${itemHour}  itemMinutes : ${itemMinutes}`);
      if(hours === itemHour && minutes === itemMinutes && seconds ===0) {
          notifyCustom(notifyText);
      }
    });
  }

  $clockChangeBtn.addEventListener('click',() => {
    if(stateClockMenu === 'digital') {
      $clockChangeBtn.style.backgroundColor = "#5f576e";
      stateClockMenu =  'pomodoro';
    } else {
      $clockChangeBtn.style.backgroundColor = "white";
      stateClockMenu = 'digital';
    }
  })



  setInterval(clock, 1000);