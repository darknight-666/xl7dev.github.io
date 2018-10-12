---
title: Commandline JSON Pretty Print everywhere
date: 2016-04-14 02:53:16
tags: JSON
---



```
>echo '{"test1": 1, "test2": "win"}' | python -m json.tool
```
output：
```
{
    "test1": 1, 
    "test2": "win"
}
```
<!--more-->
VIM Terminial


```
:%!python -m json.tool
```

or [jq](https://stedolan.github.io/jq/)

```
> brew install jq
> echo '{"test1": 1, "test2": "win"}' | jq .
```
output
```
{
    "test1": 1, 
    "test2": "win"
}
```
VIM Terminial
```
:%!jq .
```





