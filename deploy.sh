#!/usr/bin/env sh

# 當發生錯誤時中止腳本
set -e

# 構建
npm run build

# cd 到構建輸出的目錄下 
cd dist

git init
git add -A
git commit -m 'deploy gh-pages'

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:mukiwu/vue-todo.git master:gh-pages

cd -