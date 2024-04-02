<?php 

    include("database.php");

    if($_POST["id"]){
        
        $id = $_POST["id"];
        $query = "DELETE from task WHERE id = $id";

        $result = mysqli_query($connection, $query);

        if(!$result){
            die("Query failed");
        }

        echo "Task deleted Successfully";

    }

    


?>