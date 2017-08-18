var alivenow = alivenow||{};
alivenow.Game=(function(){
    function Game(){}
    
    Game.prototype.create=function(){
        
        Game.obj = this;
        this.speed = 0;
        alivenow.Global.gameStart=true;
        alivenow.Global.minute=alivenow.Global.second=alivenow.Global.msecond=0;
        this.itemDelay = 200;//this.getRandom(50,150);
        this.itemProg = 0;
        this.currentDirection="";
        this.BG=this.game.add.sprite(0,0,"BG");
        this.waveGr = this.add.group();
        this.rearWave = new Phaser.Sprite(this.game,-10 , 600,"rearWave");
        this.rearWaveAnim = this.rearWave.animations.add("rearWave",Phaser.Animation.generateFrameNames("rearWave",0,29,'',2),30,true);
        this.waveGr.addChild(this.rearWave);
        this.waveBG = this.game.add.sprite(-195,450,"waveBG");
        this.itemMask = this.game.add.graphics(0,865);
        this.itemMask.beginFill(0xFF0000);
        this.itemMask.drawEllipse(200,200,450,300)
        this.itemMask.angle = -45;
        this.facedDirection="";
        this.missBalanceCount=0;
        this.itemGr = this.add.group();
       // console.log(this.itemGr.mask )
       this.itemGr.mask = this.itemMask;
        this.controlGr = this.add.group();
        this.animationGr = this.add.group();
        this.gameTime = new Phaser.BitmapText(this.game,360,23,"font1","00:00:00",45);
        this.timerIcon = this.game.add.sprite(315,30,"timerIcon");
        this.Icon = this.game.add.sprite(23.6,23.6,"Icon")
        this.gameTime.tint = 0x003E7E;
        
        
        this.whiteWave1 = new Phaser.Sprite(this.game,-326.45 , 350,"waveAnim");
        
        this.whiteWave1Anim = this.whiteWave1.animations.add("waveAnim",Phaser.Animation.generateFrameNames("waveAnim",0,19,'',2),30,true);
        
   
        this.controlGr.addChild(this.whiteWave1);
        
        this.facedDirection = "right";
                 this.defaultCharacterFrame = alivenow.Global.gender+"17";
                 this.hintFrame = alivenow.Global.gender+"28";
                 this.fallFrame = alivenow.Global.gender+"31";
                 this.endFrame = alivenow.Global.gender+"33";
                 this.limitFrame = alivenow.Global.gender+"19";
                 this.fallStartFrame = alivenow.Global.gender+"29";
        this.rearWave.animations.play("rearWave");
        this.whiteWave1.animations.play("waveAnim");
        this.curr_board = null;
        this.moveEnabled = false;
        
        if(alivenow.Global.gender=="male"){
            this.character = new Phaser.Sprite(this.game,100 , 550,"maleCharacter");
            this.characterMoveRight = this.character.animations.add("characterMoveRight",Phaser.Animation.generateFrameNames("male",17,19,'',2),30,false);
             this.characterBalanceRight = this.character.animations.add("characterBalanceRight",Phaser.Animation.generateFrameNames("male",19,28,'',2),20,false);
            this.characterFallRight = this.character.animations.add("characterFallRight",Phaser.Animation.generateFrameNames("male",28,33,'',2),30,false);
            
            
            this.characterMoveLeft = this.character.animations.add("characterMoveLeft",[16,15,14],30,false);
             this.characterBalanceLeft = this.character.animations.add("characterBalanceLeft",[14,13,12,11,10,9,8,7,6,5],20,false);
            this.characterFallLeft = this.character.animations.add("characterFallLeft",[4,3,2,1,0],30,false);
            
            this.character.frameName=alivenow.Global.gender+"17";
            this.animationGr.addChild(this.character);
            this.characterFrames = this.character.animations.frameData.getFrames();
        }
         if(alivenow.Global.gender=="female"){
            this.character = new Phaser.Sprite(this.game,100 , 550,"femaleCharacter");
            this.characterMoveRight = this.character.animations.add("characterMoveRight",Phaser.Animation.generateFrameNames("female",17,19,'',2),30,false);
             this.characterBalanceRight = this.character.animations.add("characterBalanceRight",Phaser.Animation.generateFrameNames("female",19,28,'',2),20,false);
            this.characterFallRight = this.character.animations.add("characterFallRight",Phaser.Animation.generateFrameNames("female",28,33,'',2),30,false);
            
            
            this.characterMoveLeft = this.character.animations.add("characterMoveLeft",[16,15,14],30,false);
             this.characterBalanceLeft = this.character.animations.add("characterBalanceLeft",[14,13,12,11,10,9,8,7,6,5],20,false);
            this.characterFallLeft = this.character.animations.add("characterFallLeft",[4,3,2,1,0],30,false);
           
             
            this.character.frameName=alivenow.Global.gender+"17";
            this.animationGr.addChild(this.character);
            this.characterFrames = this.character.animations.frameData.getFrames();
        }
          this.characterFallRight.onComplete.add(this.sinkCharacter,this);
            this.characterFallLeft.onComplete.add(this.sinkCharacter,this);
        this.characterBalanceRight.onComplete.add(this.tryToBalance,this);
        this.characterBalanceLeft.onComplete.add(this.tryToBalance,this);
        this.character.scale.set(0.8,0.8)
        this.character.balancingAlready=false;
        if(alivenow.Global.gender=="male"){
            this.boardLeft = this.game.add.sprite(this.character.x+220,this.character.y+110,"boardLeft");
            this.boardRight = this.game.add.sprite(this.character.x+190,this.character.y+120,"boardRight");
        }else{
            this.boardLeft = this.game.add.sprite(this.character.x+200,this.character.y+110,"boardLeft");
            this.boardRight = this.game.add.sprite(this.character.x+170,this.character.y+120,"boardRight");
        }
        
        this.boardLeft2 = this.game.add.sprite(0,0,"boardLeft");
        
        this.boardRight2 = this.game.add.sprite(0,0,"boardRight");
        this.boardLeft.scale.set(0.8,0.8);
        this.boardRight.scale.set(0.8,0.8);
        
        
       
        
        
        
        this.boardSplash1= new Phaser.Sprite(this.game, 108, -65,"boardSplash");
        this.boardSplash1Anim = this.boardSplash1.animations.add("boardSplash",Phaser.Animation.generateFrameNames("boardSplash",0,7,'',2),30,true);
        
         this.boardSplash2= new Phaser.Sprite(this.game,-70 , 80,"boardSplash");
        this.boardSplash2Anim = this.boardSplash2.animations.add("boardSplash",Phaser.Animation.generateFrameNames("boardSplash",0,7,'',2),30,true);
        
        this.boardLeft.addChildAt(this.boardSplash1,0);
        this.boardLeft.addChild(this.boardLeft2);
        this.boardLeft.bringToTop();
        this.boardRight.addChildAt(this.boardSplash2,0);
        this.boardRight.addChild(this.boardRight2);
        this.controlGr.addChild(this.boardLeft);
        this.controlGr.addChild(this.boardRight);
        
        this.boardSplash1.animations.play("boardSplash");
        this.boardSplash2.animations.play("boardSplash");
        this.boardSplash1.angle =  -20;
        this.boardSplash2.angle =  -20;
        this.boardSplash1.x-=this.boardSplash1.width/2.5;
        this.boardSplash1.y+=this.boardLeft.height/3;
        this.boardLeft.visible = false;
        this.boardLeft.vibrateFact = .5;
        this.boardRight.vibrateFact = .5;
        
        this.vibrateTween1 = new Phaser.Tween(this.boardLeft,this.game,this.game.tweens);
        this.vibrateTween2 = new Phaser.Tween(this.boardRight,this.game,this.game.tweens);
        this.vibrateBoat(this.boardLeft,this.vibrateTween1);
        this.vibrateBoat(this.boardRight,this.vibrateTween2);
        //this.curr_board = this.boardRight;
        
         //Adding border for left Board
        
        this.leftBoardArea = this.game.add.graphics(20,100);
        this.leftBoardArea.beginFill(0xFFFFFF);
        this.leftBoardArea.drawRect(0,0,60,60);
        this.boardLeft.addChild(this.leftBoardArea);
        
        
         this.leftBoardArea2 = this.game.add.graphics(70,60);
        this.leftBoardArea2.beginFill(0xFFFFFF);
        this.leftBoardArea2.drawRect(0,0,60,60);
        this.boardLeft.addChild(this.leftBoardArea2);
        
        this.leftBoardArea.alpha = 0.0;
        this.leftBoardArea2.alpha = 0.0;
        //Adding border for right Board
        
        this.rightBoardArea = this.game.add.graphics(80,110);
        this.rightBoardArea.beginFill(0xFFFFFF);
        this.rightBoardArea.drawRect(0,0,60,60);
        this.boardRight.addChild(this.rightBoardArea);
        this.rightBoardArea2 = this.game.add.graphics(50,50);
        this.rightBoardArea2.beginFill(0xFFFFFF);
        this.rightBoardArea2.drawRect(0,0,60,60);
        this.boardRight.addChild(this.rightBoardArea2);
        this.rightBoardArea.alpha = 0.0;
        this.rightBoardArea2.alpha = 0.0;
        this.shakingCount = 0;
        this.lostControl = false;
        
        this.characterMask = this.game.add.graphics(0,550);
        this.characterMask.beginFill(0xFFFFFF);
        this.characterMask.drawRect(0,0,560,260);
        this.characterMask.alpha=0.5;
        this.character.mask = this.characterMask;
        
        this.scoreGr = this.add.group();
        this.scoreGr.addChild(this.gameTime);
        
        this.introGr = this.add.group();
        console.log(alivenow.Global.introShown)
        if(!alivenow.Global.introShown){
            this.introBG = this.game.add.sprite(0,0,"intro");
            this.introGr.addChild(this.introBG);
            this.nextBtn = this.add.button(0, 550, "buttons", this.resumeGame, this, "next0000","next0000","next0001");
            this.nextBtn.x = (560-this.nextBtn.width)/2;
            this.introBG.addChild(this.nextBtn);
        }else{
            alivenow.Global.elapsedTime = 0;
        }
    };
    
    Game.prototype.resumeGame=function(){
        alivenow.Global.introShown = true;
        this.introBG.removeChild(this.nextBtn);
        this.nextBtn = null;
        this.introGr.removeChild(this.introBG);
        alivenow.Global.elapsedTime = 0;
        
    };
    Game.prototype.vibrateBoat=function(boat,twn){
        twn.to({angle:boat.vibrateFact}, 20);
        twn.onComplete.addOnce(Game.obj.vibrateBoat,[boat,twn]);
        twn.start();
        boat.vibrateFact = boat.vibrateFact*-1;
    }

    Game.prototype.addItem=function(){
        this.itemPos = Math.floor(this.getRandom(1,6));
        this.Item = this.game.add.sprite(this.getRandom(0,300),960,"item"+String(this.itemPos));
        this.Item.itemType="Items"
        this.itemGr.addChild(this.Item);
        this.Item.xSpeed = 0;
        this.Item.ySpeed = 0;
        this.itemGr.addChild(this.Item);
        this.Item.collidedAlready = false;
        this.Item.itemIndex = this.itemPos;
        this.Item.readyToRemove = false;
    };

    Game.prototype.tryToBalance=function(){
        this.shakingCount++;
        console.log("Shake Count "+this.shakingCount)
	   if(this.shakingCount<=3){
		 // TweenMax.killTweensOf(male)
		  //trace("tween for balance");
          this.character.frameName=this.limitFrame;
		  this.character.balancingAlready = true;
		  console.log("Balance on "+this.facedDirection+" Direction")
		  if(this.facedDirection=="right"){
              this.character.animations.play("characterBalanceRight")
          }else if(this.facedDirection=="left"){
              this.character.animations.play("characterBalanceLeft")
          }
	}else{
       // console.log("resetting Balance Value")
		this.character.balancingAlready = false;
		if(this.prevDirection!=""){
			this.character.frameName=this.limitFrame;
		}else{
            this.character.frameName=this.defaultCharacterFrame;
			
		}
        console.log("balanced")
		this.shakingCount = 0;
	}
       
    };
    
    Game.prototype.fallCharacter=function(){
        this.lostControl = true;
        if(this.facedDirection=="right"){
              this.character.animations.play("characterFallRight")
          }else if(this.facedDirection=="left"){
              this.character.animations.play("characterFallLeft")
          }
           if(this.facedDirection=="right"){
            this.boardRight.anchor.set(0.5,0.5);
            this.boardRight.x+=this.boardRight.width/2;
            this.boardRight.y+=this.boardRight.height/2;
               
            this.boardRight2.visible=false;
            this.throwTween1 = new Phaser.Tween(this.boardRight,this.game,this.game.tweens);
            this.throwTween1.to({x:this.boardRight.x-500,y:this.boardRight.y-200},500);
            this.throwTween2 = new Phaser.Tween(this.boardRight,this.game,this.game.tweens);
            this.throwTween2.to({angle:'+360'},500);
            
        }else{
            this.boardLeft.anchor.set(.5,.5);
            this.boardLeft2.visible=false;
            this.boardLeft.x+=this.boardLeft.width/2;
            this.boardLeft.y+=this.boardLeft.height/2;
            this.throwTween1 = new Phaser.Tween(this.boardLeft,this.game,this.game.tweens);
            this.throwTween1.to({x:this.boardLeft.x+500,y:this.boardLeft.y-200},500);
            this.throwTween2 = new Phaser.Tween(this.boardLeft,this.game,this.game.tweens);
            this.throwTween2.to({angle:'+360'},500);
        }
        this.throwTween1.onComplete.add(this.saveScore,this)
        this.throwTween1.start();
        this.throwTween2.start();
        this.boardSplash1.visible = false;
        this.boardSplash2.visible = false;
        //
        
    };
    
    Game.prototype.saveScore=function(){
        alivenow.Global.replayCount++;
        alivenow.Global.gameStart = false;
        Game.obj.waitBG = Game.obj.game.add.sprite(0,0,"waitBG");
        Game.obj.scoreTotal = alivenow.Global.minute*60+alivenow.Global.second+alivenow.Global.msecond/1000;
        
        _server.send(alivenow.Global.URL_DATA,Game.obj.showScore,null,{uid:alivenow.Global.U_ID,saveType:"score",score:Game.obj.scoreTotal,minute:alivenow.Global.minute,second:alivenow.Global.second,msecond:alivenow.Global.msecond,gameTry:alivenow.Global.replayCount,gender:alivenow.Global.gender})
       
        
    };
    
    Game.prototype.showScore=function(){
         Game.obj.game.state.start("Score");
    };
    
    Game.prototype.sinkCharacter=function(){
        this.sinkTween = new Phaser.Tween(this.character,this.game,this.game.tweens);
        this.sinkTween.to({y:this.character.y+160},150);
        this.sinkTween.start();
     
        
    }
    
    Game.prototype.update=function(){
        if(alivenow.Global.introShown){
            if(alivenow.Global.gameStart){
            alivenow.Global.elapsedTime+=33/2;//Date.now()-alivenow.Global.startTime;
            alivenow.Global.msecond = Math.floor(alivenow.Global.elapsedTime % 1000);
            alivenow.Global.second = Math.floor( (alivenow.Global.elapsedTime/1000) % 60);
            alivenow.Global.minute = Math.floor( (alivenow.Global.elapsedTime/60000) );
	        alivenow.Global.msecondStr=(alivenow.Global.msecond<10)?"0"+String(alivenow.Global.msecond):String(alivenow.Global.msecond);
	        alivenow.Global.secondStr=(alivenow.Global.second<10)?"0"+String(alivenow.Global.second):String(alivenow.Global.second);
	        alivenow.Global.minuteStr=(alivenow.Global.minute<10)?"0"+String(alivenow.Global.minute):String(alivenow.Global.minute);
	        if(alivenow.Global.msecondStr.length==3){
  Game.obj.gameTime.text=alivenow.Global.minuteStr+":"+alivenow.Global.secondStr+":"+alivenow.Global.msecondStr.replace(alivenow.Global.msecondStr.substring(alivenow.Global.msecondStr.length-1), "");
    }	
	else{
        		Game.obj.gameTime.text=alivenow.Global.minuteStr+":"+alivenow.Global.secondStr+":"+alivenow.Global.msecondStr;

    }
        }
        this.itemToRemove=[];
     
        if(this.boardLeft.visible){
            this.boardBound1 = this.leftBoardArea.getBounds();
            this.boardBound2 = this.leftBoardArea2.getBounds();
           // console.log("checkon left board");
        }else if(this.boardRight.visible){
            this.boardBound1 = this.rightBoardArea.getBounds();
            this.boardBound2 = this.rightBoardArea2.getBounds();
            //console.log("checkon right board");
        }
        
            for(i=0;i<this.itemGr.children.length;i++){
                this.curr_item = this.itemGr.getChildAt(i);
                if(this.curr_item.itemType=="Items"){
                    this.curr_item.xSpeed+=0.04;
                    this.curr_item.ySpeed+=0.06;
                    this.curr_item.y-=this.curr_item.ySpeed;
                    this.curr_item.scale.set((1-this.curr_item.ySpeed/30),(1-this.curr_item.ySpeed/30));
                    this.curr_item.x+=this.curr_item.xSpeed;
                    this.itemBound  = this.curr_item.getBounds();
                    if((this.itemBound.intersects(this.boardBound1)||this.itemBound.intersects(this.boardBound2))&&!this.curr_item.collidedAlready&&!this.lostControl){
                        this.curr_item.collidedAlready = true;
                        
                        if(this.curr_item.itemIndex<=3){
                            this.addBonus(this.curr_item,this.curr_item.itemIndex);
                            this.curr_item.readyToRemove = true;
                        }else{
                            this.missBalanceCount++;
                           if(this.missBalanceCount>=2){
                                this.fallCharacter();
                            }else{
                                this.tryToBalance(); 
                            } 
                        }
                        
                       
                    
                    }
                
                    if(this.curr_item.y<=500||this.curr_item.x>=(960+this.curr_item.width)||this.curr_item.readyToRemove){
                        this.itemToRemove.push(this.curr_item);
                    }
                }
            }
        
        
        for(i=0;i<this.itemToRemove.length;i++){
            this.itemGr.removeChild(this.itemToRemove[i]);
            this.itemToRemove[i].destroy();
        }
         //console.log(this.itemProg+" itemProg")
        if(this.itemProg>=this.itemDelay&&alivenow.Global.gameStart){
          //  console.log("Add Item")
            this.addItem();
            this.itemProg=0;
            if(this.itemDelay>60){
                this.itemDelay-=1;
               // console.log(this.itemDelay+" Item Delay")
            }
           // this.itemDelay=this.getRandom(50,150);
        }else{
            this.itemProg++;
           
        }
        if(this.game.input.activePointer.isDown&&!this.lostControl){
            if(this.game.input.activePointer.x<(560/2)){
                   this.defaultCharacterFrame = alivenow.Global.gender+"16";
                 this.hintFrame = alivenow.Global.gender+"5";
                 this.fallFrame = alivenow.Global.gender+"2";
                 this.endFrame = alivenow.Global.gender+"0";
                 this.limitFrame = alivenow.Global.gender+"14";
                 this.fallStartFrame = alivenow.Global.gender+"4";
                this.facedDirection = "left";
                 if(this.currentDirection!="left"){
                     this.moveEnabled = true;
                      if(!this.character.balancingAlready){
                     //this.character.recoveringBalance = true;
                          
                     this.character.animations.play("characterMoveLeft")
				   // TweenMax.killTweensOf(male)
				   // male.gotoAndStop(defaultCharacterFrame);
				   // TweenMax.to(male, 0.25, {frameLabel:limitFrame});
			         }else{
                         this.characterBalanceRight.stop();
                         this.characterBalanceLeft.stop();
                         this.character.frameName=this.defaultCharacterFrame;
                         this.tryToBalance();
                     }
                 }
                 this.boardLeft.visible=true;
                 this.boardRight.visible = false;
                 this.boardSplash1.angle =  20;
                 this.currentDirection = "left";
                 this.prevDirection = "left";
                 
              
                
            }else{
                this.defaultCharacterFrame = alivenow.Global.gender+"17";
                 this.hintFrame = alivenow.Global.gender+"28";
                 this.fallFrame = alivenow.Global.gender+"31";
                 this.endFrame = alivenow.Global.gender+"33";
                 this.limitFrame = alivenow.Global.gender+"19";
                 this.fallStartFrame = alivenow.Global.gender+"29";
                this.facedDirection = "right";
                if(this.currentDirection!="right"){
                     this.moveEnabled = true;
                      if(!this.character.balancingAlready){
                     //this.character.recoveringBalance = true;
                        
                        this.character.animations.play("characterMoveRight")
				   // TweenMax.killTweensOf(male)
				   // male.gotoAndStop(defaultCharacterFrame);
				   // TweenMax.to(male, 0.25, {frameLabel:limitFrame});
			         }else{
                         this.characterBalanceRight.stop();
                         this.characterBalanceLeft.stop();
                         this.character.frameName=this.defaultCharacterFrame;
                         this.tryToBalance();
                     }
                 }
                 this.boardLeft.visible=false;
                 this.boardRight.visible = true;
                 this.boardSplash1.angle =  -20;
                 this.currentDirection = "right";
                 this.prevDirection = "right";
                 
                 
            }
        }else{
            if(this.currentDirection=="left"){
                this.character.frameName=alivenow.Global.gender+"16";
            }else if(this.currentDirection=="right"){
                this.character.frameName=alivenow.Global.gender+"17";
            }
            this.currentDirection = "";
        }
        
        if(!((this.character.x+560/2.5)<0&&(this.currentDirection=="left"||this.currentDirection==""))&&!((this.character.x+560/1.7)>560&&(this.currentDirection=="right"||this.currentDirection==""))){
		switch(this.currentDirection){
			case "left":
				this.speed=this.speed<7?this.speed+1:this.speed;
				this.character.x-=this.speed;
                this.boardLeft.x-=this.speed;
                this.boardRight.x-=this.speed;
				break;
			case "right":
				this.speed=this.speed<7?this.speed+1:this.speed;
				this.character.x+=this.speed;
                this.boardLeft.x+=this.speed;
                this.boardRight.x+=this.speed;
				break;
			case "":
				this.speed=this.speed>0?this.speed-1:0;
				if(this.speed==0&&this.prevDirection!=""){
					this.prevDirection="";
				}
				if(this.prevDirection=="left"){
					this.character.x-=this.speed;
                    this.boardLeft.x-=this.speed;
                    this.boardRight.x-=this.speed;
                    
                }
				if(this.prevDirection=="right"){
					this.character.x+=this.speed;
                    this.boardLeft.x+=this.speed;
                    this.boardRight.x+=this.speed;
                  
                }
				break;
		}
	}else{
        
		this.speed=this.speed>0?this.speed-0:this.speed;
       if(this.controlOnTilt){
           this.speed=0;
       }
	}
        }
        
        
    };
    
    Game.prototype.addBonus=function(item,index){
        alivenow.Global.elapsedTime+=index*1000;
        this.scoreSpr = this.game.add.sprite(item.x,item.y,index+"Score");
        this.scoreGr.addChild(this.scoreSpr);
        this.scoreSpr.scale.set(0.2,0.2);
        this.scoreSpr.alpha=0;
        this.scoreSpr.anchor.set(0.5,0.5);
        this.scoreSpr.x+=this.scoreSpr.width/2;
        this.scoreTween = new Phaser.Tween(this.scoreSpr.scale,this.game,this.game.tweens);
        this.scoreTween.to({x:1,y:1},500);
        this.scoreTween.start();
         this.scoreTween2 = new Phaser.Tween(this.scoreSpr,this.game,this.game.tweens);
        this.scoreTween2.to({y:this.scoreSpr.y-100,alpha:1},500);
        this.scoreTween2.start();
       
        this.scoreTween2.onComplete.addOnce(this.removeScore,this.scoreSpr)
        
    };
    
    Game.prototype.removeScore=function(spr){
        console.log("removing score")
        Game.obj.scoreTween3 = new Phaser.Tween(spr,Game.obj.game,Game.obj.game.tweens);
        Game.obj.scoreTween3.to({y:spr.y-50,alpha:0,delay:200},500);
        console.log(Game.obj,spr)
        Game.obj.scoreTween3.onComplete.addOnce(Game.obj.removeScore2,spr)
        Game.obj.scoreTween3.start();
    };
    Game.prototype.removeScore2=function(spr){
        Game.obj.scoreGr.removeChild(spr);
    };
    
    Game.prototype.getRandom=function(min, max)
    {
        if (min == max) return min;
        if (min < max) return min + (Math.random() * (max - min + 1));
        else return max + (Math.random() * (min - max + 1));
    };

    


   
    
    return Game;
})();