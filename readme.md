CraftCMS Boilerplate
==============================

** Get the latest Craft download from: [Build With Craft](http://buildwithcraft.com/)**

** Having the /craft/app folder in source control is a personal decision, but you want the most recent version, regardless. Pixel & Tonic's Craft CMS license indicates that no one besides P&T is _allowed_ to redistribute the `/craft/app` folder. Tread lightly.**

### Installation
1. First create local database (phyMyAdmin or Sequel Pro are your friends)
2. Rename db.example.php -> db.php and general.example.php -> general.php files within /craft/config/local/

```php
    db.php
    // Local database info
    return array(
      'server'    => 'localhost',
      'user'      => 'username',
      'password'  => 'password',
      'database'  => 'local-db-name'
    );

    general.php
    /*
     * Local Config Override
     *
     * Overrides added here will get appended to the end of the
     * custom config array for all environments: '*'
     */
    return array(
      // Give us more useful error messages
      'devMode' => true,

      // Route ALL of the emails that Craft
      // sends to a single email address.
      'testToEmailAddress'  => 'testingemail@example.com',

      'translationDebugOutput'      => false,
      'useCompressedJs'             => true,
      'cacheDuration'               => 'P1D',
      'cooldownDuration'            => 'PT5M',
      'maxInvalidLogins'            => 5,
      'invalidLoginWindowDuration'  => 'PT1H',
      'phpMaxMemoryLimit'           => '256M',

      // Member login info duration
      // http://www.php.net/manual/en/dateinterval.construct.php
      'userSessionDuration'           => 'P101Y',
      'rememberedUserSessionDuration' => 'P101Y',
      'rememberUsernameDuration'      => 'P101Y',
    );
```

Now that you've put the correct database credentials in db.php, head on over to /admin and if all is well will start the installation process. Running with [MAMP](https://www.mamp.info/en/) is fairly easy and it comes with phpMyAdmin.


### Gulpjs
If you don't already have Node installed head over to http://nodejs.org/download/
via the command line or install with homebrew (Mac OS):

1. Install gulp (-g means global):
	- `npm install -g gulp`
2. Install gulp modules defined in package.json:
 	- `npm install`
3. Check for outdated packages
  - `npm outdated`
4. Gulp away by running:
	- `gulp`
	-  ^ to run default tasks array or to just watch for new changes:
	- `gulp watch`


Feel free to modify the .scss-lint.yml file to match your preferences on how to lint your scss files.

### Global Meta Information for Templates
I setup the templates to have global fields required for Meta Information (metaInformation.metaDescription and metaInformation.metaPageTitle). This is for SEO.  The two variables are set at the top of main_layout.html. Take 'em out if you don't need a default global SEO and the ability to then override in sub-pages.

### .htaccess and .gitignore
The default .htaccess is packed with a bunch of goodies, modify as you see fit. Just make sure to add a period before the file name to make sure its read properly.

The default .gitignore file is setup to not track unecessary folders and files, most of it involves ignoring config files, as well as node_modules and other assorted craft/app and craft/storage folders and files.
