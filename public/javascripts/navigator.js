    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var fullVersion  = ''+parseFloat(navigator.appVersion); 
    var nameOffset,verOffset,ix;
    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
     browserName = "Opera";
     fullVersion = nAgt.substring(verOffset+6);
     if ((verOffset=nAgt.indexOf("Version"))!=-1) 
       fullVersion = nAgt.substring(verOffset+8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
     browserName = "Microsoft Internet Explorer";
     fullVersion = nAgt.substring(verOffset+5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
     browserName = "Chrome";
     fullVersion = nAgt.substring(verOffset+7);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
     browserName = "Firefox";
     fullVersion = nAgt.substring(verOffset+8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    // trim the fullVersion string at semicolon/space if present
    if ((ix=fullVersion.indexOf(";"))!=-1)
       fullVersion=fullVersion.substring(0,ix);
    if ((ix=fullVersion.indexOf(" "))!=-1)
       fullVersion=fullVersion.substring(0,ix);

    //document.write(''
    // +'Browser name  = '+browserName+'<br>'
    // +'Full version  = '+fullVersion+'<br>'
   // )

    // This script sets OSName variable as follows:
    // "Windows"    for all versions of Windows
    // "MacOS"      for all versions of Macintosh OS
    // "Linux"      for all versions of Linux
    // "UNIX"       for all other UNIX flavors 
    // "Unknown OS" indicates failure to detect the OS
    
    var OSName="Unknown OS";
    if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
    if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
    if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
    
    //document.write('Your OS: '+OSName);