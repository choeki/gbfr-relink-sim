# 参与贡献

感谢你愿意帮助完善 GBF Relink 配装模拟器。

## 开始开发

1. Fork 本仓库并创建功能分支。
2. 运行 `npm install` 安装依赖。
3. 使用 `npm run dev` 启动本地开发环境。
4. 提交前运行 `npm run lint` 和 `npm run build`。

## 数据修改

- Wiki 已收录的数据优先以 [GBF Relink Wiki](https://relink.gbf.wiki/) 为准。
- 新增或修正游戏数据时，请在 Pull Request 中附上来源链接或游戏内截图。
- 因子副词条、祝福石、召唤石与武器栏位限制请同步检查 `data-source/` 中对应的规则文档。
- 不要提交个人配装、本地缓存、构建产物或 `node_modules`。

## Pull Request 建议

- 一个 PR 尽量只解决一类问题。
- UI 改动请附修改前后的截图。
- 数据改动请列出涉及的词条及其等级或限制规则。
- 描述变更原因以及对现有配装的兼容性影响。

如果规则尚不确定，先创建 Issue 讨论会更合适。
