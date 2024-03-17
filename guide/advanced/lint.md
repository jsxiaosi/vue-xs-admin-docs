---
outline: deep
---
 
# 项目规范

为了确保代码的质量和避免潜在的错误，项目内置了一下工具用于校验编码风格

1. EsLint 校验代码规范
2. StyleLint 校验 css/less 规范
3. Prettier 代码格式化
4. CommitLint git提交规范

项目Lint的规则使用了作者自己的配置 [@jsxiaosi/eslint-config](https://github.com/jsxiaosi/eslint-config)

可以自行更改符合你团队的规则

## EsLint

### 配置文件

配置文件路径： `/.eslintrc.js`

### 校验命令

```bash
npm run lint:eslint
```

## StyleLint

### 配置文件

配置文件路径： `/stylelint.config.js`

### 校验命令

```bash
npm run lint:stylelint
```

## Prettier

### 配置文件

配置文件路径： `/prettier.config.js`

### 校验命令

```bash
npm run lint:prettier
```

## CommitLint

### 配置文件

配置文件路径： `/commitlint.config.ts`

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范

  - `feat` 新增功能
  - `fix` 修复缺陷
  - `docs` 文档变更
  - `style` 代码格式
  - `refactor` 代码重构
  - `perf` 性能优化
  - `test` 添加疏漏测试或已有测试改动
  - `build` 构建流程、外部依赖变更 (如升级 npm 包、修改打包配置等)
  - `ci` 修改 CI 配置、脚本
  - `revert` 回滚 commit
  - `chore` 对构建过程或辅助工具和库的更改 (不影响源文件)
  - `wip` 正在开发中
  - `types` 类型定义文件修改

### 示例

```bash
git commit -m 'feat(xxx): add xxxxx'

```

### 使用工具提交

为了避免手动提交编写的繁琐，项目内置了 [`cz-git`](https://cz-git.qbb.sh/zh/) 辅助工具

使用 `cz-git` 提交 `commit`

```bash
npm run cz
```

## Git Hook

使用 Git hooks 在提交代码前进行检查可以自动确保代码质量，防止错误进入代码库，并使代码历史更加清晰，从而提高团队的开发效率和代码稳定性

`husky` 具体配置在 `.husky/` 目录下

`pre-commit` :

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint:staged

npm run lint:pretty

```

`commit-msg` :

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx commitlint --edit $1

```
