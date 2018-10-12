---
title: Yubikey4 Two-factor authentication
date: 2017-02-03 18:15:17
tags: Yubikey4
---

```

> brew install libyubikey pam_yubico yubico-piv-tool Caskroom/cask/yubikey-piv-manager 
```
#### 关闭osx sip机制
重启按住Command + R进入重置模式>>选择语言>>实用工具>>终端,输入如下命令关闭
```
> csrutil disable
```
反之开启命令：
```
> csrutil enable
```
插入yubico4，打开YubiKey PIV Manager
点击Setup for macOS设置PIN
#### 下载
[pam_yubico](https://developers.yubico.com/yubico-pam/Releases/pam_yubico-2.23.pkg)

[yubikey-personalization-gui](https://developers.yubico.com/yubikey-personalization-gui/Releases/yubikey-personalization-gui-3.1.24.pkg)

```
> sudo ln -s /usr/local/Cellar/pam_yubico/2.23/lib/security/pam_yubico.so /usr/local/lib/security/pam_yubico.so
> sudo vi /etc/pam.d/authorization
# authorization: auth account
auth    optional    pam_krb5.so use_first_pass use_kcminit
auth    optional    pam_ntlm.so use_first_pass
auth    required    pam_opendirectory.so use_first_pass nullok
auth    required    /usr/local/lib/security/pam_yubico.so mode=challenge-response
auth    required    pam_opendirectory.so
```
重启电脑输入PIN密码
