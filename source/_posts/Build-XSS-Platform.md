---
title: Build XSS Platform
date: 2016-04-26 00:02:57
tags: XSS Platform
---


### 0x01 安装lamp环境
```
> apt-get update
> apt-get upgrade
> apt-get install apache2 php5 libapache2-mod-php5 php5-gd php5-curl mysql-server mysql-client
```
### 0x02 Setting xsser
[Download xsser.me](http://pan.baidu.com/s/1kTMsFzT) to /var/www/xsser
```
> mysql -uroot -p   #input mysql password
mysql> create database xssplatform;
mysql> use xssplatform;
mysql> source xssplatform.sql;
mysql> UPDATE oc_module SET code=REPLACE(code,'http://xsser.me','http://youdomain.com/')
```

<!--more-->

> vim config.php

```
$config['dbHost']		='localhost';		 //数据库地址
$config['dbUser']		='root';			 //用户
$config['dbPwd']		='root';	 //密码
$config['database']		='xssplatform';			 //数据库名
$config['urlroot']		='http://youdomain.com';//访问的url起始
```
```
> chmod -R 777 /var/www/xsser
```
> vi authtest.php

```
header("Location: http://youdomain.com/index.php?do=api&id={$_GET[id]}&username={$_SERVER[PHP_AUTH_USER]}&password={$_SERVER[PHP_AUTH_PW]}");
```

>vi source/user.php

```
//if($user->userId<=0) ShowError('未登录或已超时',$url['login'],'重新登录');
//if($user->adminLevel<=0) ShowError('没有操作权限',URL_ROOT.'/index.php?do=user&act=invite');
```
>vi /config.php

```
$config['register']='normal';
```
> vi /var/www/xsser/.htaccess   #add code

```
<IfModule mod_rewrite.c>
RewriteEngine on
RewriteRule ^([0-9a-zA-Z]{6})$ /index.php?do=code&urlKey=$1
RewriteRule ^do/auth/(w+?)(/domain/([w.]+?))?$ /index.php?do=do&auth=$1&domain=$3
RewriteRule ^register/(.*?)$ /index.php?do=register&key=$1
RewriteRule ^register-validate/(.*?)$ /index.php?do=register&act=validate&key=$1
RewriteRule ^login$ /index.php?do=login
</IfModule>
```
```
> a2enmod rewrite
> vi /etc/apache2/sites-available/xss.conf
```
```
<VirtualHost *:80>
        ServerAdmin admin@example.com
        DocumentRoot /var/www/xsser
        ServerName youdomain.com
        <Directory /var/www/xsswww >
                Options Indexes FollowSymLinks MultiViews
                AllowOverride All
                Order allow,deny
                allow from all
        </Directory>
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

```
> ln -s /etc/apache2/sites-available/xss.conf /etc/apache2/sites-enabled/xss.conf
```
Register a user
> UPDATE oc_user SET adminLevel=1 WHERE id=1;