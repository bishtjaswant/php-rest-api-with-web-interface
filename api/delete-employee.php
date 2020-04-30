<?php

header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers:Access-Control-Allow-Methods,Content-Type,X-Requested-With,Authorization');

require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'db.php';


if ($_SERVER['REQUEST_METHOD'] === "DELETE" ) {


    $data =  json_decode(file_get_contents("php://input"), true);

    // print_r($data);die;
    $stmt = $conn->prepare("DELETE FROM `employees` WHERE id=:eid");

    if (is_object($stmt)) {
        $stmt->bindParam(':eid',$data['eid'],PDO::PARAM_INT);
        $stmt->execute();
        if ( $stmt->rowCount()>0  ) {
        echo json_encode(array('message'=>'Record  deleted successfully','data' => null,  'status' => true));
        } else {
            echo json_encode(array('data' => null, 'message' => 'deletion query failed or may me record already deleted', 'status' => false));
        }
    }
} else {
    echo json_encode(array('data' => null, 'message' => 'invalid method', 'status' => false));
}
