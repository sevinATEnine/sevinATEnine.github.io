<?php
$messageId=$_GET["messageId"];
$id=$_GET["id"];
$sender=$_GET["sender"];
$message=$_GET["message"];
$user=$_GET["user"];
$time = date(DATE_RFC822);

$to = "simon@wirz.com,bmctilton@gmail.com";
$subject = "Reported message";
$txt = "User $user has reported the following:\n\nMessage id: $messageId\nId: $id\nSender: $sender\nMessage: $message\nTime: $time\n\nIf you want to delete, go to this link:\nhttps://hobbyrobot.com/cst/MessagingSystem2/delete.php?id=$messageId";
$headers = "From: CST Reports" . "\r\n";

mail($to,$subject,$txt,$headers);

echo "Reported message $messageId [$id]";

?>