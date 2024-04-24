# Git

## git工作区和本地仓库

> 1. 创建本地版本库

```js

mkdir  learnGit

cd  learnGit

git  init
```

> 2. 添加到暂存区

```js

touch  learn.md

open  learn.md

git  add  learn.md  // 把工作区修改内容添加到暂存区

git  restore  <file>  //放弃工作目录中文件的修改
git restore --staged <file> // 放弃工作目录中文件的修改

git  commit -m '创建了一个learn文件'  //commit 只提交添加到暂存区的修改

touch  more.md

touch  three.md

git  add .

git  commit  '创建了两个新文件'
```

> 3. 查看工作区和暂存区状态

```js

git  status

git  diff  //查看具体不同的地方在哪
```

> 4. 查看git提交历史记录

```js

git  log

git  log  --pretty=oneline  //精简git日志
```

> git 一些命令

```js

git  branch  //查看本地所有分支



git  branch  -r  //查看远程所有分支



git  branch  -a  //查看本地和远程的所有分支 -a 所有



git  branch  <branchname>  //新建分支



git  branch  -d  <branchname>  //删除本地分支 -D 强制删除


// 删除远程分支第一种
git  branch  -d  -r  origin/<branchname>  //删除远程分支内容

git  push origin :<branchname> //删除后推送至服务器（成功删除远程分支）

// 删除远程分支第二种
git push origin --delete <branchname> // 直接删除远程分支

git branch -m <oldbranch>  <newbranch> //重命名本地分支（移动旧分支到新分支上） -M 强制移动或重命名

/**

*重命名远程分支：

*1、删除远程待修改分支

git branch -d -r <branchname>

*2、切换到新分支上

git checkout 新分支

*3、push本地新分支到远程服务器

git push 新分支名

*/
```

> 通过指定提交记录在git中移动

```js

git  checkout  f2dhex  //通过节点hex值移动HEAD

//相对引用

git  checkout  master^  //让HAEAD指向master的上一个提交节点

git  checkout  master^^  //让HAEAD指向master的前两个提交节点

git  checkout  master~3  //让HAEAD指向master的前三个提交节点

git  branch  -f  master  HEAD~3  //将 master 分支强制指向 HEAD 的第 3 级父提交。
```

> 5. git回退版本(工作区和暂存区没提交到本地仓库的内容会丢失)

```js

git  reset  的用法
git checkout 如果不带文件路径 移动的是HEAD指针 ，如果带文件路径 移动的是HEAD指向的分支指针,(也就是checkout会改变HEAD指向的分支，直接指向了一个提交)
git reset 始终移动的是HEAD指向的分支的指针（而reset不会改变HEAD指向的分支）

git  reset [<mode>] [<commit>]

git reset 将当前分支指向给定的版本，并根据模式的不同决定是否修改index和working tree。

常用的有三种模式，--soft, --mixed, --hard，如果没有给出<mode>则默认是--mixed

--soft参数将会重置HEAD到制定的版本，并把本地文件的修改还原到暂存区（软重置 soft:软）

git reset --soft HEAD^ //回退到上一个版本，提交的内容还原到暂存区

--mixed参数将会重置HEAD到制定的版本，并把本地文件的修改还原到工作区 （混合重置）

--hard参数将会重置HEAD到制定的版本，并清除本地文件的修改（硬重置 hard:硬）

git reset --hard HEAD^ //回退到上一个版本 HEAD^^ 回退到上两个版本

git reset --hard 103a4d //到指定版本



// 回退版本的前提是你还没有提交到远程仓库
```

> 6. git查看历史命令日志

```js

git  reflog
```

> 7. git工作区和版本库

https://www.cnblogs.com/cposture/p/4178003.html 详细介绍工作区/暂存区/仓库

工作目录（working tree） \= git add . => 暂存区（.git/index文件） \=git commit -m '' => 本地仓库(.git/object)

