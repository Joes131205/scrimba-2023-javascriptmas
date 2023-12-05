const countdownDisplayDate = document.getElementById("countdown-display-date");
const countdownDisplayHour = document.getElementById("countdown-display-hour");
const countdownDisplayMinute = document.getElementById("countdown-display-minute");
const countdownDisplaySecond = document.getElementById("countdown-display-second");

function renderCountdown(){
    setInterval(() => {
        const christmas = new Date(2023, 11, 25, 0, 0, 0);
        const current = new Date();

        const timeDifference = christmas - current;
        
        const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        countdownDisplayDate.textContent = remainingDays;
        countdownDisplayHour.textContent = remainingHours;
        countdownDisplayMinute.textContent = remainingMinutes;
        countdownDisplaySecond.textContent = remainingSeconds; 
    }, 1000);
};
 
renderCountdown();