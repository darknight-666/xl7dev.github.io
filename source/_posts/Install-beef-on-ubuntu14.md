---
title: Install beef on ubuntu14
date: 2016-04-21 11:19:54
tags: beef
---


```
> wget https://raw.githubusercontent.com/beefproject/beef/master/install-beef -P /opt/
> chmod +x install-beef && ./install-beef
```
Problem access admin page
```
API Fire Error: invalid byte sequence in US-ASCII in {:owner=>BeEF::Extension::AdminUI::API::Handler, :id=>21}.mount_handler()
```
```
> locale-gen en_US.UTF-8
> dpkg-reconfigure locales
> export LANG="en_US.UTF-8"
> export LC_ALL="en_US.UTF-8"
```
