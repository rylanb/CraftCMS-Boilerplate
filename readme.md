CraftCMS Boilerplate
==============================

**Pixel & Tonic say the /craft/app folder should not be in source control. Make sure to insert that folder from the craft download from [Build With Craft](http://buildwithcraft.com/)**

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
3. Gulp away by running (watch is the default task): 
	- `gulp` or `gulp watch` 


Feel free to modify the .scss-lint.yml file to match your preferences on how to lint your scss files.


### .htaccess and .gitignore
The default .htaccess is packed with a bunch of goodies, modify as you see fit. Just make sure to add a period before the file name to make sure its read properly.

The default .gitignore file is setup to not track unecessary folders and files, most of it involves ignoring config files, as well as node_modules and other assorted craft/app and craft/storage folders and files.
