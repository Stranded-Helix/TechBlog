//set the inactivity timeout time
//3 mins = 180000
const timeout = 180000;
var timeoutTimer;

const logoutOnTimerEnd = async (req, res) => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

const startTimer = () => {
    timeoutTimer = window.setTimeout(logoutOnTimerEnd, timeout)
}

const resetOnActivity = () => {
    window.clearTimeout(timeoutTimer);
    startTimer();
}

const detectActivity = () => {
    document.addEventListener("mousedown", resetOnActivity, false);
    document.addEventListener("keypress", resetOnActivity, false);
    document.addEventListener("touchmove", resetOnActivity, false);
    document.addEventListener("onscroll", resetOnActivity, false);
    startTimer();
}

detectActivity();
