<?php
function ReplaceBadWords($comment){
    $badword = array();
    $replacementword = array();
    $words = array("poo", "p00", "d00", "p33", "poop", "pee", "pee-pee", "turd", "doo", "doo-doo", "manure", "dung", "scat", "fart", "pass gas", "cut the cheese", "toot", "feces", "number two", "number 2", "fecal matter");
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
