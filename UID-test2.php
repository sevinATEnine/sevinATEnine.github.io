<!DOCTYPE html>
<html>
<head>
<script>

    
    var UIDs = {
        "4878028849":"$|m0n"
    };
    
if (typeof(Storage) !== "undefined" && typeof(Storage) !== undefined && typeof(Storage) !== null && typeof(Storage) !== "" && typeof(localStorage) !== "undefined" && typeof(localStorage) !== undefined && typeof(localStorage) !== null && typeof(localStorage) !== "") {
  //if(localstorage.getItem('UID')=='' || localstorage.getItem('UID')==null || localstorage.getItem('UID')==undefined) {
    //localstorage.setItem('UID', String(Math.random()));
  //}
    if(localStorage.UID=="" || localStorage.UID==null || localStorage.UID=="undefined" || localStorage.UID==undefined) {
        localStorage.UID = String(Math.round(Math.random()*10000000000));
    }
    document.write(localStorage.UID+"<br>");
    document.write(UIDs[localStorage.UID]);
} else {
  document.write('error');
}
    
</script>
</head>

<body></body>

</html>
