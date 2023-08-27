<!DOCTYPE html>
<head>
  <title>CST Messages</title>
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
      background-color: rgb(218, 237, 255);
    }
  </style>
</head>
<body>
  <h1>CST Messages</h1>
        <a href="./index.html">Back to login</a>
  </script>


  <br>
  <br>
  <hr>
  <br>

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

  $sql = "SELECT username, messageContent FROM Messages";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
      echo $row["username"]. ": ". $row["messageContent"] . "<br>";
    }
  } else {
    echo "No messages";
  }

  $conn->close();


  // $sql = "CREATE DATABASE Messages";
  // if ($conn->query($sql) === TRUE) {
  //   echo "Database created successfully";
  // } else {
  //   echo "Error creating database: " . $conn->error;
  // }


  ?>
  <br>
  <hr>

</body>
