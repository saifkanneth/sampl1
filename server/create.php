<?php

    require_once ('/home/newsfeed/public_html/libs2/functions.php');

    $obj = new Functions("dubai");
    $key = $obj->getToken(15,20);
 	
    $uid = $obj->createUser("wildwadi_game_count","mobile",array('encryptkey' => substr($key,3,8)));
    

    echo json_encode(array('UID' => $uid,'gamekey' => $key));

?>