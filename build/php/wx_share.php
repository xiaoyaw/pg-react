<?php
//奕甲飞播
// $appid = "wxe818778f16e4400d";
// $appsecret = "0f96dfcb79cf259c66217b7af95e20fe";//»ñÈ¡openid
//飞播e课
$app =$_GET['appid'];//前端传来的appid值

switch ($app) {
  //奕甲飞播
  case 'wxe818778f16e4400d':
    $appid = "wxe818778f16e4400d";  
    $appsecret = "0f96dfcb79cf259c66217b7af95e20fe";//»ñÈ¡openid
    $guan="MzIyNzE3NjM1Nw";
    break;
    //飞播e课
  case 'wx6573103bb78bec40':
    $appid = "wx6573103bb78bec40";
    $appsecret = "e80fc19c30db3387232d828d7dfdb402";//»ñÈ¡openid
    $guan="MzIzMDUxNDM0MQ";
  break;
}

//»ñÈ¡È«¾Ötoken
$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$appsecret";
$result = https_request($url);
$jsoninfo = json_decode($result, true);
$access_token = $jsoninfo["access_token"];//´Ó·µ»Øjson½á¹ûÖÐ¶Á³öopenid

//»ñÈ¡ticket
$url1 = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=$access_token&type=jsapi";
$result1 = https_request($url1);
$jsoninfo1 = json_decode($result1, true);
$jsapi_ticket=$jsoninfo1["ticket"];

//»ñÈ¡Ëæ»ú×Ö·û´®
$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
 $noncestr = "";
 for ($i = 0; $i < 16; $i++) {
      $noncestr .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    
//»ñÈ¡Ê±¼ä
$timestamp=time();

//»ñÈ¡url
$urll= $_GET['urll'];

//ASCLLÅÅÐò
$string = "jsapi_ticket=$jsapi_ticket&noncestr=$noncestr&timestamp=$timestamp&url=$urll";

//Ç©Ãû
$signature = sha1($string);

//ËÍ»ØÇ°¶Ë
echo $appid.":".$timestamp.":".$noncestr.":".$signature; 

 function https_request($url,$data = null){
  $curl = curl_init();   
  curl_setopt($curl, CURLOPT_URL, $url);   
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);   
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);    
  if (!empty($data)){    
  curl_setopt($curl, CURLOPT_POST, 1);  
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data);   
  }    
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 
  $output = curl_exec($curl);    
  curl_close($curl);    
  return $output;
 }