![图片](https://www.runoob.com/wp-content/uploads/2015/02/1352126739_7909.jpg)

> 8. git撤销修改

```js

git  checkout  --  learn.md  //只撤销工作区的修改，不会撤销添加到暂存区的修改

git  reset  HEAD  <file>  //把暂存区的修改撤销掉（unstage），重新放回工作区：
```

> 9. git删除文件

```js

//工作区手动删除了一个文件,让版本库和工作区保持一至、

rm  more.md

git  status

git  rm  more.md

git  commit  -m  '删除了文件more.md'

// 工作区误删文件，用版本库的恢复回来

git  checkout  --  three.md  //git checkout其实是用版本库里的版本替换工作区的版本
```

## git远程仓库

> 10. 同步远程仓库

```js

// 远程仓库并添加密钥

1.  ssh-keygen  -t  rsa  -C  "wjsanshaoyan@163.com"

2.  找到/Users/wangjing/.ssh/id_rsa.pub

3.  复制粘贴里面全部内容到gitee的SSH

4.  ssh  -T  git@gitee.com（第一次输入yes，让gitee把我们的密钥记录下来，测试匹配成功没

// 关联远程仓库

git  remote  -v  //看看有没有关联的远程仓库

// 有 比如是origin

git  remote  rm  origin  //删除已关联的名为origin的远程库

git  remote  rename  origin(以前的名字) oschina(要修改的名字) //修改远程仓库名字

git  remote  set-url  origin  仓库地址  //修改仓库对应的远程仓库地址

// 没有

git  remote  add  gitee  git@gitee.com:wangjing5676/learnGit.git  //再关联码云的远程库

git  remote  add  github  git@gitee.com:wangjing5676/learnGit.git  //还可以再关联github的远程仓库

// 关联好以后

git  clone  git@gitee.com::wangjing5676/learnGit.git [自定义名字]
//这里的账号和密码就是你加入git仓库的用户名和邮箱，输入以后会在凭证里面存储，以后就不用验证了
如果不对就试一下erp的账号和密码

// 下面有一个注意点：如果建立了本地分支和远程分支的跟踪，那么git pull 和git fetch拉去的只是这个分支的最新内容 ，如果没有建立那么拉取的将是远程主机上的所有更新

// 而且如果你拉了所有更新，在push到对应分支的话，其他分支和这个分支冲突的文件是不会提示的

git  pull  gitee  master  //[git pull相当于git fetch和git merge的合并](https://blog.csdn.net/riddle1981/article/details/74938111)

git  pull  gitee  master  --allow-unrelated-histories  //容许合并不相关历史

git  fetch  origin  //=把远程主机的全部更新拉到本地

git  fetch  <远程主机名>  <分支名> //取回特定分支的更新

git merge 分支名 把远程取回的更新合并到指定分支

git push -u gitee master //把本地提交推送到远程仓库(-u表示跟踪远程分支，下一次直接git push)

git pull origin master --allow-unrelated-histories// 合并本地和远程仓库如遇到远程没有历史记录的文件，用这个拉取
```

## git本地分支

> 11. 分支

```js

git  checkout  -b  dev  // 加上-b相当于新增并切换到dev分支

git  branch  //查看分支

// 现在提交的内容在dev分支上

git  checkout  master  //切换到master分支

git  merge  dev  //把dev分支合并到master分支（实际上就是把master指针指向了dev分支最新提交）

git  branch  -d  dev  //合并完成可以删除dev分支

cat.git/HEAD  //查看HEAD指向

git  symbolic-ref  HEAD  //如果 HEAD 指向的是一个引用，还可以用 git symbolic-ref HEAD 查看它的指向
```

> 12. 解决冲突

```js

git  checkout  -b  分支名  //创建宾切换到新分支

// ...修改些内容

git  checkout  master  //切换回master

// ...修改些内容

git  merge  分支名  //合并

// ...冲突产生，手动合并

git  add .

git  commit  -m  'conflict fixed'

git  log  --graph  //看到分支合并图

git  branch  -d  分支名  //删除这个分支

git  merge  --no-ff  -m  "merge with no-ff"  dev  //--no-ff表示普通合并，合并后会提交一次，合并后的历史有分支，能看出来曾经做过合并
```

> 13. 存储区

```js
// [] 代表这是可选的

[-u|--include-untracked] 所有未跟踪的文件也会被藏起来，然后使用进行清理 git clean。

[-a|--all] 所有被忽略和未跟踪的文件也会被存放，然后用清除git clean。

[--index] 尝试不仅恢复工作树的更改，而且恢复索引的更改。但是，当您有冲突时（存储在索引中，因此您无法再像以前一样应用更改），这可能会失败。

[-k|--[no-]keep-index] 已经添加到索引的所有更改均保持不变。
 
[-p|--patch] 从HEAD和要隐藏的工作树之间的差异中交互选择块。存储项的构造应使其索引状态与存储库的索引状态相同，并且其工作树仅包含交互式选择的更改。然后，所选更改将从工作树中回滚。请参阅git-add [1]的“交互模式”部分，以了解如何操作--patch模式。
--patch选项暗含--keep-index。您可以使用--no-keep-index覆盖它。

[-q|--quiet] 不显示反馈信息

[-- <pathspec>...] 新的存储条目仅记录与路径spec 匹配的文件的修改状态。然后，索引条目和工作树文件将仅针对这些文件回滚到 HEAD 中的状态，从而使与路径规格不匹配的文件保持不变。
 
[--pathspec-from-file=<file>] Pathspec在<file>中而不是命令行args中传递。如果<file>恰好-使用标准输入。 Pathspec元素由LF或CR / LF分隔。可以按照配置变量core.quotePath的说明引用路径规范元素（请参阅git-config [1]）。另请参见--pathspec-file-nul和全局--literal-pathspecs。

[--pathspec-file-nul] 仅对--pathspec-from-file有意义。 Pathspec元素用NUL字符分隔，所有其他字符按字面意义使用（包括换行符和引号）。
 
git stash  //把当前工作现场“储藏”起来，等以后恢复现场后继续工作
git stash [push [--patch] [-k|--[no-]keep-index] [-q|--quiet][-u|--include-untracked] 
                [-a|--all] [-m <message>] [-- <pathspec>...]] //将本地修改保存到新的存储项，然后将其回滚到HEAD（在工作树和索引中）。 <message>部分是可选的，提供说明以及存储状态。

为了快速制作快照，您可以省略“推送”。在这种模式下，不允许使用非选项参数来防止拼写错误的子命令产生不必要的隐藏项
git stash [save [-p|--patch] [-k|--[no-]keep-index] [-q|--quiet] [-u|--include-untracked] 
                [-a|--all] [<message>]] //不建议使用此选项，而建议使用git stash push。它与“stash push”的不同之处在于它不能采用pathspec。而是将所有非选项参数串联起来构成存储消息。
                              
git stash show [<options>] [<stash>] // 显示存储项中记录的更改，作为存储项与首次创建存储项时的提交之间的差异。默认情况下，该命令显示diffstat，但是它将接受git diff已知的任何格式（例如，git stash show -p stash @ {1}以补丁程序形式查看第二最新的条目）。您可以使用stash.showStat和/或stash.showPatch配置变量来更改默认行为。

git stash list [<options>] // 列出您当前拥有的存储项。每个存储条目均以其名称列出（例如stash @ {0}是最新条目，stash @ {1}是之前的条目，依此类推），创建条目时当前分支的名称以及一个条目所基于的提交的简短描述。
                             
git stash ( pop | apply ) [--index] [-q|--quiet] [<stash>]
          pop：// 从存储列表中删除单个存储状态，并将其应用于当前工作树状态的顶部，即执行git stash push的逆操作。工作目录必须与索引匹配。应用状态可能会因冲突而失败；在这种情况下，它不会从存储列表中删除。您需要手动解决冲突，然后手动调用git stash drop。
          apply：// 类似于pop，但不要从存储列表中删除状态。与pop不同，<stash>可以是任何看起来像由stash push或stash create创建的提交的提交。
git stash  apply  stash@{0} // 在这个分支应用一个指定的存储条目

git stash drop [-q|--quiet] [<stash>] // 从存储列表中删除一个存储。
                             
git stash branch <branchname> [<stash>] //从最初创建<stash>的提交开始创建并签出名为<branchname>的新分支，并将记录在<stash>中的更改应用于新的工作树和索引。如果成功，并且<stash>是stash @ {<revision>}形式的引用，则它将删除<stash>。
// 如果您在其上运行git stash push的分支已更改得足够多，以至于git stash应用由于冲突而失败，这将很有用。由于存储条目是在运行git stash时是HEAD的提交之上应用的，因此它将恢复原始存储状态，而不会发生冲突。

git stash clear // 删除所有存储条目。请注意，这些条目将随后被修剪，并且可能无法恢复

git stash create [<message>] // 创建一个存储项（这是一个常规的提交对象）并返回其对象名称，而不将其存储在ref名称空间中的任何位置。旨在对脚本有用。它可能不是您要使用的命令；请参阅上方的“push”。
                  
git stash store [-m|--message <message>] [-q|--quiet] <commit> // 将通过git stash create（这是一个悬空的合并提交）创建的给定stash 存储在stash ref中，以更新stash reflog。旨在对脚本有用。它可能不是您要使用的命令；请参阅上方的“push”。
```

> 14. 试验功能分支(随时有可能整个模块二删除的)

```js

git  branch  -D  <name>  // 丢弃一个没有被合并过的分支用git branch -D <name>强行删除
```

> 15. 多人协作

```js

// 把该分支上的所有本地提交推送到远程库，推送时要指定本地分支。

// 这样，Git就会把该分支推送到远程库对应的远程分支上

git  push  gitee  master

查看远程库信息，使用git  remote  -v；

// 步骤

1.  本地新建的分支如果不推送到远程，对其他人就是不可见的；

2.  从本地推送分支，使用git  push  origin  branch-name，如果推送失败，先用git  pull抓取远程的新提交；

//git pull origin master:brantest 将远程主机origin的master分支拉取过来，与本地的brantest分支合并。

// 冒号可以省略，本地分支不添加表示当前分支

3.  在本地创建和远程分支对应的分支，使用git  checkout  -b  gitee/<branch>  dev，本地和远程分支的名称最好一致；
// 如果本地新建一个分支，但远程没有同名的，我们可以用下面指令来新建远程并关联
git push --set-upstream origin/<origin-branch> <local-branch>
// 如果远程有一个分支，但本地没有同名的，我们可以用下面指令来新建本地并关联
git checkout --track origin/<origin-branch>

git checkout -b <newbranch> <basebranch>
basebranch默认是当前分支，也就是基于当前分支新建一个本地分支并切换过去
如果指定了basebranch为一个远程分支，那么就是基于远程分支新建一个本地分支并切换过去
    
4.  建立本地分支和远程分支的关联(这两个需要试试搞明白)
是创建一个新分支，并关联
git  branch  --track  gitee/<local-branch> <origin-branch>；
建立本地和远程关联
git  branch  --set-upstream-to=gitee/<branch>  dev  

5.  从远程抓取分支，使用git  pull，如果有冲突，要先处理冲突。
```

## 更新git全局配置方法

```js
1.更新git全局配置信息，确保user/email信息正确；提供以下两种方法更新配置：
  方法一：命令行直接更新已存在的配置
    git config --global --replace-all user.name "<ERP 或者 中文名>" 
    git config --global --replace-all user.email "<京东邮箱>"
  方法二：直接更新本地 $HOME/.gitconfig 文件：
    [user]
     name = <ERP 或者 中文名>
     email = <京东邮箱>
2.更新完成后，查看配置信息确保准确无误：
  git config --list
  使用git命令修改“commit message”同时重置当前Commit的user/email：
  $ git commit --amend --reset-author

3.使用git log确认当前commit的Author信息已经重置
```

### git cherry

```git
默认比较HEAD本地分支和该分支追踪的远程分支
git cherry -v 展示带有提交信息的差异

git cherry -v organ/master [HEAD] 比较本地HEAD分支和远程master分支之间的差别
git cherry -v master [HEAD] 比较本地HEAD分支和本地master分支的差别

git cherry -v origin/master dev 比较本地dev和远程master的差别

```

### git cherry-pick

通常情况下，我们需要把一个分支的所有改动都合并到另一个分支，我们会用git merge

但是有时候我们想一个分支的部分提交合并到另一个分支，这时可以用git cherry-pick

```git
git cherry-pick <commitHash> 将指定的提交也应用于当前分支
git cherry-pick <branch> 把该分支的最新一次提交也应用到当前分支
git cherry-pick <HashA> <HashB> 将A和B两次提交应用到当前分支
git cherry-pick A..B 把A-B分支的所有提交（不包括A）都应用到当前分支，A分支必须早于B分支
git cherry-pick A^..B 把A-B分支所有的提交都应用到当前分支（包括A）A早于B
```

参数配置项

```
-e --edit 打开外部编辑器，编辑提交信息
-n --no-commit 只更新工作区和暂存区，不产生新的提交
-x  在提交信息里添加（'cherry picked from commit 。。。'），方便以后查到这个提交如何产生的
-s --signoff 在提交信息里添加操作者签名，表示谁进行的这个操作
-m parent-number  --mainline parent-number
如果原始分支是一个合并节点，那么cherry-pick默认失败，因为不知道具体采用哪个分支的变动
git cherry-pick -m 1 <commitHash> 
采用提交<commitHash> 来之编号1的父分支的变动
通常合并节点中1号是接受变动的分支，2号是变动的来源分支
```

代码冲突

```
如果代码冲突，cherry-pick会停止下来，让用户决定如何继续操作
git cherry-pick --continue
用户解决完冲突 使用git add . 将文件改动加入暂存区，然后执行上面的命令让cherry pick继续执行
-- abort 发生冲突后，放弃合并，回到操作前的样子
--quit 发生冲突后，推出cherry-pick操作，但是不回到操作前的样子
```

转移到另一个远程代码库

```
// 添加一个远程仓库
git remote add originName git://gitUrl
// 将远程代码拉取到本地(因为cherry-pick只能挑本地有的commit)
git fetch originName
// 检查要从远程仓库转移的提交，获取哈希
git log originName/branch
// 把指定提交应用到当前分支
git cherry-pick <commitHash>
```



### git checkout - 切换分支或恢复工作树文件



### git reset

### git revert



### Options

-q |--quite