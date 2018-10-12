---
title: Android bypass so file Signature
date: 2017-01-26 01:02:18
tags: Bypass
---

### 0x01 介绍签名校验

在介绍签名校验的方式前，需要先明确dex文件校验和签名校验：

1、将apk以压缩包的形式打开删除原签名后，再签名，安装能够正常打开，但是用IDE工具反编译(classes.dex)后再二次打包，却出现非正常情况的，如：闪退/弹出非正版提示框。可以确定是dex文件校验。

2、将apk以压缩包的形式打开删除原签名再签名，安装之后打开异常的，则基本可以断定是签名检验。如果在断网的情况下同样是会出现异常，则是本地的签名检验。如果首先出现的是提示网络没有连接，则是服务器端的签名校验。对于Android编程我们知道分为SDK编程和NDK编程，当然Android签名校验也都是通过SDK或NDK来实现的。SDK编程也就是我们通常所说的java端的即编译出来的classes.dex静态校验，NDK编程也就是C / C++端的即编译出来的*.so动态加载的校验。

总结：
1. Java层一般通过getPackageManager().getPackageInfo.signatures来获取签名信息。

2. NDK层一般调用Native方法/DLL/Lua脚本等通过获取Java的context/Activity对象，动态JNI反射调用getPackageInfo等来获取签名。

### 0x02 dex情况下

搜索如下可能调用签名方法的关键字符串
> grep -R 'java/security/Signature;->verify(\[B)Z' ./

```
"signatures"
"[Landroid/content/pm/Signature" "Landroid/content/pm/PackageInfo;->signatures:[Landroid/content/pm/Signature"
"Ljava/security/Signature;->verify([B)Z"
```
注释move-result，增加const/4
```
#move-result vx  //x代码数字0或者1..
const/4 vx, 0x1
```
### 0x03 so情况下

搜索如下可能调用so库方法的关键字符串
> grep -R 'loadLibrary' ./

```
"loadLibrary"
"Ljava/lang/System;->loadLibrary(Ljava/lang/String;)V"
```
```
> grep -R '\.so$' ./
> strings xx.so|grep -i signature
```
```
1. ida >> 打开xx.so文件
2. 搜索signature 勾选上Find all occurences
3. 在搜索的function中单击进入>>右击选择Graph view切换图形视图，找到最后一行关键跳转>> 右键选择Text view切换回文本视图 >> F5看一下C语言代码
```
```
BEQ指令是“相等（或为0）跳转指令”
BNE指令是“不相等（或不为0）跳转指令”
B指令是“无条件跳转指令”
CBZ 指令是“比较，为零则跳转”
CBNZ指令是“比较，为非零则跳转”

BNE跳转指令对应的HEX机器码是D1
BEQ跳转指令对应的HEX机器码是D0
CBZ跳转指令对应的HEX机器码是B1
CBNZ跳转指令对应的HEX机器码是B9
```
### 0x04 修改保存

1. 首先我们在IDA View 中显示 十六进制机器码, Options -> General -> Disassembly -> Number of opcode bytes = 8
2. ida>>Edit->Patch Program
3. 然后Edit->Patch Program->Change byte
4. 将对应的hex机器码修改，比如D0改为D1
5. Edit->Patch Program->Apple patches to input file
6. 点击ok即可