<?php
/**
 * DigitalWindow API Client
 *
 * Copyright (C) 2008 Digital Window Ltd.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

define('API', 'AW');



require_once ('constants.inc.php');
require_once ('classes/class.ClientFactory.php');

# Username and password constants are defined in constants.inc.php
$oClient = ClientFactory::getClient();

# Example parameters to pass
$aParams1 = array(
    //'aMerchantIds'	=> array(),
    'dStartDate' => '2007-08-01T00:00:00', 
    'dEndDate' => '2007-08-22T23:59:59', 
    'sDateType' => 'transaction'
);
$aParams2 = array(
    'aTransactionIds' => array(15048244, 15048246), 
    'dStartDate' => '2007-08-01T00:00:00', 
    'dEndDate' => '2007-08-22T23:59:59', 
    'sDateType' => 'transaction'
);
$aParams3 = array(
	'sRelationship' => 'joined'
);
$aParams4 = array(
	'aMerchantIds' => array(273, 1599, 1598)
);
$aParams5 = array(
    //'aMerchantIds'=> array(),
    'dStartDate' => '2007-07-19T00:00:00', 
    'dEndDate' => '2007-11-20T23:59:59', 
    'sDateType' => ''
);

#$oResponse = $oClient->call('getTransactionList', $aParams1);
#$oResponse = $oClient->call('getTransaction', $aParams2);
#$oResponse = $oClient->call('getMerchantList', $aParams3);
$oResponse = $oClient->call('getMerchant', $aParams4);
#$oResponse = $oClient->call('getClickStats', $aParams5);
#$oResponse = $oClient->call('getImpressionStats', $aParams5);

echo '<pre>';
$sOutput = '';
#$sOutput.= $oClient->__getFunctions();
$sOutput .= $oClient->__getLastRequest();
#$sOutput.= $oClient->__getLastRequestHeaders();
$sOutput .= $oClient->__getLastResponse();
#$sOutput.= $oClient->__getLastResponseHeaders();

#print 'Quota:'.$oClient->getQuota();

$sOutput = str_replace('><', ">\n<", $sOutput);

echo $sOutput;
print_r($oResponse);

echo '</pre>';