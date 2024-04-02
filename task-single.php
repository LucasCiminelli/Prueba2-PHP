<?php

include("database.php");


$id = $_POST["id"];

$query = "SELECT * from task WHERE id= $id";

$result = mysqli_query($connection, $query);

if(!$result){
    die("Query failed");
}

while($row = mysqli_fetch_array($result)){
    $json[] = array(
        "name" => $row["name"],
        "description" => $row["description"],
        "id" => $row["id"],
    );
}

$dataToJson = json_encode($json[0]);
echo $dataToJson;




?>