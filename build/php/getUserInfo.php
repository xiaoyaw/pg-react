
<?php 
$code = $_POST['code'];//前端传来的code值
$app =$_POST['appid'];//前端传来的appid值
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
getUserInfo();
//第一步根据code获取openid
  function getOpenID(){
  global $appid,$appsecret,$code;
  $url_getid = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appid&secret=$appsecret&code=$code&grant_type=authorization_code";
  $openid_Arr = https_request($url_getid);
  return $openid_Arr["openid"];
  }
//第二步获取或者缓存全局token
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
//获取用户信息
  function getUserInfo(){
    global $appid,$guan;
    $openid=getOpenID();
    $token=getToken();
    $url_getinfo="https://api.weixin.qq.com/cgi-bin/user/info?access_token={$token}&openid={$openid}";
    //info数组 []
    $userinfo_Arr=https_request($url_getinfo);
    //抽取信息
    $subscribe=$userinfo_Arr["subscribe"];
    $nickname=$userinfo_Arr["nickname"];
    echo $openid.":".$token.":".$nickname.":".$subscribe.":".$guan; 
    //echo $userinfo_Arr;
  }

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
	

 ?>