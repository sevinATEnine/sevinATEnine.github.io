
<?php
function ReplaceBadWords($comment){
    $badword = array();
    $replacementword = array();
    $wordlist = file_get_contents('http://www.joe0.com/download/badwordsnew.rar'); // replace with the list of bad words from attached rar file
    $words = explode("|", $wordlist);
    foreach ($words as $key => $word) {
    $badword[$key] = $word;
    $replacementword[$key] = addStars($word);
    $badword[$key] = "/\b{$badword[$key]}\b/i";
    };
    $comment = preg_replace($badword, $replacementword, $comment);
    return $comment;
}
    
function addStars($word) {
$length = strlen($word);
return str_repeat("*", $length);
}

echo(ReplaceBadWords("hi"));



?>
