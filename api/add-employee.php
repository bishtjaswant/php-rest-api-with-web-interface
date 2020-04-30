<?php

header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Methods,Content-Type,X-Requested-With,Authorization');

require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'db.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {


    $data =  json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("INSERT INTO `employees`(`name`, `email`, `phone`) 
    VALUES ( :ename,:eemail,:ephone )");

    if (is_object($stmt)) {
        $stmt->bindParam(':ename',$data['ename'],PDO::PARAM_STR);
        $stmt->bindParam(':eemail',$data['eemail'],PDO::PARAM_STR);
        $stmt->bindParam(':ephone',$data['ephone'],PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            echo json_encode(array('message'=>'Records Inserted Successfully', 'status' => true));
        } else {
            echo json_encode(array( 'message' => 'query failed', 'status' => false));
        }
    }
} else {
    echo json_encode(array('message' => 'invalid method', 'status' => false));
}
