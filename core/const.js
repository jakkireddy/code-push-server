function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

// Define supported platforms
define("IOS", 1);
define("IOS_NAME", 'iOS');
define("ANDROID", 2);
define("ANDROID_NAME", 'Android');
define("WINDOWS", 3);
define("WINDOWS_NAME", 'Windows');

// define supported application types
define("REACT_NATIVE", 1);
define("REACT_NATIVE_NAME", 'React-Native');
define("CORDOVA", 2);
define("CORDOVA_NAME", 'Cordova');

define("PRODUCTION", 'Production');
define("STAGING", 'Staging');


define("IS_MANDATORY_YES", 1);
define("IS_MANDATORY_NO", 0);


define("IS_DISABLED_YES", 1);
define("IS_DISABLED_NO", 0);


define("RELEAS_EMETHOD_PROMOTE", 'Promote');
define("RELEAS_EMETHOD_UPLOAD", 'Upload');

define("DEPLOYMENT_SUCCEEDED", 1);
define("DEPLOYMENT_FAILED", 2);

define("DIFF_MANIFEST_FILE_NAME", 'hotcodepush.json');

// whether the text file uses google diff-match-patch to calculate the difference
define("IS_USE_DIFF_TEXT_NO", 0);
define("IS_USE_DIFF_TEXT_YES", 1);


define("CURRENT_DB_VERSION", '0.5.0');