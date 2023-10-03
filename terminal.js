/****************************************************************************************************

The following document is owned by:
@sevinATEnine (and alt) @Cesium72 @tacocat15 and @cmsmith02

It is under the Creative Commons license and may not be reproduced commercially or without
direct permission from the authors.

Other files linked to this repository, with the exception of some of the assets, also hold
the same criteria.

****************************************************************************************************/
var tempData = null;
async function getData(url) {
  let response = await fetch(url);
  let data = await response.text();
  return data;
}

function forceDownload(blob, filename) {
  var a = document.createElement('a');
  a.download = filename;
  a.href = blob;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// Current blob size limit is around 500MB for browsers
function saveFunc() {
  functions[funcToSave] = text.value.split("\n");
  hideEdit();
}
function hideEdit() {
  document.getElementById("editor").style.display = "none";
}
function retrieve(input) {
  switch (input) {
    case 'user': {
      tempData = sessionStorage.getItem('userTerminalCST');
      break;
    }
    case 'battery': {
      tempData = "Battery temporarily unavailable."
      break;
    }
  }
}
function downloadResource(url, filename) {
  if (!filename) filename = url.split('\\').pop().split('/').pop();
  fetch(url, {
    headers: new Headers({
      Origin: location.origin,
    }),
    mode: 'cors',
  })
    .then((response) => response.blob())
    .then((blob) => {
      let blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, filename);
    })
    .catch((e) => console.log(e));
}
function ampHandle(data) {
  return data
    .split('&n')
    .join('\n')
    .split('&s')
    .join(' ')
    .split('&p')
    .join('|')
    .split('&b')
    .join('\\')
    .split('&a')
    .join('&');
}
const arrDefault = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
  'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
  'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
  'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
  's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2',
  '3', '4', '5', '6', '7', '8', '9', '!', '@', '#', '$',
  '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[',
  ']', '{', '}', '\\', '|', ';', ':', '"', "'", ',', '<',
  '.', '>', '/', '?', '`', '~', ' '
];
function encrypt(input, key) {
  var key2 = key;
  var outputA = "";
  if (key.length != 0) {
    while (key2.length < input.length) {
      key2 += key;
    }
    for (var i = 0; i < input.length; i++) {
      outputA += arrDefault[((arrDefault.indexOf(input[i]) - arrDefault.indexOf(key2[i])) % arrDefault.length >= 0) ? (arrDefault.indexOf(input[i]) - arrDefault.indexOf(key2[i])) % arrDefault.length : arrDefault.length + (arrDefault.indexOf(input[i]) - arrDefault.indexOf(key2[i]))]
    }
    return outputA;
  }
}
function decrypt(input, key) {
  var key2 = key;
  var outputA = "";
  if (key.length != 0) {
    while (key2.length < input.length) {
      key2 += key;
    }
    for (var i = 0; i < input.length; i++) {
      outputA += arrDefault[(arrDefault.indexOf(input[i]) + arrDefault.indexOf(key2[i])) % arrDefault.length];
    }
    return outputA;
  }
}
function writeToStack(data, type = "output") {
  localStorage.setItem("terminalStack",localStorage.getItem("terminalStack") + "|" + encodeURI("<span class='"+type+"'>"+data+"</span>"));
}
function varHandle(data, len, mode = false) {
  var outputSplit = data.slice(len + 1).split('\\');
  var final = '';
  var final2 = '';
  var isString = true;
  for (var i = 0; i < outputSplit.length; i++) {
    if (isString == true) {
      final += outputSplit[i];
      isString = !isString;
    } else {
      final += parameters[parameters.length - 1][parseFloat(outputSplit[i]) - 1];
      isString = !isString;
    }
  }
  //final = final.split('&n').join('\n').split('&s').join(' ').split('&p').join('|').split('&b').join('\\').split('&a').join('&')
  outputSplit = final.split('|');
  isString = true;
  for (var i = 0; i < outputSplit.length; i++) {
    if (isString == true) {
      final2 += outputSplit[i];
      isString = !isString;
    } else {
      final2 += aliases[outputSplit[i]];
      isString = !isString;
    }
  }
  if (mode === true) {
    final2 = ampHandle(final2);
  }
  return final2;
}

