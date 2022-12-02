'use strict'
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

const answers = [
    '{userName}は１ええな。{userName}の特徴は１ええなええな',
    '{userName}は２ええな。{userName}の特徴は２ええなええな',
    '{userName}は３ええな。{userName}の特徴は３ええなええな',
    '{userName}は４ええな。{userName}の特徴は４ええなええな',
    '{userName}は５ええな。{userName}の特徴は５ええなええな',
    '{userName}は６ええな。{userName}の特徴は６ええなええな',
    '{userName}は７ええな。{userName}の特徴は７ええなええな',
    '{userName}は８ええな。{userName}の特徴は８ええなええな',
    '{userName}は９ええな。{userName}の特徴は９ええなええな',
    '{userName}は１０ええな。{userName}の特徴は１０ええなええな',
    '{userName}は１１ええな。{userName}の特徴は１１ええなええな',
    '{userName}は１２ええな。{userName}の特徴は１２ええなええな',
    '{userName}は１３ええな。{userName}の特徴は１３ええなええな',
    '{userName}は１４ええな。{userName}の特徴は１４ええなええな',
    '{userName}は１５ええな。{userName}の特徴は１５ええなええな',
    '{userName}は１６ええな。{userName}の特徴は１６ええなええな',
]

/**
 * 名前の文字列を渡すと診断結果を返す変数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName){
    //全文字のコード番号を取得して、足し合わせる
    let sumOfCharCode = 0;
    for(let i=0;i<userName.length;i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    const index = sumOfCharCode%answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g,userName);//正規表現 {userName}→入力された名前
    return result;
}

/**
 * 指定した要素の子要素を全て削除する
 * @param {HTMLElement} element
 * 
 */
function removeAllChildren(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

userNameInput.onkeydown = event =>{
    if(event.key==='Enter'){
        assessmentButton.onclick();
    }
}

assessmentButton.onclick = function(){ //ボタン押下で無名関数が呼び出される
    const userName = userNameInput.value;
    if(userName.length === 0){
        return;
    }
    console.log('ボタン押された！');
    console.log(userName);
    //TODO 診断結果エリア
    /*while(resultDivided.firstChild){ //結果が継ぎ足されないよう、表示エリアの子要素を先に消す
        resultDivided.removeChild(resultDivided.firstChild);
    }*/
    removeAllChildren(resultDivided)
    const header = document.createElement('h3');
    header.innerText='診断結果';
    resultDivided.appendChild(header);
    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText=result;
    resultDivided.appendChild(paragraph);
    //TODO tweetエリア
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    //const hrefVlaue='https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';
    const hrefVlaue=`https://twitter.com/intent/tweet?button_hashtag=${encodeURIComponent('あなたのいいところ')}&ref_src=twsrc%5Etfw`;
    anchor.setAttribute('href',hrefVlaue);
    anchor.className='twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText='Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);
    //Widgets.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    script.setAttribute('charset','utf-8');
    tweetDivided.appendChild(script);
}
