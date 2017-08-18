var alivenow=alivenow||{};

alivenow.Title=(function(){
    function Title(){};
    
    Title.prototype.create=function(){
        Title.obj = this;
        
        this.titleBG = this.game.add.sprite(0,0,"gameBG");
        this.title = this.game.add.sprite(0,0,"title");
        
    
    
     
        
        
        this.femaleBtn = this.add.button(115, 280, "buttons", this.onCharacterSelection, this.femaleBtn, "gender0000","gender0000","gender0000");
        this.maleBtn = this.add.button(290, 280, "buttons", this.onCharacterSelection, this.maleBtn, "gender0000","gender0000","gender0000");
        this.maleBtn.key="male";
        this.femaleBtn.key="female";
        this.maleBtn.alpha = this.femaleBtn.alpha = 0;
        
    };
    
    Title.prototype.onCharacterSelection=function(){
        Title.curr_item=this;
        setTimeout(function(){
            Title.obj.game.scale.startFullScreen(false);
            alivenow.Global.gender=Title.curr_item.key;
            console.log(alivenow.Global.gender)
            Title.obj.game.state.start("Game");
        },200)
        Title.obj.waitBG = Title.obj.game.add.sprite(0,0,"waitBG");
        
    };
    
    
    return Title;
    
})();