<?php

header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Methods,Content-Type,X-Requested-With,Authorization');

require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'db.php';


if ($_SERVER['REQUEST_METHOD'] === "POST") {

    // pass searck key through POST request 
    $data =  json_decode(file_get_contents("php://input"), true)['keyword'];

    $sql = "SELECT * FROM `employees` WHERE name LIKE ?";
    $params = array("%$data%");
    $stmt = $conn->prepare($sql);
    if (is_object($stmt)) {
        $stmt->execute($params);
        if ($stmt->rowCount() > 0) {
            $rows = $stmt->fetchAll();
            echo json_encode(array('data' => $rows,  'status' => true));
        } else {
            echo json_encode(array('data' => null, 'message' => 'no  result found', 'status' => false));
        }
    }
} else {
    echo json_encode(array('data' => null, 'message' => 'invalid method', 'status' => false));
}
