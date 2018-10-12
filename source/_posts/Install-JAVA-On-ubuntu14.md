---
title: Install JAVA On ubuntu14
date: 2016-04-21 12:39:34
tags: JAVA
---

Download jdk and jar from [oracle java](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

```
Linux x86	174.92 MB  	jdk-8u91-linux-i586.tar.gz
Linux x86	70.56 MB  	jre-8u91-linux-i586.tar.gz
```

```
> apt-get purge openjdk-\*  # remote openjdk version
> mkdir /usr/local/java
> cd /usr/local/java
> tar zxvf jdk-8u91-linux-i586.tar.gz && mv jdk-8u91-linux-i586.tar.gz jdk
> tar zxvf jre-8u91-linux-i586.tar.gz && mv jre-8u91-linux-i586.tar.gz jre
> vi ~/.bashrc  # add
```
```
export JAVA_HOME=/usr/local/java/jdk
export JRE_HOME=${JAVA_HOME}/jre 
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib 
export PATH=${JAVA_HOME}/bin:$PATH
```
```
> source ~/.bashrc
> java -version
```
```
java version "1.8.0_91"
Java(TM) SE Runtime Environment (build 1.8.0_91-b14)
Java HotSpot(TM) Server VM (build 25.91-b14, mixed mode)
```