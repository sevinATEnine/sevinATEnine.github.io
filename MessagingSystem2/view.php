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

  <title>CST New Messaging system</title>
  <link rel="icon" type="image/x-icon" href="./assets/favicon.ico">
  <style>
    input {
      width: 400px;
      margin-bottom: 3px;
      border-radius: 5px;
      height: 20px;
    }
    * {
        font-family: monospace;
        background-color: ghostwhite;
    }

    form {
        position: fixed;
        top:70%;
        height:30%;
        z-index:1;
    }
    div {
        border-radius: 5px;
        padding: 5px;
        width: fit-content;
        height: fit-content;
        border: 2px solid grey;
    }
    span {
        border-right: 1px solid black;
        padding: 5px;
        margin-right: 5px;
    }
    .messageArea {
      height: 500px !important;
      min-width: 500px !important;
      max-width: 99% !important;
      width: fit-content !important;
      border: 1px solid grey !important;
      overflow: scroll !important;
    }
    
  </style>
</head>
<body>
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
  $roomId = $_GET['roomId'];

  echo "<h1>CST New Messaging System - Room #$roomId</h1><a href='./browse.php'>Back</a><hr><div class='messageArea'>";

  $sql = "SELECT * FROM messages2 WHERE roomId = $roomId";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {

      echo "<div><small>".$row["timeSent"] . "</small><hr><span>" . $row["sender"] . "</span>" . $row["message"] . "</div><br>"; 
    }
  } else {
    echo "No messages";
  }
  
  $conn->close();
  echo "<script>var chatroomId=$roomId;</script>"
  ?>
  </div>
    <form action="./postMessage.php">
        <h3>Post Message</h3>
        <hr>
        <label for="username">Username</label><br>
        <input type="text" id="username" name="username" placeholder="John Doe" oninput="this.value=chatFilter(this.value);" required><br>
        <label for="message">Message:</label><br>
        <input type="text" id="message" name="message" placeholder="What's up?" oninput="this.value=chatFilter(this.value);" required>
        <input type="text" id="roomId" name="roomId" value="?" style='display: none;'><br><br>
        <input type="submit" value="Submit">
    </form>

    <script>
        document.getElementById('roomId').value = chatroomId;

        function chatFilter(text) {
          var output=text;

          // Regex \\
          // 'chars['+String(chars.indexOf('_'))+'] + '+'chars['+String(chars.indexOf('_'))+'] + '+'chars['+String(chars.indexOf('_'))+'] + '+'chars['+String(chars.indexOf('_'))+']'
          var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`-=~_+!@#$%^&*()[]{}\\|/.,<>?";
          chars = chars.split('');
          
          var badWords = ['balls', '69', '420', (chars[5] + chars[20] + chars[2] + chars[10])];
          for (word of badWords) {
            output = output.replace((eval('/'+String(word)+'/gi')), ('*'.repeat(word.length)));
          }

          return output;
        }
    </script>


</body>
