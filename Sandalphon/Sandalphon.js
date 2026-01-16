alert("abc");
import { ProbsOfRandomDamagesHit } from "probs_of_shadowverse/javascript_files/ProbsOfRandomDamagesHit.js";

class Sandalphon extends ProbsOfRandomDamagesHit {
    constructor(leaderDefense, followerDefenses) {
        super([leaderDefense], followerDefenses, [[0, Math.ceil(leaderDefense / 2)]], 2, 5)
    }
}


// ボタン
const addButton = document.getElementById('addButton');
const decideButton = document.getElementById('decideButton');
// リスト（親）
const list = document.getElementById('myList');
            
window.onload = function() {
    const div = document.getElementById('leader');
    let select = document.createElement('select');

    select.id = 'leaderSelect'
    let opt1 = document.createElement('option');
    opt1.text = '選択してください';
    opt1.value = '';
    opt1.setAttribute('disabled', true)
    opt1.setAttribute('selected', true)
    select.appendChild(opt1);
    for ( var i = 1; i<11; i++ ) {
        let opt = document.createElement('option');
        opt.text =  String(i);
        opt.value = String(i);
        select.appendChild(opt);
    }
    let opt2 = document.createElement('option');
    opt2.text = '11以上';
    opt2.value = '11';
    select.appendChild(opt2);
    div.appendChild(select);
    alert("読み込んだよ");
}

addButton.addEventListener('click', () => {
    alert("osita");
    // 追加したい要素
    let followerID = list.children.length + 1;
    let div = document.createElement('div');
    let label = document.createElement('label')
    let select = document.createElement('select');
    let btn = document.createElement('button');
    if (followerID > 5) {
        return
    }

    // div
    div.id = 'div';
    list.appendChild(div);

    // label
    let text = 'フォロワーの体力';
    let add_text = document.createTextNode(text);
    label.htmlFor = select.id;
    label.appendChild(select);
    label.appendChild(add_text);
    div.appendChild(label);

    // セレクトボックス
    select.id = 'followerSelect';
    let opt1 = document.createElement('option');
    opt1.text = '選択してください';
    opt1.value = '';
    opt1.setAttribute('disabled', true)
    opt1.setAttribute('selected', true)
    select.appendChild(opt1);
    for ( var i = 1; i<11; i++ ) {
        let opt = document.createElement('option');
        opt.text = String(i);
        opt.value = String(i);
        select.appendChild(opt);
    }
    let opt = document.createElement('option');
    opt.text = '11以上';
    opt.value = '11';
    select.appendChild(opt);
    div.appendChild(select);

    // 削除ボタン
    btn.innerHTML = '削除';
    btn.id = 'removeButton';
    btn.onclick = () => {
        div.remove();
    };
    div.appendChild(btn);
});

decideButton.addEventListener('click', () => {
    let el = document.getElementById('result');
    let followerDivs = list.children;
    let followerDefenses = [];
    let leaderDefense = document.getElementById('leaderSelect').value;

    // フォロワーの体力を取得する，入力されていなければ関数を終える
    for ( var i = 0; i<followerDivs.length; i++ ) {
        let followerDefense = followerDivs[i].children[1].value
        if (followerDefense == '') {
            return
        }
        followerDefenses.push(followerDefense)
    }
    // リーダーの体力が入力されていなければ関数を終える
    if (leaderDefense == '') {
        return
    }

    let sandalphon = Sandalphon(leaderDefense, followerDefenses);

    // 確率を表示する
    el.textContent = String(sandalphon.calcProb() * 100) + '%';

});





