<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 5)->create()->each(function ($user) {
            $user->address()->save(factory(App\UserAddress::class)->make());
            $user->education()->save(factory(App\UserEducation::class)->make());
        });

        App\User::all()->each(function($user) {
            $user->user_position()->attach(rand(1,2));
        });
    }
}
