alert("hello");
//import { repetitionCombination } from "./repetitionCombination.js";

// フォロワーやリーダーにランダム打点を飛ばすとき，指定したフォロワーやリーダーに指定した回数打点が飛ぶ確率を求めるクラス
// 以下，フォロワーとリーダーをまとめてオブジェクトと呼ぶ
// leaderDefensesとfollowerDefensesは配列で，ランダム打点が飛びうるオブジェクト達の体力を表す
// リーダーにランダム打点が飛ばない場合は，leaderDefensesは空となる
// defenses = leaderDefenses.concat(followerDefense)とする
// arrayは配列で，要素数2の配列がarrayの要素
// 例えば[0, 2]がarrayの要素なら，（defensesの）0番目のオブジェクトに二回以上当たる確率を求める
// 飛ばす一回あたりの打点をdamage，打点を飛ばす回数をhitNumで定める
// 例えば，オルオーンが相手リーダーに二回以上打点を飛ばす確率を求めたいとする
// フォロワーの体力が1, 3, 7で，自分リーダーの体力は8，相手リーダーは13なら，
// leaderDefenses = [8, 13], followerDefenses = [1, 3, 7], array = [[1, 2]], damage = 7, hitNum = 3となる

class ProbsOfRandomDamagesHit {
    constructor(leaderDefenses, followerDefenses, array, damage, hitNum) {
        this.leaderDefenses = leaderDefenses;
        this.followerDefenses = followerDefenses;
        this.array = array;
        this.defenses = leaderDefenses.concat(followerDefenses);
        this.damage = damage;
        this.hitNum = hitNum;
    }

    calcProb() {
        // 条件が満たされる当たり方をsuccessfulTargetIdArraysに格納する
        let n = this.defenses.length; // オブジェクトの数
        let array = repetitionCombination(n, this.hitNum); // ランダム打点の当たり方をすべて列挙
        let successfulTargetIdArrays = [];
        // 各当たり方（以下のtargetIdArray）について，条件が満たされているかをチェックする
        // その前に，在り得る当たり方かを調べる
        // 例えば，上のオルオーンの例では， targetIdArray = [2, 2, 1]のときに，体力1のフォロワーに二回当たっているので，このようなものは除外する
        // また，[0, 0, 1]などは，リーダーが倒されたあとはランダム打点は飛ばないので，[0, 0]に換える
        for ( var i = 0; i<array.length; i++) {
            let targetIdArray = array[i]; // ランダム打点の当たり方を一つ取り出す
            let curDefenses = structuredClone(this.defenses); // オブジェクトの現在の体力
            let hitNumArray = Array(n).fill(0); // 各オブジェクトに当たった回数
            let flag1 = 1; // 起こり得る当たり方がどうか
            let flag2 = 1; // 条件を満たす当たり方がどうか
            for ( var j = 0; j<this.hitNum; j++) { // ランダム打点をthis.hitnum回当てて，当たったオブジェクトの体力を減らす
                targetID = targetIdArray[j] - 1; // 今回当たるオブジェクトのID
                hitNumArray[targetID] += 1;
                if (targetID < this.leaderDefenses.length) { // リーダーに当たった場合，リーダーが倒れたところまでの配列を取り出す
                    curDefenses[targetID] -= 2;
                    if (curDefenses[0] <= 0) {
                        array = targetIdArray.slice(0, j+1); // このようにすると重複が発生するので，後で重複を消す
                        break
                    }
                } else { // フォロワーに当たった場合，すでに倒れているフォロワーだったら，そのような当て方は存在しない
                    if (curDefenses[targetID] <= 0) {
                        flag1 = 0;
                        break;
                    }
                    curDefenses[targetID] -= 2;
                }
            }

            if (flag1) { // 在り得る当たり方なら条件を満たす当たり方がチェック
                for ( var j = 0; j<this.array.length; j++) {
                    if (hitNumArray[this.array[j][0]] < this.array[j][1]) {
                        flag2 = 0;
                        break;
                    }
                }
            }

            if (flag2) { // 条件を満たす当たり方ならsuccessfulTargetIdArraysに追加
                successfulTargetIdArrays.push(array);
            }
        }
        // 重複を除く
        successfulTargetIdArrays = Array.from(
            new Set(successfulTargetIdArrays.map(JSON.stringify)),
            JSON.parse
        );

        // 確率を計算する
        let result = 0; //求める確率
        for ( var i = 0; i<successfulTargetIdArrays.length; i++) { // 各当て方について考える
            let prob = 1; // この当て方になる確率
            let survivorNum = n; // 倒されていないオブジェクトの数
            let targetIdArray = successfulTargetIdArrays[i]; // 当て方
            let curDefenses = structuredClone(this.defenses); // オブジェクト達の体力
            for ( var j = 0; j< targetIdArray.length; j++) { // 各オブジェクトに打点を飛ばしていく
                let targetID = targetIdArray[j] - 1;
                prob *= 1 / survivorNum;
                curDefenses[targetID] -= 2;
                if (curDefenses[targetID] <= 0) { // フォロワーが倒されたらsuvivorNumを減らす
                    survivorNum -= 1;
                }
            }

            result+= prob;
        }
        return result;   
    }
}


export {ProbsOfRandomDamagesHit};






