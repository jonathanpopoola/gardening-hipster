<?php

//defined in Sky.module
Api::getInstance()->init(array(
  'working_dir' => $working_dir,
  'available_default_thumbs' => $available_default_thumbs,
  'assets_domain' => $assets_domain,
  'international_site' => $international_site
));

die();