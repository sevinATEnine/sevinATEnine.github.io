<?php
$messageId=$_GET["messageId"];
$id=$_GET["id"];
$sender=$_GET["sender"];
$message=$_GET["message"];
$reason=$_GET["reason"];
$user=$_GET["user"];

$to = "simon@wirz.com,bmctilton@gmail.com";
$subject = "Reported message";
$txt = "User $user has reported the following:\n\nMessage id: $messageId\nId: $id\nSender: $sender\nMessage: $message\nReason: $reason";
$headers = "From: CST Reports" . "\r\n";

mail($to,$subject,$txt,$headers);

echo "Reported message $messageId [$id]";

?>