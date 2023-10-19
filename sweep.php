<?php 
echo exec('for ip `seq 1 254`; do\nping -c 161.97.25.$ip | grep "64 bytes" | cut -d " " -f 4 | tr -d ":"6\ndone')
?>
