# babel7-demo

[https://juejin.cn/post/6984020141746946084#heading-7](https://juejin.cn/post/6984020141746946084#heading-7)

babel7-demo

可以将下面的 .babelrc 内容替换 运行 build 命令，查看 dist 输出文件，对比差异

## .babelrc

`@babel/preset-env`和`plugin-transform-runtime`二者都可以设置使用`corejs`来处理`polyfill`，二者各有使用场景，在项目开发和类库开发的时候可以使用不同的配置。

### 真实项目

如果用到 @babel/preset-env 的 useBuiltIns 需要安装 core-js

`useBuiltIns`使用`usage`，尽量使用社区广泛使用的优质库以优化打包体积，不使用暂未进入规范的特性。`plugin-transform-runtime`只使用其移除内联复用的辅助函数的特性，减小打包体积。

```ts
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": [
            "last 2 versions",
            "ie >= 11"
          ]
        },
        "corejs":{
          "version": 3,
          "proposals": false
        },
        "useBuiltIns": "usage"
      }
    ]
  ],
  "plugins": [
     // 需要安装 @babel/runtime
    "@babel/plugin-transform-runtime"
  ]
}
```

### 第三方库

**不需要 安装 core-js**

**需要安装 @babel/runtime-corejs3**

类库开发尽量不使用污染全局环境的`polyfill`，因此`@babel/preset-env`只发挥语法转换的功能，`polyfill`由`plugin-transform-runtime`来处理

```ts
{
  "presets": [
    [
      "@babel/preset-env"
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": {
          "version": 3,
          "proposals": false
        }
      }
    ]
  ]
}
```

## @babel/preset-env

[https://babeljs.io/docs/babel-preset-env#install](https://babeljs.io/docs/babel-preset-env#install)

### debug

[https://babeljs.io/docs/babel-preset-env#debug](https://babeljs.io/docs/babel-preset-env#debug)

Outputs to `console.log` the polyfills and transform plugins enabled by `preset-env` and, if applicable, which one of your targets that needed it.

打印出来相关的 polyfills and transform plugins

### useBuiltIns

https://babeljs.io/docs/babel-preset-env#usebuiltins

This option configures how `@babel/preset-env` handles polyfills.

`"usage"` | `"entry"` | `false`, defaults to `false`.

When either the `usage` or `entry` options are used, `@babel/preset-env` will add direct references to `core-js` modules as bare imports (or requires). This means `core-js` will be resolved relative to the file itself and needs to be accessible.

**当设置了 useBuiltIns 需要安装 core-js**

```ts
yarn add core-js@3
```

## @babel/plugin-transform-runtime

### default options

[https://babeljs.io/docs/babel-plugin-transform-runtime#options](https://babeljs.io/docs/babel-plugin-transform-runtime#options)

```ts
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "version": "7.0.0-beta.0"
      }
    ]
  ]
}
```

### @babel/runtime-corejs3

> 需要安装在 dependencies
> 它是 `@babel/runtime` 的升级版，它不仅仅包含 `@babel/runtime` 的所有内容，还包含 3 号主版本的 `core-js` 。

### polyfill

**TIP: This option was removed in v7.**
