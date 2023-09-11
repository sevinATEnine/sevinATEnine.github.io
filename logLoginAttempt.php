<?php 

// $trueUsername = $_GET['trueUsername'];
// $loginUsername = $_GET['loginUsername'];
// $os = $_GET['os'];
// $browser = $_GET['browser'];
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

// $sql = "INSERT INTO loginAttempts (trueUsername, loginUsername, os, browser) VALUES ('".$trueUsername."','".$loginUsername."','".$os."','".$browser."')";
// $sql = "CREATE TABLE loginAttempts (trueUsername TEXT, loginUsername TEXT, os TEXT, browser TEXT)";
$sql = "";

$result = $conn->query($sql);
$echo($result);
$conn->close();



?>