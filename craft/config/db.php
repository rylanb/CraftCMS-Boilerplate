<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

$customDbConfig = array(

  '*' => array(
    // Use the same prefix in all environments
    'tablePrefix'   => 'craft',

    // Live database info
    'server'    => 'localhost',
    'user'      => 'username',
    'password'  => 'password',
    'database'  => 'database_name'
  ),

  // Staging database info
  'staging.' => array(
    'server'    => 'localhost',
    'user'      => 'username',
    'password'  => 'password',
    'database'  => 'database_name'
  ),
  // Staging database info
  '.dev' => array(
  )

);

// If a local db file exists, merge the local db settings
if (is_array($customLocalDbConfig = @include(CRAFT_CONFIG_PATH . 'local/db.php')))
{
  $customGlobalDbConfig = array_merge($customDbConfig['.dev'], $customLocalDbConfig);
  $customDbConfig['.dev'] = $customGlobalDbConfig;
}

return $customDbConfig;
