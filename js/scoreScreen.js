
var alivenow=alivenow||{};

alivenow.Score=(function(){
    function Score(){};
    
    Score.prototype.create=function(){
        this.bg = this.game.add.sprite(0,0,"scoreBG");
        Score.obj = this;
        if(alivenow.Global.gender=="male"){
            this.character = this.game.add.sprite(0,450,"male");
        }else{
             this.character = this.game.add.sprite(0,450,"female");
        }
        this.character.x = (560-this.character.width)/2;
        this.textGr = this.add.group();
        this.scoreTxt= new Phaser.BitmapText(this.game,0,230,"font1","",80);
        alivenow.Global.msecondStr=(alivenow.Global.msecond<10)?"0"+String(alivenow.Global.msecond):String(alivenow.Global.msecond);
	   alivenow.Global.secondStr=(alivenow.Global.second<10)?"0"+String(alivenow.Global.second):String(alivenow.Global.second);
	       alivenow.Global.minuteStr=(alivenow.Global.minute<10)?"0"+String(alivenow.Global.minute):String(alivenow.Global.minute);
             if(alivenow.Global.msecondStr.length==3){
  this.scoreTxt.text=alivenow.Global.minuteStr+":"+alivenow.Global.secondStr+":"+alivenow.Global.msecondStr.replace(alivenow.Global.msecondStr.substring(alivenow.Global.msecondStr.length-1), "");
    }	
	else{
        this.scoreTxt.text=alivenow.Global.minuteStr+":"+alivenow.Global.secondStr+":"+alivenow.Global.msecondStr;

    }
        
        this.textGr.addChild(this.scoreTxt);
        this.scoreTxt.x = (560-this.scoreTxt.width)/2;
        
        this.button1 = this.add.button(70, 350, "buttons", this.onClick, this.button1, "replay10000","replay10000","replay10001");
        this.button2 = this.add.button(240, 350, "buttons", this.onClick, this.button2, "submit0000","submit0000","submit0001");
        this.button1.scale.set(0.8,0.8);
        this.button2.scale.set(0.8,0.8);
        
    };
    
    Score.prototype.onClick = function(){
        switch(this._onDownFrame){
            case "replay10001":
                _server.send(alivenow.Global.URL_UPDATE,null,null,{uid:alivenow.Global.U_ID,saveType:"surfAgainClickOnScore"})
                Score.obj.game.state.start("Game");
                break;
            case "submit0001":
                _server.send(alivenow.Global.URL_UPDATE,null,null,{uid:alivenow.Global.U_ID,saveType:"submitToWinClick"})
                if(!alivenow.Global.formSubmitted){
                    Score.obj.game.state.start("Form");
                }else{
                    Score.obj.game.state.start("Leader");
                }                
                break;
        }
    };
    
    return Score;
    
})();