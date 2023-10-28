<?php
$password = $_POST['loginPassword'];
$username = $_POST['loginUsername'];
if($username == 'SYSTEM_MASTER_MESSAGE_IP_ROOT_ADMIN') {
    if($password == '3.14159265358979323846264338327950288') {
        echo 'Successfully logged in.<br>';
    } else {
        die('LOGIN_ERROR_01: Invalid auth.');
    }
} else {
    die('LOGIN_ERROR_01: Invalid auth.');
}
?>