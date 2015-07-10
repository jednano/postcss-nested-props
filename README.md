# postcss-nested-props

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo-leftp.png">

[![Build Status](https://travis-ci.org/jedmao/postcss-nested-props.svg?branch=master)](https://travis-ci.org/jedmao/postcss-nested-props)
[![npm version](https://badge.fury.io/js/postcss-nested-props.svg)](http://badge.fury.io/js/postcss-nested-props)
[![Code Climate](https://codeclimate.com/github/jedmao/postcss-nested-props/badges/gpa.svg)](https://codeclimate.com/github/jedmao/postcss-nested-props)
[![Test Coverage](https://codeclimate.com/github/jedmao/postcss-nested-props/badges/coverage.svg)](https://codeclimate.com/github/jedmao/postcss-nested-props)
[![npm license](http://img.shields.io/npm/l/postcss-nested-props.svg?style=flat-square)](https://www.npmjs.org/package/postcss-nested-props)

[![npm](https://nodei.co/npm/postcss-nested-props.svg?downloads=true)](https://nodei.co/npm/postcss-nested-props/)

[PostCSS](https://github.com/postcss/postcss) plugin to unwrap [nested properties](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#nested_properties).

## Nested Properties

CSS has quite a few properties that are in “namespaces;” for instance, `font-family`, `font-size`, and `font-weight` are all in the `font` namespace. In CSS, if you want to set a bunch of properties in the same namespace, you have to type it out each time. This plugin provides a shortcut: just write the namespace once, then nest each of the sub-properties within it. For example:

```scss
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```

is compiled to:

```scss
.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold;
}
```

The property namespace itself can also have a value. For example:

```scss
.funky {
  font: 20px/24px fantasy {
    weight: bold;
  }
}
```

is compiled to:

```css
.funky {
  font: 20px/24px fantasy;
  font-weight: bold;
}
```

For nested rules, use the [`postcss-nested`](https://github.com/postcss/postcss-nested) plugin.

## Installation

```
$ npm install postcss-nested-props
```

## Usage

### JavaScript

```js
postcss([ require('postcss-nested-props') ]);
```

### TypeScript

```ts
///<reference path="node_modules/postcss-nested-props/.d.ts" />
import postcssNestedProps = require('postcss-nested-props');

postcss([ postcssNestedProps ]);
```

### Options

None at this time.
