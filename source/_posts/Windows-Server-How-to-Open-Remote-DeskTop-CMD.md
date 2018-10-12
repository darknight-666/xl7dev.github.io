---
title: Windows Server How to Open Remote DeskTop CMD
date: 2016-05-15 14:21:04
tags: Remote DeskTop
---

### Win2003 Server


```
> REG ADD HKLM\SYSTEM\CurrentControlSet\Control\Terminal" "Server /v fDenyTSConnections /t REG_DWORD /d 00000000 /f
```
### Win2008/2012 Server
<!--more-->
管理员允许cmd
```
> wmic /namespace:\\root\cimv2\terminalservices path win32_terminalservicesetting where (__CLASS != "") call setallowtsconnections 1
> wmic /namespace:\\root\cimv2\terminalservices path win32_tsgeneralsetting where (TerminalName ='RDP-Tcp') call setuserauthenticationrequired 1   #只允许带网络级身份验证的远程桌面的计算机
> wmic /namespace:\\root\cimv2\terminalservices path win32_tsgeneralsetting where (TerminalName ='RDP-Tcp') call setuserauthenticationrequired 0   #允许任意版本远程桌面的计算机连接（较不安全）
```


