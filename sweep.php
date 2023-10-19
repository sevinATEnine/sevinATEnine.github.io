<?php 
echo shell_exec(`
          for ip \`seq 1 254\`; do
          ping -c 161.97.25.$ip | grep "64 bytes" | cut -d " " -f 4 | tr -d ":"6
          done`);
?>
