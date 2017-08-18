<?php
   
    header('Content-Type: application/json');
    require_once ('/home/newsfeed/public_html/libs2/functions.php');
    $obj = new Functions("dubai");

    $result = $obj->leadersBoard(array("table"=>"wildwadi_game_data","fields"=>array("uid","name")),array("table"=>"wildwadi_game_score","fields"=>array("score","minute","second","msecond")),5,true,"DESC");

   
   
 $newArray = array();
   foreach($result as $re)
   {
       
           array_push($newArray,$re);
       
   }
   echo json_encode($newArray);
 

?>