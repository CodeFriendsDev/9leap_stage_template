//TODO: 使用するリソースの登録　(images, sounds)
var assets = [

    //image ... サンプル用
    "images/title.png",// タイトル

    "images/do_daruma.png",
    "images/hat_ume.png",
];


//screen size
let GAME_SCREENSIZE_W = 320;
let GAME_SCREENSIZE_H = 320;


/**
 * TODO: ステージの登録
 */

//ステージが１つの例
// var scenes = [game1];

//ランダムでステージを切り替えたい例
var scenes = [game1, game2, game3];


//画面遷移 (ランダム)
function nextScene() {

  //処理切り替えフラグ
  let isShowStage = true;

  if (isShowStage) {
    //次のステージ番号を表示
    showNextStage();
  } else {
    //画面戦
    goNextScene();
  }


  //画面遷移
  function goNextScene() {
    let index = Math.floor(Math.random()*scenes.length);
    scenes[index]();
  }

  //次のステージ番号を表示
  function showNextStage() {

    var scene = new Scene();
    scene.backgroundColor = "black";
    core.replaceScene(scene);

    //遅延して画面遷移
    scene.tl.delay(core.fps);
    scene.tl.then(function(){
      goNextScene();
    });

    //ラベル表示
    let text = "STAGE: " + (score + 1);
    showLabel(text, 32);


    //ラベル表示処理
    function showLabel(text, fontSize) {
      if (fontSize === void 0 /* undefined */) {
        fontSize = 32;
      }

      if (text === void 0 /* undefined */) {
        return;
      }


      var label = new Label();

      label.color = "white";
      label.font = fontSize + "pt 'PixelMplus10'";
      label.width = scene.width;
      label.textAlign = "center";

      label.x = 0;
      label.y = scene.height * 0.5 - (fontSize * 0.5);

      label.text = text;

      scene.addChild(label);
    }
  }
}


//ゲーム開始
function gameStart() {
  //TODO: 音
  // var sound = core.assets[""].clone();
  // sound.play();

  nextScene();
}


//ゲームクリア
function gameClear() {

  //TODO: 音
  // var sound = core.assets[""].clone();
  // sound.play();

  score++;
  nextScene();
}


//ゲームオーバー (半透明の黒を被せてみた)
function gameOver(scene, isShowGameOver, buttonColor, textColor) {

  //TODO: 音
  // var sound = core.assets[""].clone();
  // sound.play();

  //半透明
  var layer = new Sprite(scene.width, scene.height);
  layer.backgroundColor = "#00000080";
  scene.addChild(layer);

  //スコアを上書き
  showUIScore(scene);

  //ゲームオーバー 表記
  if ((isShowGameOver != undefined) && (isShowGameOver == true)) {
    showUIGameOverLabel("GAME OVER", 48, 12.5);
  }


  //Retryボタン
  showUIRetry(scene, buttonColor, textColor, function(){

    //TODO: 音
    // var sound = core.assets[""].clone();
    // sound.play();

    //スコアリセット
    score = 0;

    //ページ遷移して、ゲーム再開
    nextScene();
    core.resume();
  });

  //Score送信ボタン
  showUIEnd(scene, buttonColor, textColor, function(){

    //TODO: 音
    // var sound = core.assets[""].clone();
    // sound.play();

    //nineleap スコア送信
    core.end(score, "score" + score);
  });


  //一時停止
  core.pause();


  //ラベル表示
  function showUIGameOverLabel(text, fontSize, dx) {

    if (text === void 0 /* undefined */) {
      text = "GAME OVER";
    }

    if (fontSize === void 0 /* undefined */) {
      fontSize = 32;
    }

    if (dx === void 0 /* undefined */) {
      dx = 0;
    }

    let label = new Label();
    label.x = 0 + dx;
    label.y = (scene.height - fontSize) * 0.5;
    label.color = "#FFFFFF";
    label.font = fontSize + "pt 'PixelMplus10'";

    label.textWidth = scene.width;
    label.textAlign = "center";
    label.text = text;

    scene.addChild(label);
  }
}


// タイトル画面
function titleStart(){
  var scene = new Scene();
  core.replaceScene(scene);
  //core.pause();

  scene.addEventListener(enchant.Event.TOUCH_START, function(){
    gameStart();
  });
}


//==========
// EnchantJS
//==========
var core;
enchant();
window.onload = function(){
    core = new Core(GAME_SCREENSIZE_W, GAME_SCREENSIZE_H);
    core.fps = 16;
    core.preload(assets);
    core.onload = function(){
        titleStart();
    };
    core.start();
};
