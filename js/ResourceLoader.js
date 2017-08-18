var alivenow=alivenow||{};

alivenow.RLoader=(function(){
    function RLoader(){}
    RLoader.prototype.init=function(){
         this.game.load.onFileComplete.add(this.progress,this);
        
        this.g2 = this.add.graphics(0,0);
        this.g2.beginFill(0x666666,1);
        this.g2.drawRect(70,425,410,5);
        this.g2.endFill();
        this.g = this.add.graphics(0,0);
        // PercentageText
       // this.t = this.add.text(250,360,"0 %",{fill:"#ffffff",fontFamily:"MYRIADPRO",fontSize:'25px'});

        this.setPercentage(0);
        
    };
    RLoader.prototype.preload=function(){
        this.game.load.atlasXML("boardSplash","./assets/boardSplash.png?v=1.2","./assets/boardSplash.xml?v=1.1");
        this.game.load.atlasXML("waveAnim","./assets/waveAnim.png?v=1.18","./assets/waveAnim.xml?v=1.17");
        this.game.load.atlasXML("rearWave","./assets/rearWave.png?v=1.2","./assets/rearWave.xml?v=1.1");
        this.game.load.image("waveBG","./assets/waveBG.png?v=1.2");
        this.game.load.image("BG","./assets/BG.png?v=1.0");
        
        this.game.load.image("gameBG","./assets/formBG.jpg?v=1.0");
        this.game.load.image("score","./assets/score.png?v=1.0");
        this.game.load.image("title","./assets/title.png?v=1.2");
        
        this.game.load.atlasXML("buttons","./assets/buttons.png?v=1.0.3","./assets/buttons.xml?v=1.0.3");
        this.game.load.atlasXML("maleCharacter","./assets/characterMale.png?v=1.5","./assets/characterMale.xml?v=1.4");
        this.game.load.atlasXML("femaleCharacter","./assets/characterFemale.png?v=1.5","./assets/characterFemale.xml?v=1.4");
        this.game.load.image("boardRight","./assets/boardRight.png?v=1.3");
        this.game.load.image("boardLeft","./assets/boardLeft.png?v=1.3");
        
        
        this.game.load.image("item1","./assets/item1.png?v=1.2");
        this.game.load.image("item2","./assets/item2.png?v=1.2");
        this.game.load.image("item3","./assets/item3.png?v=1.2");
        this.game.load.image("item4","./assets/item4.png?v=1.2");
        this.game.load.image("item5","./assets/item5.png?v=1.2");
        this.game.load.image("item6","./assets/item6.png?v=1.2");
        
        this.game.load.image("1Score","./assets/1Score.png?v=1.2");
        this.game.load.image("2Score","./assets/2Score.png?v=1.2");
        this.game.load.image("3Score","./assets/3Score.png?v=1.2");
        
        this.game.load.image("scoreBG","./assets/scoreBG.png?v=1.2");
        this.game.load.image("male","./assets/male.png?v=1.2");
        this.game.load.image("female","./assets/female.png?v=1.2");
        
        this.game.load.image("waitBG","./assets/waitBG.png?v=1.2");
        this.game.load.image("timerIcon","./assets/timerIcon.png?v=1.2");
        this.game.load.image("Icon","./assets/Icon.png?v=1.0");
        this.game.load.image("leaderScr","./assets/leaderScr.png?v=1.0");
        this.game.load.image("shareBottom","./assets/shareBottom.png?v=1.0");
        this.game.load.image("intro","./assets/intro.png?v=1.0");
        this.game.load.image("next","./assets/next.png?v=1.0");
        this.game.load.image("shareScr","./assets/shareScr.png?v=1.3");
        this.game.load.bitmapFont("font1",'./assets/font1.png?v=1','./assets/font1.xml?v=1');
    };
    
    
    RLoader.prototype.saveXML=function(v){
       alivenow.Global.config=v;
    // RLoader.State.start("Title");
       
    };
    RLoader.prototype.xmlError=function(v){
        console.log(v)
    }
    RLoader.prototype.create=function(){
     //    RLoader.State=this.game.state;
     // _server.send('./assets/config.xml',this.saveXML,this.xmlError,{},'GET','xml');
      
       
        window.addEventListener("resize",obj.rotateMe);
        console.log(obj.rotateMe)
       obj.rotateMe();
        this.game.state.start("Title");
        // 
    };
     RLoader.prototype.progress = function (p){
        this.setPercentage(p);
    };
    RLoader.prototype.setPercentage=function(p){
       // this.t.text = String(p)+" %";
        var w = p/100*410;
        this.g.clear();
        this.g.beginFill(0xFFCB09,1);
        this.g.lineStyle(1,0x0066ff,0.1);
        this.g.drawRect(70,425,w,5);
        this.g.endFill();

        this.g.lineStyle(1,0x000099,1);
        this.g.drawRect(70,425,410,5);
    };
    return RLoader;
})();