let names = {
  'c@d3N': 'ThatGuyOverThere',
  '$|m0n': 'TacoMan',
  '70|)|)': 'yes',
  'GUesT_1.0': 'guest',
  '$@wy3|-': 'Sawyer',
  'root': 'GET OFF THE ACCOUNT, SAWYER',
  'c2@r@': 'Claire',
  'm0m': "Wirz's Mom",
  'd@d': "Wirz's Dad",
  'TigerShark6471': 'TheGuyShetoldyounottoworryabout',
  'D3v_73571ng': 'GET OFF THE ACCOUNT, SAWYER',
  '(#@r2|3': 'Charlie',
  'Ethan': 'Ethan',
  '(@2v1n': 'NEEEEERRRRRRDDDDD',
}; //basic name definitions
var aliases = {};
var parameters = [];
var funcToSave = "";
var text = document.getElementById("fm");
let libUrl = '';
var permitted = window.sessionStorage.getItem('permittedTerminalCST');
var command = document.getElementById('command');
var prev = document.getElementById('previous');
var cmdSplit = null;
var execWindow = [];
var clear = 0;
var foreground = 'green';
var functions = {};
var clearMode = '';
var clearFunc = '';
var prevCommand = '';
if (!localStorage.getItem("terminalStack")) {
  localStorage.setItem("terminalStack","")
}
//Just some variables


var parts = window.location.search.substr(1).split("&");
var $_GET = {};
for (var i = 0; i < parts.length; i++) {
  var temp = parts[i].split("=");
  $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
}

console.log($_GET);
try {
  if ($_GET.code.length > 5) {
    permitted = 'affirmed';
  }
} catch {

}



//#############################################//

// permitted='affirmed';

//#############################################//



if (permitted != 'affirmed') {
  document.getElementById('body').style.display = 'none';
  window.alert(
    'Sorry, but you do not have permission to use the cst terminal. Please use the sign-in on our home page to gain access.'
  );
  location.replace('./index.html');
} else {
  if (localStorage.getItem('lockdownMode') === 'active') {
    if (
      prompt('Enter lockdown shuttoff key:') ==
      localStorage.getItem('lockdownCST')
    ) {
      alert('Lockdown mode lifted. Please reload this page.');
      localStorage.setItem('lockdownMode', false);
    } else {
      alert('Access denied.');
      location.href = './index.html';
    }
  }
  document.getElementById('prompt').textContent =
    'CST/' + names[sessionStorage.getItem('userTerminalCST')] + '-->';
  command.focus();
} //Access granted? Time to find out!

