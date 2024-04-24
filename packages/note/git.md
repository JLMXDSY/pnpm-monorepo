# Git

## Git初次运行前的配置

Git 自带一个 `git config` 的工具来帮助设置控制 Git 外观和行为的配置变量。 这些变量存储在三个不同的位置：

1. `/etc/gitconfig` 文件: 包含系统上每一个用户及他们仓库的通用配置。 如果在执行 `git config` 时带上 `--system` 选项，那么它就会读写该文件中的配置变量。 （由于它是系统配置文件，因此你需要管理员或超级用户权限来修改它。）
2. `~/.gitconfig` 或 `~/.config/git/config` 文件：只针对当前用户。 你可以传递 `--global` 选项让 Git 读写此文件，这会对你系统上 **所有** 的仓库生效。
3. 当前使用仓库的 Git 目录中的 `config` 文件（即 `.git/config`）：针对该仓库。 你可以传递 `--local` 选项让 Git 强制读写此文件，虽然默认情况下用的就是它。。 （当然，你需要进入某个 Git 仓库中才能让该选项生效。）

每一个级别会覆盖上一级别的配置，所以 `.git/config` 的配置变量会覆盖 `/etc/gitconfig` 中的配置变量。

### 用户信息

url = https://用户名(通常同后面链接上标红的地方):gitee登录密码@gitee.com/ <font color="red">wangjing5676 </font>/smart-lock.git

```git
如果仓库使用https方式，那么最简单的方式是：git config -e
// vi
[remote "gitee"]
        url = https://wangjing5676:wj412513@gitee.com/wangjing5676/smart-lock.git

```



安装完 Git 之后，要做的第一件事就是设置你的用户名和邮件地址。 这一点很重要，因为每一个 Git 提交都会使用这些信息，它们会写入到你的每一次提交中，不可更改：

```git
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```

如果你想在单独项目中单独配置，可以去掉 `--global`

### 文本编辑器

既然用户信息已经设置完毕，你可以配置默认文本编辑器了，当 Git 需要你输入信息时会调用它。 如果未配置，Git 会使用操作系统默认的文本编辑器。

如果你想使用不同的文本编辑器，例如 Emacs，可以这样做：

```console
$ git config --global core.editor emacs
```

### 检查配置信息

如果想要检查你的配置，可以使用 `git config --list` 命令来列出所有 Git 当时能找到的配置。

```console
$ git config --list
user.name=John Doe
user.email=johndoe@example.com
color.status=auto
color.branch=auto
color.interactive=auto
color.diff=auto
...
```

你可能会看到重复的变量名，因为 Git 会从不同的文件中读取同一个配置（例如：`/etc/gitconfig` 与 `~/.gitconfig`）。 这种情况下，Git 会使用它找到的每一个变量的最后一个配置。

你可以通过输入 `git config <key>`： 来检查 Git 的某一项配置

```git
$ git config user.name
```

由于 Git 会从多个文件中读取同一配置变量的不同值，因此你可能会在其中看到意料之外的值而不知道为什么。 此时，你可以查询 Git 中该变量的 **原始** 值，它会告诉你哪一个配置文件最后设置了该值：

```git
$ git config --show-origin user.name
file:.git/config	JLMXDHZ
```

### 获取帮助

你可以通过`git <verb> --help `来获取git 命令的综合手册或者通过`git <verb> -h`来获取更为简明的介绍

```git
git add --help
git add -h
```

## Git原理

### 直接记录快照而非差异

Git 和其它版本控制系统（包括 Subversion 和近似工具）的主要差别在于 Git 对待数据的方式。 从概念上来说，其它大部分系统以文件变更列表的方式存储信息，这类系统（CVS、Subversion、Perforce、Bazaar 等等） 将它们存储的信息看作是一组基本文件和每个文件随时间逐步累积的差异 （它们通常称作 **基于差异（delta-based）** 的版本控制）。

