function forceDownload(blob, filename) {
  var a = document.createElement('a');
  a.download = filename;
  a.href = blob;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// Current blob size limit is around 500MB for browsers
function downloadResource(url, filename) {
  if (!filename) filename = url.split('\\').pop().split('/').pop();
  fetch(url, {
      headers: new Headers({
        'Origin': location.origin
      }),
      mode: 'cors'
    })
    .then(response => response.blob())
    .then(blob => {
      let blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, filename);
    })
    .catch(e => console.log(e));
}

let names = {
  "c@d3N":"ThatGuyOverThere",
  "$|m0n":"TacoMan",
  "70|)|)":"yes",
  "GUesT_1.0":"guest",
  "$@wy3|-":"Sawyer",
  "root":"GET OFF THE ACCOUNT, SAWYER",
  'c2@r@': 'Claire',
  'm0m': 'Wirz\'s Mom',
  'd@d': 'Wirz\'s Dad',
  'TigerShark6471': 'TheGuyShetoldyounottoworryabout',
  'D3v_73571ng': 'GET OFF THE ACCOUNT, SAWYER',
  '(#@r2|3': 'Charlie',
  'Ethan': 'Ethan',
}//basic name definitions
var aliases = {};
var permitted = window.sessionStorage.getItem('permittedTerminalCST');
// else if (localStorage.getItem("lockdownMode") === "active") {
//   if(prompt("Enter lockdown shuttoff key:")==localStorage.getItem("lockdownCST")) {
//     alert("Lockdown mode lifted. Please reload this page.");
//     localStorage.setItem("lockdownMode", false);
//   } else {
//     alert("Access denied.");
//     location.href = "./index.html";
//   }
// }


if (permitted != 'affirmed') {
  document.getElementById('body').style.display = 'none';
  window.alert("Sorry, but you do not have permission to use the cst terminal. Please use the sign-in on our home page to gain access.");
  location.replace("./index.html");
} else {
  document.getElementById("prompt").textContent = "CST/"+names[sessionStorage.getItem("userTerminalCST")]+"-->";
}//Access granted? Time to find out!

var command = document.getElementById("command");
var prev = document.getElementById("previous");
var cmdSplit = null;
var execWindow = ["throw error Error 04: No executionals created yet."];
var clear = 0;
var foreground = 'green';
//Just some DOM nodes

