<?php
# ++++++++++++++++++++++++++++++++++++++++

# Значения формы:

# Имя
$name = $_REQUEST['name'];
# Номер телефона
$phone = $_REQUEST['phone'];
# ID товара
$product_id_1 = $_REQUEST['product_id_1'];
# Ціна
$price_1 = $_REQUEST['price_1'];


$custom_sizeProdOrder = $_REQUEST['custom_sizeProdOrder'];
$custom_colorProdOrder = $_REQUEST['custom_colorProdOrder'];


# UTM-метки:
$utm_dateutm_date = $_REQUEST['utm_date'];
$utm_campaign = $_REQUEST['utm_campaign'];
$utm_source = $_REQUEST['utm_source'];
$utm_content = $_REQUEST['utm_content'];
$utm_referrer = $_REQUEST['utm_referrer'];
$utm_medium = $_REQUEST['utm_medium'];
$utm_term = $_REQUEST['utm_term'];

// +++++++++++++++++++++++++++++++++++++++
// отсылаем данные на почту

 $mes = "product-ID: $product_id_1 \nТелефон: $phone \nИмя: $name";
$address = "ferrlando1@gmail.com"; // куда отсылать

$sub = "Заказ $product_id_1"; // тема письма
$email = 'email <email>'; // от кого
$send = mail ($address,$sub,$mes,"Content-type:text/plain; charset = utf-8\r\nFrom:$email");

// +++++++++++++++++++++++++++++++++++++++

$data = array(
            'login' => 'Ferrlando1@gmail.com',
            'password' => '3a2d3528a0f5f0a76e9d26b1771112db',
            'clientnamefirst' => $name,
            'clientphone' => $phone,
            'productArray[1][id]' => $product_id_1,
            'productArray[1][price]' => $price_1,
            'productArray[1][custom_sizeProdOrder]' => $custom_sizeProdOrder,
            'productArray[1][custom_colorProdOrder]' => $custom_colorProdOrder,
            'source' => 'https://basic-dress.com.ua/trend1/',
            'customorder_SMStoClient' => 'да',
            'customorder_tocall' => 'да',
            'customorder_partnerid' => '2311722',
            'customorder_Ordertype' => 'Дроп',
            'utm_campaign'=> $utm_campaign,
            'utm_source'=> $utm_source,
            'utm_content'=> $utm_content,
            'utm_referrer'=> $utm_referrer,
            'utm_medium'=> $utm_medium,
            'utm_term'=> $utm_term,
);

$curlNT = curl_init('https://newtrend.team/api/dropshipping/orders/add/json/');
curl_setopt($curlNT, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curlNT, CURLOPT_POST, true);
curl_setopt($curlNT, CURLOPT_POSTFIELDS,  http_build_query($data));
curl_setopt($curlNT, CURLOPT_TIMEOUT, 30);
curl_setopt($curlNT, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($curlNT, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curlNT, CURLOPT_SSL_VERIFYHOST, false);
$response = curl_exec($curlNT);
$result = json_decode($response, true);
curl_close($curlNT);
header("Location: success.html");
?>
