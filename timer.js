const timer = function () {
    const date3DaysLater = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
    const countDown = setInterval(() => {
      const now = new Date().getTime();
      const difference = date3DaysLater - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((difference % (1000 * 60)) / 1000);
      document.querySelector(".days").textContent = String(days).padStart(2,0);
      document.querySelector(".hours").textContent = String(hours).padStart(2,0);
      document.querySelector(".minutes").textContent = String(mins).padStart(2,0);
      document.querySelector(".seconds").textContent = String(secs).padStart(2,0);
      if (difference < 0) {
        clearInterval(countDown);
      }
    }, 1000);
  };
  
  timer();