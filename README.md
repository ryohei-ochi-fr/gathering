# 環境構築
以下のコマンドをインストールする
- scoop
- hub
- gibo

参考サイト
[GitHub のコマンドラインツール「hub」の基本と便利な使い方のまとめ | DevelopersIO](https://dev.classmethod.jp/articles/hub/)  
[github/hub: A command-line tool that makes git easier to use with GitHub.](https://github.com/github/hub)  
[ScoopInstaller/Scoop: A command-line installer for Windows.](https://github.com/ScoopInstaller/Scoop)  

```powershell
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
scoop --version
scoop update
scoop install hub
hub --version
scoop install gibo
gibo version
```

PowerShellでhubをgitのエイリアスに設定するのが公式だけど、明確にhubコマンドを利用する方針とするー
```powershell
Set-Alias git hub
```

# リポジトリ作成
作業フォルダを用意する(フォルダ名は任意、リポジトリ名になる)
```powershell
mkdir project-name
cd project-name
git config --global user.name ryohei-ochi-fr
git config user.name
git config --global user.email ryohei.ochi@futurerays.biz
git config user.email
git init
gibo update
gibo dump Node VisualStudioCode > .gitignore
code .
```

githubで取得したアクセストークンを .accesstoken の token に書く(個人的なメモとして)


github に、リポジトリ(remote)を作成する
```powershell
git create
```

`github.com username` メアドじゃないユーザ名 ryohei-ochi-fr
`github.com password` アクセストークン

```
Error creating repository: Unauthorized (HTTP 401)
Bad credentials
```
認証エラーとなる場合はhubの設定ファイルを確認する
```powershell
type ~/.config/hub
```

エラーになっているけど、リポジトリは作成されているのでとりあえずヨシ
```
github.com username: ryohei.ochi@futurerays.biz
github.com password for ryohei.ochi@futurerays.biz (never stored): 
Updating origin
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
error: Could not fetch origin
```

```
PS > git remote -v
origin  git@github.com:ryohei-ochi-fr/project-name.git (fetch)
origin  git@github.com:ryohei-ochi-fr/project-name.git (push)
```

エラーの修正、urlを整える
```powershell
git remote set-url origin https://ryohei-ochi-fr@github.com/ryohei-ochi-fr/project-name.git
```




ブラウザでリモートリポジトリを確認する
```powershell
hub browse
```

# first commit !
```powershell
git add .
git commit -m "first commit"
git status

git branch

git branch -m master
git push -u origin master
```


# メモ
```powershell
cd gathering
nest new api
cd api
npm i

nest g resource calender
npm i --save @nestjs/typeorm typeorm sqlite3
vi ormconfig.json
vi api\src\tasks\entities\calender.entity.ts
npm run build
npx typeorm migration:generate -d src/database/migrations -n create-calender
npm run build
npx typeorm migration:run

npm i @nestjs/swagger swagger-ui-express --save

```