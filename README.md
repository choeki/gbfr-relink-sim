# GBF Relink 配装模拟器

一个面向《碧蓝幻想 Relink》的本地配装模拟器。可配置角色、武器、祝福石、因子与召唤石，并自动汇总技能等级，生成适合社区分享的配装图片。

## 主要功能

- 角色与对应武器类型选择
- 12 个因子栏位，支持主词条、副词条及独立等级
- 祝福石与召唤石规则过滤
- 武器固定词条、角色专属因子及天星系列统计
- 技能等级、上限、溢出与来源汇总
- 中文／English 本地化切换
- 浏览器本地自动保存与多套配装切换
- 一键导出完整配装图片

## 本地运行

需要 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

默认地址：<http://localhost:5173>

## 检查与构建

```bash
npm run lint
npm run build
npm run preview
```

## 数据与规则

基础资料优先参考 [GBF Relink Wiki](https://relink.gbf.wiki/)，并结合游戏内界面进行校对。规则说明与待补数据记录在 [`data-source/`](data-source/) 中。

游戏更新后可能出现暂未收录或数值变化的词条。欢迎提交 Issue 或 Pull Request 补充，并尽量附上 Wiki 页面或游戏内截图作为依据。

## 参与贡献

请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。建议每次 Pull Request 只处理一类问题，并在提交前运行：

```bash
npm run lint
npm run build
```

## 技术栈

Vite + React + TypeScript。当前为纯前端应用，不需要后端或数据库；配装数据保存在浏览器 `localStorage` 中。

## 免责声明

本项目是非官方社区工具，与 Cygames 无关。游戏名称、图像与相关素材的权利归其各自权利人所有。
