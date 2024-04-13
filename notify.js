//TTS
function speakNotification(text) {
  // SpeechSynthesis API를 지원하는지 확인
  if ('speechSynthesis' in window) {
      // 새로운 SpeechSynthesisUtterance 객체 생성
      const utterance = new SpeechSynthesisUtterance(text);

      // 음성 인식기를 사용할 때 사용할 언어 및 속도 설정
      utterance.lang = 'ko-KR';
      utterance.rate = 1; // 속도 (기본값은 1)

      // SpeechSynthesisUtterance 객체를 사용하여 텍스트를 음성으로 읽어주기
      speechSynthesis.speak(utterance);
  } else {
      console.error('SpeechSynthesis API is not supported in this browser');
  }
}



const notifyCustom = (notifyText) => {
  Notification.requestPermission().then(permission => {
    
    if (permission === 'granted') {
        // 권한이 허용되었을 때 Notification 표시
        const title = "사용자 알람";
        const bodyText = notifyText;
        //const bodyText = "이 프로그램은 정각알림 프로그램 입니다.";
        const notification = new Notification(title, {
          body: bodyText,
        });
        speakNotification(bodyText);
    } else {
        console.log('Notification permission denied');
    }
});
}

// notification time
const notify = (time) => {
  console.log(time);
  Notification.requestPermission().then(permission => {
    
    if (permission === 'granted') {
        // 권한이 허용되었을 때 Notification 표시
        const title = "Hello"
        //const bodyText = "이 프로그램은 정각알림 프로그램 입니다.";
        const notification = new Notification(title, {
          body: time,
        });
        speakNotification(time);
    } else {
        console.log('Notification permission denied');
    }
});
}
