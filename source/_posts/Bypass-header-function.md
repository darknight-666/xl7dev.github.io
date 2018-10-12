---
title: Bypass header function
date: 2016-08-23 12:29:06
tags: Bypass
---

### 0x01 Code
> http://www.bypassheader.com/index.php

```
<?php
    session_start();
    if($_SESSION('bypass')){
        echo 'ok';
    }else{
        header('Location: http://www.baidu.com/');
    }
    echo 'bypass header';
?>
```

### 0x02 firefox NoRedirect plugins
Install [NoRedirect](https://addons.mozilla.org/zh-CN/firefox/addon/noredirect/) plugins
> usage


regex | referer | allow | DNS Error
---|---
^http://www\.bypassheader\.com | √ |  |