function doCommand() {
  command = document.getElementById("command");
  const output = document.createElement("li");
  output.className = "output";
  cmdSplit = command.value.split(" ");
  switch ((cmdSplit[0])) {
    case "help": {
      output.innerHTML = "<ul><li>* Work in progress<li>welcome: Shows the welcome screen<li>help: Shows list of basic commands<li>docs: Shows all commands *<li>credits: Shows credits<li>echo: Prints text<li>quit or exit: Logs out of CST<li>kill: Kills the terminal and forwards to an empty page<li>clear: CLears the terminal<li>admin: Enters the root user<li>ranks: Displays list of ranks<li>users: Displays list of users<li>exec: Executes commands<li>alias [key] [value]: Makes alias<li>get-alias [key]: Gets the value of an alias<li>theme [bg] [fg]: Changes the theme<li>dowload [name] [url]: Dowloads a file from a url<li>echo [text]: Prints out text<li>save [hard|soft] [key]: Saves aliase to sessionstorge|localstorage<li>view-save [hard|soft] [key]: Views data saved by save command in sessionstorge|localstorage<li>clear-save [hard|soft|var]: Clears data saved by save command in sessionstorge|localstorage|variables<li>redirect [url]: Redirects to a url<li>exec: Runs a command set by add-exec<li>add-exec: Sets the exec command to execute a command<li>cursor [cursor]: Changes the cursor<li>watch-me: Makes a mirror<li>html [code]: Generates html<li>reset: Resets the terminal<li>throw [type] [text]: Throws an error<li>colore: Changes the default colors</ul>";
      break;
    }
    case "view-save": {
    if (cmdSplit[1] == "hard") {
      output.textContent = localStorage.getItem(cmdSplit[2]);
    }else if (cmdSplit[1] == "soft") {
      output.textContent = sessionStorage.getItem(cmdSplit[2]);
    }else {
      output.textContent = "Error 03: Invalid Parameter";
      output.className = "error"
    }
    break;
    }
    case "colore": {
      // animation: colore-colors 5s infinite;
      document.getElementById("body").style.animation="colore-colors 5s infinite";
      command.style.animation="colore-colors 5s infinite";
      document.getElementById("prompt").style.animation="colore-colors 5s infinite";
      command.style.animation="colore-colors 5s infinite";
      break;
    }
    case "copy": {
      window.navigator.clipboard.writeText(command.value.slice(5));
      break;
    }
    case "view-copy": {
      navigator.clipboard.readText()
      .then(text => {
        output.innerText = (text);
        output.className = "output";
      })
      .catch(err => {
        output.innerText = ('Failed to read clipboard contents: ', err);
        output.className = "error";
      });
      break;
    }
    case "clear-save": {
      if (cmdSplit[1] == "hard") {
        localStorage.clear();
      }else if (cmdSplit[1] == "soft") {
        sessionStorage.clear();
      } else if (cmdSplit[1] == "var") {
        aliases = {};
      } else {
        output.textContent = "Error 03: Invalid Parameter";
        output.className = "error";
      }
      break;
    }
    case "echo": {
      var outputSplit = command.value.slice(5).split("|");
      var final = "";
      var isString = true;
      for(var i = 0; i < outputSplit.length; i++) {
        if(isString == true) {
          final += outputSplit[i];
          isString = !isString;
        } else {
          final += aliases[outputSplit[i]];
        }
      break;
    }
    case "watch-me": {
      var video = document.createElement('video');
      video.autoplay="true"
      output.appendChild(video)

      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function (stream) {
            video.srcObject = stream;
          })
          .catch(function (err0r) {
            console.log("Something went wrong!");
          });
      }
    }
    case "cursor": {
      document.querySelector("body").style.cursor = cmdSplit[1];
      break;
    }
    case "redirect": {
      location.replace(cmdSplit[1]);
      break;
    }
    case "quit": {
      sessionStorage.setItem("permittedTerminalCST","loggedOut");
      location.replace("./index.html");
      break;
    }
    case "save": {
    if (cmdSplit[1] == "hard") {
      localStorage.setItem(cmdSplit[2],aliases[cmdSplit[2]]);
    }else if (cmdSplit[1] == "soft") {
      sessionStorage.setItem(cmdSplit[2],aliases[cmdSplit[2]]);
    }else {
      output.textContent = "Errror 03: Invalid value for parameter";
      output.className = "error";
    }
    break;
    }
    case "add-exec": {
      execWindow.push(command.value.slice(9));
      break;
    }
    case "ranks": {
      output.innerHTML = "<ul><li>0 | Root<li>1 | Owner<li>2 | Developer<li>3 | Admin<li>4 | Helper<li>5 | Icon<li>6 | Geek<li>7 | User<li>8 | Guest<li>9 | Banned</ul>";
      break;
    }
    case "users": {
      output.innerHTML = "<ul><li>c@d3N | Developer<li>$|m0n | Developer<li>70DD | Developer<li>GUesT_1.0 | Guest<li>root | Root<li>$@wy3|- | User<li>c2@r@ | User<li>m0m | User<li>d@d | User<li>TigerShark6471 | User<li>(#@r2|3 | Geek</ul>";
      break;
    }
    case "alias": {
      aliases[cmdSplit[1]] = cmdSplit[2];
      break;
    }
    case "exec": {
      clear = 1;
      break;
    }
    case "theme": {
      document.getElementById("body").style.backgroundColor = cmdSplit[1];
      command.style.background = cmdSplit[1];
      foreground = cmdSplit[2];
      document.getElementById("prompt").style.color = foreground;
      command.style.color = foreground;
      break;
    }
    case "credits": {
      output.innerHTML = "<ul><li>Simon & Caden: Programming<li>Todd: Graphics</ul>";
      break;
    }
    case "clear": {
      prev.innerHTML = "";
      output.innerHTML = "Command history cleared";
      break;
    }
    case "exit": {
      location.replace("./index.html");
      break;
    }
    case "//": {
      break;
    }//comment in CST, returns no output

    case "kill": {
      location.replace('about:blank');
      break;
    }
    case "docs": {
      output.innerHTML = "<ul><li>help: Shows list of basic commands<li>docs: Shows all commands<li>credits: Shows credits<li>echo: Prints text<li>quit or exit: Logs out of CST<li>kill: Kills the terminal and forwards to an empty page<li>clear: CLears the terminal<li>admin: Enters the root user<li>ranks: Displays list of ranks<li>users: Displays list of users<li>exec: Executes commands<li>alias [key] [value]: Makes alias<li>get-alias [key]: Gets the value of an alias<li>theme: Changes the theme</ul>";
      break;
    }
    case "": {
      break;
    }
    case "admin": {
      output.innerHTML="<img src='./assets/rickroll.gif'>";
      break;
    }
    case "download": {
      downloadResource(cmdSplit[1]);
      break; 
    }
    case "lockdown": {
      if (sessionStorage.getItem("userTerminalCST")=="root") {
        output.textContent = "Lockdown mode activated.";
        output.className = "important"
        localStorage.setItem("lockdownCST",cmdSplit[1]);
        localStorage.setItem("lockdownMode","active")
      }else {
        output.textContent = "Error 02: User lacking root priveleges.";
        output.className = "error";
      }
      break;
    }
    case "get-alias": {
      output.textContent = aliases[cmdSplit[1]];
      break;
    }
    case "welcome": {
      output.innerHTML = "<ul>Welcome to the CST Command Line<li>The CST was created by (@d3n, (#@r2|3, $|m0n, and 70DD<ul>";
      break;
    }
    case "html": {
      output.innerHTML = command.value.slice(5);
      output.className = "html";
      break;
    }
    case "get": {
      switch(cmdSplit[1]) {
        case "mouse-position": {
          output.textContent = `X: ${window.clientX},Y: ${window.clientY}`;
          break;
        }
        case "managed": {
          output.textContent = window.clientInformation.managed;
        }
      }
      break;
    }
    case "throw": {
      output.className = cmdSplit[1];
      output.innerText = command.value.slice(cmdSplit[1].length + 7);
      break;
    }
    case "reset": {
      prev.innerHTML = "";
      localStorage.clear();
      sessionStorage.clear();
      document.getElementById("body").style.backgroundColor = 'black';
      command.style.background = `black`;
      foreground = `green`;
      output.innerHTML = "Command line reset";
      output.className = "important";
      break;
    }

    default: {
      output.innerHTML = "Error 01: Invalid command";
      output.className = "error";
    }
  }
  const add = document.createElement("li");
  add.textContent = ("CST/"+names[sessionStorage.getItem("userTerminalCST")]+"-->"+command.value);
  add.className = "output";
  if (command.value.split(" ")[0]=="//") {
    add.className = "comment";
  }
  else {
    add.style.color = foreground;
  }
  prev.appendChild(add);
  if (output.className == "output") {
    output.style.color = foreground;
  }
  prev.appendChild(output);
  prevCommand = command.value;
  if (clear === 0) {
    command.value = ""
  } 
  else {
    clear -= 1;
    command.value = execWindow[execWindow.length-1];
    doCommand();
  }
};
command.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
      doCommand();
    } else if (event.key == "ArrowUp") {
      command.value = prevCommand;
      command.selectionEnd = command.value.length;
      command.focus()
    } else if (event.key == "ArrowDown") {
        command.value = "";
    }
})


