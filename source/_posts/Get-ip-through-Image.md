---
title: Get ip through Image
date: 2016-05-13 00:54:31
tags: Pentester
---


```
> vi .htaccess
```
```
RewriteEngine on
RewriteRule ^(.*)\.jpg$ index.php [NC]
```
```
mysql> create database ips;
```
<!--more-->
```
CREATE TABLE IF NOT EXISTS `remoteip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(64) DEFAULT NULL,
  `useragent` varchar(255) DEFAULT NULL,
  `referer` varchar(255) DEFAULT NULL,
  `time` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
```
```
<?php

    header('Content-type: image/jpeg');
    readfile('test.jpg');
    $con = mysql_connect('localhost','root','root');
    if (!$con){
        die ('Could not connect: ' . mysql_error());
    }
    mysql_select_db('imgip',$con);
    function getIP() {
        if (@$_SERVER["HTTP_X_FORWARDED_FOR"])
        $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
        else if (@$_SERVER["HTTP_CLIENT_IP"])
        $ip = $_SERVER["HTTP_CLIENT_IP"];
        else if (@$_SERVER["REMOTE_ADDR"])
        $ip = $_SERVER["REMOTE_ADDR"];
        else if (@getenv("HTTP_X_FORWARDED_FOR"))
        $ip = getenv("HTTP_X_FORWARDED_FOR");
        else if (@getenv("HTTP_CLIENT_IP"))
        $ip = getenv("HTTP_CLIENT_IP");
        else if (@getenv("REMOTE_ADDR"))
        $ip = getenv("REMOTE_ADDR");
        else
        $ip = "Unknown";
        return $ip;
    }
    $ip = getIP();
    $useragent = $_SERVER['HTTP_USER_AGENT'];
    $referer = $_SERVER['HTTP_REFERER'];
    $time = date("r", time());
    $query = "INSERT INTO remoteip (`ip`,`useragent`,`referer`,`time`) VALUES ('$ip','$useragent','$referer','$time')";
    mysql_query($query);
    mysql_close($con);
?>
```
chrome open http://blog.safebuff.com/test.jpg


