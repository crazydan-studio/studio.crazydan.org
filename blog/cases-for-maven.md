---
title: Maven 使用案例
authors:
  - flytreleft
tags:
  - Maven
---

import Copyright from '@site/src/components/Copyright/OwnBlogByAuthor';

本文主要收集 Apache Maven 相关的使用案例。

<!-- more -->

## 引用项目内私有 jar 包

在为客户做项目开发时，通常会遇到引用客户提供的 jar 包的情况，而对于 Maven
项目，一般是不建议将 jar 放到工程内管理的，最好还是以 Maven 的方式进行依赖管理。

在此种场景下，便可以通过**工程仓库**的方式安装和引用 jar 包。

首先，在工程根目录中创建 Maven 仓库目录 `maven/repo`：

```bash
mkdir -p maven/repo
```

然后，在各个需要引入私有 jar 包的子模块 `pom.xl` 中配置仓库：

```xml title="<submodule>/pom.xml"
<project>
  <!-- ... -->

  <repositories>
    <repository>
      <id>project-repo</id>
      <name>Project Repository</name>
      <url>file:///${project.basedir}/../maven/repo</url>
    </repository>
  </repositories>
</project>
```

> 注意，只能在子模块中单独配置，在父模块中配置将不能正确处理仓库的路径。

这样，便可以像远程仓库一样引用**工程仓库**中的 jar 包。

为了便于向**工程仓库**中部署 jar 包，可以在 `maven` 目录中放置一个 jar
部署脚本：

```bash title="maven/install-file.sh"
#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"

usage() {
    echo "Usage: $0 -g <group-id> -a <artifact-id> -v <version> -f <file>"
    echo "Note: Before applying the local repository,"
    echo "      you should run 'mvn install' first in the project's root directory"
}

while [[ -n $1 ]]; do
  case $1 in
    -g) shift; group_id=$1 ;;
    -a) shift; artifact_id=$1 ;;
    -v) shift; version=$1 ;;
    -f) shift; file="$1" ;;
  esac
  shift
done

if [[ "x${group_id}" = "x" || "x${artifact_id}" = "x" || "x${version}" = "x" || "x${file}" = "x" ]]; then
  usage
  exit 1
fi

# https://maven.apache.org/guides/mini/guide-3rd-party-jars-remote.html
# http://roufid.com/3-ways-to-add-local-jar-to-maven-project/#3-_creating_a_different_local_maven_repository
mvn deploy:deploy-file \
        -Dfile="${file}" \
        -DgroupId=${group_id} \
        -DartifactId=${artifact_id} \
        -Dversion=${version} \
        -Dpackaging=jar \
        -Durl=file:"${DIR}/repo" \
        -DrepositoryId=local-repo \
        -DupdateReleaseInfo=true
```

以后，有任何新增的 jar 均可以通过该脚本直接向 `maven/repo` 目录部署。

如果，需要移除某个 jar，则直接从 `maven/repo` 目录中删除其部署目录即可。

需要注意的是，`maven` 目录需要同代码一样，一并提交至版本控制仓库，
并且，和依赖的远程 jar 一样，在模块中依赖的**工程仓库**中的 jar 也会被安装到
Maven 本地仓库目录中。

## 参考资料

- [Apache Maven](https://maven.apache.org/)

<Copyright
owner={{
    name: 'flytreeleft', email: 'flytreeleft@crazydan.org'
  }}
/>
