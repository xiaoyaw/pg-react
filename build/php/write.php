<?php 
	//获取文件
	 $file = file_get_contents("./token.json",true);
	//获取内容
	 $result = json_decode($file,true);
	
    if (time() > $result['expires']){
        $data = array();
        $data['access_token'] = "现在时间是："+time();
        $data['expires']=time()+7000;
        $jsonStr =  json_encode($data);
        $fp = fopen("./token.json", "w");
        fwrite($fp, $jsonStr);
        fclose($fp);
        echo $data['access_token'];
      }else{
        echo $result['access_token'];
      }

?>