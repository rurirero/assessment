'use strict';
const userNameinput = document.getElementById('user-name');
const assessmentbuton = document.getElementById('assessment');
const resultdivided = document.getElementById('result-area');
const tweetdivided = document.getElementById('tweet-area');
userNameinput.onkeydown = event => {
    if (event.key==='Enter') {
        assessmentbuton.onclick();
    }
};
assessmentbuton.onclick = () => {
    const userName = userNameinput.value;
    if (userName.length===0) {
        return;//名前がなかったら処理を終了する(ガード句)
    }

    //診断結果の表示処理
    resultdivided.innerText = '';
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultdivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultdivided.appendChild(paragraph);

    //ツイートエリアの表示処理
    tweetdivided.innerText = '';
    const anchor = document.createElement('a');
    const hrefvalue = 
    'https://twitter.com/intent/tweet?button_hashtag=' +encodeURIComponent('あなたのいいところ')+'&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefvalue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'tweet #あなたのいいところ';
    tweetdivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetdivided.appendChild(script);
}

const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];
/**
 * 名前の文字列を渡すと診断結果が返ってくる関数
 * @param(paramerter=引数) {string} userName
 * @return(return value=戻り値) 診断結果
 */
//名前の文字列を渡すと診断結果が返ってくる関数
function assessment (userName) {
    //引数の全文字のコード番号を足し合わせる
    let sumofcharcode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumofcharcode = sumofcharcode + userName.charCodeAt(i);
    }
    //全文字のコード番号の合計を結果の数で割ったあまりを結果の添え字の番号にする
    const index = sumofcharcode % answers.length;
    let result = answers[index];
    result = result.replaceAll('{userName}',userName);
    return result;
}

console.assert(
    assessment('太郎')===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
)
console.assert(
    assessment('太郎')===assessment('太郎'),
    '名前が同じなら同じ診断結果になる処理が正しくありません。'
)