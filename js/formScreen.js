var alivenow=alivenow||{};

alivenow.Form=(function(){
    function Form(){
        
    };
  
    Form.prototype.init=function(){
        
    };
    Form.prototype.preload=function(){
        
    };
    
    Form.prototype.create=function(){
                  

        Form.game=this;
        alivenow.Global.skipRotationHandle = true;
        alivenow.Global.currentView="form";
       //this.scale.stopFullScreen();
        $('canvas').hide();
      
        $(".form_sec").show();
        $(".terms").on('click',function(){
            $("#myModal").modal('show')
        });
        $(".form_submit").on('click',this.handleSubmit);
       $(".term_btn2").on('click',function(){
                alivenow.Global.prevState="Form";
            alivenow.Global.game.state.start("Instruction");
           })
       
    };
    
     
    Form.prototype.handleSubmit=function() {
        var username = String(document.getElementById("name").value);
        var email = String(document.getElementById("email").value);
        var tandc = document.getElementById("field_terms1").checked;
        var indicate = $("#indicate")
        alivenow.Global.name=username;
        alivenow.Global.email=email;
        
        
       
        $(".form_error").show();

        if (username.length <= 0) {
            
            
                document.getElementsByClassName("form_error")[0].innerHTML = "Please enter a valid name.";
          
            
            return false;
        }
        
        
       

        if (email.length <= 0) {
           
           
            document.getElementsByClassName("form_error")[0].innerHTML = "Please enter a valid E-mail.";
            
            
            
            return false;
        }
var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        var m = re.test(email);

        if(!m) {
            
           
                document.getElementsByClassName("form_error")[0].innerHTML = "Please enter a valid E-mail.";
            
            
            
            return false;
        }
        
      if(!tandc){
           
            document.getElementsByClassName("form_error")[0].innerHTML = "Please accept the terms and conditions!";
            return false;
        }
        
        $(".waitImg").show();
       _server.send(alivenow.Global.URL_DATA,Form.game.showLeaderPage,null,{uid:alivenow.Global.U_ID,saveType:"nameEmail",name:username,email:email});
        
        alivenow.Global.skipRotationHandle = false;
        alivenow.Global.formSubmitted=true;
       
    };
   
    
   Form.prototype.showLeaderPage=function(v){
       $(".form_error").hide();
        $(".waitImg").hide();
       $(".form_sec").hide();
       $("canvas").show();
       Form.game.game.state.start("Leader");
   }
    
    Form.prototype.onCheckEmail=function(v){
  
    }
  
    
    return Form;
})();