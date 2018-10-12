---
title: WordPress Plugin Security Testing Cheat Sheet
date: 2016-09-28 12:27:46
tags: Cheat Sheet
---


### 0x01 XSS
#### function
```
$_GET
$_POST
$_REQUEST
$_SERVER['REQUEST_URI']
$_SERVER['PHP_SELF']
$_SERVER['HTTP_REFERER']
$_COOKIE
```
#### Unsafe API functions
```
add_query_arg()
remove_query_arg()
```
Reference: https://blog.sucuri.net/2015/04/security-advisory-xss-vulnerability-affecting-multiple-wordpress-plugins.html
#### Disallow unfilterd html
```
define( 'DISALLOW_UNFILTERED_HTML', true );
```
### 0x02 SQL Injection
#### Unsafe API methods (require sanitising/escaping)
```
$wpdb->query()
$wpdb->get_var()
$wpdb->get_row()
$wpdb->get_col()
$wpdb->get_results()
$wpdb->replace()
```
#### Safe API methods (according to WordPress)
```
$wpdb->insert()
$wpdb->update()
$wpdb->delete()
```
> Safe code

```
<?php $sql = $wpdb->prepare( 'query' , value_parameter[, value_parameter ... ] ); ?>
```
####Unsafe escaping ('securing') API methods

```
esc_sql()
escape()
esc_like()
like_escape()
```
#### Displaying/hiding SQL errors
```
<?php $wpdb->show_errors(); ?> 
<?php $wpdb->hide_errors(); ?> 
<?php $wpdb->print_error(); ?>
```
### 0x03 File Inclusion
```
include()
require_once()
```
### 0x04 PHP Object Injection
```
unserialize()
```
### 0x05 Authorisation
```
is_admin()
is_user_admin()
current_user_can()
```
### 0x06 Open Redirect
```
wp_redirect()
```
### 0x07 CSRF
```
wp_nonce_field()
wp_nonce_url()
wp_verify_nonce()
check_admin_referer()
```
