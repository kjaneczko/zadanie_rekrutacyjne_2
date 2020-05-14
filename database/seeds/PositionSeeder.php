<?php

use Illuminate\Database\Seeder;
use App\Position;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $position = new Position();
        $position->name = 'Wykładowca';
        $position->save();

        $position = new Position();
        $position->name = 'Pracownik administracyjny';
        $position->save();
    }
}
