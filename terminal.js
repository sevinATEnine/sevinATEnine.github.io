
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
  'D3v_73571ng': 'GET OFF THE ACCOUNT, SAWYER'
}//basic name definitions
var aliases = {};
var permitted = window.sessionStorage.getItem('permittedTerminalCST');
if (permitted != 'affirmed') {
  document.getElementById('body').style.display = 'none';
  alert("Sorry, but you do not have permission to use the cst terminal. Please use the sign-in on our home page to gain access.");
  location.replace("./index.html");
}
else if (localStorage.getItem("lockdownMode") === "active") {
  if(prompt("Enter lockdown shuttoff key:")==localStorage.getItem("lockdownCST")) {
    alert("Lockdown mode lifted. Please reload this page.");
    localStorage.setItem("lockdownMode", false);
  }else {
    alert("Access denied.");
    location.href = "./index.html";
  }
}
else {
  document.getElementById("prompt").textContent = "CST/"+names[sessionStorage.getItem("userTerminalCST")]+"-->";
}//Access granted? Time to find out!

var command = document.getElementById("command");
var prev = document.getElementById("previous");
var cmdSplit = null;
var execWindow = ["No executionals created yet."];
//Just some DOM nodes

function doCommand() {
  command = document.getElementById("command");
      const add = document.createElement("li");
      add.textContent = ("CST/"+names[sessionStorage.getItem("userTerminalCST")]+"-->"+command.value);
      add.className = "add";
      if(command.value.split(" ")[0]=="//") {
        add.className = "comment"
      }
      prev.appendChild(add);
  const output = document.createElement("li");
  cmdSplit = command.value.split(" ");
  switch (cmdSplit[0]) {
    case "help": {
      output.innerHTML = "<ul><li>* Work in progress<li>help: Shows list of basic commands<li>docs: Shows all commands *<li>credits: Shows credits<li>echo: Prints text<li>quit or exit: Logs out of CST<li>kill: Kills the terminal and forwards to an empty page<li>clear: CLears the terminal<li>admin: Enters the root user<li>ranks: Displays list of ranks<li>users: Displays list of users<li>exec: Executes commands<li>alias [key] [value]: Makes alias<li>get-alias [key]: Gets the value of an alias<li>theme: Changes the theme<li>dowload [name] [url]: Dowloads a file from a url<li>echo [text]: Prints out text<li>save [hard|soft] [key]: Saves aliase to sessionstorge|localstorage<li>view-save [hard|soft] [key]: Views data saved by save command in sessionstorge|localstorage<li>clear-save [hard|soft|var]: Clears data saved by save command in sessionstorge|localstorage|variables</ul>";
      output.className = "output";
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
      output.textContent = command.value.slice(5);
      break;
    }
    case "redirect": {
      location.replace(cmdSplit[1]);
      break;
    }
    case "quit": {
      location.replace("./index.html");
      sessionStorage.setItem("permittedTerminalCST","loggedOut");
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
      execWindow.push(command.value.slice(8));
      break;
    }
    case "ranks": {
      output.innerHTML = "<ul><li>0 | Root<li>1 | Owner<li>2 | Developer<li>3 | Admin<li>4 | Helper<li>5 | Icon<li>6 | Geek<li>7 | User<li>8 | Guest<li>9 | Banned</ul>";
      output.className = "output";
      break;
    }
    case "users": {
      output.innerHTML = "<ul><li>c@d3N | Developer<li>$|m0n | Developer<li>70DD | Developer<li>GUesT_1.0 | Guest<li>root | Root<li>$@wy3|- | User<li>c2@r@ | User<li>m0m | User<li>d@d | User<li>TigerShark6471 | User</ul>";
      output.className = "output";
      break;
    }
    case "alias": {
      aliases[cmdSplit[1]] = cmdSplit[2];
      break;
    }
    case "exec": {
      command.value = execWindow[execWindow.length-1];
      doCommand();
      break;
    }
    case "credits": {
      output.innerHTML = "<ul><li>Simon & Caden: Programming<li>Todd: Graphics</ul>";
      output.className = "output"
      break;
    }
    case "clear": {
      prev.innerHTML = "";
      output.innerHTML = "Command history cleared";
      output.className = "output";
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
      output.className = "output";
      break;
    }
    case "": {
      output.className = "output";
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
    case "theme": {
      if (document.body.style.backgroundColor == "black") {
        document.getElementById("body").style.backgroundColor = "white";
        command.style.backgroundColor = "white";
      }
      else {
        document.getElementById("body").style.backgroundColor = "black";
        command.style.backgroundColor = "black";
      }
      break;
    }
    default: {
      output.innerHTML = "Error 01: Invalid command";
      output.className = "error";
    }
  }
  prev.appendChild(output);
  command.value = "";
};

const node = document.getElementById("command");
node.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
      doCommand();
    }
})
