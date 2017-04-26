<?php


$deals = wire('pages')->find("parent=/deals");
      foreach($deals as $deal) {
        $deal->delete();
      }

echo 'Delete complete';

?>