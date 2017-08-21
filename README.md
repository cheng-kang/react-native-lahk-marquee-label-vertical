# react-native-lahk-marquee-label-vertical
A react-native marquee(vertical) label component. 

[![npm version](https://badge.fury.io/js/react-native-lahk-marquee-label-vertical.svg)](https://badge.fury.io/js/react-native-lahk-marquee-label-vertical)

## Anchors

1. [Desc](#desc)
2. [Install](#install)
3. [Usage](#usage)
4. [Props](#props)
5. [Update Log](#update-log)
6. [中文介绍](#中文介绍)

## Desc

[Skip this part, go to **#Install**](#install)

This is a **vertical** marquee label. 

If you need a **horizontal** one, please use [react-native-lahk-marquee-label](https://github.com/cheng-kang/react-native-lahk-marquee-label).

Please refer to [react-native-lahk-marquee-label](https://github.com/cheng-kang/react-native-lahk-marquee-label) for more detailed descrition.

**Note:**

- In Andorid, you can use both `width` or `flex` to layout the view.
- In iOS, use `width` to layout the view. `flex` layout is not supported.


## Install

```sh
npm install --save react-native-lahk-marquee-label-vertical
```

## Usage

1. Import

```js
import MarqueeLabelVertical from 'react-native-lahk-marquee-label-vertical';
```

2. Use

```js
<MarqueeLabelVertical
  duration={8000}
  text={'This is a Marquee Label.'}
  textStyle={{ fontSize: 13, color: 'white' }}
/>
```

or

```js
<MarqueeLabelVertical
  speed={250}
  textStyle={{ fontSize: 13, color: 'white' }}
>
  This is a Marquee Label.
</MarqueeLabelVertical>
```

## Props

- `children`: string, the text to show in the marquee. Alternative to `text`.
- `text`: string, the text to show in the marquee. Alternative to `children`.
- `duration`: number(unit: millisecond), the duration for the marquee to run one round. e.g. 6000 (for 6 seconds a round). Alternative to `speed`.
- `speed`: number(unit: px/s, px per second), the speed of the marquee. Alternative to `duration`.
- `bgViewStyle`: stylesheet object, background view component custom styles.
- `textStyle`: stylesheet object, text component custom styles.

## Update Log

### 2017.08.21 `Version 1.1.0`

- Dynamic Text Support: now you can use dynamic text with this component :D


## 中文介绍

[跳转到 **#install**](#install)

这是一个从下向上滚动的跑马灯。

如果需要从右往左滚动的跑马灯，请使用 [react-native-lahk-marquee-label](https://github.com/cheng-kang/react-native-lahk-marquee-label)。

更多详细介绍，请查看 [react-native-lahk-marquee-label](https://github.com/cheng-kang/react-native-lahk-marquee-label)。

**要注意：**

- 在 Android 平台上，通过 `width` 或者 `flex` 布局来设置最外层 `View` 的样式都没问题。
- 在 iOS 平台上，请使用并且只能使用 `width` 来设置样式。
