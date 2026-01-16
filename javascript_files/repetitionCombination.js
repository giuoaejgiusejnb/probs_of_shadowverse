// 重複組み合わせを全列挙
// 1からnまでの自然数をr回並べる
// 0が含まれていないので，要素数などを指定するときは注意

function repetitionCombination(n, r) {
    let ans = [];

    if (r == 0) {
        ans.push([]);
    } else {
        let array1 = repetitionCombination(n, r-1);
        for ( var i = 0 ; i<array1.length; i++) {
            for (var j = 0; j<n; j++) {
                let array2 = array1[i].concat([j+1]);
                ans.push(array2)
            }
        }
    }

    return ans;
}

export {repetitionCombination};