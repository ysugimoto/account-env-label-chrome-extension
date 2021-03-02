# account-env-label-chrome-extension

Chrome extension to display environment label in AWS console from your config.

## Install

We do not plan to publish to Chrome Webstore, so you can install this extension manually.
You can see how to install extension from local file: https://www.youtube.com/watch?v=5W9ZPEaVMWE

## Usage

After installation, click extension icon and show popup and fill inputs:

![popup image](https://github.com/ysugimoto/account-env-label-chrome-extension/blob/main/misc/popup_image.png)

### AWS Account ID

Your AWS Account ID to display label. we don't mind hyphen is included or not.

### Label

Label name. Typically `Production`, `Staging`, `Development` or others.

### Color

Label background color.

After filled inputs, press `Save Account` button to save to storage.
Then let's access AWS console which you saved accounts and you will find the label at the left of CloudShell icon:


![appbar](https://github.com/ysugimoto/account-env-label-chrome-extension/blob/main/misc/aws_appbar.png)

Before you work on AWS console, check your current environment from this Label :-)

### License

MIT

### Author

Yoshiaki Sugimoto
