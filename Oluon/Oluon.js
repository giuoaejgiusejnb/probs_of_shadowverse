import { ProbsOfRandomDamagesHit } from "../javascript_files/ProbsOfRandomDamagesHit.js";

class Oluon extends ProbsOfRandomDamagesHit {
    constructor(yourDefense,opponentsDefense, followerDefenses) {
        super([yourDefense, opponentsDefense], followerDefenses, [[0, Math.ceil(yourDefense / 7)], [1, Math.ceil(opponentsDefense / 7)]], 7, 3)
    }
}


// ボタン
const addButton = document.getElementById('addButton');
const decideButton = document.getElementById('decideButton');
// リスト（親）
const list = document.getElementById('myList');
            
window.onload = function() {
    for ( var i=0; i<2; i++ ) {
        const div = document.getElementById(["you", "opponent"]);
        let select = document.createElement('select');

        select.id = "select" + String(i);
        let opt1 = document.createElement('option');
        opt1.text = '選択してください';
        opt1.value = '';
        opt1.setAttribute('disabled', true)
        opt1.setAttribute('selected', true)
        select.appendChild(opt1);
        for ( var j=0; j<3; j++ ) {
            let opt = document.createElement('option');
            opt.text =  `${7*j+1}~${7*(j+1)}`;
            opt.value = 7*j+1;
            select.appendChild(opt);
        }
        let opt2 = document.createElement('option');
        opt2.text = '22以上';
        opt2.value = '22';
        select.appendChild(opt2);
        div.appendChild(select);
    }
}

addButton.addEventListener('click', () => {
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
    for ( var j=0; j<3; j++ ) {
        let opt = document.createElement('option');
        opt.text =  `${7*j+1}~${7*(j+1)}`;
        opt.value = 7*j+1;
        select.appendChild(opt);
    }
    let opt = document.createElement('option');
    opt.text = '22以上';
    opt.value = '22';
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
    let el1 = document.getElementById('result1');
    let el2 = document.getElementById("result2");
    let followerDivs = list.children;
    let followerDefenses = [];
    let yourDefense = document.getElementById('select0').value;
    let opponetsDefense = document.getElementById('select1').value;

    // フォロワーの体力を取得する，入力されていなければ関数を終える
    for ( var i = 0; i<followerDivs.length; i++ ) {
        let followerDefense = followerDivs[i].children[1].value
        if (followerDefense == '') {
            return
        }
        followerDefenses.push(followerDefense)
    }
    // リーダーの体力が入力されていなければ関数を終える
    if (yourDefense == '' || opponetsDefense == "") {
        return
    }

    let oluon = new Oluon(yourDefense, opponetsDefense, followerDefenses);
    let results = oluon.calcProb();

    // 確率を表示する
    el1.textContent = `自分リーダーがリーサルを取られる確率：${results[0]*100}%`;
    el2.textContent = `相手リーダーがリーサルを取られる確率：${results[1]*100}%`;
});