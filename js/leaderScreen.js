var alivenow=alivenow||{};

alivenow.Leader=(function(){
    function Leader(){};
    
    Leader.prototype.create=function(){
        Leader.g= this;
        this.leaderBG = this.game.add.sprite(0,0,"leaderScr");
        
        _server.send(alivenow.Global.URL_LEADER,this.showLoaderBoard,null);
        this.rankArr=["1st","2nd","3rd","4th","5th"]
        
        
        
        this.textGroup = this.add.group();
        this.waitBG = this.game.add.sprite(0,0,"waitBG");
        
        
        
        
        
        this.Icon = this.game.add.sprite(0,800,"Icon");
        this.Icon.x = (560-this.Icon.width)/2
        Leader.g.waitBG.visible=false;
       
    }
    
    
    Leader.prototype.showShare=function(){
        console.log("Show Share")
         _server.send(alivenow.Global.URL_UPDATE,null,null,{uid:alivenow.Global.U_ID,saveType:"nextOnLeaderClick"})
        this.game.state.start("Share")
    }
    
     Leader.prototype.showLoaderBoard=function(data){
          

          Leader.g.waitBG.visible=false;
           for(i=1;i<=data.length;i++){
               if(data[i-1]["name"].length>10){
                   Leader.g.name = new Phaser.BitmapText(Leader.g.game,30,175.25+50*i,"font1",data[i-1]["name"].substr(0,10),30);
               }else{
                   Leader.g.name = new Phaser.BitmapText(Leader.g.game,30,175.25+50*i,"font1",data[i-1]["name"],30);
               }
               
                Leader.g.rank = new Phaser.BitmapText(Leader.g.game,240,175.25+50*i,"font1",Leader.g.rankArr[i-1],30);
               
               
               minuteStr=(parseInt(data[i-1]["minute"])<10)?"0"+String(data[i-1]["minute"]):String(data[i-1]["minute"]);
		      secondStr=(parseInt(data[i-1]["second"])<10)?"0"+String(data[i-1]["second"]):String(data[i-1]["second"]);
		      msecondStr=(parseInt(data[i-1]["msecond"])<10)?"0"+String(data[i-1]["msecond"]):String(data[i-1]["msecond"]);
               Leader.g.time = new Phaser.BitmapText(Leader.g.game,410,175.25+50*i,"font1","",30);
               if(msecondStr.length==3){
                   
                   Leader.g.time.text=minuteStr+":"+secondStr+":"+msecondStr.replace(msecondStr.substring(msecondStr.length-1), "");
               }else{
                    Leader.g.time.text=minuteStr+":"+secondStr+":"+msecondStr;
               }
		      if(i==1){
                  Leader.g.name.tint = 0xFFF200;
                  Leader.g.rank.tint = 0xFFF200;
                  Leader.g.time.tint = 0xFFF200;
               }
                
		
                Leader.g.textGroup.addChild(Leader.g.name);
                Leader.g.textGroup.addChild(Leader.g.rank);
                Leader.g.textGroup.addChild(Leader.g.time);
               
              
              
             
               
          }
          Leader.g.buttonGr =Leader.g.add.group();
        Leader.g.nextBtn2 = Leader.g.add.button(115, 550, "buttons", Leader.g.showShare, Leader.g, "next0000","next0000","next0001");
        Leader.g.nextBtn2.x = (560-Leader.g.nextBtn2.width)/2;
         Leader.g.buttonGr.addChild(Leader.g.nextBtn2);
      }
    
    return Leader;
})();