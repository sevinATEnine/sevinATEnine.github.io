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
    body {
      overflow-y:scroll !important;
    }
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

    #top {
        height:15vh;
        position:absolute;
        top:0px;
        left:0px;
        width:100%;
        border:none;
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
    form {
        position: fixed;
        top:80%;
        height:40%;
        z-index:1;
    }
    .messageArea {
      height: 550px;
      position:absolute;
      margin-top:15vh;
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

  echo "<div id='top'><h1>CST New Messaging System - Room #$roomId</h1><a href='./browse.php'>Back</a><hr></div><div class='messageArea'>";

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
        function genText(word) {
          var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`-=~_+!@#$%^&*()[]{}\\|/.,<>?";
          chars = chars.split('');
          var output = [];
          for (i of word) {
            output.push("chars["+chars.indexOf(i)+"]");
          }
          return "(" + output.join(" + ")+")";
        }

        document.getElementById('roomId').value = chatroomId;

        var objDiv = document.querySelector('.messageArea');
        objDiv.scrollTop = objDiv.scrollHeight;

        function chatFilter(text) {
          var output=text;

          // Regex \\
          // 'chars['+String(chars.indexOf('_'))+'] + '+'chars['+String(chars.indexOf('_'))+'] + '+'chars['+String(chars.indexOf('_'))+'] + '+'chars['+String(chars.indexOf('_'))+']'
          var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`-=~_+!@#$%^&*()[]{}\\|/.,<>?";
          chars = chars.split('');

          
          
          var badWords = [(chars[7] + chars[4] + chars[11] + chars[11]), (chars[18] + chars[7] + chars[8] + chars[19]), (chars[1] + chars[8] + chars[19] + chars[2] + chars[7]), (chars[3] + chars[8] + chars[2] + chars[10]), (chars[2] + chars[14] + chars[2] + chars[10]), (chars[2] + chars[20] + chars[12] + chars[12]), (chars[15] + chars[4] + chars[13] + chars[8] + chars[18]), (chars[1] + chars[0] + chars[11] + chars[11]), (chars[58] + chars[61]), (chars[56] + chars[54] + chars[52]), (chars[18] + chars[4] + chars[23]), (chars[1] + chars[17] + chars[4] + chars[0] + chars[18] + chars[19]), (chars[1] + chars[14] + chars[14] + chars[1]), (chars[0] + chars[18] + chars[18] + chars[7] + chars[14] + chars[11] + chars[4]), (chars[5] + chars[20] + chars[2] + chars[10]), (chars[13] + chars[8] + chars[6] + chars[6] + chars[4] + chars[17]), (chars[3] + chars[0] + chars[12] + chars[13]), (chars[17] + chars[4] + chars[19] + chars[0] + chars[17] + chars[3])];
          for (word of badWords) {
            output = output.replace((eval('/'+String(word)+'/gi')), ('*'.repeat(word.length)));
          }

          return output;
        }
    </script>


</body>
