<?php

header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Methods,Content-Type,X-Requested-With,Authorization');

require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'db.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $ids  =  json_decode(file_get_contents("php://input"), true);

    // DELETE FROM employees WHERE id IN (122,123,125)

  
        foreach (  $ids as $id  ) {
            $stmt = $conn->prepare("DELETE FROM employees WHERE id IN (:id)    ");
            $stmt->bindParam(':id',$id,PDO::PARAM_STR);
            $stmt->execute();
        }
        if ($stmt->rowCount() > 0) {
            echo json_encode(array('message'=>'Selected records Successfully Deleted', 'status' => true));
        } else {
            echo json_encode(array( 'message' => 'query failed', 'status' => false));
        }
    
} else {
    echo json_encode(array('message' => 'invalid method', 'status' => false));
}
