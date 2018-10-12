---
title: smali wiki
date: 2016-09-22 15:08:16
tags: smali
---

### 0x01 TypesMethodsAndFields
#### 类型
> **原始类型**

value |   description 
---|---
V   | void - can only be used for return types
Z   |	boolean
B	|   byte
S	|   short
C	|   char
I	|   int
J	|   long (64 bits)
F	|   float
D	|   double (64 bits)

> **对象**

```
Lpackage/name/ObjectName;   <==> package.name.ObjectName;
```

value |  description
---|---
L            | 表示这是一个对象类型
package/name | 该对象所在的包
ObjectName   | 对象名称
;            | 标识对象名称的结束

> **数组**

```
[|          ==> 表示一个int型的一维数组，相当于int[]
[[|         ==> int[][]，数组每一个维度最多255个;
对象数组    ==> 如String数组的表示是[Ljava/lang/String
```
> **寄存器与变量**

寄存器采用v和p来命名,v表示本地寄存器,p表示参数寄存器,如果一个方法有两个本地变量，有三个参数:

var | description
---|---
v0 |第一个本地寄存器
v1 |第二个本地寄存器
v2 |p0 (this)
v3 |p1 第一个参数
v4 |p2 第二个参数
v5 |p3 第三个参数

＊如果是静态方法的话就只有5个寄存器了，不需要存this了。

.registers 使用这个指令指定方法中寄存器的总数

.locals 使用这个指定表明方法中非参寄存器的总数，放在方法的第一行。

#### 方法和字段
> **方法签名**

methodName(III)Lpackage/name/ObjectName;

var | description
---|---
methodName | 方法名
III | 三个整形参数
Lpackage/name/ObjectName;   |   返回值的类型

> **方法**

Lpackage/name/ObjectName;——>methodName(III)Z    ==> function boolean methondName(int a, int b, int c)


> **字段**

Lpackage/name/ObjectName;——>FieldName:Ljava/lang/String;

var | description
---|---
Lpackage/name/ObjectName; | 包名
FieldName | 字段名
Ljava/lang/String;   |   字段类型

> **方法的定义**

**编译前**
```
private static int sum(int a, int b) {
        return a+b;
}
```
**编译后**
```
.method private static sum(II)I
    .locals 4   #表示需要申请4个本地寄存器
    .parameter
    .parameter #这里表示有两个参数
    .prologue
    .line 27 
    move v0, p0
    .local v0, a:I
    move v1, p1
    .local v1, b:I
    move v2, v0
    move v3, v1
    add-int/2addr v2, v3
    move v0, v2
    .end local v0           #a:I
    return v0
.end method
```
函数声明使用.method开始 .end method结束，java中的关键词private,static 等都可以使用，同时使用sum(II)I签名来表示唯一的方法

> **声明成员**

.field private name:Lpackage/name/ObjectName;

var | description
---|---
private TextView mTextView; | .field private mTextView:Landroid/widget/TextView;
private int mCount; | .field private mCount:I

> **指令执行**

example:

move v0, v3     #把v3寄存器的值移动到寄存器v0上

const v0, 0x1  #把值0x1赋值到寄存器v0上

invoke-static {v4, v5}, Lme/isming/myapplication/MainActivity;->sum(II)I    

\#执行方法sum(),v4,v5的值分别作为sum的参数

### 0x02 smali基本语法

value | description
---|---
.field private isFlag:z　|　定义变量
.method　|　方法
.parameter　|　方法参数
.prologue　|　方法开始
.line 12　|　此方法位于第12行
invoke-super　|　调用父函数
const/high16  v0, 0x7fo3　|　把0x7fo3赋值给v0
invoke-direct　|　调用函数
return-void　|　函数返回void
.end method　|　函数结束
new-instance　|　创建实例
iput-object　|　对象赋值
iget-object　|　调用对象
invoke-static　|　调用静态函数

### 0x03 条件跳转分支
```
"if-eq vA, vB, :cond_**"   如果vA等于vB则跳转到:cond_**
"if-ne vA, vB, :cond_**"   如果vA不等于vB则跳转到:cond_**
"if-lt vA, vB, :cond_**"    如果vA小于vB则跳转到:cond_**
"if-ge vA, vB, :cond_**"   如果vA大于等于vB则跳转到:cond_**
"if-gt vA, vB, :cond_**"   如果vA大于vB则跳转到:cond_**
"if-le vA, vB, :cond_**"    如果vA小于等于vB则跳转到:cond_**
"if-eqz vA, :cond_**"   如果vA等于0则跳转到:cond_**
"if-nez vA, :cond_**"   如果vA不等于0则跳转到:cond_**
"if-ltz vA, :cond_**"    如果vA小于0则跳转到:cond_**
"if-gez vA, :cond_**"   如果vA大于等于0则跳转到:cond_**
"if-gtz vA, :cond_**"   如果vA大于0则跳转到:cond_**
"if-lez vA, :cond_**"    如果vA小于等于0则跳转到:cond_**
```