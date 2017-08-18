

<?php
$t=time();
$id="";
$id2="";
?>

<!doctype html>
<html>
    
    
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        
        
        
       <meta property="fb:app_id" content="966242223397117">
	   <meta property="og:url" content="https://www.newsfeedsmartapps.com/wildwadi/mobile/game.php">
	   <meta property="og:title" content="Wild wadi demo game"> 
	   <meta name="author" content="WILD WADI">    
	   <meta property="og:description" content="">   
	   <meta property="og:type" content="video.other">
	   <meta property="og:image" content="https://www.newsfeedsmartapps.com/wildwadi/mobile/assets/appIcon.jpg">      
	   <meta property="og:video" content="https://www.newsfeedsmartapps.com/wildwadi/web/index.swf">
	   <meta property="og:video:secure_url" content="https://www.newsfeedsmartapps.com/wildwadi/web/index.swf">
	   <meta property="og:video:height" content="365">
	   <meta property="og:video:width" content="465">
	   <meta property="og:video:type" content="application/x-shockwave-flash">    
        
        <title>Wild wadi demo game</title>
       
        <script src="lib/jquery.js?v=<?php echo $t?>"></script>
        <script src="lib/core.js"></script>
        <script src="lib/enc-base64.js"></script>
        <script src="lib/sha.js"></script>
        <script src="lib/sha256.js"></script>
        <script src="lib/bootstrap.min.js"></script>
        <script src="lib/detectmobile.js"></script>
        <script src="lib/phaser2.min.js"></script>
        <script src="js/callServer.js?v=<?php echo $t?>"></script>
        <script src="js/Main.js?v=1<?php echo $t?>"></script>
        <script src="js/Global.js?v=<?php echo $t?>"></script>
        <script src="js/ResourceLoader.js?v=<?php echo $t?>"></script>
        <script src="js/titleScreen.js?v=<?php echo $t?>"></script>
        <script src="js/game.js?v=<?php echo $t?>"></script>
        <script src="js/scoreScreen.js?v=<?php echo $t?>"></script>
        <script src="js/formScreen.js?v=<?php echo $t?>"></script>
        <script src="js/leaderScreen.js?v=<?php echo $t?>"></script>
        <script src="js/shareScreen.js?v=<?php echo $t?>"></script>
        
        <link rel="stylesheet" href="lib/bootstrap.min.css"/>
        <script>
            var obj=new alivenow.Main();
            obj.init();
            _server=new alivenow.SERVER();
            $(document).ready(function(){
                $(".fluid-container").on('touchmove', function(e)
                {
                    e.preventDefault();
                });
            });
         
        </script>
        <script>
 	  	if(jQuery.browser.mobile)
      	{
  
   	  	}
      	else
      	{
   		   window.location='https://www.facebook.com/';
   	  	}
		</script>
        <style>
           
            @font-face{
                font-family:"HVBO";
                src:url('fonts/HVBO.otf');
            }
            
              #modalBtn2{
                padding-left: 10px;
            }
           
            
            
            body{
                margin: 0px;
                background-color: #000;
            }
            .form_sec{
             
                background-image: url(assets/formBG.jpg);
                background-size: 100% 100%;
                height: 100%;
                width: 100%;
                position: absolute;
                top: 0;
                display: none;
                background-color: #3eba8c;
                
            }
            .form-head1{
                font-family: OBELIXPRO;
                font-size: 30px;
                margin: 0px;
                color: #fff;
                
            }
            .chk{
                font-family: OBELIXPRO;
                color: #fff; 
                text-decoration: none;
                font-size: 15px;
                margin-bottom: 50px;
            }
            .chk:hover{
                 color: #fff; 
                text-decoration: none;
            }
          
            
            .err-form{
                font-family: MYRIADPRO;
                color: red;
                font-size: 20px;
            }
            
            canvas{
/*                /display: none !important;*/
            }
            .form_sec input{
                margin-bottom: 10px;
                font-family: HVBO;
                border-radius: 0px;
                color: #1f1d1d;
                border-radius: 25px;
                
            }
            input[type="checkbox"]{
                height: auto !important;
            }
            .checkField{
                text-align: center;
            }
            body{
                height:100vh;
            }
           
            #rotate{
                position: absolute;
                   
              background-size: cover;
              min-height: 100vh;
		      z-index : 5000;
            }
            .waitImg{
                position: absolute;
                display: none;
                width: 100%;   
              background-size: cover;
              min-height: 100vh;
		      z-index : 5001;
            }
            .waitImg img{
                width: 100%;
                height: 100%;
                position: absolute;
            }
            #rotate img{
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                left: 0;
                right: 0;
            }
            .mainHead,.subHead,.subHead2{
                font-family: HVBO;
            }
            .mainHead{
                color:#FFF200;
                text-align: center;
                font-size: 25px;
            }
            .subHead{
                font-size: 16px;
                text-align: center;
                margin-left: 20px;
                margin-right: 20px;
                color: #fff;
            }
            .subHead2{
                font-size: 12px;
                text-align: center;
                margin-left: 20px;
                margin-right: 20px;
                color: #fff;
            }
            .form_in{
                
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                display: table;
                margin-left: 30px !important;
                margin-right: 30px !important;
                width: calc(100% - 60px);
            }
            .terms{
                color: #fff;
                font-family: HVBO;
            }
            .form_submit{
                background-color:#FFF200;
                color: #003E7E;
                width: 50%;
                margin: auto;
                display:table;
                text-align: center;
                 font-family: HVBO;
                padding: 5px 10px 10px 5px;
            }
            #icon{
                display: table;
                margin: auto;
                position: relative;
                top: 20px;
                left: 0;
                right: 0;
            }
            .agree{
                text-align: center;
            }
            .form_error{
                font-family: HVBO;
                text-align: center;
                color: red;
                font-size: 17px;
            }
        </style>
    </head>
    
    <body>
    
        
        <div id="myModal" class="modal" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title text-center">TERMS & CONDITIONS23</h4>
            </div>
            <div class="modal-body">
                <p style="text-align: left;">1. This promotion is in no way sponsored, endorsed or administered by, or associated with, Facebook.</p>
                <p style="text-align: left;">2. You are providing information to WILD WADI and not to Facebook.</p>
            </div>
        </div>
    </div>
</div>
        
     
        
         <div class="form_sec">

            <div class="form_in">


                <div class="form-ctrl">
                    <h2 class="mainHead">Surfs Up! Flowrider Style!</h1>
                  
                    
                    <input type="text" id="name" placeholder="Name" class="form-control" maxlength="10">

                    <input type="email" id="email" placeholder="Email" class="form-control">


                    <div class="agree"><span><input type="checkbox" id="field_terms1"></span><span class="terms">I agree to the <span class="term_imp">Terms & Conditions</span></span></div>

                     <div class="form_submit">Next</div>

                    <div class="form_error"></div>
                    <img id="icon" src="assets/Icon.png"/>
                </div>


            </div>
           
        </div>
        
          <div id="rotate" style="display:none;">
        
            <img src="assets/tilt.png">
        </div>
        <div class="waitImg">
            <img src="assets/waitBG.png"/>
        </div>
    </body>
</html>