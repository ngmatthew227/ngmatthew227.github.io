# How to only use the emulator in your system

Sometime we only need the emulator instead of download the whole Android Studio. Here is how you can only use the emulator  in your system

## 1. Download Android command line tools

Download the command line tools from android studio website:

[Download Here](https://dl.google.com/android/repository/commandlinetools-win-9477386_latest.ziphttps://dl.google.com/android/repository/commandlinetools-win-9477386_latest.zip)

After download, unzip the files to a dir, for example `C:\workspace\tools\android_tools\cmdline_tools`

## 

## 2. Download related SDK

cd into the dir you unzip the command tool

cd into the bin folder

run the below command to install the sdk

```shell
sdkmanager --install system-images;android-33;google_apis;arm64-v8a --sdk_root="C:\workspace\tools\android_tools\sdk" --proxy="http" --proxy_host="{host}" --proxy_port="{port}"

--install: set the sdk verion you want, i use system-images;android-33;google_apis;arm64-v8a, you can use instead system-images;android-33;google_apis;x86_64
--sdk_root: set the sdk root you want, can follow my location
--proxy: set the schema of the proxy
--proxy_host: set the proxy host
--proxy_port: set the proxy port
```

## 3. Download platform tools

run the below command

```shell
sdkmanager "platform-tools" "platforms;android-33" --sdk_root="C:\workspace\tools\android_tools\sdk" --proxy="http" --proxy_host="{host}" --proxy_port="{port}"

--sdk_root: set the sdk root you want, can follow my location
```

## 4. Create AVD

Run in the below command line on the same dir

```shell
avdmanager create avd --name test_avd --package "system-images;android-33;google_apis;arm64-v8a" --sdcard 200M --device "pixel_3a" --abi "arm64-v8a" --force --tag "google_apis" --path "C:\workspace\tools\android_tools\avds"

    avdmanager: This is the tool used to manage AVDs in Android.
    create avd: This specifies that we want to create a new AVD.
    --name test_avd: This sets the name of the AVD to "test_avd".
    --package "system-images;android-33;google_apis;arm64-v8a": This specifies the package that will be used for the virtual device, which in this case is the Google APIs system image for Android 11 (API level 33) running on an ARM64 processor.
    --sdcard 200M: This sets the size of the SD card to be used by the AVD to 200 megabytes.
    --device "pixel_3a": This sets the device type to be emulated as a Pixel 3a.
    --abi "arm64-v8a": This specifies the Application Binary Interface (ABI) to use, which in this case is arm64-v8a.
    --force: This forces the creation of the AVD even if there are errors or conflicts.
    --tag "google_apis": This specifies the tag of the system image to use, which in this case is "google_apis".
    --path "C:\workspace\tools\android_tools\avds": This sets the path where the AVD will be created.
```

## 5. Run the emulator

cd into `C:\workspace\tools\android_tools\sdk\emulator`

Run the below command:

```shell
emulator @test_avd
```

🎊🎉You can now play with your emulator
