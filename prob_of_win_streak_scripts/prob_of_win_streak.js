// ボタン
const decideButton = document.getElementById('decideButton');
// テキストボックス
const winProbText = document.getElementById("winProb");
const trialsText = document.getElementById("trials");
const targetStreakText = document.getElementById("targetStreak");

decideButton.addEventListener('click', () => {
    let el = document.getElementById('result');

    if (!(winProbText.checkValidity() && trialsText.checkValidity() && targetStreakText.checkValidity())) {
        return;
    }

    const winProb = Number(winProbText.value);
    const trials = Number(trialsText.value);
    const targetStreak = Number(targetStreakText.value);
    let result;
    if (trials < targetStreak**3*Math.log2(trials)) {
        result = calcProbOfWinStreakByDP(winProb /100, trials, targetStreak);
    } else {
        result = calcProbOfWinStreakByMatrix(winProb / 100, trials, targetStreak);
    }

    el.textContent = (result * 100).toPrecision(10) + "%";
});

function calcProbOfWinStreakByDP(winProb, trials, targetStreak) {
    const dp = [];
    const c = (1-winProb)*winProb**targetStreak
    for ( var i=0; i<trials+1; i++) {
        if (i < targetStreak) {
            dp.push(0);
        }else if (i == targetStreak){
            dp.push(winProb**targetStreak);
        }else{
            dp.push(dp[i-1] + (1 - dp[i-targetStreak-1])*c);
        }
    }

    return dp[trials];
}

function calcProbOfWinStreakByMatrix(winProb, trials, targetStreak) {
    if (targetStreak > trials) return 0;
    const q = 1 - winProb;

    // 遷移行列の作成
    let T = Array.from({ length: targetStreak }, () => new Float64Array(targetStreak));
    for (let j = 0; j < targetStreak; j++) T[0][j] = q; // 負けたらリセット
    for (let i = 1; i < targetStreak; i++) T[i][i - 1] = winProb; // 勝ったら進む

    const resultMatrix = power(T, trials, targetStreak);
    
    // 全ての状態（0〜targetStreak-1連勝中）の確率を合計
    let probNoRun = 0;
    for (let i = 0; i < targetStreak; i++) {
        // 初期状態は「0連勝」なので、結果行列の各行の0列目を足す
        probNoRun += resultMatrix[i][0];
    }

    return 1 - probNoRun;
}

// 行列の掛け算
function multiply(A, B, size) {
    let C = Array.from({ length: size }, () => new Float64Array(size));
    for (let i = 0; i < size; i++) {
        for (let k = 0; k < size; k++) {
            if (A[i][k] === 0) continue;
            for (let j = 0; j < size; j++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return C;
}

 // 行列累乗
function power(matrix, exp, size) {
    let res = Array.from({ length: size }, (_, i) => {
        let row = new Float64Array(size);
        row[i] = 1; return row;
    });
    while (exp > 0) {
        if (exp % 2 === 1) res = multiply(res, matrix, size);
        matrix = multiply(matrix, matrix, size);
        exp = Math.floor(exp / 2);
    }
    return res;
}