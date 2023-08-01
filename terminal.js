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
  "70DD":"yes",
  "GUesT_1.0":"guest",
  "$@wy3|-":"Sawyer",
  "root":"ROOT",
  'c2@r@': 'Claire',
  'm0m': 'Wirz\'s Mom',
  'd@d': 'Wirz\'s Dad',
}//basic name definitions

var permitted = window.sessionStorage.getItem('permittedTerminalCST');
if (permitted != 'affirmed') {
  document.getElementById('body').style.display = 'none';
  alert("Sorry, but you do not have permission to use the cst terminal. Please use the sign-in on our home page to gain access.");
  // location.replace("./index.html");
}else {
  document.getElementById("prompt").textContent = "CST/"+names[sessionStorage.getItem("userTerminalCST")]+"-->";
}//Access granted? Time to find out!

var command = document.getElementById("command");
var prev = document.getElementById("previous");
var cmdSplit = null;
//Just some DOM nodes

function doCommand() {
  const output = document.createElement("li");
  cmdSplit = command.value.split(" ");
  switch (cmdSplit[0]) {
    case "help": {
      output.innerHTML = "<ul><li>ranks: Shows list of ranks<li>help: Shows list of basic commands<li>docs: Shows all commands<li>credits: Shows credits<li>quit or exit: Logs out of CST<li>kill: Kills the terminal and forwards to an empty page<li>clear: CLears the terminal<li>admin: Enters the root user</ul>";
      output.className = "output";
      break;
    }
    case "ranks": {
      output.innerHTML = "<ul><li>0 | Root<li>1 | Owner<li>2 | Developer<li>3 | Admin<li>4 | Helper<li>5 | Icon<li>6 | Geek<li>7 | User<li>8 | Guest<li>9 | Banned</ul>";
      output.className = "output";
      break;
    }
    case "users": {
      output.innerHTML = "<ul><li>c@d3N | Developer<li>$|m0n | Developer<li>70DD | Developer<li>GUesT_1.0 | Guest<li>root | Root<li>$@wy3|- | User<li>c2@r@ | User<li>m0m | User<li>d@d | User<li>";
      output.className = "output";
      break;
    }
    case "quit": {
      location.replace("./index.html");
      sessionStorage.setItem("permittedTerminalCST","loggedOut");
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
      output.innerHTML="<img src='./rickroll.gif'>";
      break;
    }
    case "download": {
      downloadResource(cmdSplit[1]);
      break;
    }
    case "lockdown": {
      if (sessionStorage.getItem("userTerminalCST")=="root") {
        output.innerHTML = "Lockdown mode activated";
        output.className = "important";
      }else {
        output.innerHTML = "Error 02: Failed to activate lockdown mode with non root user privelages";
        output.className = "error";
      }
      break;
    }

    case "release-lockdown": {
      if (sessionStorage.getItem("userTerminalCST")=="root") {
        output.innerHTML = "Lockdown mode deactivated";
        output.className = "important";
      }else {
        output.innerHTML = "Error 02: Failed to deactivate lockdown mode with non root user privelages";
        output.className = "error";
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
