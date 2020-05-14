<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;

$factory->define(App\UserPosition::class, function (Faker $faker) {
    return [
        'position_id' => rand(1, 2)
    ];
});
