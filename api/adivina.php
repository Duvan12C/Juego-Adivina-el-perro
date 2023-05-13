

<?php
//nota deje mi api aca para poder subirla en el mismo proyecto pero mi backend se monto en mi servidor laragon 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Consultar la lista de todas las razas de perros disponibles
$breedsResponse = file_get_contents('https://dog.ceo/api/breeds/list/all');
$breeds = json_decode($breedsResponse, true)['message'];

// Generar una lista de 10 razas aleatorias
$randomBreedKeys = array_rand($breeds, 10);
$breedsList = array();
foreach ($randomBreedKeys as $key) {
    array_push($breedsList, $key);
}

// Elegir una raza aleatoria de la lista para adivinar
$randomIndex = rand(0, 9);
$breed = $breedsList[$randomIndex];

// Consultar una imagen aleatoria de la raza seleccionada
$imageResponse = file_get_contents("https://dog.ceo/api/breed/$breed/images/random");
$image = json_decode($imageResponse, true)['message'];

// Seleccionar cuatro opciones de raza al azar
$randomBreedKeys = array_rand($breeds, 4);
$options = array();
foreach ($randomBreedKeys as $key) {
    array_push($options, $key);
}
shuffle($options);

// Devolver los datos de la imagen y las opciones de raza como una respuesta JSON
$response = array(
    'breed' => $breed,
    'image' => $image,
    'options' => $options
);
echo json_encode($response);
