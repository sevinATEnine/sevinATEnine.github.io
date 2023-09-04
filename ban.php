<?php 
    if ($_GET['auth']=="!312645root.com/eat~") {
        echo('Could not ban ' . $_GET['user'] . ', due to code still work in progress');
    } else {
        echo('Could not ban ' . $_GET['user'] . ', due to invalid auth.');
    }
?>