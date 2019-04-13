//ゲーム 1
function game1() {
    console.log("Game1");

    var scene = new Scene();
    core.replaceScene(scene);

    //game
    gameMain(scene);

    //score
    showUIScore(scene);


    //ゲーム部分
    function gameMain(scene) {
        scene.backgroundColor = "skyblue";

        /**
        * 画面遷移(せんい)テスト
        * 左はゲームクリア、右はゲームオーバー
        */

        var daruma1 = new Sprite(31, 31);
        daruma1.image = core.assets["images/do_daruma.png"];
        daruma1.centerX = scene.width * 0.25;
        daruma1.centerY = scene.height * 0.5;
        scene.addChild(daruma1);
        daruma1.on(Event.TOUCH_START, function(e){
            //TODO: ステージクリア時
            gameClear();
        });

        var daruma2 = new Sprite(31, 31);
        daruma2.image = core.assets["images/do_daruma.png"];
        daruma2.centerX = scene.width * 0.75;
        daruma2.centerY = scene.height * 0.5;
        scene.addChild(daruma2);
        daruma2.on(Event.TOUCH_START, function(e){
            //TODO: ゲームオーバー時
            gameOver(scene);
        });
    }
}