![存储每个文件与初始版本的差异。](https://git-scm.com/book/en/v2/images/deltas.png)

*存储每个文件与初始版本的差异*

Git 不按照以上方式对待或保存数据。反之，Git 更像是把数据看作是对小型文件系统的一系列快照。 在 Git 中，每当你提交更新或保存项目状态时，它基本上就会对当时的全部文件创建一个快照并保存这个快照的索引。 为了效率，如果文件没有修改，Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件。 Git 对待数据更像是一个 **快照流**。

![Git 存储项目随时间改变的快照。](https://git-scm.com/book/en/v2/images/snapshots.png)

*存储项目随时间改变的快照*

这是 Git 与几乎所有其它版本控制系统的重要区别。 因此 Git 重新考虑了以前每一代版本控制系统延续下来的诸多方面。 Git 更像是一个小型的文件系统，提供了许多以此为基础构建的超强工具，而不只是一个简单的 VCS。 稍后我们在[Git 分支](https://git-scm.com/book/zh/v2/ch00/ch03-git-branching)讨论 Git 分支管理时，将探究这种方式对待数据所能获得的益处。

### 几乎所有操作都是本地执行

### Git 保证完整性

Git 中所有的数据在存储前都计算校验和，然后以校验和来引用。 这意味着不可能在 Git 不知情时更改任何文件内容或目录内容。 这个功能建构在 Git 底层，是构成 Git 哲学不可或缺的部分。 若你在传送过程中丢失信息或损坏文件，Git 就能发现。

Git 用以计算校验和的机制叫做 SHA-1 散列（hash，哈希）。 这是一个由 40 个十六进制字符（0-9 和 a-f）组成的字符串，基于 Git 中文件的内容或目录结构计算出来。 SHA-1 哈希看起来是这样：

```
24b9da6552252987aa493b52f8696cd6d3b00373
```

Git 中使用这种哈希值的情况很多，你将经常看到这种哈希值。 实际上，Git 数据库中保存的信息都是以文件内容的哈希值来索引，而不是文件名。

### 三种状态

Git 有三种状态，你的文件可能处于其中之一： **已修改（modified）** 、**已暂存（staged）**和**已提交（committed）**。

- 已修改表示修改了文件，但还没保存到数据库中。(工作区)
- 已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。（暂存区/索引）
- 已提交表示数据已经安全地保存在本地数据库中。（本地仓库）

这会让我们的 Git 项目拥有三个阶段：工作区、暂存区以及 Git 目录。

![工作区、暂存区以及 Git 目录。](https://git-scm.com/book/en/v2/images/areas.png)

*工作目录、暂存区域以及 Git 仓库*

工作区是对项目的某个版本独立提取出来的内容。 这些从 Git 仓库的压缩数据库中提取出来的文件，放在磁盘上供你使用或修改。

暂存区是一个文件，保存了下次将要提交的文件列表信息，一般在 Git 仓库目录中。 按照 Git 的术语叫做“索引”，不过一般说法还是叫“暂存区”。

Git 仓库目录是 Git 用来保存项目的元数据和对象数据库的地方。 这是 Git 中最重要的部分，从其它计算机克隆仓库时，复制的就是这里的数据。

### .git 目录结构详解

执行`git init `会创建一个`.git`目录，这个目录包含了几乎所有Git存储和操作的东西,新初始化的`.git`目录的典型结构如下：

```git
$ ls -F1
config            项目配置选项
description       描述文件，仅供 GitWeb 程序使用，我们无需关心
HEAD *            指出目前被检出的分支
hooks/            放置包含客户端和服务端的钩子脚本
info/             info 目录包含一个全局性排除文件， 用以放置那些不希望被记录在 .gitignore 文件中的忽略模式
objects/ *        存储所有数据内容
                  
                  使用底层命令git cat-file -p SHA 可以显示文件中的内容
refs/ *           存储指向数据（分支、远程仓库和标签等）的提交对象的指针
index *           (待创建)保存暂存区的信息
```

#### [objects](https://git-scm.com/book/zh/v2/Git-内部原理-Git-对象)

git核心部分是一个简单的键值对数据库 
 一个文件对应一次存储内容 
键：一个将待存储的数据外加一个头部信息（header）一起做 SHA-1 校验运算而得的校验和
值：该文件，校验和的前两个字符用于命名子目录，余下的 38 个字符则用作文件名。

使用底层命令`git cat-file -p SHA` 可以显示文件中的内容

```git
$ git cat-file -p 96565efc1672b4f109e2f319417050eeaacc793e
  100644 blob d66003c1ce6af913880f6a124fe4ea6ccd2424c8	.DS_Store
  040000 tree 50cccb3d09bc94ff3e7c63872837ee6910d2c487	learn
  040000 tree 21e739eebe0db2f66c87466d32666f46e6d665ad	my-TypeScript
  040000 tree 2d813dcffeaaad4c0cb61163e9b6a33730b434da	my-react-app
  040000 tree 3e7cb30a40f632e5a81f528553f478de9dd2b7eb	my-vue
  040000 tree ec6f52a2bc00f3ee31942d44f03dd7c6d4f4c95a	"\347\254\224\350\256\260"
  
$ git cat-file -p 96565efc1672b4f109e2f319417050eeaacc793e > test.txt //从数据库取回文件内容
$ cat test.txt //查看文件内容
	version 1
```

参考官方文档我们可以了解：为什么会有索引区域这个东西存在

```git
git add 
// 对于普通类型文件（即100644 blob数据对象）我们可以通过
$ git hash-object -w test.txt  // 把test.txt内容存入git数据库中并显示了文件键，但是仅保存了文件内容并没有保存文件名
	1f7a7a472abf3dd9643fd615f6da379c4acb3e3a
// 所以有了树对象（即04000 tree），树对象每条记录含有一个指向数据对象或者子树对象的 SHA-1 指针，以及相应的模式、类型、文件名信息
$ git cat-file -p master^{tree}
  100644 blob a906cb2a4a904a152e80877d4088654daad0c859      README
  100644 blob 8f94139338f9404f26296befa88755fc2598c289      Rakefile
  040000 tree 99f1a6d12cb4b6f19c8655fca46c3ecf317074e0      lib
// 而暂存区存在的原因就是为了创建树对象
$ git update-index --add --cacheinfo 100644 \ 83baae61804e test.txt //把一个文件存入暂存区
$ git write-tree //把暂存区内容写入一个树对象
	d8329fc1cc938780ffdd9f94e0d364e0ea74f579
	
$ git cat-file -p d8329fc1cc938780ffdd9f94e0d364e0ea74f579
	100644 blob 83baae61804e65cc73a7201a7252750c76066a30      test.txt

$ git read-tree --prefix=bak d8329fc1cc938780ffdd9f94e0d364e0ea74f579 //把一个已知树对象读入暂存区
$ git write-tree
	3c4e9cd789d88d8d89c1073707c3585e41b0e614
$ git cat-file -p 3c4e9cd789d88d8d89c1073707c3585e41b0e614
	040000 tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579     bak

git commit
//这个时候，为了不使用SHA-1，而且知道我们暂存的快照是干什么的，就有了提交对象
$ echo 'first commit' | git commit-tree d8329f
	fdf4fc3344e67ab068f836878b6c4951e3b15f3d
$ git cat-file -p fdf4fc3
	parent fbc00590a34fc0d2b4ca4942105a906ff0011233
  tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579
  author Scott Chacon <schacon@gmail.com> 1243040974 -0700
  committer Scott Chacon <schacon@gmail.com> 1243040974 -0700

  first commit

```

#### [引用](https://git-scm.com/book/zh/v2/Git-内部原理-Git-引用)

##### refs

引用其实就是用分支名作为一个文件名来指向一个提交的SHA-1

```git
$ find .git/refs
	.git/refs
  .git/refs/heads // 本地新建的分支文件夹
  .git/refs/tags // 分支标签文件夹
  .git/refs/remotes // 远程分支文件夹

```

分支的本质就是：一个指向一系列提交之首的分支或着引用；如果我们想在某一个提交上创建一个分支

```git
$ git update-ref refs/heads/test cac0ca
// 这个分支将只包含从第二个提交开始往前追溯的记录：
$ git log --pretty=oneline test
  cac0cab538b970a37ea1e769cbbde608743bc96d second commit
  fdf4fc3344e67ab068f836878b6c4951e3b15f3d first commit
```

所以当运行类似于 `git branch <branch>` 这样的命令时，Git 实际上会运行 `update-ref` 命令， 取得当前所在分支最新提交对应的 SHA-1 值，并将其加入你想要创建的任何新引用中。

##### HEAD

现在的问题是，当你执行 `git branch <branch>` 时，Git 如何知道最新提交的 SHA-1 值呢？ 答案是 HEAD 文件。

HEAD 文件通常是一个符号引用（symbolic reference），指向目前所在的分支。 所谓符号引用，表示它是一个指向其他引用的指针。

然而在某些罕见的情况下，HEAD 文件可能会包含一个 git 对象的 SHA-1 值。 当你在检出一个标签、提交或远程分支，让你的仓库变成 [“分离 HEAD”](https://git-scm.com/docs/git-checkout#_detached_head)状态时，就会出现这种情况。

如果查看 HEAD 文件的内容，通常我们看到类似这样的内容：

```console
$ cat .git/HEAD
ref: refs/heads/master
```

如果执行 `git checkout test`，Git 会像这样更新 HEAD 文件：

```git
$ cat .git/HEAD
ref: refs/heads/test
```

当我们执行 `git commit` 时，该命令会创建一个提交对象，并用 HEAD 文件中那个引用所指向的 SHA-1 值设置其父提交字段。

我们还可以通过`git symbolic-ref`来安全的查看和修改`.git/HEAD`文件

```git
$ git symbolic-ref HEAD
	refs/heads/master
$ git symbolic-ref HEAD refs/heads/test
$ cat .git/HEAD
	ref: refs/heads/test
```

##### 标签引用

前面我们刚讨论过 Git 的三种主要的对象类型（**数据对象**、**树对象** 和 **提交对象** ），然而实际上还有第四种。 **标签对象（tag object）** 非常类似于一个提交对象——它包含一个标签创建者信息、一个日期、一段注释信息，以及一个指针。 主要的区别在于，标签对象通常指向一个提交对象，而不是一个树对象。 它像是一个永不移动的分支引用——永远指向同一个提交对象，只不过给这个提交对象加上一个更友好的名字罢了。

正如 [Git 基础](https://git-scm.com/book/zh/v2/ch00/ch02-git-basics-chapter) 中所讨论的那样，存在两种类型的标签：附注标签和轻量标签。 可以像这样创建一个轻量标签：

```console
$ git update-ref refs/tags/v1.0 cac0cab538b970a37ea1e769cbbde608743bc96d
```

这就是轻量标签的全部内容——一个固定的引用。 然而，一个附注标签则更复杂一些。 若要创建一个附注标签，Git 会创建一个标签对象，并记录一个引用来指向该标签对象，而不是直接指向提交对象。 可以通过创建一个附注标签来验证这个过程（使用 `-a` 选项）：

```console
$ git tag -a v1.1 1a410efbd13591db07496601ebc7a059dd55cfe9 -m 'test tag'
```

下面是上述过程所建标签对象的 SHA-1 值：

```console
$ cat .git/refs/tags/v1.1
9585191f37f7b0fb9444f35a9bf50de191beadc2
```

现在对该 SHA-1 值运行 `git cat-file -p` 命令：

```console
$ git cat-file -p 9585191f37f7b0fb9444f35a9bf50de191beadc2
object 1a410efbd13591db07496601ebc7a059dd55cfe9
type commit
tag v1.1
tagger Scott Chacon <schacon@gmail.com> Sat May 23 16:48:58 2009 -0700

test tag
```

我们注意到，object 条目指向我们打了标签的那个提交对象的 SHA-1 值。 另外要注意的是，标签对象并非必须指向某个提交对象；你可以对任意类型的 Git 对象打标签。 例如，在 Git 源码中，项目维护者将他们的 GPG 公钥添加为一个数据对象，然后对这个对象打了一个标签。 可以克隆一个 Git 版本库，然后通过执行下面的命令来在这个版本库中查看上述公钥：

```console
$ git cat-file blob junio-gpg-pub
```

Linux 内核版本库同样有一个不指向提交对象的标签对象——首个被创建的标签对象所指向的是最初被引入版本库的那份内核源码所对应的树对象。

##### 远程引用

如果查看 `refs/remotes/origin/master` 文件，可以发现 `origin` 远程版本库的 `master` 分支所对应的 SHA-1 值，就是最近一次与服务器通信时本地 `master` 分支所对应的 SHA-1 值：

```console
$ cat .git/refs/remotes/origin/master
ca82a6dff817ec66f44342007202690a93763949
```

远程引用和分支（位于 `refs/heads` 目录下的引用）之间最主要的区别在于，远程引用是只读的。 虽然可以 `git checkout` 到某个远程引用，但是 Git 并不会将 HEAD 引用指向该远程引用。因此，你永远不能通过 `commit` 命令来更新远程引用。 Git 将这些远程引用作为记录远程服务器上各分支最后已知位置状态的书签来管理。



## Git命令参数详解

### Getting and Creating Projects（获取和创建项目）

### Basic Snapshotting（快照）

#### [add](https://git-scm.com/docs/git-add/zh_HANS-CN)

 该命令在工作树中找到的当前的内容以更新索引

- `git add [<options>] [--] <pathspec>...`

  ```git
  <pathspec>            指定添加的文件路径，全部添加用git add .
    -n, --dry-run         演示，实际不添加文件
    -v, --verbose         展示被添加的文件信息
    -i, --interactive     以交互方式将工作树中的修改内容添加到索引
    -p, --patch           交互地在索引和工作树之间选择补丁块并将它们添加到索引中。这有机会在将修改后的内容添加到索引之前查看差异。
    -e, --edit            在编辑器中打开与索引的差异，使用户进行编辑。关闭编辑器后，调整块补丁头并将其应用于索引。
    -f, --force           容许添加已被忽略的文件
    -u, --update          在索引已经有与 <指定路径> 匹配项的地方更新索引。这会删除和修改索引项以匹配工作树，但不添加新文件。
    --renormalize         对所有跟踪的文件应用`clean`过程，将它们再次强制添加到索引中。此选项隐含`-u`选项。
                          这在更改`core.autocrlf`配置或`text`属性以更正添加了错误CRLF/LF行结尾的文件后非常有用。
    -N, --intent-to-add   只记录稍后将添加路径的事实。路径的项会被放置在索引中，但不包括改动的内容。
                          这对于使用 git diff 显示文件的未暂存内容以及使 git commit -a 提交这些文件非常有用。
    -A, --all             不仅在工作树中有与 <指定路径 >匹配的文件的地方更新索引，而且在索引中已经有一个项的地方更新索引。
                          这将添加、修改和删除与工作树匹配的索引项。
  ```

  

#### [status](https://git-scm.com/docs/git-status) 

命令可用于获取摘要，说明哪些变化的文件已暂存，准备下一次提交。

#### [diff](https://git-scm.com/docs/git-diff)

显示工作树与索引或树之间的更改，索引与树之间的更改，两棵树之间的更改，合并产生的更改，两个blob对象之间的更改，或磁盘上两个文件之间的更改。

- `git diff [<options>] [--] [<path>...]`

  比较工作树和索引的差异

- `git diff [<options>] --no-index [--] <path> <path>`

  比较文件系统中的两个路径。如果在 Git 控制的工作树中运行命令，并且至少有一个路径指向工作树之外，或者在 Git 控制的工作树之外运行命令，可以省略 --no-index 选项。这种形式意味着--exit-code。

- `git diff [<options>] --cached [--merge-base] [<commit>] [--] [<path>...]`

  比较索引和指定提交的差异，如果不给出`<commit>`默认与HEAD指向的最新提交进行比较

- `git diff [<options>] <commit> [--] [<path>...]`

  比较工作树和指定提交的差异，也可以使用HEAD将工作树和最新提交进行比较，或者使用分支名使工作树和分支的最新提交比较

- `git diff [<options>] [--merge-base] <commit> <commit> [--] [<path>...]`

  这是为了查看两个任意<提交>之间的更改。

- `git diff [<options>] <commit> <commit>... <commit> [--] [<path>...]`

  查看合并提交的改变，第一个commit应该是合并提交本身，其余的为合并提交的父提交

  还有一种快捷的方式可以通过分支名和该分支的@^来快速查看这个分支的变化，类似于`git show <branch>`

  ```git
  git diff master master@^
    //等同于 
    git show master
  ```

  

- `git diff [<options>] <commit>..<commit> [--] [<path>...]`

  用于查看两个任意<commit>之间的变化。如果省略了一边的<commit>，它将与使用HEAD的效果相同。

- `git diff [<options>] <commit>...<commit> [--] [<path>...]`

    *注意：唯独这条的三个点不是省略号*

  查看包含和第二个数据库的分支上的<commit>，从两个<commit>的一个共同祖先开始。B 相当于 git diff $（git 合并基 A B） B。您可以省略其中任何一<commit>，其效果与使用 HEAD 的效果相同。

- `git diff [<options>] <blob> <blob>` 

    查看两个 Blob 对象的原始内容之间的差异
#### [commit](https://git-scm.com/docs/git-commit)

 创建一个包含索引的当前内容和描述更改的给定日志消息的新提交。新提交是HEAD的直接子提交，通常是当前分支的尖端，分支会更新以指向它（除非没有分支与工作树关联，在这种情况下，HEAD是“分离”的，如[git-checkout[1\]](https://git-scm.com/docs/git-checkout)中所述）。

- `git commit [<options>] [--] <pathspec>...`

  ```git
  -q, --quiet           不提交摘要信息
        -v, --verbose         在提交信息底部显示HEAD和要提交的内容的差异，这个差异不会成为提交消息的一部分
                              如果指定了两次，会额外显示提交内容和工作树文件之间的统一差异，也就是对跟踪文件的未缓存修改。
    Commit message options
        -F, --file <file>     从给定文件中获取提交信息
        --author <author>     覆盖提交作者。使用 <author@example.com> 格式指定一个明确的作者
        --date <date>         覆盖提交中的日期
        -m, --message <message>
                              使用给定的<msg>作为提交信息。
                              如果给定了多个 -m 选项，它们的值会被连接成单独的段落。-m与-c、-C和-F互斥。
    
        -c, --reedit-message <commit>
                              重用并编辑信息从一个指定提交
        -C, --reuse-message <commit>
                              重用信息从一个指定提交
        --fixup <commit>      use autosquash formatted message to fixup specified commit
        --squash <commit>     use autosquash formatted message to squash specified commit
        --reset-author        the commit is authored by me now (used with -C/-c/--amend)
        -s, --signoff         add Signed-off-by:
        -t, --template <file>
                              use specified template file
        -e, --edit            force edit of commit
        --cleanup <mode>      how to strip spaces and #comments from message
        --status              include status in commit message template
        -S, --gpg-sign[=<key-id>]
                              GPG sign commit
    
    Commit contents options
        -a, --all             告诉命令自动缓存已经被修改和删除的文件，但没有告诉 Git 的新文件不受影响。
        -i, --include         add specified files to index for commit
        --interactive         interactively add files
        -p, --patch           interactively add changes
        -o, --only            commit only specified files
        -n, --no-verify       bypass pre-commit and commit-msg hooks
        --dry-run             show what would be committed
        --short               show status concisely
        --branch              show branch information
        --ahead-behind        compute full ahead/behind values
        --porcelain           machine-readable output
        --long                show status in long format (default)
        -z, --null            terminate entries with NUL
        --amend               amend previous commit
        --no-post-rewrite     bypass post-rewrite hook
        -u, --untracked-files[=<mode>]
                              show untracked files, optional modes: all, normal, no. (Default: all)
  ```

    

#### [notes](https://git-scm.com/docs/git-notes)

#### [restore](https://git-scm.com/docs/git-restore)

*这条命令是试验性的，行为可能会改变*

还原工作树中指定的路径与还原源中的一些内容。如果一个路径被跟踪，但在还原源中不存在，它将被删除以匹配源。

该命令也可以用-staged来还原索引中的内容，或者用-staged --worktree同时还原工作树和索引。

默认情况下，如果给定了 --staged，则从 HEAD 中还原内容，否则从索引中还原。使用 --source 可以从不同的提交中还原。

- `git restore [<options>] [--source=<branch>] <file>...`

  ```git
      -s, --source <tree>   用给定树的内容恢复工作树文件。通常通过命名与之相关的提交、分支或标签来指定源树。
                            如果没有指定树，给定了 --staged，则从 HEAD 中恢复内容，否则从索引中恢复。
  
      -W, --worktree
      -S, --staged
      											两个选项都不写，默认还原工作树，只写了-S还原索引，都写了，都还原
      --ignore-unmerged     ignore unmerged entries
      --overlay             use overlay mode
      -q, --quiet           suppress progress reporting
      --recurse-submodules[=<checkout>]
                            control recursive updating of submodules
      --progress            force progress reporting
      -m, --merge           从索引还原工作树上的文件时，在未合并的路径中重新创建冲突合并
      --conflict <style>    conflict style (merge or diff3)
      -2, --ours            checkout our version for unmerged files
      -3, --theirs          checkout their version for unmerged files
      -p, --patch           在还原源和还原位置之间的差异中交互式选择hunks。
      --ignore-skip-worktree-bits
                            do not limit pathspecs to sparse entries only
  ```

  

#### [reset](https://git-scm.com/docs/git-reset)

将当前分支HEAD重置为指定状态

- `git reset [--mixed | --soft | --hard | --merge | --keep] [-q] [<commit>]`

  该表单将当前分支头(HEAD)重置为<commit>，并可能根据<mode>更新索引（重置为<commit>的树）和工作树。如果省略<mode>，默认为--mixed。<mode>必须是以下之一。

  ```git
  --soft
  完全不触及索引文件或工作树（但会将头重置为 <commit>，就像所有模式一样）。这让你所有修改过的文件都处于 "待提交的更改 "状态，
  
  --mixed
  重置索引，但不重置工作树(即保留修改后的文件，但不标记为提交)，并报告未更新的内容。这是默认操作
  
  如果指定了 -N，则删除的路径会被标记为 intent-to-add (参见 git-add[1])。
  
  --hard
  重置索引和工作树。自<commit>以来对工作树中跟踪文件的任何更改都将被丢弃。
  
  --merge
  重置索引并更新工作树中与<commit>和HEAD之间不同的文件，但保留索引和工作树之间不同的文件（即有未被添加的更改）。如果一个在<commit>和索引之间不同的文件有未暂存的更改，则会被中止重置。
  
  --keep
  重置索引并更新工作树中与<commit>和HEAD之间不同的文件。如果在<commit>和HEAD之间不同的文件有本地的变化，则会中止重置。
  
  ```

  

- `git reset [-q] [<tree-ish>] [--] <paths>...`

  将匹配 `< paths >` 的所有路径的索引重置到工作树(它不会影响工作树或当前分支。)与git add < pathspec > 相反

  这个命令等价于 git restore [ -- source = < tree-ish > ] -- staged < pathspec > ..。

- `git reset --patch [<tree-ish>] [--] [<paths>...]`

  在索引和<treeish>之间交互式选择hunks（默认为HEAD）。被选择的hunks会反向应用到索引中。

  这意味着 git reset -p 与 git add -p 相反，也就是说，你可以用它来选择性地重置 hunks。

```git
		-q, --quiet           安静运行只报告错误
    --mixed               reset HEAD and index
    --soft                reset only HEAD
    --hard                reset HEAD, index and working tree
    --merge               reset HEAD, index and working tree
    --keep                reset HEAD but keep local changes
    --recurse-submodules[=<reset>]
                          control recursive updating of submodules
    -p, --patch           select hunks interactively
    -N, --intent-to-add   record only the fact that removed paths will be added later
```



#### [rm](https://git-scm.com/docs/git-rm)

#### [mv](https://git-scm.com/docs/git-mv)

### Branching and Merging（分支和合并）

#### [branch](https://git-scm.com/docs/git-branch)

新建一个分支

如果给定了--list，或者没有非选项参数，则会列出现有的分支；当前分支将以绿色高亮显示，并标有星号。在链接的工作树中签出的任何分支将以青色高亮显示，并标有加号。选项-r会导致远程跟踪分支被列出，而选项-a会同时显示本地和远程分支。

如果给定了<pattern>，它将被用作shell通配符，以限制输出匹配的分支。如果给定了多个模式，如果一个分支与任何一个模式相匹配，它就会被显示出来。

请注意，当提供 <pattern> 时，必须使用 --list，否则该命令可能会被解释为创建分支。

如果使用--contains，则只显示包含命名的提交的分支（换句话说，这些分支的顶端提交是命名的提交的后代），--no-contains则相反。如果使用--merged，则只列出合并到命名提交中的分支（即从命名提交中可以接触到其顶端提交的分支）。如果使用--no-merged，则只有没有合并到指定提交中的分支才会被列出。如果缺少 <commit> 参数，则默认为 HEAD（即当前分支的顶端）。

命令的第二种形式会创建一个名为 <branchname> 的新分支头，它指向当前的 HEAD，如果给定了 <start-point>，则指向 <start-point>。作为一种特殊情况，对于<start-point>，如果正好有一个合并基地，您可以使用 "A...B "作为A和B的合并基地的快捷方式。您最多可以省略 A 和 B 中的一个，在这种情况下，它默认为 HEAD。

请注意，这将创建新的分支，但不会将工作树切换到该分支上；使用 "git switch <newbranch>"来切换到新的分支。

当本地分支从远程跟踪分支开始时，Git 会设置该分支（特别是 branch.<name>.remote 和 branch.<name>.merge 配置项），以便 git pull 能够适当地从远程跟踪分支合并。这个行为可以通过全局的 branch.autoSetupMerge 配置标志来改变。这个设置可以通过 --track 和 --no-track 选项被覆盖，之后再使用 git branch --set-upstream-to 来改变。
使用-m或-M选项，<oldbranch>将被重命名为<newbranch>。如果 <oldbranch> 有相应的日志，它将被重命名为与 <newbranch> 相匹配，并创建一个 日志条目来记住分支的重命名。如果 <newbranch> 存在，则必须使用 -M 来强制重命名。

-c 和 -C 选项的语义与 -m 和 -M 完全相同，只是分支不会被重命名，而是连同它的配置和日志一起被复制到一个新的名称中。

使用-d或-D选项，<branchname>将被删除。您可以指定多个分支进行删除。如果该分支当前有日志，那么日志也将被删除。

使用 -r 和 -d 来删除远程跟踪分支。请注意，只有当远程仓库中的远程跟踪分支不再存在，或者 git fetch 被配置为不再获取它们时，删除远程跟踪分支才有意义。
- `git branch [<options>] [-r | -a] [--merged | --no-merged]`

- `git branch [<options>] [-l] [-f] <branch-name> [<start-point>]`

- `git branch [<options>] [-r] (-d | -D) <branch-name>...`

- `git branch [<options>] (-m | -M) [<old-branch>] <new-branch>`

- `git branch [<options>] (-c | -C) [<old-branch>] <new-branch>`

- `git branch [<options>] [-r | -a] [--points-at]`

- `git branch [<options>] [-r | -a] [--format]`

  ```git
  Generic options 通用选项
      -v, --verbose         在列表模式下，显示每个分支HEAD的hash值和提交信息，以及与上游分支的关系（如果有的话）。
      -q, --quiet           不显示辅助信息
      -t, --track           设置跟踪模式
      -u, --set-upstream-to <upstream>
                            设置上游分支
      --unset-upstream      删除分支的上游信息
      --color[=<when>]      用颜色区分当前、本地、远程分支，when 有三个值：always、never、auto
      -r, --remotes         列出远程跟踪分支或者配合-d删除远程分支 
                            (这种删除的只是分支列表中远程分支的记录，不删除远程仓库中分支)
      --contains <commit>   print only branches that contain the commit
      --no-contains <commit>
                            print only branches that don't contain the commit
      --abbrev[=<n>]        use <n> digits to display SHA-1s
  
  Specific git-branch actions: 给定分支指令
      -a, --all             显示所有的本地分支和远程分支
      -d, --delete          删除分支，分支必须完全合并到上游分支中
                            如果没有用--track或--set-upstream-to设置上游，则合并到HEAD中。
      -D                    强制删除分支，是 -d -f的快捷键
      -m, --move            使用-m或-M选项，<oldbranch>将被重命名为<newbranch>。
                            如果 <oldbranch> 有相应的日志，它将被重命名为与 <newbranch> 相匹配
                            并创建一个 日志条目来记住分支的重命名。
                            如果 <newbranch> 存在，则必须使用 -M 来强制重命名。
      -M                    move/rename a branch, even if target exists
      -c, --copy            复制一个分支及相关的日志
      -C                    即使目标存在也能复制一个分支
      -l, --list            分支名列表
      --show-current        显示当前分支名
      --create-reflog       创建分支日志
      --edit-description    编辑分支描述
      -f, --force           强制创建、移动/重命名、删除。
      --merged <commit>     print only branches that are merged
      --no-merged <commit>  print only branches that are not merged
      --column[=<style>]    list branches in columns
      --sort <key>          field name to sort on
      --points-at <object>  print only branches of the object
      -i, --ignore-case     sorting and filtering are case insensitive
      --format <format>     format to use for the output
  ```
  ```
  使用实例
  重命名分支(修改分支名称)
  git branch -m <old_branch_name> <new_branch_name> (在old的分支执行)
  git push <remote> :<old_branch_name> <new_branch_name> (删除远程旧分支并新建新分支)
  git push <remote> -u <new_branch_name>
  ```
  

#### [checkout](https://git-scm.com/docs/git-checkout)

切换分支或恢复工作树文件

更新工作树中的文件，以匹配索引或指定树中的版本。如果没有给出路径规格，git *checkout*还将更新`HEAD`，将指定的分支设置为当前分支。

- `git checkout [<options>] <branch>`

- `git checkout [<options>] [<branch>] -- <file>...`

  ```git 
      -b <new_branch>       创建并切换到一个新分支
      -B <branch>           创建/重置并切换到一个分支
                            如果 <branch> 不存在，就会被创建；否则，就会被重置
      -l                    创建日志给一个新分支
      --guess               second guess 'git checkout <no-such-branch>' (default)
      --overlay             use overlay mode (default)
      -q, --quiet           suppress progress reporting
      --recurse-submodules[=<checkout>]
                            control recursive updating of submodules
      --progress            force progress reporting
      -m, --merge           perform a 3-way merge with the new branch
      --conflict <style>    conflict style (merge or diff3)
      -d, --detach          在指定提交处分离头部
      -t, --track           设置新分支的上游信息
      -f, --force           当切换分支时，即使索引或工作树与 HEAD 不同，也要继续。这是用来丢弃局部变化的。
      --orphan <new-branch>
                            new unparented branch
      --overwrite-ignore    update ignored files (default)
      --ignore-other-worktrees
                            do not check if another worktree is holding the given ref
      -2, --ours            checkout our version for unmerged files
      -3, --theirs          checkout their version for unmerged files
      -p, --patch           select hunks interactively
      --ignore-skip-worktree-bits
                            do not limit pathspecs to sparse entries only
  ```

  

#### [switch](https://git-scm.com/docs/git-switch)

*这个命令是试验性的。行为可能会改变。*

切换到指定的分支。工作树和索引会被更新以匹配该分支。所有新提交的内容都会被添加到这个分支的顶端

- `git switch [<options>] [<branch>]`

  ```git 
  		-c, --create <branch>
                            如果有这个分支就切换，没有就创建并切换到这个新分支
      -C, --force-create <branch>
                            create/reset and switch to a branch
      --guess               second guess 'git switch <no-such-branch>'
      --discard-changes     throw away local modifications
      -q, --quiet           suppress progress reporting
      --recurse-submodules[=<checkout>]
                            control recursive updating of submodules
      --progress            force progress reporting
      -m, --merge           perform a 3-way merge with the new branch
      --conflict <style>    conflict style (merge or diff3)
      -d, --detach          detach HEAD at named commit
      -t, --track           set upstream info for new branch
      -f, --force           force checkout (throw away local modifications)
      --orphan <new-branch>
                            new unparented branch
      --overwrite-ignore    update ignored files (default)
      --ignore-other-worktrees
                            do not check if another worktree is holding the given ref
  ```

  

#### [merge](https://git-scm.com/docs/git-merge)
#### [mergetool](https://git-scm.com/docs/git-mergetool)
#### [log](https://git-scm.com/docs/git-log)
#### [stash](https://git-scm.com/docs/git-stash)

把修改的内容藏在一个不维护的工作目录中

- `git stash list [<options>]`

  列出您当前所拥有的 stash 条目

- `git stash show [<options>] [<stash>]`

  将 stash 条目中记录的更改以差异的形式显示出来，与第一次创建 stash 条目时的提交内容进行对比。

- `git stash drop [-q|--quiet] [<stash>]`

  从暂存条目列表中删除单个暂存条目。

- `git stash ( pop | apply ) [--index] [-q|--quiet] [<stash>]`

  pop

  从stash列表中删除单个stash状态，并将其应用在当前工作树状态之上，即进行git stash push的反向操作。工作目录必须与索引匹配。

  应用状态可能会因为冲突而失败，在这种情况下，它不会从stash列表中删除。你需要手动解决冲突，之后手动调用git stash drop。

  apply

  和 pop 一样，但不会从 stash 列表中删除状态。与 pop 不同的是，<stash>可以是任何看起来像 stash push 或 stash create 创建的提交。

- `git stash branch <branchname> [<stash>]`

  创建并检查出一个名为 <branchname> 的新分支，从最初创建 <stash> 的提交开始，将 <stash> 中记录的更改应用到新的工作树和索引中。如果成功了，并且 <stash> 是 stash@{<revision>} 形式的引用，它就会丢弃 <stash>。

  如果运行 git stash push 的分支发生了足够大的变化，以至于 git stash apply 由于冲突而失败，这就很有用。由于 stash 条目是应用在运行 git stash 时的 HEAD 提交之上，所以它恢复了最初的 stash 状态，没有冲突。

- `git stash clear`

  删除所有的储藏条目。请注意，这些条目将被修剪，并且可能无法恢复

- `git stash push`

  将你的本地修改保存到一个新的 stash 条目中，并将它们回滚到 HEAD（在工作树和索引中）。


```git
	-q, --quiet                  禁止反馈信息
	                             这个命令仅对这些指令有效： apply, drop, pop, push, save, store
	-a, -all                     所有被忽略和未被跟踪的文件也会被隐藏起来，然后用git clean进行清理。
	                             这个选项只对push和save命令有效。
```



#### [tag](https://git-scm.com/docs/git-tag)

#### [worktree](https://git-scm.com/docs/git-worktree)

### Sharing and Updating Projects（共享和更新项目）

#### [fetch](https://git-scm.com/docs/git-fetch)
#### [pull](https://git-scm.com/docs/git-pull)

从另一个存储库或本地分支获取并与之集成

将更改从远程存储库合并到当前分支。在其默认模式下，`git pull`是的缩写， `git fetch`后跟`git merge FETCH_HEAD`。

更精确地讲，*git pull*使用给定的参数运行*git fetch*并调用*git merge*将检索到的分支头合并到当前分支中。使用时`--rebase`，它将运行*git rebase*而不是*git merge*。

- `git pull [<options>] [<repository> [<refspec>…]]`

  

#### [push](https://git-scm.com/docs/git-push)

使用本地(refs)引用更新远程引用(refs)，同时发送完成给定引用所需的对象。

你可以在每次推送到版本库时，通过设置钩子，让有趣的事情发生在版本库中。参见 git-receive-pack[1] 的文档。

当命令行没有用 <repository> 参数指定推送的位置时，会参考当前分支的 branch.*.remote 配置来决定推送的位置。如果配置缺失，则默认为 origin。

当命令行没有用<refspec>...参数或--all、--mirror、--tags选项指定推送的内容时，命令会通过查阅 remote.*.push 配置来找到默认的<refspec>，如果没有找到，则尊崇push.default配置来决定推送的内容（push.default的含义参见git-config[1]）。

当命令行和配置都没有指定要推送的内容时，会使用默认行为，对应于push.default的简单值：当前分支会被推送到相应的上游分支，但作为安全措施，如果上游分支与本地分支的名字不一样，推送就会中止。

- `git push [<options>] [<repository> [<refspec>...]]`

  ```git
  <repository>             可以是一个GIT URls，也可以是一个远程仓库名字
  <refspec>                指定用源对象更新目标ref，格式 [+]源对象<src>:目标ref<dst>
                           引用规范的格式由一个可选的 + 号和紧随其后的 <src>:<dst> 组成， 
                           + 号告诉 Git 即使在不能快进的情况下也要（强制）更新引用。
                           其中 <src> 是一个模式（pattern），代表远程版本库中的引用；  
                           src通常是要推送的分支名，也可以是任意的SHA表达式，例如：master~4,HEAD
                           <dst> 是本地跟踪的远程引用的位置。
                           默认情况下引用规范由git remote add origin自动生成
  --all                    推送所有分支（以refs/head/为前置的），不能有其他<refspec>
  --prune                  删除没有本地分支对应的远程分支
  --mirror                 指定本地refs/下的所有refs都要镜像到远程仓库，例如新建、修改、删除
  -n,--dry-run             除了真实发送更新外，其他都要演习
  -d,--delete              所有列出的refs都要从远程仓库删除，这和git push origin :ref是一样的
  --tags                   除了命令行明确列出的refs，其余refs/tags/下的所有refs都要被推送
  -u,--set-upstream        给更新或推送成功的分支设置上游（跟踪）refs
  
  ```
  
  

#### [remote](https://git-scm.com/docs/git-remote)

管理跟踪的远程存储库

```
git remote [-v | --verbose]
git remote add [-t <branch>] [-m <master>] [-f] [--[no-]tags] [--mirror=(fetch|push)] <name> <url>
git remote rename <old> <new>
git remote remove <name>
git remote set-head <name> (-a | --auto | -d | --delete | <branch>)
git remote set-branches [--add] <name> <branch>…
git remote get-url [--push] [--all] <name>
git remote set-url [--push] <name> <newurl> [<oldurl>]
git remote set-url --add [--push] <name> <newurl>
git remote set-url --delete [--push] <name> <url>
git remote [-v | --verbose] show [-n] <name>…
git remote prune [-n | --dry-run] <name>…
git remote [-v | --verbose] update [-p | --prune] [(<group> | <remote>)…]
```

```git
$ git remote add origin https://github.com/schacon/simplegit-progit
```

#### [submodule](https://git-scm.com/docs/git-submodule)

### Inspection and Comparison（检查和比较）

#### [show](https://git-scm.com/docs/git-show)
#### [log](https://git-scm.com/docs/git-log)
#### [diff](https://git-scm.com/docs/git-diff)
#### [difftool](https://git-scm.com/docs/git-difftool)
#### [range-diff](https://git-scm.com/docs/git-range-diff)
#### [shortlog](https://git-scm.com/docs/git-shortlog)
#### [describe](https://git-scm.com/docs/git-describe)

### Patching（修补）

#### [apply](https://git-scm.com/docs/git-apply)
#### [cherry-pick](https://git-scm.com/docs/git-cherry-pick)
#### [diff](https://git-scm.com/docs/git-diff)
#### [rebase](https://git-scm.com/docs/git-rebase)
#### [revert](https://git-scm.com/docs/git-revert)

### Debugging（调试）

#### [bisect](https://git-scm.com/docs/git-bisect)
#### [blame](https://git-scm.com/docs/git-blame)
#### [grep](https://git-scm.com/docs/git-grep)

### Administration

#### [clean](https://git-scm.com/docs/git-clean)
#### [gc](https://git-scm.com/docs/git-gc)
#### [fsck](https://git-scm.com/docs/git-fsck)

将会检查数据库的完整性。 如果使用一个 `--full` 选项运行它，它会向你显示出所有没有被其他对象指向的对象：

```console
$ git fsck --full
Checking object directories: 100% (256/256), done.
Checking objects: 100% (18/18), done.
dangling blob d670460b4b4aece5915caf5c68d12f560a9fe3e4
dangling commit ab1afef80fac8e34258ff41fc1b867c702daa24b
dangling tree aea790b9a58f6cf6f2804eeac9f0abbe9631e4c9
dangling blob 7108f7ecb345ee9d0084193f147cdad4d2998293
```

#### [reflog](https://git-scm.com/docs/git-reflog)

当你正在工作时，Git 会默默地记录每一次你改变 HEAD 时它的值。 每一次你提交或改变分支，引用日志都会被更新

为了使显示的信息更加有用，我们可以执行 `git log -g`，这个命令会以标准日志的格式输出引用日志。

```git
$ git reflog
  1a410ef HEAD@{0}: reset: moving to 1a410ef
  ab1afef HEAD@{1}: commit: modified repo.rb a bit
  484a592 HEAD@{2}: commit: added repo.rb
$ git log -g
  commit 1a410efbd13591db07496601ebc7a059dd55cfe9
  Reflog: HEAD@{0} (Scott Chacon <schacon@gmail.com>)
  Reflog message: updating HEAD
  Author: Scott Chacon <schacon@gmail.com>
  Date:   Fri May 22 18:22:37 2009 -0700

      third commit

  commit ab1afef80fac8e34258ff41fc1b867c702daa24b
  Reflog: HEAD@{1} (Scott Chacon <schacon@gmail.com>)
  Reflog message: updating HEAD
  Author: Scott Chacon <schacon@gmail.com>
  Date:   Fri May 22 18:15:24 2009 -0700

         modified repo.rb a bit
```



#### [filter-branch](https://git-scm.com/docs/git-filter-branch)
#### [instaweb](https://git-scm.com/docs/git-instaweb)
#### [archive](https://git-scm.com/docs/git-archive)
#### [bundle](https://git-scm.com/docs/git-bundle)

