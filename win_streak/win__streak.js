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
    const dp = [];
    for ( var i=0; i<n+1; i++) {
        if (i < m) {
            dp.push(0);
        }else if (i == m){
            dp.push(p**m);
        }else{
            dp.push(dp[i-1] + (1 - dp[i-m-1])*(1-p)*p**m);
        }
    }

    return dp[n];
}