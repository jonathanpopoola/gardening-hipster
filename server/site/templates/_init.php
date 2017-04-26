<?php 

error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);
//error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);

// $working_dir = wire('config')->debug ? 'dev' : 'live';

// require_once './' . $working_dir . '/variables.inc';

function output_json($success, $code, $result, $errors, $cache, $cacheTime) {
  if(!$cacheTime) {
    $cacheTime = 30;
  }
  if($success) {
    http_response_code(200);
    if($cache) {
      header('Content-Type: application/json');
      header("Cache-Control: Cache-Control: public, max-age=$cacheTime, s-maxage=$cacheTime");
      header("Expires: " . gmdate('D, d M Y H:i:s \G\M\T', time() + $cacheTime));
      header("Pragma: cache");
    } else {          
      header('Content-Type: application/json');
      header("Expires: on, 01 Jan 1970 00:00:00 GMT");
      header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
      header("Cache-Control: no-store, no-cache, must-revalidate");
      header("Cache-Control: post-check=0, pre-check=0", false);
      header("Pragma: no-cache");
    }
  } else {    
    http_response_code(400);
    header('Content-Type: application/json');
    header("Expires: on, 01 Jan 1970 00:00:00 GMT");
    header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
    header("Cache-Control: no-store, no-cache, must-revalidate");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
  }

  echo json_encode(
    array(
      'success' => $success, 
      'code' => $code, 
      'session' => array('isLoggedIn' => wire('user')->isLoggedIn()),
      'result' => $result,
      'errors' => $errors
    )
  );
  die();
}

$operation = Api::getInstance()->getOperation();
//if the site is accesed internally login the user
//ignore ajax requests
if(!wire('user')->isLoggedin() && Api::getInstance()->isInternal() && !wire('config')->ajax && !in_array($operation, array('user/login', 'user/logout'))) {
  //try catch in case login happens too quickly
  try {
    wire('session')->login('internal', 'Int3rnalus3r');     
  } catch(Exception $e) {}
} 

function cross_origin_headers($origin) {
    if ( preg_match('https://gardening-hipster-jonnyhitek.c9.io/', $origin) ) {
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Methods: POST, OPTIONS, GET'); 
    }
}

cross_origin_headers($_SERVER['HTTP_ORIGIN']);