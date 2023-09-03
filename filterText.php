<?php
function ReplaceBadWords($comment){
    $badword = array();
    $replacementword = array();
    $words = array("poo","poop", "pee", "pee-pee", "turd", "doo", "doo-doo");
    foreach ($words as $key => $word) {
    $badword[$key] = $word;
    $replacementword[$key] = addStars($word);
    $badword[$key] = "/{$badword[$key]}/i";
    };
    $comment = preg_replace($badword, $replacementword, $comment);
    return $comment;
}
    
function addStars($word) {
$length = strlen($word);
return str_repeat("*", $length);
}

echo(ReplaceBadWords($_GET['text']));


?>
