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
  writeToStack("Fetch succesful.");
}

function forceDownload(blob, filename) {
  writeToStack("Forcing download...");
  var a = document.createElement('a');
  a.download = filename;
  a.href = blob;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// Current blob size limit is around 500MB for browsers
function saveFunc() {
  aliases[funcToSave] = text.value.split("\n");
  writeToStack("Function saved.");
  hideEdit();
}
function hideEdit() {
  document.getElementById("editor").style.display = "none";
  writeToStack("Editor hidden.");
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
    writeToStack("Resource downloaded.");
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
function decrypt(input, key) {
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
function encrypt(input, key) {
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




function varHandle(data, len = -1, mode = false) {
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
  if(final.split(" ")[0] != "|:ARR|") {
  outputSplit = final.split('|');
  isString = true;
  for (var i = 0; i < outputSplit.length; i++) {
    if (isString == true) {
      final2 += outputSplit[i];
      isString = !isString;
    } else {
      if(outputSplit[i].includes(":")) {
      var temp = outputSplit[i].split(":");
      var root = aliases[temp[0]];
      temp.reverse();
      temp.pop();
      temp.reverse();
      for(var i of temp) {
        root = root[parseInt(i)-1];
      }
      final2 += root;
      } else {
        if (typeof aliases[outputSplit[i]] == "object") {
          return aliases[outputSplit[i]];
        } else {
          final2 += aliases[outputSplit[i]];
        }
      }
      isString = !isString;
    }
  }
} else {
  return final.slice(7).split(" ").map((t) => (varHandle(t, -1, true)));
}
  if (mode === true) {
    final2 = ampHandle(final2);
  }
  return final2;
}
writeToStack("New terminal session opened.","info");
let names = {
  'c@d3N': 'ThatGuyOverThere',
  '$|m0n': 'TacoMan',
  '70|)|)': 'yes',
  'Guest': 'GUEST_USER',
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
var aliases = {
'STACK':window.open('./stack.html'),
};
var tempAliases = {};
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
var clearMode = '';
var clearFunc = '';
var prevCommands = [""];
var historyIdx = 0;
//Just some variables
if(localStorage.getItem("custom") === null) {
  localStorage.setItem("custom","");
}

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












/// STACK HANDLING \\\




function writeToStack(data, type = "output") {
  localStorage.setItem("terminalStack",localStorage.getItem("terminalStack") + "|" + encodeURI("<span class='"+type+"'>"+data+"</span>"));
}
function clearStack() {
  localStorage.setItem("terminalStack", "");
}



clearStack();
writeToStack('Initialized', 'important');












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

async function doCommand(cmd) {
var time = 0;


  /// ADD TO HISTORY \\\

  writeToStack("<hr>")
  writeToStack(("Running command: "+document.getElementById('command').value));



  document.getElementById('prompt').textContent =
    'CST/' + names[sessionStorage.getItem('userTerminalCST')] + '-->';
  command = document.getElementById('command');
  const output = document.createElement('li');
  output.className = 'output';
  cmdSplit = cmd.split(' ');
  while (cmdSplit[0] == 'if') {
    writeToStack("Evaluating if statement...");
    var ifToAdd = document.createElement('li');
    ifToAdd.textContent =
      'CST/' +
      names[sessionStorage.getItem('userTerminalCST')] +
      '-->' +
      cmd;
    prev.appendChild(ifToAdd);
    var conditional = cmd.split('>>')[0].slice(3);
    switch (conditional.split(' ')[1]) {
      case '==': {
      }
      case '=': {
        if (
          ampHandle(varHandle(conditional.split(' ')[0])) ==
          ampHandle(varHandle(conditional.split(' ')[2]))
        ) {
          cmd = cmd.slice(6 + conditional.length);
          writeToStack("Conditional returned true. Executing next layer...");
        } else {
          cmd = '';
          writeToStack("Conditional returned false. If statement terminated.");
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
          cmd = cmd.slice(6 + conditional.length);
          writeToStack("Conditional returned true. Executing next layer...");
        } else {
          cmd = '';
          writeToStack("Conditional returned false. If statement terminated.");
        }
        break;
      }
      case '>': {
        if (
          parseFloat(ampHandle(varHandle(conditional.split(' ')[0]))) >
          parseFloat(ampHandle(varHandle(conditional.split(' ')[2])))
        ) {
          cmd = cmd.slice(6 + conditional.length);
          writeToStack("Conditional returned true. Executing next layer...");
        } else {
          cmd = '';
          writeToStack("Conditional returned false. If statement terminated.");
        }
        break;
      }
      case '<': {
        if (
          parseFloat(ampHandle(varHandle(conditional.split(' ')[0]))) <
          parseFloat(ampHandle(varHandle(conditional.split(' ')[2])))
        ) {
          cmd = cmd.slice(6 + conditional.length);
          writeToStack("Conditional returned true. Executing next layer...");
        } else {
          cmd = '';
          writeToStack("Conditional returned false. If statement terminated.");
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
          cmd = cmd.slice(6 + conditional.length);
          writeToStack("Conditional returned true. Executing next layer...");
        } else {
          cmd = '';
          writeToStack("Conditional returned false. If statement terminated.");
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
          cmd = cmd.slice(6 + conditional.length);
          writeToStack("Conditional returned true. Executing next layer...");
        } else {
          cmd = '';
          writeToStack("Conditional returned false. If statement terminated.");
        }
        break;
      }
      default: {
        writeToStack("Ivalid conditional. Terminating all processes. Search 'Error 06' in your CST manual.","error");
        output.textContent = 'Error 06: Invalid comparison operator.';
        output.className = 'error';
        return 0;
      }
    }
    cmdSplit = cmd.split(' ');
  }
  switch (cmdSplit[0]) {
    case 'self-exec': {
      break;
    }
    case 'help': {
      writeToStack("Displaying help menu.");
      output.innerHTML =
        "<ul><li>* Work in progress<li>welcome: Shows the welcome screen<li>help: Shows list of basic commands<li>docs: Shows all commands *<li>credits: Shows credits<li>echo: Prints text<li>quit or exit: Logs out of CST<li>kill: Kills the terminal and forwards to an empty page<li>clear: CLears the terminal<li>admin: Enters the root user<li>ranks: Displays list of ranks<li>users: Displays list of users<li>exec: Executes commands<li>alias [key] [value]: Makes alias<li>get-alias [key]: Gets the value of an alias<li>theme [bg] [fg]: Changes the theme<li>dowload [name] [url]: Dowloads a file from a url<li>echo [text]: Prints out text<li>save [hard|soft] [key]: Saves aliase to sessionstorge|localstorage<li>view-save [hard|soft] [key]: Views data saved by save command in sessionstorge|localstorage<li>clear-save [hard|soft|var]: Clears data saved by save command in sessionstorge|localstorage|variables<li>redirect [url]: Redirects to a url<li>exec: Runs a command set by add-exec<li>add-exec: Sets the exec command to execute a command<li>cursor [cursor]: Changes the cursor<li>watch-me: Makes a mirror<li>html [code]: Generates html<li>reset: Resets the terminal<li>throw [type] [text]: Throws an error<li>colore: Changes the default colors<li>file[name]: stores a file to alias of 'name'.<li>read: reads a file<li>anti-sawyer: VITAL TO KEEPING SAWER OFF THE TERMINAL, WE CANNOT LET SAWYER READ THIS OR HE WILL HAVE FULL ACCESS TO EVERYTHING<li>custom [command] - command is run by CTRL + m<li>open [url] [name]<li>close [tab name] - closes a tab named by the open command</ul>";
      break;
    }
    case 'read': {
      writeToStack("Awaiting file selection...");
      var file = document.createElement('input');
      file.type = 'file';
      file.click();
      file.addEventListener('change', handleFileSelect, false);
      function handleFileSelect(event) {
        writeToStack("File chosen successfully.");
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
      writeToStack("Awaiting fetch...");
      output.innerHTML = await fetch('https://hobbyrobot.com/cst/filterText.php?text=' + cmd.slice(7)).text();
      writeToStack("Fetch successful.");
      break;
    }
    case 'file': {
      writeToStack("Awaiting file selection...");
      var file = document.createElement('input');
      file.type = 'file';
      file.click();
      file.addEventListener('change', handleFileSelect, false);
      function handleFileSelect(event) {
      writeToStack("File chosen successfully.");
        const reader = new FileReader();
        reader.onload = handleFileLoad;
        reader.readAsText(event.target.files[0]);
      }

      function handleFileLoad(event) {
        aliases[varHandle(cmdSplit[1], -1, true)] = event.target.result;
      }
      break;
    }
    case 'close': {
      aliases[cmdSplit[1]].close();
      break;
    }
    case 'delay': {
      time = parseInt(cmdSplit[1]);
      break;
    }
    case 'skip': {
      clear -= parseInt(cmdSplit[1]);
      break;
    }
    case 'push': {
      aliases[cmdSplit[1]].push(cmd.slice(6 + cmdSplit[1].length));
      break;
    }
    case 'pop': {
      aliases[cmdSplit[1]].pop();
      break;
    }
    case 'reverse': {
      aliases[cmdSplit[1]].reverse();
      break;
    }
    case 'js': {
      var p = document.createElement('button');
      p.setAttribute('onclick', varHandle(cmd, 2, true));
      document.body.appendChild(p);
      writeToStack("Executing JavaScript...");
      p.click();
      writeToStack("JavaScript executed successfully.");
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
    case 'load': {
      var file = document.createElement('input');
      file.type = 'file';
      file.click();
      file.addEventListener('change', handleFileSelect, false);
      writeToStack("Awaiting file selection...");
      function handleFileSelect(event) {
        writeToStack("File chosen successfully.");
        const reader = new FileReader();
        reader.onload = handleFileLoad;
        reader.readAsText(event.target.files[0]);
      }

      function handleFileLoad(event) {
        aliases[varHandle(cmdSplit[1], -1, true)] = event.target.result.split("\n");
        writeToStack("File exported to function successfully.");
        if (aliases[cmdSplit[e]].map((inp) => (inp.split(" ")[0])).includes("self-exec")) {
          clear = aliases[cmdSplit[e]].length;
          clearMode = 'multiple';
          clearFunc = cmdSplit[e];
          parameters.push(aliases[cmdSplit[e]][aliases[cmdSplit[e]].map((inp) => (inp.split(" ")[0])).indexOf("self-exec")].slice(10).split(" ").map((inp) => (ampHandle(inp))));
          writeToStack("Function execution initiating...");
        }
      }
      break;
    }
    case 'rename': {
      aliases[varHandle(cmdSplit[2], -1, true)] = aliases[varHandle(cmdSplit[1], -1, true)];
      delete aliases[varHandle(cmdSplit[1], -1, true)];
      break;
    }
    case 'new-func': {
      aliases[varHandle(cmdSplit[1], -1, true)] = [];
      funcToSave = varHandle(cmdSplit[1], -1, true)
      document.getElementById("editor").style.display = "block";
      text.focus();
      break;
    }
    case 'edit-func': {
      writeToStack("Editor opened succesfully.");
      document.getElementById("editor").style.display = "block";
      funcToSave = varHandle(cmdSplit[1], -1, true);
      text.value = aliases[varHandle(cmdSplit[1], -1, true)].join("\n");
      text.focus();
      break;
    }
    case 'colore': {
      // animation: colore-colors 5s infinite;
      writeToStack("Look at the wonderful colors!","info");
      document.getElementById('body').style.animation =
        'colore-colors 5s infinite';
      command.style.animation = 'colore-colors 5s infinite';
      document.getElementById('prompt').style.animation =
        'colore-colors 5s infinite';
      command.style.animation = 'colore-colors 5s infinite';
      break;
    }
    case 'add-from': {
      for (var i = 0; i < aliases[varHandle(cmdSplit[1], -1, true)].length; i++) {
        execWindow.push(aliases[varHandle(cmdSplit[1], -1, true)][i]);
      }
      break;
    }
    case 'add-from-if': {
      for (var i = 0; i < aliases[varHandle(cmdSplit[1], -1, true)].length; i++) {
        execWindow.push(
          'if ' +
          cmd.slice(13 + cmdSplit[1].length) +
          ' >> ' +
          aliases[varHandle(cmdSplit[1], -1, true)][i]
        );
      }
      break;
    }
    case 'pop-exec': {
      execWindow.pop();
      break;
    }
    case 'outer': {
      writeToStack("Parameters popped.");
      parameters.pop();
      break;
    }
    case 'inner': {
      writeToStack("Parameters pushed.");
      parameters.push(varHandle(cmd, 5, true).split(' '));
      break;
    }
    case 'copy': {
      window.navigator.clipboard.writeText(varHandle(cmd, 4, true));
      writeToStack("Copied to clipboard.");
      break;
    }
    case 'view-copy': {
      await navigator.clipboard
        .readText()
        .then((text) => {
          output.innerText = text;
          output.className = 'output';
          writeToStack("Clipboard read successfully.");
        })
        .catch((err) => {
          writeToStack("Clipboard permissions denied.","error");
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
        break;
      }
      writeToStack(cmdSplit[1]+" storage cleared.");
      break;
    }
    case 'echo': {
      output.innerText = varHandle(cmd, 4, true);
      writeToStack("Value returned.");
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
            writeToStack("We're watching you!","warning");
          })
          .catch(function (error) {
            console.log('Something went wrong!');
          });
      }
      break;
    }
    case 'run-html': {
      aliases[cmdSplit[1]] = window.open("");
      aliases[cmdSplit[1]].document.write(varHandle(cmdSplit[2],-1,true))
      break;
    }
    case 'cursor': {
      document.querySelector('*').style.cursor = varHandle(cmd, 6);
      writeToStack("Cursor changed successfully.");
      break;
    }
    case 'open': {
      if(cmdSplit.length == 2) {
        window.open(cmdSplit[1]);
      }else {
        aliases[cmdSplit[2]] = window.open(cmdSplit[1]);
      }
      writeToStack("Page opened.");
      break;
    }
    case 'redirect': {
      writeToStack("Redirecting...");
      location.replace(varHandle(cmd, 8, true));
      break;
    }
    case 'quit': {
      writeToStack("Logging out...");
      sessionStorage.setItem('permittedTerminalCST', 'loggedOut');
      writeToStack("Redirecting.");
      location.replace('./index.html');
      break;
    }
    case 'save': {
      if (varHandle(cmdSplit[1], -1, true) == 'hard') {
        localStorage.setItem(varHandle(cmdSplit[2], -1, true), aliases[varHandle(cmdSplit[2], -1, true)]);
        writeToStack("Data stored to localStorage.");
      } else if (varHandle(cmdSplit[1], -1, true) == 'soft') {
        if (
          aliases[varHandle(cmdSplit[2], -1, true)] == 'root' &&
          varHandle(cmdSplit[2], -1, true) == 'userTerminalCST'
        ) {
          output.textContent =
            'Stop! You may not enter the root user without permission!';
          output.className = 'fatal-error';
          writeToStack("Access to root user denied!!!","error");
          break;
        }
        sessionStorage.setItem(varHandle(cmdSplit[2], -1, true), aliases[varHandle(cmdSplit[2], -1, true)]);
        writeToStack("Data stored to sessionStorage.");
      } else {
        output.textContent = 'Errror 03: Invalid value for parameter';
        output.className = 'error';
      }
      break;
    }
    case 'add-exec': {
      execWindow.push(cmd.slice(9));
      writeToStack("Pushed to execution window.");
      break;
    }
    case 'ranks': {
      output.innerHTML =
        '<ul><li>0 | Root<li>1 | Owner<li>2 | Developer<li>3 | Admin<li>4 | Helper<li>5 | Icon<li>6 | Geek<li>7 | User<li>8 | Guest<li>9 | Banned</ul>';
        writeToStack("Ranks displayed.");
      break;
    }
    case 'users': {
      output.innerHTML =
        '<ul><li>c@d3N | Developer<li>$|m0n | Developer<li>70DD | Developer<li>GUesT_1.0 | Guest<li>root | Root<li>$@wy3|- | User<li>c2@r@ | User<li>m0m | User<li>d@d | User<li>TigerShark6471 | User<li>(#@r2|3 | Geek</ul>';
        writeToStack("Users displayed.");
      break;
    }
    case 'alias': {
      if(cmdSplit[1].includes(":")) {
        aliases[varHandle(cmdSplit[1].split(":")[0], -1, true)][parseInt(cmdSplit[1].split(":")[1]) - 1] = varHandle(
        cmd,
        cmdSplit[1].length + 6,
        true
      );
      }else {
      aliases[varHandle(cmdSplit[1], -1, true)] = varHandle(
        cmd,
        cmdSplit[1].length + 6,
        true
      );
      }
      writeToStack("Alias created successfully.");
      break;
    }
    case 'exec': {
      if (execWindow.length > 0) {
        clear = 1;
        clearMode = `single`;
        writeToStack("Executing latest...");
      } else {
        output.textContent = 'Error 04: No executables created yet.';
        output.className = 'error';
      }
      break;
    }
    case 'encrypt': {
      output.textContent = encrypt(varHandle(cmd, 8 + varHandle(cmdSplit[1], -1, true).length, true), varHandle(cmdSplit[1], -1, true))
      writeToStack("Data encrypted.");
      break;
    }
    case 'decrypt': {
      output.textContent = decrypt(varHandle(cmd, 8 + varHandle(cmdSplit[1], -1, true).length, true), varHandle(cmdSplit[1], -1, true))
      writeToStack("Data decrypted.");
      break;
    }
    case 'theme': {
      document.getElementById('body').style.backgroundColor = varHandle(cmdSplit[1], -1, true);
      command.style.background = varHandle(cmdSplit[1], -1, true);
      foreground = varHandle(cmdSplit[2], -1, true);
      document.getElementById('prompt').style.color = foreground;
      command.style.color = foreground;
      writeToStack("Theme changed.");
      break;
    }
    case 'credits': {
      output.innerHTML =
        '<ul><li>Simon & Caden: Programming<li>Todd: Graphics</ul>';
        writeToStack("Credits displayed.");
      break;
    }
    case 'clear': {
      prev.innerHTML = '';
      output.innerHTML = 'Command history cleared';
      writeToStack("Command history cleared.");
      break;
    }
    case 'exit': {
      writeToStack("Redirecting...");
      location.replace('./index.html');
      break;
    }
    case '//': {
      break;
    } //comment in CST, returns no output

    case 'kill': {
      writeToStack("Terminal killed.");
      location.replace('about:blank');
      break;
    }
    case 'docs': {
      window.open("./docs/docs.html")
        writeToStack("Documentation displayed.");
      break;
    }
    case '': {
      break;
    }
    case 'reset-stack': {
      clearStack();
      writeToStack("Stack cleared.","important");
      break;
    }
    case 'admin': {
      output.innerHTML = "<img src='./assets/rickroll.gif'>";
      writeToStack("<img src='./assets/rickroll.gif'>.");
      break;
    }
    case 'download': {
      downloadResource(varHandle(cmdSplit[1], -1, true));
      writeToStack("File downloaded.");
      break;
    }
    case 'lockdown': {
      if (sessionStorage.getItem('userTerminalCST') == 'root') {
        output.textContent = 'Lockdown mode activated.';
        output.className = 'important';
        localStorage.setItem('lockdownCST', varHandle(cmdSplit[1], -1, true));
        localStorage.setItem('lockdownMode', 'active');
        writeToStack("Lockdown mode activated.","important");
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
        writeToStack("User switched to "+sessionStorage.getItem("userTerminalCST")+" successfully.","important");
      } else {
        output.textContent = 'Error 02: User lacking root priveleges.';
        output.className = 'important';
      }
      break;
    }
    case 'welcome': {
      output.innerHTML =
        '<ul>Welcome to the CST Command Line<li>The CST was created by (@d3n, (#@r2|3, $|m0n, and 70DD<ul>';
        writeToStack("Welcome displayed.");
      break;
    }
    case 'html': {
      output.innerHTML = varHandle(cmd, 4, true);
      output.className = 'html';
      writeToStack("HTML produced successfully.");
      break;
    }
    case 'throw': {
      output.className = varHandle(cmdSplit[1], -1, true);
      output.innerText = varHandle(cmd, varHandle(cmdSplit[1], -1, true).length + 6, true);
      writeToStack("Message thrown.");
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
      writeToStack("Command line has been reset.","important");
      break;
    }
    case 'drop': {
      delete aliases[varHandle(cmdSplit[1], -1, true)];
      writeToStack("Alias deleted successfully.");
      break;
    }
    case 'import-alias': {
      if (varHandle(cmdSplit[2], -1, true) == 'hard') {
        aliases[varHandle(cmdSplit[1], -1, true)] = localStorage.getItem(varHandle(cmdSplit[3], -1, true));
      } else if (varHandle(cmdSplit[2], -1, true) == 'soft') {
        aliases[varHandle(cmdSplit[1], -1, true)] = sessionStorage.getItem(varHandle(cmdSplit[3], -1, true));
      } else if (varHandle(cmdSplit[2], -1, true) == 'var') {
        aliases[varHandle(cmdSplit[1], -1, true)] = aliases[varHandle(cmdSplit[3], -1, true)];
      } else if (varHandle(cmdSplit[2], -1, true) == 'encrypt') {
        aliases[varHandle(cmdSplit[1], -1, true)] = encrypt(cmd.slice(23+cmdSplit[1].length+cmdSplit[3].length), varHandle(cmdSplit[3], -1, true));
      } else if (varHandle(cmdSplit[1], -1, true) == 'decrypt') {
        aliases[varHandle(cmdSplit[1], -1, true)] = decrypt(cmd.slice(23+cmdSplit[1].length+cmdSplit[3].length), varHandle(cmdSplit[3], -1, true));
      } else if (varHandle(cmdSplit[2], -1, true) == 'get') {
        if (varHandle(cmdSplit[3], -1, true) == "battery") {
          await navigator.getBattery()
            .then(function (battery) {
              aliases[varHandle(cmdSplit[1], -1, true)] = Math.round(battery.level * 100);

            })
            .catch(function () {
              output.textContent = 'Error 05: failed to read battery level';
              output.className = 'error';
            });
        } else {
          retrieve(varHandle(cmdSplit[3], -1, true));
          aliases[varHandle(cmdSplit[1], -1, true)] = tempData;
        }
      } else {
        output.className = 'error';
        output.textContent = 'Error 03: Invalid value for parameter.';
        break;
      }
      output.textContent = 'Alias imported successfully';
      writeToStack("Alias imported successfully.");
      break;
    }
    case 'clear-exec': {
      execWindow = [];
      writeToStack("Execution window cleared.");
      break;
    }
    case 'export-exec': {
      aliases[varHandle(cmdSplit[1], -1, true)] = execWindow;
      execWindow = [];
      writeToStack("Function exported.");
      break;
    }
    case '$': {
      try {
        clear = aliases[varHandle(cmdSplit[1], -1, true)].length;
        clearMode = 'multiple';
        clearFunc = varHandle(cmdSplit[1], -1, true);
        parameters.push(cmd.slice(cmdSplit[1].length + 3).split(' '));
        for (var i = 0; i < parameters[parameters.length - 1].length; i++) {
          parameters[parameters.length - 1][i] = ampHandle(
            parameters[parameters.length - 1][i]
          );
        }
        writeToStack("Function execution initiating...");
      } catch(error) {
        output.innerHTML = ("Error 7: Invalid function");
        output.className = "error"
      }
      break;
    }
    case 'view-func': {
      var funcToRead = aliases[varHandle(cmdSplit[1], -1, true)];
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
            cmd.slice(11 + cmdSplit[1].length) + funcToRead[i].split('&').join('&amp;').split('<').join('&lt;') +
            '</li>';
          //output.innerHTML += funcToRead[i].split("<").join("&lt;").split("&").join("&amp;");
          //output.innerHTML += "</p/>";
        }
      }
      output.innerHTML += '</ul>';
      writeToStack("Function displayed.");
      break;
    }
    case 'custom': {
      localStorage.setItem("custom",cmd.slice(7));
      break;
    }
    case 'import': {
      writeToStack("Library importing...");
      var e;
      if (cmdSplit.length === 2) {
        e = 1;
      } else {
        e = 2;
      }
      aliases[varHandle(cmdSplit[e], -1, true)] = (
        await getData('./libraries/' + varHandle(cmdSplit[1], -1, true) + '.cst')
      ).split('\n');
      writeToStack("Library imported.");
      if (aliases[cmdSplit[e]].map((inp) => (inp.split(" ")[0])).includes("self-exec")) {
        clear = aliases[cmdSplit[e]].length;
        clearMode = 'multiple';
        clearFunc = cmdSplit[e];
        parameters.push(aliases[cmdSplit[e]][aliases[cmdSplit[e]].map((inp) => (inp.split(" ")[0])).indexOf("self-exec")].slice(10).split(" ").map((inp) => (ampHandle(inp))));
        writeToStack("Function execution initiating...");
      }
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
      writeToStack("Sawyer alert! Sawyer alert!","error");
      break;
    }
    case 'starwars-cont.':
      {
        output.innerHTML = '________________\n/               \\';
      }
      break;
    default: {
      if (cmd.substr(0, 1) == '$') {
        try {
        clear = aliases[varHandle(cmdSplit[0].slice(1), -1, true)].length;
        clearMode = 'multiple';
        clearFunc = varHandle(cmdSplit[0].slice(1), -1, true);
        parameters.push(cmd.slice(cmdSplit[0].length + 1).split(' '));
        parameters[parameters.length - 1].map((i) => (ampHandle(i)))
        writeToStack("Function execution initiating...");
      } catch(error) {
        output.innerHTML = ("Error 07: Invalid function");
        output.className = "error"
      }
    } else {
        output.textContent = "Error 01: Invalid command.";
        output.className = "error";
    }
    break;
    }
  }


  /// ADD TO STACK \\\

  if(output.className != "error") {
    writeToStack('[Command executed with no errors]', 'info');
  } else {
    writeToStack(('Command executed with the following errors:<br>'+output.innerHTML), 'error');
  }



  const add = document.createElement('li');
  add.textContent =
    'CST/' +
    names[sessionStorage.getItem('userTerminalCST')] +
    '-->' +
    cmd;
  add.className = 'output';
  if (cmd.split(' ')[0] == '//') {
    add.className = 'comment';
  } else {
    add.style.color = foreground;
  }
  prev.appendChild(add);
  if (output.className == 'output') {
    output.style.color = foreground;
  }
  prev.appendChild(output);
  prevCommands.push(cmd);
  historyIdx++;
  if (clear === 0) {
    command.value = '';
  }
  if (clear != 0) {
    if (clearMode == 'single') {
      command.value = execWindow[execWindow.length - 1];
      writeToStack("Single-line executional executed.");
    } else {
      command.value = aliases[clearFunc][aliases[clearFunc].length - clear];
      writeToStack("Executing next line of function...");
    }
    clear -= 1;
    if (clear == 0 && clearMode == `multiple`) {writeToStack("Function complete.");}
    window.setTimeout((() => {doCommand(command.value)}),time);
  }
}
command.addEventListener('keydown', function (event) {
  if (event.key == 'Enter') {
    event.preventDefault();
    doCommand(command.value);
  } else if (event.key == 'ArrowUp') {
    event.preventDefault();
    if(historyIdx > 0) {
    historyIdx--;
    command.value = prevCommands[historyIdx];
    }
    writeToStack("Returning to previous command...");
    command.focus();
  } else if (event.key == 'ArrowDown') {
    event.preventDefault();
    if(historyIdx < prevCommands.length) {
    historyIdx++;
    command.value = prevCommands[historyIdx];
    if(command.value == "undefined") {
      command.value = "";
    }
    }
  } else if (event.ctrlKey && event.key == ".") {
    event.preventDefault();
    if (typeof command.selectionStart == "number") {
      command.selectionStart = command.selectionEnd = command.value.length;
  }
  }else if (event.ctrlKey && event.key == ",") {
    event.preventDefault();
    if (typeof command.selectionStart == "number") {
      command.selectionStart = command.selectionEnd = 0;
  }
  }else if (event.ctrlKey && event.key == "/") {
    event.preventDefault();
    window.open("./terminal.html");
    prev.innerHTML += "<li class='important'>New terminal opened.</li>";
  }else if (event.ctrlKey && event.key == "w") {
    event.preventDefault();
    if(window.confirm("Close terminal?") == true) {
      window.close();
    }
  }else if (event.ctrlKey && event.key == "m") {
    event.preventDefault();
    doCommand(localStorage.getItem("custom"));
  } else if(event.key.length == 1){
  prevCommands[prevCommands.length-1] = command.value + event.key;
  }else if(event.key == "Backspace"){
  prevCommands[prevCommands.length-1] = command.value.substr(0,command.value.length - 1);
  }else if (event.ctrlKey && event.key == "q") {
    event.preventDefault();
    doCommand("quit");
  }else if (event.ctrlKey && event.key == "M" && event.shiftKey) {
    event.preventDefault();
    command.value = localStorage.getItem("custom");
  }
});
