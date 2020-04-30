<?php

header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'db.php';


if ($_SERVER['REQUEST_METHOD']==='POST') {

    
    $id =  json_decode(file_get_contents("php://input"),true)['edit_id'];

    $stmt = $conn->prepare("select  * from employees where id=:id");

    if (is_object($stmt)) {
        $stmt->execute(array(':id'=>$id));
        if ($stmt->rowCount() > 0) {
            $rows = $stmt->fetch();
            echo json_encode(array('data' => $rows, 'status' => true));
        } else {
            echo json_encode(array('data' => null, 'message' => 'we don\'t have any records ', 'status' => false));
        }
    }
}
else{
    echo json_encode(array('data' => null, 'message' => 'invalid method', 'status' => false));

}
