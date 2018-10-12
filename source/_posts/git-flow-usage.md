---
title: git-flow usage
date: 2016-11-04 03:17:26
tags: git-flow
---

#### 创建develop分支
```
git branch develop
git push -u origin develop
```

#### 开始新Feature开发
```
git checkout -b some-feature develop
git push -u origin some-feature    
git status
git add some-file
x`git commit
```

#### 完成Feature
```
git pull origin develop
git checkout develop
git merge --no-ff some-feature
git push origin develop
git branch -d some-feature
git push origin --delete some-feature
```

#### 开始Relase
```
git checkout -b release-0.1.0 develop
```

#### 完成Release
```
git checkout master
git merge --no-ff release-0.1.0
git push

git checkout develop
git merge --no-ff release-0.1.0
git push

git branch -d release-0.1.0

# If you pushed branch to origin:
git push origin --delete release-0.1.0   

git tag -a v0.1.0 master
git push --tags
```

#### 开始Hotfix
```
git checkout -b hotfix-0.1.1 master
```

#### 完成Hotfix
```
git checkout master
git merge --no-ff hotfix-0.1.1
git push

git checkout develop
git merge --no-ff hotfix-0.1.1
git push

git branch -d hotfix-0.1.1

git tag -a v0.1.1 master
git push --tags
```