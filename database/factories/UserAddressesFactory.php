<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;

$factory->define(App\UserAddress::class, function (Faker $faker) {
    return [
        'street' => $faker->streetName,
        'house_number' => rand(1, 200) . ' &#' . rand(97, 122) . ';',
        'apartment_number' => rand(1, 200),
        'zip_code' => rand(10, 99) . '-' . rand(100, 999),
        'city' => $faker->city,
        'voivodeship' => $faker->state,
        'address_type_id' => 1,
    ];
});
