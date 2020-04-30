<?php

header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');


require_once dirname(__DIR__).DIRECTORY_SEPARATOR. 'config'. DIRECTORY_SEPARATOR. 'db.php';

$stmt = $conn->prepare("select  * from employees order by id desc limit 20");

if (  is_object($stmt)    ) {
    $stmt->execute();
    if ($stmt->rowCount()>0) {
        $rows=$stmt->fetchAll();
            echo json_encode(array('data'=>$rows,'status'=>true) );
    }else{
        echo json_encode( array('data'=>null,'message'=>'we don\'t have any records ','status'=>false) );
    }
}