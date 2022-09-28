---
title: Caching dependencies
---

Before a build job can begin compiling your project, all project dependencies need to be available on disk. The longer it takes to acquire the dependencies, the more you need to wait for your build to complete &mdash; so caching dependencies is an important part of speeding up your builds.

> We're actively working on improving caching and other aspects of the build process in order to make builds reliably fast.

## Custom caching

The `cache` field on build profiles in [eas.json](../build/eas-json) can be used to configure caching for specific files and directories. Specified files will be saved to persistent storage after a successful build and restored on subsequent builds after the JavaScript dependencies are installed. Restoring does not overwrite existing files. Changing the `cache.key` value will invalidate the cache. Changing any other property of the `cache` object will also invalidate the cache.

The caching implementation is built on top of Amazon S3, and it's not fast enough to give you any benefit from caching `node_modules` or CocoaPods; it's intended only for files that require significant computation to generate, e.g. compilation results (both final binaries and any intermediate files).

## JavaScript dependencies

EAS Build runs an npm cache server that can speed up downloading JavaScript dependencies for your build jobs. Projects that are using npm or yarn v2 will use the cache by default, but yarn v1 will require that you apply this [workaround](how-tos/#using-npm-cache-with-yarn-v1).

It is not yet possible to save and restore `node_modules` between builds.

To disable using our npm cache server for your builds set `EAS_BUILD_DISABLE_NPM_CACHE` env variable value to `"1"` in `eas.json`.

```json
{
  "build": {
    "production": {
        "env": {
            "EAS_BUILD_DISABLE_NPM_CACHE": "1",
            // ...
        }
        // ...
    }
    // ...
  }
  // ...
}
```

## Android dependencies

EAS Build runs a Maven cache server that can speed up downloading Android dependencies for your build jobs.

Currently we are caching:
- `maven-central` - [https://repo1.maven.org/maven2/](https://repo1.maven.org/maven2/)
- `google` - [https://maven.google.com/](https://maven.google.com/)
- `jcenter` - [https://jcenter.bintray.com/](https://jcenter.bintray.com/)
- `plugins` - [https://plugins.gradle.org/m2/](https://plugins.gradle.org/m2/)

To disable using our Maven cache server for your builds set `EAS_BUILD_DISABLE_MAVEN_CACHE` env variable value to `"1"` in `eas.json`.

```json
{
  "build": {
    "production": {
        "env": {
            "EAS_BUILD_DISABLE_MAVEN_CACHE": "1",
            // ...
        }
        // ...
    }
    // ...
  }
  // ...
}
```


## iOS dependencies

EAS Build runs a CocoaPods cache server that can speed up downloading iOS dependencies for your build jobs. It also makes the service more resilient to CocoaPods CDN outages.

Currently, EAS Build is configured to cache almost all the pods served from official CocoaPods CDN, minus few exceptions which can't be handled by our cache server. These exceptions can be found on the [blacklist](https://github.com/expo/eas-build/blob/main/packages/cocoapods-nexus-plugin/lib/cocoapods_plugin.rb#L6) of our custom CocoaPods plugin and are fetched directly from CDN instead of being fetched through our cache server.

We also cache `Podfile.lock` in order to provide consistent results across managed app builds.

To disable using our CocoaPods cache server for your builds set `EAS_BUILD_DISABLE_COCOAPODS_CACHE` env variable value to `"1"` in `eas.json`.

```json
{
  "build": {
    "production": {
        "env": {
            "EAS_BUILD_DISABLE_COCOAPODS_CACHE": "1",
            // ...
        }
        // ...
    }
    // ...
  }
  // ...
}
```
