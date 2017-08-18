var alivenow=alivenow||{};

alivenow.Main=(function(){
    function Main(){}
    
    Main.prototype.init=function(){
        var game = new Phaser.Game(560,960, Phaser.AUTO, 'phaser-example', { preload: this.preload, create: this.create});
        game.state.add('GLoader',alivenow.RLoader);
        game.state.add('Title',alivenow.Title);
        game.state.add('Game',alivenow.Game);
        game.state.add('Score',alivenow.Score);
        game.state.add('Form',alivenow.Form);
        game.state.add('Leader',alivenow.Leader);
        game.state.add('Share',alivenow.Share);
    }//
    
    Main.prototype.preload=function(){
        alivenow.Global.game=this.game;
        alivenow.Global.rotateHandler = this.rotateMe;
    }
    
   
    Main.prototype.create=function(){
      
        Main.gameObj=this;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.compatibility.orientationFallback = 'viewport';
        this.scale.pageAlignVertically  = true;
        this.scale.pageAlignHorizontally  = true;
        //this.game.time.desiredFps = 60;
        this.game.time.advancedTiming = true;
        _server.send(alivenow.Global.URL_CREATE,Main.prototype.setUID,null,{})
          // Main.gameObj.game.state.start("GLoader");
    }
    
    Main.prototype.setUID=function(v){
        alivenow.Global.U_ID = JSON.parse(v)["UID"];
        alivenow.Global.gameKey = JSON.parse(v)["gamekey"].substr(3,8);
        Main.gameObj.game.state.start("GLoader");
       
    }
     Main.prototype.rotateMe = function (){
         var img = document.getElementById("rotate");
        if(!alivenow.Global.skipRotationHandle) {
            console.log($('#formdiv').css('display'))
            if (window.innerWidth > window.innerHeight) {
                img.style.display = "block";
                img.style.width = String(window.innerWidth) + "px";
                img.style.height = String(window.innerHeight) + "px";
                img.style.top = "0px";
                img.style.left = "0px";
                alivenow.Global.game.paused = true;
                $("canvas").hide();
               // alivenow.Global.game.canvas.style.visibility = "hidden";
            }
            else {
                img.style.display = "none";
                img.style.width = "0px";
                img.style.height = "0px";
                alivenow.Global.game.stage.visible = !(alivenow.Global.game.paused = false);
               // alivenow.Global.game.canvas.style.visibility = "visible";
                $("canvas").show();
            }
        }
       
    }
   return Main; 
})();