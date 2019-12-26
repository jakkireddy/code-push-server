# `react-native` How to use` code-push` hot update

## Before you use

 -Q: "Apple App Store and Android App Store are not allowed to use hot update?"
   A: "Everyone is allowed."

   > Apple allows the use of hot update [Apple's developer agreement] (https://developer.apple.com/programs/ios/information/iOS_Program_Information_4_3_15.pdf), but stipulates that it cannot pop up boxes to prompt users to update, affecting the user experience.
   > Google Play also allows hot updates, but you must pop the box to inform users of the update. When it is released in the android market in China, you must close the update popup box, otherwise the application will be rejected with "Please upload the latest version of the binary application package" when reviewing the application.
       
 -Q: "Can the react-native development environment update mode be used directly in a production environment?"
   A: "No."

 -Q: "Is it complicated to use code-push?"
   A: "It's not complicated. Many online articles say it's complicated because the author didn't understand the official documentation carefully and thought that they had stepped into the pit."

 -Q: "Why is code-push recommended?"
   A: "Very good. In addition to the basic update functions, there are also statistics, hash calculation fault tolerance, and patch update functions. Microsoft projects, large companies have guaranteed technology, and open source. In recent years, Microsoft has embraced open source, and everyone is also Eye-catching. "

## Install dependencies

#### 1. [react-native-cli] (https://github.com/facebook/react-native) react-native command line tool, you can use the `react-native` command in the terminal after installation
 
`` `shell
$ npm install react-native-cli @ latest -g
`` `
 
#### 2. [code-push-cli] (https://github.com/Microsoft/code-push) Connect to Microsoft Cloud, manage and release updated command-line tools, and use `code-push in the terminal after installation `Command
   
`` `shell
$ npm install code-push-cli @ latest -g
`` `

#### 3. [react-native-code-push] (https://github.com/Microsoft/react-native-code-push) Integrate into the react-native project, follow the steps to install and modify the configuration integrated

`` `shell
$ react-native init CodePushDemo #Initiate a react-native project
$ cd CodePushDemo
$ npm install --save react-native-code-push @ latest #Install react-native-code-push
$ react-native link react-native-code-push #Connect to the project, prompt for input configuration can be ignored first
`` `

#### 4. [code-push-server] (https://github.com/lisong/code-push-server) Microsoft cloud service is too slow in China, you can use it to build your own server.

-[docker] (https://github.com/lisong/code-push-server/blob/master/docker/README.md) (recommend)
-[manual operation] (https://github.com/lisong/code-push-server/blob/master/docs/README.md)

## Create a server application

Based on code-push-server service

`` `shell
$ code-push login http: // YOUR_CODE_PUSH_SERVER_IP: 3000 #Log in to the browser to obtain a token, username: admin, password: 123456
$ code-push app add CodePushDemoiOS ios react-native #Create iOS version, get Production DeploymentKey
$ code-push app add CodePushDemoAndroid android react-native #Create android version, get Production DeploymentKey
`` `

## Configure CodePushDemo react-native project

#### iOS configuration

Edit the `Info.plist` file and add` CodePushDeploymentKey` and `CodePushServerURL`

1. The `CodePushDeploymentKey` value is set to the Production DeploymentKey value of CodePushDemo-ios.

2. Set the value of `CodePushServerURL` to the code-push-server service address http: // YOUR_CODE_PUSH_SERVER_IP: 3000 / When not on the same machine, please change YOUR_CODE_PUSH_SERVER_IP to the external network IP or domain name address.

3. Change the default version number 1.0 to three digits 1.0.0

`` `xml
...
<key> CodePushDeploymentKey </ key>
<string> YourCodePushKey </ string>
<key> CodePushServerURL </ key>
<string> YourCodePushServerUrl </ string>
...
`` `

#### android configuration

Edit `MainApplication.java`

1. Replace YourKey with CodePushDemo-android's Production DeploymentKey value

2. The value of `YourCodePushServerUrl` is set to the code-push-server service address http: // YOUR_CODE_PUSH_SERVER_IP: 3000 / When not on the same machine, please change YOUR_CODE_PUSH_SERVER_IP to the external network IP or domain name address.

3. Change the default version number 1.0 to three digits 1.0.0

`` `java
@Override
protected List <ReactPackage> getPackages () {
  return Arrays. <ReactPackage> asList (
      new MainReactPackage (),
      new CodePush (
         "YourKey",
         MainApplication.this,
         BuildConfig.DEBUG,
         "YourCodePushServerUrl"
      )
  );
}
`` `

## Add update check

You can refer to [code-push-demo-app] (https://github.com/lisong/code-push-demo-app/)
Can be added at the entry componentDidMount

`` `javascript
CodePush.sync ({
    installMode: CodePush.InstallMode.IMMEDIATE,
    updateDialog: true
});
`` `

Don't forget the head introduction

`` `javascript
import CodePush from "react-native-code-push"
`` `

## Run CodePushDemo react-native project

#### iOS

`` `shell
$ cd / path / to / CodePushDemo
$ open ios / CodePushDemo.xcodeproj
`` `
Open the menu Product> Scheme> Edit Scheme ...> Run in Xcode and change the Build Configuration to Release, then run the compilation

### android

`` `shell
$ cd / path / to / CodePushDemo
$ cd android
$ ./gradlew assembleRelease
$ cd app / build / outputs / apk #Install the completed package app-release.apk to your phone
`` `

## Publish updates to the service

iOS and android are released separately, so the CodePushDemo-ios and CodePushDemo-android applications are created

`` `shell
$ cd / path / to / CodePushDemo
$ code-push release-react CodePushDemo-ios ios -d Production #iOS version
$ code-push release-react CodePushDemo-android android -d Production #android version
`` `

## Examples

[code-push-demo-app] (https://github.com/lisong/code-push-demo-app)


### For more information refer to [code-push-server] (https://github.com/lisong/code-push-server)