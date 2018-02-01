<?php
 header('Access-Control-Allow-Origin: *');  
 
$xml = file_get_contents("https://www.worldcoinindex.com/apiservice/ticker?key=efYT0UJJflquRJiFI4K3jkbtw&label=dashbtc-dashbtc&fiat=usd");
echo $xml;
die();
?>