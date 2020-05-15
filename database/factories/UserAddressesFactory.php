<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;

$factory->define(App\UserAddress::class, function (Faker $faker) {
    $charTable = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'w', 'z'
    ];
    return [
        'street' => $faker->streetName,
        'house_number' => rand(1, 200) . ' ' . $charTable[rand(0, 21)] . '',
        'apartment_number' => rand(1, 200),
        'zip_code' => rand(10, 99) . '-' . rand(100, 999),
        'city' => $faker->city,
        'voivodeship' => $faker->state,
        'address_type_id' => 1,
    ];
});
