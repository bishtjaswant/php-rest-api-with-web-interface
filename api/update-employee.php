<?php

header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers:Access-Control-Allow-Methods,Content-Type,X-Requested-With,Authorization');

require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'db.php';


if ($_SERVER['REQUEST_METHOD'] === 'PUT') {


    $data =  json_decode(file_get_contents("php://input"), true);

    $stmt = $conn->prepare("UPDATE `employees` SET `name`=:ename,`email`=:eemail,`phone`=:ephone WHERE id=:eid");

    if (is_object($stmt)) {
        $stmt->bindParam(':ename',$data['ename'],PDO::PARAM_STR);
        $stmt->bindParam(':eemail',$data['eemail'],PDO::PARAM_STR);
        $stmt->bindParam(':ephone',$data['ephone'],PDO::PARAM_STR);
        $stmt->bindParam(':eid',$data['eid'],PDO::PARAM_INT);
        // $stmt->execute();
        if (  $stmt->execute() ) {
        echo json_encode(array('message'=>'updated successfully', 'status' => true));
        } else {
            echo json_encode(array('data' => null, 'message' => 'update query failed', 'status' => false));
        }
    }
} else {
    echo json_encode(array('data' => null, 'message' => 'invalid method', 'status' => false));
}
