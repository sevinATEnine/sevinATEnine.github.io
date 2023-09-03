<?php
function ReplaceBadWords($comment){
    $badword = array();
    $replacementword = array();
    $sqlOutput = explode("", file_get_contents('https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/badwordslist/badwords.txt'));
    $wordlist = join("|",$sqlOutput); // replace with the list of bad words from attached rar file
    $words = explode("|", $wordlist);
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
