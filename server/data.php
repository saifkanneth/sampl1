<?php



    require_once ('/home/newsfeed/public_html/libs2/functions.php');
        require_once("dataHandle.php");



    $obj = new Functions("dubai");

    $uid = $_POST["uniqID"];

	$dataObj = $obj->htmlEncode($_POST["obj"]);
	
	

$query = $obj->myPdo->from('wildwadi_game_count')->select(array('encryptkey'))->where('uid', $uid);

$res  = $query->fetch();

$key = $res['encryptkey'];

$dataAr=explode(".",$dataObj);

$hader=$dataAr[0];

$pay=$dataAr[1];

$sig=$dataAr[2];

$my_sig = hash_hmac('sha256', $hader.".".$pay, $key);

$hed=base64_decode($hader);

$decode_pay=json_decode(base64_decode($dataAr[1]),true);

if($decode_pay["t"]==$hed){

    $r2 = $sig[0];

	$r1 = $sig[1];

	$x=substr($sig,2);

	$a_sig = substr($x,0,$r1).substr($x,$r1+$r2);

	$my_sig=base64_encode(hash_hmac('sha256', $hader.".".$pay, $key));

	if($my_sig==$a_sig){

        $array_str = base64_decode($pay);

        $json = json_decode($array_str,true);
	//print_r($json);
        if($uid==$json["uid"]){

            $out["code"]=200;

            $out["uid"]=$json["uid"];

            $out["score"]=$json["score"];

        }

    }

}


if($json["saveType"] == "nameEmail"){

	$name = $obj->htmlEncode($json["name"]);
    $email = $obj->htmlEncode($json["email"]);
	$values = array('uid' => $json[uid], 'device' => 'mobile', 'name' => $name, 'email' => $email);
	$obj->saveData('wildwadi_game_data', $values);
}


print_r($json);

if($json["saveType"] =="score"){
	
$query = $obj->myPdo->from('wildwadi_game_count')->select(array('gameTry'))->where('uid', $json[uid]);
	$res  = $query->fetch();
	$res_time = $res['gameTry'];

	$score = $json["score"];
	$minute = $json["minute"];
	$second = $json["second"];
	$msecond = $json["msecond"];
	$gender = $json["gender"];
	$data=array('gender' => $gender,'gameTry' => $json["gameTry"],'uid' => $uid,'score' => $score,'minute' => $minute,'second' => $second,'msecond' => $msecond,'origin' =>$_SERVER['HTTP_ORIGIN'],'http_Referer' =>$_SERVER['HTTP_REFERER']);
    $obj->saveData('wildwadi_game_score', $data);
	



    }



?>

