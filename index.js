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
      'dev_testing': 'devs only',
      'Ethan':'123',
      'root': 'go awwaaaayyyyy now!!!',
      '(@2v1n': 'is a nerd',
      'Calvin':'123',
      'Charlie':'123',
      'Ethan':'123',
      'Luke':'123',
      'Luka':'123',
      'Nico':'123',
      'Samil':'123',
      'Shaurya':'123',
      'Calvin':'123',
      'Guest':'123',
      'S':'123',
      '123':'123',
      'Cole':'123',
    };

    let banned = {
      'c@d3N': false,
      '$|m0n': false,
      '70DD': false,
      '$@wy3|-': false,
      'GUesT_1.0': false,
      'c2@r@': false,
      'm0m': false,
      'd@d': false,
      'TigerShark6471': false,
      'dev testing': false,
      'Ethan':false,
      'root': false,
      'Calvin':false,
      'Charlie':false,
      'Ethan':false,
      'Luke':false,
      'Luka':false,
      'Nico':false,
      'Samil':false,
      'Shaurya':false,
      'Calvin':false,
      'Guest':false,
      'S':false,
      '123':'123',
      'Cole':'123',
    };
    // fetch('https://api.ipify.org?format=json')

    function initial() {
      document.getElementById('file-input').addEventListener('change', handleFileSelect, false);
    }
    
    function handleFileSelect(event) {
      const reader = new FileReader()
      reader.onload = handleFileLoad;
      reader.readAsText(event.target.files[0])
    }
    
    function handleFileLoad(event) {
      datakey = event.target.result;
      if(datakey == "sxdft677uyhDr567yuHG67yuhgr4567YGT%^&Tyht67uTghjuytghiu9oires8uj(ghbjnkvyuunbuhivtfghJGtyhgUhsxdcvbnMJHYGTFDCvbhjgytfyydrfdesw#$%TYhgfcdrtgfttfgrt*gfdesr6tyuHygt56r6tYGGftrtyuHgtfr56ujhgfrTtyujhgtfr67654edvbhjhumnhyg=dfgyhdfvgyhbgffvbnujiuyredcfvgbhnjkewrfd7yuh3eyudhjnaweufuhdbnjsugfvbhgfdsxdcfvgbhhgfd,ngfthjhgfd?tghutrs78etnvyerhsuokhfyrsertghjytdryihubyusftewgufdsghr8w76t87&tghejaugfgehjksDJFH&*jkerabhynh jiotrf#gbhnfeajskbhn skjhrushyvrukshbfjkwiujkmjhnfgb fxvhgsgyruo&uihiulkh&*uiUbhjkHhufieahbudiaeroyfnhjid8u78yY8iweafUjyhjskrgresugfvnuersgfgvhbuyefrtgbhsjuythgrfedcvbghytrfdjhbgv") {
        sessionStorage.setItem('permittedTerminalCST', 'affirmed');
        sessionStorage.setItem("userTerminalCST","root");
        location.replace("./terminal.html");
      } else {
        document.getElementById('incorrect').style.display = 'block';
      }
    }
    async function useUrl(url){
      const response = await fetch(url);
      var data = await response.text();
      console.log(data);
      ipAddress = (data.replace('{','').replace('}',''));
      window.sessionStorage.setItem('IPv4', (ipAddress));
      return ipAddress;
    }





    // fetch('./bannedUsers.txt')
    // .then(response => response.text())
    // .then(text => console.log("|"+text+"|"))
   
    // ban-$|m0n=false,
    // ban-c@d3N=false,
    // ban-70DD=false,
    // ban-$@wy3|-=false






    function signin() {
      var password = document.getElementById('password');
      var username = document.getElementById('username');
      var tempUser = username.value;

      fetch('./bannedUsers.txt')
      .then(response => response.text())
      // .then(text => console.log(text.split('\n'))
      .then(text => {
        console.log((text.split('\n')).filter(item => item !== ''));
        var items = text.split('\n').filter(item => item !== '');
        console.log(tempUser);
        console.log(items.includes(tempUser));
        if (items.includes(tempUser)) {
          location.href="./blocked.html";
        }
      })
      
      if (username.value == "root") {
        document.getElementById('noroot').style.display = 'block';
        return 0;
      }
      if ((users[username.value] == password.value)&& (!banned[username.value])) {
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

    document.getElementById('password').addEventListener("keydown", function(event) {
      if (event.key == "Enter") {
        signin();
      } 
    });

    document.getElementById('username').addEventListener("keydown", function(event) {
      if (event.key == "Enter") {
        signin();
      } 
    });
