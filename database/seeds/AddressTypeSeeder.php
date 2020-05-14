<?php

use Illuminate\Database\Seeder;
use App\AddressType;

class AddressTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $addressType = new AddressType();
        $addressType->name = 'Adres zamieszkania';
        $addressType->save();

        $addressType = new AddressType();
        $addressType->name = 'Adres korespondencyjny';
        $addressType->save();
    }
}
