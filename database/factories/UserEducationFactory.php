<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;

$factory->define(App\UserEducation::class, function (Faker $faker) {
    return [
        'university' => $faker->city . ' University',
        'field_of_study' => $faker->sentence(6, true),
        'year_of_graduation' => rand(1980, 2020)
    ];
});
