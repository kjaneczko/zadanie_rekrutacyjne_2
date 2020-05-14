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
        factory(App\User::class, 50)->create()->each(function ($user) {
            $user->address()->save(factory(App\UserAddress::class)->make());
            $user->position()->save(factory(App\UserPosition::class)->make());
            $user->education()->save(factory(App\UserEducation::class)->make());
        });
    }
}
