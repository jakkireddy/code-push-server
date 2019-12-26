# Changelog for code-push-server

## 0.5.x

## New Features
-Optimized for incremental text updates, using google `diff-match-patch` algorithm to calculate differences
   -react-native-code-push Android client adaptation, you need to merge https://github.com/Microsoft/react-native-code-push/pull/1393 to use the incremental text update function normally.
  -react-native-code-push iOS client adaptation (need to merge https://github.com/Microsoft/react-native-code-push/pull/1399)
  -react-native-code-push Windows client adaptation (in progress)

## fixbug

-Fix statistics activations
-Fix grayscale release bug
-Added calculation after rollback and last incremental update version

## How to upgrade to this version

### Upgrade database

`$ npm run upgrade`

or

`$ code-push-server-db upgrade`


## 0.4.x

### New Features

-targetBinaryVersion supports regular matching, `deployments_versions` new fields` min_version`, `max_version`
  -`*` Matches all versions
  -`1.2.3` matches specific version` 1.2.3`
  -`1.2` /` 1.2. * `Matches all 1.2 patch versions
  -`> = 1.2.3 <1.3.7`
  -`~ 1.2.3` matches`> = 1.2.3 <1.3.0`
  -`^ 1.2.3` matches`> = 1.2.3 <2.0.0`
-Add docker orchestration service deployment, update documentation
-Support Tencent cloud cos storageType

## How to upgrade to this version

-Upgrade database
`$ ./bin/db upgrade`
or
`$ mysql codepush <. / sql / codepush-v0.4.0-patch.sql`

-Handling stock data
`` `shell
   $ git clone https://github.com/lisong/tools
   $ cd tools
   $ npm i
   $ vim ./bin/fixMinMaxVersion // Modify data configuration
   $ node ./bin/fixMinMaxVersion // success message appears
`` `

## 0.3.x

-Support grayscale publishing
-Adapted the `code-push app add` command, applications no longer distinguish platforms by name, but platforms by type
  -Database table apps add new fields `os`,` platform`
-Improve `code-push release / release-react / release-cordova` command
  -Added `is_disabled` and` rollout` fields in database table packages
-Adapted to `code-push patch` command
-Added `log_report_download`,` log_report_deploy` log tables
-Upgrade npm dependencies