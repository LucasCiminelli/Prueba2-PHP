<?php 

include("database.php");

$query = "SELECT * FROM task";

$result = mysqli_query($connection, $query);

if(!$result){
    die("Error al obtener los datos de la DB");
}

$json = array();

while($row = mysqli_fetch_array($result)){
    $json[] = array(
        "name" => $row["name"],
        "description" => $row["description"],
        "id" => $row["id"]
    );
}

$jsonString = json_encode($json);

echo $jsonString;


?>