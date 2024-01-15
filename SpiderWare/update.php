<?php
$servername = "localhost";
$username = "elem435_cst_usr";
$password = "#3rm|n@2";
$dbname = "elem435_cst";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT * FROM SpiderWareData WHERE ip ='".$_SERVER['REMOTE_ADDR']."'";
echo "$sql<br>";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  $sql = "UPDATE SpiderWareData SET jsondata='".$_POST['jsondata']."', lastUpdated='".date('m/d/Y h:i:s a', time())."' WHERE ip='".$_SERVER['REMOTE_ADDR']."'";
  echo "$sql<br>";

  if ($conn->query($sql) === TRUE) {
    echo "Record updated";
  } else {
    echo "Error updating record: " . $conn->error;
  }
} else {
  $sql = "INSERT INTO SpiderWareData(jsondata, lastUpdated, ip) VALUES ('".$_POST['jsondata']."', '".date('m/d/Y h:i:s a', time())."', '".$_SERVER['REMOTE_ADDR']."')";
  echo "$sql<br>";

  if ($conn->query($sql) === TRUE) {
    echo "Record inserted";
  } else {
    echo "Error inserting record: " . $conn->error;
  }
}




$conn->close();
?>