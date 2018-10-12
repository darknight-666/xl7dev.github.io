---
title: Crack md5 hash using metasploit
date: 2016-05-26 14:47:25
tags: metasploit
---

1. Download [md5_lookup](https://raw.githubusercontent.com/hasherezade/metasploit_modules/master/md5_lookup.rb) module
2. mv md5_lookup /opt/metasploit-framework/embedded/framework/modules/auxiliary/crawler/md5_lookup.rb

<!--more-->

```
> msfconsole
msf> use auxiliary/crawler/md5_lookup.rb
msf auxiliary(md5_lookup) > set PATH /Users/xl7dev/md5.txt
msf auxiliary(md5_lookup) > run
[*] Trying to read file: /Users/xl7dev/x.txt
[*] Found hashes: 2, unique: 2
[*] Attempting to reverse hashes...
[+] e10adc3949ba59abbe56e057f20f883e : 123456
[+] 21232f297a57a5a743894a0e4a801fc3 : admin
[*] Found passwords: 2 out of 2
[*] Auxiliary module execution completed
```