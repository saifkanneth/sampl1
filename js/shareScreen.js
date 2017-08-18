var alivenow=alivenow||{};

alivenow.Share=(function(){
    function Share(){};
    
    Share.prototype.create=function(){
        Share.obj = this;
        this.shareScr = this.game.add.sprite(0,0,"shareScr");
        
        this.liveBtn = this.add.button(0, 280, "buttons", this.onShareClick, this.liveBtn, "live0000","live0000","live0001");
        this.replayBtn = this.add.button(0, 375, "buttons", this.onShareClick, this.replayBtn, "replay20000","replay20000","replay20001");
        this.liveBtn.x = (560-this.liveBtn.width)/2;
        this.replayBtn.x = (560-this.replayBtn.width)/2;
        
        this.fshare = this.add.button(30, 500, "buttons", this.onShareClick, this.fshare, "fb0000","fb0000","fb0000");
        this.tshare = this.add.button(290, 500, "buttons", this.onShareClick, this.tshare, "tw0000","tw0000","tw0000");
        
        this.shareBottom = this.game.add.sprite(0,0,'shareBottom');
        this.shareBottom.y= (960-this.shareBottom.height);
    };
    
    Share.prototype.onShareClick=function(){
        switch(this._onDownFrame){
            case "live0001":
                _server.send(alivenow.Global.URL_UPDATE,null,null,{uid:alivenow.Global.U_ID,saveType:"tryItLiveClick"});
                break;
            case "replay20001":
                _server.send(alivenow.Global.URL_UPDATE,null,null,{uid:alivenow.Global.U_ID,saveType:"surfAgainClickOnShare"})
                Share.obj.game.scale.startFullScreen(false);
                Share.obj.game.state.start("Game")
                break;
            case "fb0000":
                _server.send(alivenow.Global.URL_UPDATE,null,null,{uid:alivenow.Global.U_ID,saveType:"fshare"});
                location.href="https://www.facebook.com/sharer/sharer.php?u=http://bit.ly/2vCYzib&t=";
                break;
            case "tw0000":
                _server.send(alivenow.Global.URL_UPDATE,null,null,{uid:alivenow.Global.U_ID,saveType:"tshare"})
                location.href="https://twitter.com/intent/tweet?url=http://bit.ly/2vCYzib&t=";
                break;
                
        }
    }
    
    
    return Share;
    
})();