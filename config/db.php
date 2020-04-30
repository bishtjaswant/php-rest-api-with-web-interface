<?php

try {
    $conn= new PDO("mysql:host=localhost;dbname=phpajax",'root');;
    $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);
 //   echo 'OK';
} catch (PDOException $th) {
    echo $th->getMessage();
}