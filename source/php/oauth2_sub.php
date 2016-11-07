<?php
$code = $_GET['code'];//Ç°¶Ë´«À´µÄcodeÖµ
$appid = "wxe818778f16e4400d";
$appsecret = "0f96dfcb79cf259c66217b7af95e20fe";//»ñÈ¡openid

$url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appid&secret=$appsecret&code=$code&grant_type=authorization_code";
$result = https_request($url);
$jsoninfo = json_decode($result, true);
$openid = $jsoninfo["openid"];//´Ó·µ»Øjson½á¹ûÖÐ¶Á³öopenid


$callback=$_GET['callback'];  // echo $callback."({result:'".$openid."'})";


$url1="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$appsecret";
$result1 = https_request($url1);
$jsoninfo1 = json_decode($result1, true);
$access_token = $jsoninfo1["access_token"];//´Ó·µ»Øjson½á¹ûÖÐ¶Á³öopenid

$url2="https://api.weixin.qq.com/cgi-bin/user/info?access_token=$access_token&openid=$openid";
$result2 = https_request($url2);
$jsoninfo2 = json_decode($result2, true);
$subscribe=$jsoninfo2["subscribe"];
$nickname=$jsoninfo2["nickname"];

// echo $openid.":".$access_token.":".$nickname.":".$subscribe; //°Ñopenid ËÍ»ØÇ°¶Ë
echo "good night";


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




?>