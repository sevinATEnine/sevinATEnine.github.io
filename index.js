    var password = null;
    var username = null;
    let users = {
      'c@d3N': '(0d3r_4_L1FE',
      '$|m0n': 'Dev',
      '70DD': 'yesn\'t',
      '$@wy3|-': 'dogecoin',
      'GUesT_1.0': 'GU35T_D3V3L0P3R',
      'c2@r@': 'unicute',
      'm0m': '0m0',
      'd@d': 'ipv4',
      'TigerShark6471': '13243546',
      'dev testing': 'devs only',
      'Ethan':'123',
    };
   
    // fetch('https://api.ipify.org?format=json')


    async function useUrl(url){
      const response = await fetch(url);
      var data = await response.text();
      console.log(data);
      ipAddress = (data.replace('{','').replace('}',''));
      window.sessionStorage.setItem('IPv4', (ipAddress));
      return ipAddress;
    }





    fetch('./bannedUsers.txt')
    .then(response => response.text())
    .then(text => console.log(text))
   
    // ban-$|m0n=false,
    // ban-c@d3N=false,
    // ban-70DD=false,
    // ban-$@wy3|-=false






    function signin() {
      password = document.getElementById('password');
      username = document.getElementById('username');
      if (users[username.value] == password.value) {
        sessionStorage.setItem('permittedTerminalCST', 'affirmed');
        sessionStorage.setItem("userTerminalCST", username.value);
        document.getElementById('success').style.display = 'block';
        document.getElementById('incorrect').style.display = 'none';
        document.getElementsByTagName('button')[0].onclick = '';
        console.log((useUrl('https://api.ipify.org?format=json')+', {"username":"'+username.value+'"}'));
        console.log(window.sessionStorage.getItem('IPv4')+', "username":"'+username.value+'"')
        document.getElementById('ipAddress').innerHTML = (window.sessionStorage.getItem('IPv4')+', "username":"'+username.value+'"');
        location.href="./terminal.html";
        
      } else {
        document.getElementById('incorrect').style.display = 'block';
        password.value = '';
        username.value = '';
        sessionStorage.setItem('permittedTerminalCST', 'denied');
      }
    }
