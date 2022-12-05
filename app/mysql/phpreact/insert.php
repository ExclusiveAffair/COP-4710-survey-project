<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow from any origin
if(isset($_SERVER["HTTP_ORIGIN"]))
{
    // You can decide if the origin in $_SERVER['HTTP_ORIGIN'] is something you want to allow, or as we do here, just allow all
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
}
else
{
    //No HTTP_ORIGIN set, so we allow any. You can disallow if needed here
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 600");    // cache for 10 minutes

if($_SERVER["REQUEST_METHOD"] == "OPTIONS")
{
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT"); //Make sure you remove those you do not want to support

    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    //Just exit with 200 OK with the above headers for OPTIONS method
    exit(0);
}

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM registered_users";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3])) {
            $sql .= " WHERE email = :email";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':email', $path[3]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        if (!$users) echo "nothing found";
        else echo json_encode($users);
        break;

    case 'POST':
        $user = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO registered_users(email, password, published_surveys, invited_surveys) VALUES(:email, :password, :published_surveys, :invited_surveys)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':password', $user->password);
        $stmt->bindParam(':published_surveys', $user->published_surveys);
        $stmt->bindParam(':invited_surveys', $user->invited_surveys);

        if ($stmt->execute()) {
            echo json_encode([
                'status' => 1,
                'message' => 'Record created successfully.'
            ]);
        } else {
            echo json_encode([
                'status' => 0,
                'message' => 'Failed to create record.'
            ]);
        }
        break;

    case "PUT":
        $user = json_decode( file_get_contents('php://input') );
        $path = explode('/', $_SERVER['REQUEST_URI']);
        echo $path[4];
        if(isset($path[4]) && $path[4] == 'editPublished') {
            $sql = "UPDATE registered_users SET published_surveys = :published_surveys WHERE email = :email";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':published_surveys', $user->published_surveys);
            $stmt->bindParam(':email', $user->email);
    
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
            echo json_encode($response);
        }
        else if (isset($path[4]) && $path[4] == 'editInvited') {
            $sql = "UPDATE registered_users SET invited_surveys = :invited_surveys WHERE email = :email";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':invited_surveys', $user->invited_surveys);
            $stmt->bindParam(':email', $user->email);
    
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
            echo json_encode($response);
        }
        
        break;
}