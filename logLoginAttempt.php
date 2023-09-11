<?php 

$trueUsername = $_GET['trueUsername'];
$loginUsername = $_GET['loginUsername'];
$os = $_GET['os'];
$browser = $_GET['browser'];
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


// $_SERVER['REMOTE_ADDR']

// $sql = "DELETE FROM loginAttempts";
// $sql = "INSERT INTO loginAttempts (trueUsername, loginUsername, os, browser) VALUES ('".$trueUsername."','".$loginUsername."','".$os."','".$browser."')";
$sql = "INSERT INTO loginAttempts (trueUsername, loginUsername, os, browser, ip1) VALUES ('".$trueUsername."','".$loginUsername."','".$os."','".$browser."','".$_SERVER['REMOTE_ADDR']."')";
// $sql = "ALTER TABLE loginAttempts ADD ip2 TEXT";

// $sql = "CREATE TABLE loginAttempts (
//     trueUsername TEXT, 
//     loginUsername TEXT, 
//     os TEXT, 
//     browser TEXT
//     )";
// $sql = "";

if ($conn->query($sql) === TRUE) {
    echo "Successfull";
  } else {
    echo "Error: " . $conn->error;
}

$conn->close();



?>