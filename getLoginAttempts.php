<!----------------------------------------------------------------------------------------------------

The following document is owned by:
@sevinATEnine (and alt) @Cesium72 @tacocat15 and @cmsmith02

It is under the Creative Commons license and may not be reproduced commercially or without
direct permission from the authors.

Other files linked to this repository, with the exception of some of the assets, also hold
the same criteria.

---------------------------------------------------------------------------------------------------->

<!DOCTYPE html>
<head>
  <title>CST Login Attempts</title>
  <link rel="icon" type="image/x-icon" href="./assets/favicon.ico">
  <style>
    input {
      width: 25%;
      margin-bottom: 3px;
      border-radius: 5px;
      height: 20px;
    }
    div,a {
      width: 30%;
      height: 20px;
      background-color: skyblue;
      border-radius: 5px;
      color: black;
      cursor: pointer;
      padding: 5px;
      border: none;
      text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    * {
      font-family: "Lucida Console", "Menlo", "Monaco", "Courier", monospace;
      
    }
    body {
      background: rgb(218, 237, 255);
    }

    #messages {
      height: 400px;
      max-height: 400px;
      overflow-y: scroll;
      overflow-x: wrap;
      background: rgb(218, 237, 230);
      width:100%;
      cursor: default;
    }
  </style>
</head>
<body>
  <h1>CST Login Attempts - Only works on <a href="https://hobbyrobot.com/cst/getLoginAttempts.php">Hobbyrobot website</a></h1>
        <a href="./index.html">Back to login</a>
        

  <br>
  <br>
  <hr>
  <head>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
</head>

<?php
// $servername = "localhost";
// $username = "elem435_cst_usr";
// $password = "#3rm|n@2";
// $dbname = "elem435_cst";

// // Create connection
// $conn = new mysqli($servername, $username, $password, $dbname);
// // Check connection
// if ($conn->connect_error) {
//   die("Connection failed: " . $conn->connect_error);
// }

// $sql = "SELECT item, contents FROM settings";
// $result = $conn->query($sql);

// // echo $result;
// if ($result->num_rows > 0) {
//   // output data of each row
//   while($row = $result->fetch_assoc()) {
//     if ($row["item"]=="lockdown-mode") {
//         echo $row["contents"];
//     }
//   }
// } else {
//   echo "error";
// }
// $conn->close();
?>

<table>
    <tr><th>True User</th><th>True User 2</th><th>Login User</th><th>OS</th><th>Browser</th><th>IP</th><th>Time</th></tr>
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

// $sql = "CREATE TABLE Stock(ItemName text, Ammount int, Price int)";
$sql = "SELECT trueUsername, loginUsername, os, browser, ip1, loginTime, trueUsername2 FROM loginAttempts ORDER BY loginTime DESC";
// $sql = "DELETE FROM Stock";
// $sql = "INSERT INTO Stock VALUES('Test 3',5,20)";

$result = $conn->query($sql);

// echo $result;
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo "<tr><td>".$row['trueUsername']."</td><td>".$row['trueUsername2']."</td><td>".$row['loginUsername']."</td><td>".$row['os']."</td><td>".$row['browser']."</td><td>".$row['ip1']."</td><td>".$row['loginTime']."</td></tr>";
  }
} else {
    echo("</table>no results<br>");
    echo($conn->error);
}
$conn->close();
?>

</table>
</body>
