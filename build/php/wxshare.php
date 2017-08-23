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

  function getToken(){
  //获取文件
   $file = file_get_contents("./token.json",true);
  //获取内容
   $result = json_decode($file,true);
  
    if (time() > $result['expires']){
        $data = array();
        $data['access_token'] = getNewToken();
        $data['expires']=time()+7000;
        $jsonStr =  json_encode($data);
        $fp = fopen("./token.json", "w");
        fwrite($fp, $jsonStr);
        fclose($fp);
        return $data['access_token'];
      }else{
        return $result['access_token'];
      }
  }
  function getNewToken(){
     global $appid,$appsecret;
    $url_gettoken = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appid}&secret={$appsecret}";
    $access_token_Arr =  https_request($url_gettoken);
    return $access_token_Arr['access_token'];
  }
  function getTicket(){
    //获取文件
   $file_ticket = file_get_contents("./jsapi_ticket.json",true);
     //获取内容
   $result_ticket = json_decode($file_ticket,true);
  
    if (time() > $result_ticket['expires']){
        $data_ticket = array();
        $data_ticket['ticket'] = getNewTicket();
        $data_ticket['expires']=time()+7000;
        $jsonStr =  json_encode($data_ticket);
        $fp = fopen("./jsapi_ticket.json", "w");
        fwrite($fp, $jsonStr);
        fclose($fp);
        return $data_ticket['ticket'];
      }else{
        return $result_ticket['ticket'];
      }
  }
  function getNewTicket(){
    $token=getNewToken();
    $url_getticket = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=$token&type=jsapi";
    $ticket_Arr =  https_request($url_getticket);
    return $ticket_Arr['ticket'];
  }
$jsapi_ticket=getTicket();

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
 return json_decode($output,true);
 }