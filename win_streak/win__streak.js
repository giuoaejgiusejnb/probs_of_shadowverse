// ボタン
const decideButton = document.getElementById('decideButton');
// テキストボックス
const winRateText = document.getElementById("win_rate");
const nText = document.getElementById("n");
const mtext = document.getElementById("m");

decideButton.addEventListener('click', () => {
    let el = document.getElementById('result');

    if (!(winRateText.checkValidity() && nText.checkValidity() && mtext.checkValidity())) {
        return;
    }

    el.textContent = `${winStreak(winRateText.value / 100, nText.value, mtext.value)*100}%`;
});

function winStreak(p, n, m) {
    if (n < m) {
        return 0;
    }else if (n == m){
        return p**m;
    }else{
        return winStreak(p, n-1, m) + (1 - winStreak(p, n-m-1, m))*(1-p)*p**m;
    }
}