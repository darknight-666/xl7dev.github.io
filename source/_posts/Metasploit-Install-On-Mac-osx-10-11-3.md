---
title: Metasploit Install On Mac osx 10.11.3
date: 2016-03-15 00:19:17
tags: Metasploit
---

### Install Homebrew


```
> /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
### Download Metasploit

```
> git clone https://github.com/rapid7/metasploit-framework.git /usr/local/share/metasploit-framework

```
### Rubys proxy

```
> cd /usr/local/share/metasploit-framework && gem update
> export http_proxy=http://127.0.0.1:8087   # Settings [goagent](https://github.com/XX-net/XX-Net) proxy
> export http_proxy=https://127.0.0.1:8087  #https ssl certificate证书问题,编辑Gemfile把第一行中的https replace http
```

如果不需要代理执行如下命令取消
```
> unset http_proxy      #取消http proxy
> unset https_proxy     #取消https proxy
```

<!--more-->
### Install rbenv && ruby

```
> brew install rbenv ruby-build rbenv-default-gems rbenv-gem-rehash 
rbenv-vars
> rbenv install -list
> rbenv install 2.1.8 # 安装2.1.8的ruby
> rbenv rehash 
> rbenv global 2.1.8 ＃ 全局使用2.1.8版本ruby
> gem install bundler && bundle install
```

### Install Nmap
```
> brew install nmap
```

### Install PostgreSQL

```
> brew install postgresql --without-ossp-uuid
> initdb /usr/local/var/postgres
> mkdir -p ~/Library/LaunchAgents
> cp /usr/local/Cellar/postgresql/9.5.1/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/
> launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
> createuser msf -P -h localhost
> createdb -O msf msf -h localhost
```

### Setting Metasploit Database

```
> vi /usr/local/share/metasploit-framework/config/database.yml
```

```
production:
   adapter: postgresql
   database: msf
   username: msf
   password: <password>
   host: 127.0.0.1
   port: 5432
   pool: 75
   timeout: 5
```


```
> cd /usr/local/share/metasploit-framework
> ./msfconsole
```
### Easy install metasploit for OSX

```
> curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall && chmod 755 msfinstall && ./msfinstall
```
### update

```
> msfupdate
```

