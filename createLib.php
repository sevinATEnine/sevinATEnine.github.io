<?php
    $lib = fopen("./libraries/".$_POST["file"].'.cst', "w") or die("Unable to open file!");
    $txt = $_POST["contents"];
    fwrite($lib, $txt);
    fclose($lib);
    echo("Library created.")
?>