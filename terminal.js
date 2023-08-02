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
  "root":"ROOT",
  'c2@r@': 'Claire',
  'm0m': 'Wirz\'s Mom',
  'd@d': 'Wirz\'s Dad',
}//basic name definitions
 var aliases = {};
var permitted = window.sessionStorage.getItem('permittedTerminalCST');
if (permitted != 'affirmed') {
  document.getElementById('body').style.display = 'none';
  alert("Sorry, but you do not have permission to use the cst terminal. Please use the sign-in on our home page to gain access.");
  // location.replace("./index.html");
}
else if (localStorage.getItem("lockdownCST") != null && localStorage.getItem("lockdownCST") != undefined) {
  if(prompt("Enter lockdown shuttoff key:"==localStorage.getItem("lockdownCST"))) {
    alert("Access granted. Reload this page.")
  }else {
    alert("Access denied.");
    location.href = "about:blank";
  }
}
else {
  document.getElementById("prompt").textContent = "CST/"+names[sessionStorage.getItem("userTerminalCST")]+"-->";
}//Access granted? Time to find out!

var command = document.getElementById("command");
var prev = document.getElementById("previous");
var cmdSplit = null;
var execWindow = [];
//Just some DOM nodes

function doCommand() {
  const output = document.createElement("li");
  cmdSplit = command.value.split(" ");
  switch (cmdSplit[0]) {
    case "help": {
      output.innerHTML = "<ul><li>help: Shows list of basic commands<li>docs: Shows all commands<li>credits: Shows credits<li>quit or exit: Logs out of CST<li>kill: Kills the terminal and forwards to an empty page<li>clear: CLears the terminal<li>admin: Enters the root user</ul>";
      output.className = "output";
      break;
    }
    case "quit": {
      location.replace("./index.html");
      sessionStorage.setItem("permittedTerminalCST","loggedOut");
      break;
    }
    case "alias": {
      aliases[cmdSplit[1]] = cmdSplit[2];
      break;
    }
    case "exec": {
      output.innerHTML = execWindow[execWindow.length-1];
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
      break;
    }
    case "": {
      output.className = "output";
      break;
    }
    case "admin": {
      output.innerHTML="<img src='https://github.com/sevinATEnine/cst-command-line/blob/main/rickroll.gif?raw=true'>";
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
      }else {
        output.textContent = "Error 02: User lacking root priveleges.";
        output.className = "error";
      }
      break;
    }
    case "getalias": {
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
      command = document.getElementById("command");
      const add = document.createElement("li");
      add.textContent = ("CST/"+names[sessionStorage.getItem("userTerminalCST")]+"-->"+command.value);
      add.className = "add";
      if(command.value.split(" ")[0]=="//") {
        add.className = "comment"
      }
      prev.appendChild(add);
      doCommand();
    }
});
