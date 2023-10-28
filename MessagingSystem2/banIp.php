<a href='./browse.php'>Back</a><br><br>
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
<hr>
<div>
    <div id='out'></div>
    <script>
        main();
        async function main() {
            var out=document.getElementById('out');
            out.innerHTML = "<h3>Banned Ips</h3><textarea id='outTextarea'>";
            var outTextarea = document.getElementById('outTextarea');
                    await fetch('./removeIp.php')
                    .then(response => response.text())
                    .then(text => {
                        outTextarea.innerHTML += (text); 
                    });

                    out.innerHTML += (`</textarea><br><button onclick='submitData(${textarea.value});'>Submit</button><br>`);
        }
    </script>
</div>