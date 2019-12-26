# CodePush Server [source](https://github.com/lisong/code-push-server) 

[![NPM](https://nodei.co/npm/code-push-server.svg?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/code-push-server/)

[![NPM Version](https://img.shields.io/npm/v/code-push-server.svg)](https://npmjs.org/package/code-push-server)
[![Node.js Version](https://img.shields.io/node/v/code-push-server.svg)](https://nodejs.org/en/download/)
[![Linux Status](https://img.shields.io/travis/lisong/code-push-server/master.svg?label=linux)](https://travis-ci.org/lisong/code-push-server)
[![Windows Status](https://img.shields.io/appveyor/ci/lisong/code-push-server/master.svg?label=windows)](https://ci.appveyor.com/project/lisong/code-push-server)
[![Coverage Status](https://img.shields.io/coveralls/lisong/code-push-server/master.svg)](https://coveralls.io/github/lisong/code-push-server)
[![Dependency Status](https://img.shields.io/david/lisong/code-push-server.svg)](https://david-dm.org/lisong/code-push-server)
[![Known Vulnerabilities](https://snyk.io/test/npm/code-push-server/badge.svg)](https://snyk.io/test/npm/code-push-server)
[![Licenses](https://img.shields.io/npm/l/code-push-server.svg)](https://spdx.org/licenses/MIT)

CodePush Server is a CodePush progam server! microsoft CodePush cloud is slow in China, we can use this to build our's. I use [qiniu](http://www.qiniu.com/) to store the files, because it's simple and quick!  Or you can use [local/s3/oss/tencentcloud] storage, just modify config.js file, it's simple configure.


## Support Storage mode 

- local *storage bundle file in local machine*
- qiniu *storage bundle file in [qiniu](http://www.qiniu.com/)*
- s3 *storage bundle file in [aws](https://aws.amazon.com/)*
- oss *storage bundle file in [aliyun](https://www.aliyun.com/product/oss)*
- tencentcloud *storage bundle file in [tencentcloud](https://cloud.tencent.com/product/cos)*

## qq Exchange Group

-QQ Group: 628921445
-QQ Group: 535491067

## Correctly use code-push hot update

-Apple App allows hot updates [Apple's developer agreement] (https://developer.apple.com/programs/ios/information/iOS_Program_Information_4_3_15.pdf), in order to not affect the user experience, it is required to use silent updates. Google Play cannot use silent updates. You must pop the box to inform users that the App has an update. The android market in China must adopt a silent update (if the pop-up box prompts, the app will be rejected by "Please upload the latest version of the binary application package").
-react-native Bundle packages are different for different platforms. When using code-push-server, different applications must be created to distinguish them (eg. CodePushDemo-ios and CodePushDemo-android)
-react-native-code-push only updates the resource files, not java and Objective C, so when npm upgrades the dependent package version, if the localized implementation used by the dependent package, you must change the application version number (ios modify Info CFBundleShortVersionString in .plist, android modify the versionName in build.gradle), and then recompile the app and publish it to the app store.
-It is recommended to use the code-push release-react command to release the application, which combines the package and release commands (eg. Code-push release-react CodePushDemo-ios ios -d Production)
-Every time you submit a new version to the App Store, you should also release an initial version to code-push-server based on the submitted version. (Because every time a version is released to code-push-server later, code-puse-server will be compared with the initial version to generate a patch version)


### shell login

```shell
$ code-push login http://api.code-push.com #登录
```

### [web](http://www.code-push.com) 

访问：http://www.code-push.com

### client eg.

[ReactNative CodePushDemo](https://github.com/lisong/code-push-demo-app)

[Cordova CodePushDemo](https://github.com/lisong/code-push-cordova-demo-app)

## HOW TO INSTALL code-push-server

- [docker](https://github.com/lisong/code-push-server/blob/master/docker/README.md) (recommend)
- [manual operation](https://github.com/lisong/code-push-server/blob/master/docs/README.md)

## DEFAULT ACCOUNT AND PASSWORD

- account: `admin`
- password: `123456`

## HOW TO USE

- [normal](https://github.com/lisong/code-push-server/blob/master/docs/react-native-code-push.md)
- [react-native-code-push](https://github.com/Microsoft/react-native-code-push)
- [code-push](https://github.com/Microsoft/code-push)


## ISSUES

[code-push-server normal solution](https://github.com/lisong/code-push-server/issues/135)

[An unknown error occurred](https://github.com/lisong/code-push-server/issues?utf8=%E2%9C%93&q=unknown)

[modify password](https://github.com/lisong/code-push-server/issues/43)


# UPDATE TIME LINE

- targetBinaryVersion support
  - `*` 
  - `1.2.3`
  - `1.2`/`1.2.*`
  - `1.2.3 - 1.2.7`
  - `>=1.2.3 <1.2.7`
  - `~1.2.3`
  - `^1.2.3`


## Advance Feature

> use google diff-match-patch calculate text file diff patch

- support iOS and Android
- use `"react-native-code-push": "git+https://git@github.com/lisong/react-native-code-push.git"` instead `"react-native-code-push": "x.x.x"` in `package.json`
- change `apps`.`is_use_diff_text` to `1` in mysql codepush database

## License
MIT License [read](https://github.com/lisong/code-push-server/blob/master/LICENSE)