async function doCommand() {
  writeToStack("Running command...");
  document.getElementById('prompt').textContent =
    'CST/' + names[sessionStorage.getItem('userTerminalCST')] + '-->';
  command = document.getElementById('command');
  const output = document.createElement('li');
  output.className = 'output';
  cmdSplit = command.value.split(' ');
  while (cmdSplit[0] == 'if') {
    writeToStack("Executing if statement...");
    var ifToAdd = document.createElement('li');
    ifToAdd.textContent =
      'CST/' +
      names[sessionStorage.getItem('userTerminalCST')] +
      '-->' +
      command.value;
    prev.appendChild(ifToAdd);
    var conditional = command.value.split('>>')[0].slice(3);
    switch (conditional.split(' ')[1]) {
      case '==': {
      }
      case '=': {
        if (
          ampHandle(varHandle(conditional.split(' ')[0])) ==
          ampHandle(varHandle(conditional.split(' ')[2]))
        ) {
          command.value = command.value.slice(6 + conditional.length);
        } else {
          command.value = '';
        }
        break;
      }
      case '!=': {
      }
      case '<>': {
        if (
          ampHandle(varHandle(conditional.split(' ')[0])) !=
          ampHandle(varHandle(conditional.split(' ')[2]))
        ) {
          command.value = command.value.slice(6 + conditional.length);
        } else {
          command.value = '';
        }
        break;
      }
      case '>': {
        if (
          parseFloat(ampHandle(varHandle(conditional.split(' ')[0]))) >
          parseFloat(ampHandle(varHandle(conditional.split(' ')[2])))
        ) {
          command.value = command.value.slice(6 + conditional.length);
        } else {
          command.value = '';
        }
        break;
      }
      case '<': {
        if (
          parseFloat(ampHandle(varHandle(conditional.split(' ')[0]))) <
          parseFloat(ampHandle(varHandle(conditional.split(' ')[2])))
        ) {
          command.value = command.value.slice(6 + conditional.length);
        } else {
          command.value = '';
        }
        break;
      }
      case '<=': {
      }
      case '!>': {
        if (
          parseFloat(ampHandle(varHandle(conditional.split(' ')[0]))) <=
          parseFloat(ampHandle(varHandle(conditional.split(' ')[2])))
        ) {
          command.value = command.value.slice(6 + conditional.length);
        } else {
          command.value = '';
        }
        break;
      }
      case '>=': {
      }
      case '!<': {
        if (
          parseFloat(ampHandle(varHandle(conditional.split(' ')[0]))) >=
          parseFloat(ampHandle(varHandle(conditional.split(' ')[2])))
        ) {
          command.value = command.value.slice(6 + conditional.length);
        } else {
          command.value = '';
        }
        break;
      }
      default: {
        output.textContent = 'Error 06: Invalid comparison operator.';
        output.className = 'error';
        return 0;
      }
    }
    cmdSplit = command.value.split(' ');
  }
  switch (cmdSplit[0]) {
    case 'help': {
      output.innerHTML =
        "<ul><li>* Work in progress<li>welcome: Shows the welcome screen<li>help: Shows list of basic commands<li>docs: Shows all commands *<li>credits: Shows credits<li>echo: Prints text<li>quit or exit: Logs out of CST<li>kill: Kills the terminal and forwards to an empty page<li>clear: CLears the terminal<li>admin: Enters the root user<li>ranks: Displays list of ranks<li>users: Displays list of users<li>exec: Executes commands<li>alias [key] [value]: Makes alias<li>get-alias [key]: Gets the value of an alias<li>theme [bg] [fg]: Changes the theme<li>dowload [name] [url]: Dowloads a file from a url<li>echo [text]: Prints out text<li>save [hard|soft] [key]: Saves aliase to sessionstorge|localstorage<li>view-save [hard|soft] [key]: Views data saved by save command in sessionstorge|localstorage<li>clear-save [hard|soft|var]: Clears data saved by save command in sessionstorge|localstorage|variables<li>redirect [url]: Redirects to a url<li>exec: Runs a command set by add-exec<li>add-exec: Sets the exec command to execute a command<li>cursor [cursor]: Changes the cursor<li>watch-me: Makes a mirror<li>html [code]: Generates html<li>reset: Resets the terminal<li>throw [type] [text]: Throws an error<li>colore: Changes the default colors<li>file[name]: stores a file to alias of 'name'.<li>read: reads a file<li>anti-sawyer: VITAL TO KEEPING SAWER OFF THE TERMINAL, WE CANNOT LET SAWYER READ THIS OR HE WILL HAVE FULL ACCESS TO EVERYTHING</ul>";
      break;
    }
    case 'read': {
      var file = document.createElement('input');
      file.type = 'file';
      file.click();
      file.addEventListener('change', handleFileSelect, false);
      function handleFileSelect(event) {
        const reader = new FileReader();
        reader.onload = handleFileLoad;
        reader.readAsText(event.target.files[0]);
      }

      function handleFileLoad(event) {
        var content = event.target.result;
        output.textContent = 'Contents of: ' + file.value + ':';
        output.style.color = 'white';
        output.textContent += content;
      }
      break;
    }
    case 'filter': {
      output.innerHTML = await fetch('https://hobbyrobot.com/cst/filterText.php?text=' + command.value.slice(7)).text();
      break;
    }
    case 'file': {
      var file = document.createElement('input');
      file.type = 'file';
      file.click();
      file.addEventListener('change', handleFileSelect, false);
      function handleFileSelect(event) {
        const reader = new FileReader();
        reader.onload = handleFileLoad;
        reader.readAsText(event.target.files[0]);
      }

      function handleFileLoad(event) {
        aliases[varHandle(cmdSplit[1], -1, true)] = event.target.result;
      }
      break;
    }
    case 'js': {
      var p = document.createElement('button');
      p.setAttribute('onclick', varHandle(command.value, 2, true));
      document.body.appendChild(p);
      p.click();
      p.remove();
      break;
    }
    case '/*/': {
      command.value = '';
      return 0;
    }
    case 'view-save': {
      if (varHandle(cmdSplit[1], -1) == 'hard') {
        output.textContent = localStorage.getItem(cmdSplit[2]);
      } else if (varHandle(cmdSplit[1], -1) == 'soft') {
        output.textContent = sessionStorage.getItem(cmdSplit[2]);
      } else {
        output.textContent = 'Error 03: Invalid Parameter';
        output.className = 'error';
      }
      break;
    }
    case 'drop-func': {
      delete functions[varHandle(cmdSplit[1], -1, true)];
      break;
    }
    case 'load': {
      var file = document.createElement('input');
      file.type = 'file';
      file.click();
      file.addEventListener('change', handleFileSelect, false);
      function handleFileSelect(event) {
        const reader = new FileReader();
        reader.onload = handleFileLoad;
        reader.readAsText(event.target.files[0]);
      }

      function handleFileLoad(event) {
        functions[varHandle(cmdSplit[1], -1, true)] = event.target.result.split("\n");
      }
      break;
    }
    case 'rename-func': {
      functions[varHandle(cmdSplit[2], -1, true)] = functions[varHandle(cmdSplit[1], -1, true)];
      delete functions[varHandle(cmdSplit[1], -1, true)];
      break;
    }
    case 'new-func': {
      functions[varHandle(cmdSplit[1], -1, true)] = [];
      funcToSave = varHandle(cmdSplit[1], -1, true)
      document.getElementById("editor").style.display = "block";
      text.focus();
      break;
    }
    case 'edit-func': {
      document.getElementById("editor").style.display = "block";
      funcToSave = varHandle(cmdSplit[1], -1, true);
      text.value = functions[varHandle(cmdSplit[1], -1, true)].join("\n");
      text.focus();
      break;
    }
    case 'colore': {
      // animation: colore-colors 5s infinite;
      document.getElementById('body').style.animation =
        'colore-colors 5s infinite';
      command.style.animation = 'colore-colors 5s infinite';
      document.getElementById('prompt').style.animation =
        'colore-colors 5s infinite';
      command.style.animation = 'colore-colors 5s infinite';
      break;
    }
    case 'add-from': {
      for (var i = 0; i < functions[varHandle(cmdSplit[1], -1, true)].length; i++) {
        execWindow.push(functions[varHandle(cmdSplit[1], -1, true)][i]);
      }
      break;
    }
    case 'add-from-if': {
      for (var i = 0; i < functions[varHandle(cmdSplit[1], -1, true)].length; i++) {
        execWindow.push(
          'if ' +
          command.value.slice(13 + cmdSplit[1].length) +
          ' >> ' +
          functions[varHandle(cmdSplit[1], -1, true)][i]
        );
      }
      break;
    }
    case 'outer': {
      parameters.pop();
      break;
    }
    case 'inner': {
      parameters.push(varHandle(command.value, 5, true).split(' '));
      break;
    }
    case 'copy': {
      window.navigator.clipboard.writeText(varHandle(command.value, 4, true));
      break;
    }
    case 'view-copy': {
      await navigator.clipboard
        .readText()
        .then((text) => {
          output.innerText = text;
          output.className = 'output';
        })
        .catch((err) => {
          output.innerText = ('Failed to read clipboard contents: ', err);
          output.className = 'error';
        });
      break;
    }
    case 'clear-save': {
      if (varHandle(cmdSplit[1]) == 'hard') {
        localStorage.clear();
      } else if (varHandle(cmdSplit[1]) == 'soft') {
        sessionStorage.clear();
      } else if (varHandle(cmdSplit[1]) == 'var') {
        aliases = {};
      } else {
        output.textContent = 'Error 03: Invalid Parameter';
        output.className = 'error';
      }
      break;
    }
    case 'echo': {
      output.innerText = varHandle(command.value, 4, true);
      break;
    }
    case 'watch-me': {
      var video = document.createElement('video');
      video.autoplay = 'true';
      output.appendChild(video);

      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(function (stream) {
            video.srcObject = stream;
          })
          .catch(function (err0r) {
            console.log('Something went wrong!');
          });
      }
      break;
    }
    case 'cursor': {
      document.querySelector('*').style.cursor = varHandle(command.value, 6);
      break;
    }
    case 'open': {
      var a = document.createElement('a');
      a.href = varHandle(cmdSplit[1], -1, true);
      a.target = '_blank';
      a.click();
      break;
    }
    case 'redirect': {
      location.replace(varHandle(command.value, 8, true));
      break;
    }
    case 'quit': {
      sessionStorage.setItem('permittedTerminalCST', 'loggedOut');
      location.replace('./index.html');
      break;
    }
    case 'save': {
      if (varHandle(cmdSplit[1], -1, true) == 'hard') {
        localStorage.setItem(varHandle(cmdSplit[2], -1, true), aliases[varHandle(cmdSplit[2], -1, true)]);
      } else if (varHandle(cmdSplit[1], -1, true) == 'soft') {
        if (
          aliases[varHandle(cmdSplit[2], -1, true)] == 'root' &&
          varHandle(cmdSplit[2], -1, true) == 'userTerminalCST'
        ) {
          output.textContent =
            'Stop! You may not enter the root user without permission!';
          output.className = 'fatal-error';
          break;
        }
        sessionStorage.setItem(varHandle(cmdSplit[2], -1, true), aliases[varHandle(cmdSplit[2], -1, true)]);
      } else {
        output.textContent = 'Errror 03: Invalid value for parameter';
        output.className = 'error';
      }
      break;
    }
    case 'add-exec': {
      execWindow.push(command.value.slice(9));
      break;
    }
    case 'ranks': {
      output.innerHTML =
        '<ul><li>0 | Root<li>1 | Owner<li>2 | Developer<li>3 | Admin<li>4 | Helper<li>5 | Icon<li>6 | Geek<li>7 | User<li>8 | Guest<li>9 | Banned</ul>';
      break;
    }
    case 'users': {
      output.innerHTML =
        '<ul><li>c@d3N | Developer<li>$|m0n | Developer<li>70DD | Developer<li>GUesT_1.0 | Guest<li>root | Root<li>$@wy3|- | User<li>c2@r@ | User<li>m0m | User<li>d@d | User<li>TigerShark6471 | User<li>(#@r2|3 | Geek</ul>';
      break;
    }
    case 'alias': {
      aliases[varHandle(cmdSplit[1], -1, true)] = varHandle(
        command.value,
        cmdSplit[1].length + 6,
        true
      );
      break;
    }
    case 'exec': {
      if (execWindow.length > 0) {
        clear = 1;
        clearMode = `single`;
      } else {
        output.textContent = 'Error 04: No executables created yet.';
        output.className = 'error';
      }
      break;
    }
    case 'encrypt': {
      output.textContent = encrypt(varHandle(command.value, 8 + varHandle(cmdSplit[1], -1, true).length, true), varHandle(cmdSplit[1], -1, true))
      break;
    }
    case 'decrypt': {
      output.textContent = decrypt(varHandle(command.value, 8 + varHandle(cmdSplit[1], -1, true).length, true), varHandle(cmdSplit[1], -1, true))
      break;
    }
    case 'theme': {
      document.getElementById('body').style.backgroundColor = varHandle(cmdSplit[1], -1, true);
      command.style.background = varHandle(cmdSplit[1], -1, true);
      foreground = varHandle(cmdSplit[2], -1, true);
      document.getElementById('prompt').style.color = foreground;
      command.style.color = foreground;
      break;
    }
    case 'credits': {
      output.innerHTML =
        '<ul><li>Simon & Caden: Programming<li>Todd: Graphics</ul>';
      break;
    }
    case 'clear': {
      prev.innerHTML = '';
      output.innerHTML = 'Command history cleared';
      break;
    }
    case 'exit': {
      location.replace('./index.html');
      break;
    }
    case '//': {
      break;
    } //comment in CST, returns no output

    case 'kill': {
      location.replace('about:blank');
      break;
    }
    case 'docs': {
      output.innerHTML =
        '<ul><li>help: Shows list of basic commands<li>docs: Shows all commands<li>credits: Shows credits<li>echo: Prints text<li>quit or exit: Logs out of CST<li>kill: Kills the terminal and forwards to an empty page<li>clear: CLears the terminal<li>admin: Enters the root user<li>ranks: Displays list of ranks<li>users: Displays list of users<li>exec: Executes commands<li>alias [key] [value]: Makes alias<li>get-alias [key]: Gets the value of an alias<li>theme: Changes the theme</ul>';
      break;
    }
    case '': {
      break;
    }
    case 'admin': {
      output.innerHTML = "<img src='./assets/rickroll.gif'>";
      break;
    }
    case 'download': {
      downloadResource(varHandle(cmdSplit[1], -1, true));
      break;
    }
    case 'lockdown': {
      if (sessionStorage.getItem('userTerminalCST') == 'root') {
        output.textContent = 'Lockdown mode activated.';
        output.className = 'important';
        localStorage.setItem('lockdownCST', varHandle(cmdSplit[1], -1, true));
        localStorage.setItem('lockdownMode', 'active');
      } else {
        output.textContent = 'Error 02: User lacking root priveleges.';
        output.className = 'error';
      }
      break;
    }
    case 'switch-user': {
      if (sessionStorage.getItem('userTerminalCST') == 'root') {
        sessionStorage.setItem('userTerminalCST', varHandle(cmdSplit[1], -1, true));
        output.textContent = 'User switched successfully.';
        output.className = 'important';
      } else {
        output.textContent = 'Error 02: User lacking root priveleges.';
        output.className = 'important';
      }
      break;
    }
    case 'welcome': {
      output.innerHTML =
        '<ul>Welcome to the CST Command Line<li>The CST was created by (@d3n, (#@r2|3, $|m0n, and 70DD<ul>';
      break;
    }
    case 'html': {
      output.innerHTML = varHandle(command.value, 4, true);
      output.className = 'html';
      break;
    }
    case 'throw': {
      output.className = varHandle(cmdSplit[1], -1, true);
      output.innerText = varHandle(command.value, varHandle(cmdSplit[1], -1, true).length + 6, true);
      // output.textContent = batteryl;
      break;
    }
    case 'reset': {
      prev.innerHTML = '';
      localStorage.clear();
      sessionStorage.clear();
      document.getElementById('body').style.backgroundColor = 'black';
      command.style.background = `black`;
      foreground = `green`;
      output.innerHTML = 'Command line reset';
      output.className = 'important';
      break;
    }
    case 'drop-alias': {
      delete aliases[varHandle(cmdSplit[1], -1, true)]
      break;
    }
    case 'import-alias': {
      if (varHandle(cmdSplit[1], -1, true) == 'hard') {
        aliases[varHandle(cmdSplit[2], -1, true)] = localStorage.getItem(varHandle(cmdSplit[3], -1, true));
      } else if (varHandle(cmdSplit[1], -1, true) == 'soft') {
        aliases[varHandle(cmdSplit[2], -1, true)] = sessionStorage.getItem(varHandle(cmdSplit[3], -1, true));
      } else if (varHandle(cmdSplit[1], -1, true) == 'var') {
        aliases[varHandle(cmdSplit[2], -1, true)] = aliases[varHandle(cmdSplit[3], -1, true)];
      } else if (varHandle(cmdSplit[1], -1, true) == 'encrypt') {
        aliases[varHandle(cmdSplit[2], -1, true)] = encrypt(varHandle(command.value, 22 + varHandle(cmdSplit[2], -1, true) + varHandle(cmdSplit[3], -1, true).length, true), varHandle(cmdSplit[3], -1, true));
      } else if (varHandle(cmdSplit[1], -1, true) == 'decrypt') {
        aliases[varHandle(cmdSplit[2], -1, true)] = decrypt(varHandle(command.value, 22 + varHandle(cmdSplit[2], -1, true) + varHandle(cmdSplit[3], -1, true).length, true), varHandle(cmdSplit[3], -1, true));
      } else if (varHandle(cmdSplit[1], -1, true) == 'get') {
        if (varHandle(cmdSplit[3], -1, true) == "battery") {
          await navigator.getBattery()
            .then(function (battery) {
              aliases[varHandle(cmdSplit[2], -1, true)] = Math.round(battery.level * 100);

            })
            .catch(function () {
              output.textContent = 'Error 05: failed to read battery level';
              output.className = 'error';
            });
        } else {
          retrieve(varHandle(cmdSplit[3], -1, true));
          aliases[varHandle(cmdSplit[2], -1, true)] = tempData;
        }
      } else {
        output.className = 'error';
        output.textContent = 'Error 03: Invalid value for parameter.';
        break;
      }
      output.textContent = 'Alias imported successfully';
      break;
    }
    case 'clear-exec': {
      execWindow = [];
      break;
    }
    case 'export-exec': {
      functions[varHandle(cmdSplit[1], -1, true)] = execWindow;
      execWindow = [];
      break;
    }
    case '$': {
      clear = functions[varHandle(cmdSplit[1], -1, true)].length;
      clearMode = 'multiple';
      clearFunc = varHandle(cmdSplit[1], -1, true);
      parameters.push(command.value.slice(cmdSplit[1].length + 3).split(' '));
      for (var i = 0; i < parameters[parameters.length - 1].length; i++) {
        parameters[parameters.length - 1][i] = ampHandle(
          parameters[parameters.length - 1][i]
        );
      }
      break;
    }
    case 'view-func': {
      var funcToRead = functions[varHandle(cmdSplit[1], -1, true)];
      output.innerHTML = '<ul>';
      if (cmdSplit.length == 2) {
        for (var i = 0; i < funcToRead.length; i++) {
          output.innerHTML +=
            '<li>' +
            funcToRead[i].split('&').join('&amp;').split('<').join('&lt;') +
            '</li>';
          //output.innerHTML += funcToRead[i].split("<").join("&lt;").split("&").join("&amp;");
          //output.innerHTML += "</p/>";
        }
      } else {
        for (var i = 0; i < funcToRead.length; i++) {
          output.innerHTML +=
            '<li>' +
            command.value.slice(11 + cmdSplit[1].length) + funcToRead[i].split('&').join('&amp;').split('<').join('&lt;') +
            '</li>';
          //output.innerHTML += funcToRead[i].split("<").join("&lt;").split("&").join("&amp;");
          //output.innerHTML += "</p/>";
        }
      }
      output.innerHTML += '</ul>';
      break;
    }
    case 'import': {
      var e;
      if (cmdSplit.length === 2) {
        e = 1;
      } else {
        e = 2;
      }
      functions[varHandle(cmdSplit[e], -1, true)] = (
        await getData('./libraries/' + varHandle(cmdSplit[1], -1, true) + '.cst')
      ).split('\n');
      break;
    }
    case 'anti-sawyer': {
      output.classname =
        'fatal-error';
      output.innerHTML = "Alert, Alert, Alert!!!!!! The page has been compromised, shutting down...";
      window.alert(
        'Your computer may have been compromised, you have been hacked.'
      );
      // var audio = new Audio('assets/Alert.wav');
      // audio.play();
      window.location.href = 'https://theannoyingsite.com/';
      break;
    }
    case 'starwars-cont.':
      {
        output.innerHTML = '________________\n/               \\';
      }
      break;
    default: {
      if (command.value.substr(0, 1) == '$') {
        clear = functions[varHandle(cmdSplit[0], 0, true)].length;
        clearMode = 'multiple';
        clearFunc = varHandle(cmdSplit[0], 0, true);
        parameters.push(command.value.slice(varHandle(cmdSplit[0], 0, true).length + 1).split(' '));
        for (var i = 0; i < parameters[parameters.length - 1].length; i++) {
          parameters[parameters.length - 1][i] = ampHandle(
            parameters[parameters.length - 1][i]
          );
        }
      } else {
        output.innerHTML = 'Error 01: Invalid command';
        output.className = 'error';
      }
    }
  }
  const add = document.createElement('li');
  add.textContent =
    'CST/' +
    names[sessionStorage.getItem('userTerminalCST')] +
    '-->' +
    command.value;
  add.className = 'output';
  if (command.value.split(' ')[0] == '//') {
    add.className = 'comment';
  } else {
    add.style.color = foreground;
  }
  prev.appendChild(add);
  if (output.className == 'output') {
    output.style.color = foreground;
  }
  prev.appendChild(output);
  prevCommand = command.value;
  if (clear === 0) {
    command.value = '';
  }
  if (clear != 0) {
    if (clearMode == 'single') {
      command.value = execWindow[execWindow.length - 1];
    } else {
      command.value = functions[clearFunc][functions[clearFunc].length - clear];
    }
    clear -= 1;
    doCommand();
  }
  writeToStack("Command has run.");
}
command.addEventListener('keydown', function (event) {
  if (event.key == 'Enter') {
    doCommand();
  } else if (event.key == 'ArrowUp') {
    command.value = prevCommand;
    command.selectionEnd = command.value.length;
    command.focus();
  } else if (event.key == 'ArrowDown') {
    command.value = '';
  }
});
