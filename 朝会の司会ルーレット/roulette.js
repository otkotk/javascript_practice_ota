let resultTBL = document.getElementById("resultTBL");
let rouletteBtn = document.getElementById("rouletteBtn");
let invisible = document.getElementsByClassName("invisible");
// let invisibles = Array.from(invisible);

let humans = [
    {key: 1, name: "メンバー１",},
    {key: 2, name: "メンバー２",},
    {key: 3, name: "メンバー３",},
    {key: 4, name: "メンバー４",},
    {key: 5, name: "メンバー５",},
    {key: 6, name: "メンバー６",},
    {key: 7, name: "メンバー７",},
    {key: 8, name: "メンバー８",},
    {key: 9, name: "メンバー９",},
];
let rTR_cnt = 0;
let nIntervId;

const TR_S          = `<tr class="resultTR">`;
const TR_E          = "</tr>";
const TD_S          = `<td class="invisible">`;
const TD_E          = "</td>";
const START         = "start";
const STOP          = "stop";
const MC            = "youAreMC";
const INV_CHKBOX_S  = `<input type="checkbox" name="invisible" class="invisible_input" id="invisible`;
const INV_CHKBOX_E  = `">`;
const INV_LABEL_S_S = `<label onclick="tempInvGoTopArea(event)"`;
const INV_LABEL_S_E = `>`;
const INV_LABEL_E   = `</label>`;
const INVISIBLE     = "invisible";


//初期処理
window.addEventListener("load", createTBL, false);

//ボタンのトグル
rouletteBtn.addEventListener("click", toggleBtn, false);

//いない人を上に退避する
// invisibles.forEach(function(inv){
//     inv.addEventListener("click", {
//         targetHum: "できた",
//         handleEvent: tempInvGoTopArea,
//     }), false
// });
// if(invisible )
// if(!invisible){
//     for(let ev_i; ev_i<invisible.length; ev_i++){
//         invisible[ev_i].addEventListener("click", () => {
//             console.log(invisible[ev_i]);
//         })
//     }
// }
// for(let ev_i; ev_i<invisible.length; ev_i++){
//     invisible[ev_i].addEventListener("click", () => {
//         console.log(invisible[ev_i]);
//     })
// }

// for(let inv of invisible){
//     inv.addEventListener("click", () => {
//         console.log("ok");
//     }, false)
// }



/*************************************************
*** メンバーリスト、テーブル生成 **********************
**************************************************/
function createTBL(){
    "use strict";

    for(let i=0; i<humans.length; i++){
        // resultTBL.insertAdjacentHTML("beforeend", TR_S + TD_S 
        //                                         + INV_LABEL_S_S + `_${i}` + INV_LABEL_S_E + humans[i] + INV_LABEL_E
        //                                         + INV_CHKBOX_S + `_${i}` + INV_CHKBOX_E
        //                                         + TD_E + TR_E
        //                                         );
        resultTBL.insertAdjacentHTML("beforeend", TR_S + TD_S 
                                                + INV_LABEL_S_S + ` data-humansKey=${humans[i].key}` + ` for="invisible_${i}"` + INV_LABEL_S_E + humans[i].name + INV_LABEL_E
                                                + TD_E + TR_E
                                                );
                                                // console.log(`name=${humans[i].name} key=${humans[i].key}`);
    }
}

/*************************************************
*** ボタントグル ***********************************
**************************************************/
function toggleBtn(){
    "use strict";

    rTR_cnt = document.getElementsByClassName("resultTR").length;
    switch (rouletteBtn.innerText) {
        case START:
            rouletteBtn.innerText = STOP;
            if(!nIntervId){
                nIntervId = setInterval(shuffleTBL, 60);
            }
            break;
    
        case STOP:
            rouletteBtn.innerText = START;
            clearInterval(nIntervId);
            nIntervId = null;
            break;
    }
}

/*************************************************
*** テーブルシャッフル ******************************
**************************************************/
function shuffleTBL(){
    "use strict";

    let resultTR = document.getElementsByClassName("resultTR");

    //既存テーブルの削除
    for(let i=0; i<rTR_cnt; i++){
        resultTR[0].remove();
    }

    //メンバー配列をシャッフル
    for(let j=rTR_cnt-1; j>0; j--){
        let k = Math.floor(Math.random() * (j + 1));
        [humans[j], humans[k]] = [humans[k], humans[j]];
    }
    // console.log(humans);

    //メンバーテーブル作成
    createTBL();

    //進行役を塗りつぶす
    resultTR[Math.floor(Math.random() * rTR_cnt)].classList.add(MC);
}

/*************************************************
*** 今いない人を一時退避する *************************
**************************************************/
function tempInvGoTopArea(e){
    "use strict";

    let invHumTemp = e.target.innerText;
    let invArea = document.getElementById("invArea");
    let humKey = e.target.dataset.humanskey;

    //親要素まるごと削除
    e.target.parentNode.remove();

    //退避エリアに持っていく
    invArea.insertAdjacentHTML("beforeend", `<button class="invHums">${invHumTemp}</button>`);

    //メンバー配列から削除
    // console.log(humKey);
    // console.log(humans.find((element) => element.key == e.target.dataset.humanskey));
    // let hoge = humans.find((element) => element.key == e.target.dataset.humanskey);
    let hoge = humans.findIndex((element) => element.key == e.target.dataset.humanskey);
    // console.log(hoge);
    humans.splice(hoge, 1);
    console.log(humans);
}
