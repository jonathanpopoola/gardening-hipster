<?php

// 	$row = 1;
// if (($handle = fopen('datafeed_213679.csv', 'r')) !== FALSE)
// {
//     echo '<table>';

//     // Get headers
//     if (($data = fgetcsv($handle, 1000, ',')) !== FALSE)
//     {
//         echo '<tr><th>'.implode('</th><th>', $data).'</th></tr>';
//     }

//     // Get the rest
//     while (($data = fgetcsv($handle, 1000, ',')) !== FALSE)
//     {
//         echo '<tr><td>'.implode('</td><td>', $data).'</td></tr>';
//     }
//     fclose($handle);
//     echo '</table>';
// }



function processCsv($absolutePath)
{
    $csv = array_map('str_getcsv', file($absolutePath));
    $headers = $csv[0];
    unset($csv[0]);
    $rowsWithKeys = [];
    foreach ($csv as $row) {
        $newRow = [];
        foreach ($headers as $k => $key) {
            $newRow[$key] = $row[$k];
        }
        $rowsWithKeys[] = $newRow;
    }
    return $rowsWithKeys;
}

$data =  processCsv('datafeed_213679.csv');
//print_r($data);
$i = 0;
foreach ($data as $row) {
        //echo $row['merchant_category'];
        $p = new Page(); 
		  $p->template = wire('templates')->get( "deal" ); 
		  $p->parent = wire('pages')->get( "/deals/" ); 
		  $p->title = $row['merchant_product_id'];
		  $p->aw_image_url = $row['aw_image_url'];
		  $p->deep_link = $row['merchant_deep_link'];
		  //$p->merchant_category = $sanitizer->selectorValue($row['merchant_category']);
		  $p->merchant_category = str_replace(",", "", $row['merchant_category']); 
		  // str_replace(",", "", $x->selectedFilters->merchant_category);
		  $p->merchant_name = $row['merchant_name'];
		  $p->search_price = $row['search_price'];
		  $p->product_name = $row['product_name'];
		  $p->product_description = $row['description'];
		  $p->save();    
		  $i++;
      }

echo $i.'added successfully';

?>