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
        $sql = "SELECT * FROM created_surveys";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $survey = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $survey = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($survey);
        break;

    case 'POST':
        $user = json_decode( file_get_contents('php://input') );

        $getMax = "SELECT MAX(id) AS max_id FROM created_surveys"; 
        $result = $conn->prepare($getMax);
        $result->execute();
        $test = $result->fetch(PDO::FETCH_ASSOC);

        $sql = "INSERT INTO created_surveys(id, title, description, participants, startDate, endDate, questions, responses) VALUES(:id, :title, :description, :participants, :startDate, :endDate, :questions, :responses)";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id', $test['max_id'] + 1, PDO::PARAM_INT);
        $stmt->bindParam(':title', $user->title);
        $stmt->bindParam(':description', $user->description);
        $stmt->bindParam(':participants', $user->participantsString);
        $stmt->bindParam(':startDate', $user->startDateString);
        $stmt->bindParam(':endDate', $user->endDateString);
        $stmt->bindParam(':questions', $user->questionString);
        $stmt->bindParam(':responses', $user->responseString);

        if ($stmt->execute()) {
            echo json_encode([
                'status' => 1,
                'id' => $test['max_id'] + 1,
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
        if(isset($path[4]) && $path[4] == 'editResponses') {
            $sql = "UPDATE created_surveys SET responses = :responses WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':responses', $user->responses);
            $stmt->bindParam(':id', $path[3]);
    
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
            echo json_encode($response);
        }
        
        break;

    case "DELETE":
        $sql = "DELETE FROM created_surveys";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
        } else {
            $stmt = $conn->prepare($sql);
        }

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }

        echo json_encode($response);
        break;
}