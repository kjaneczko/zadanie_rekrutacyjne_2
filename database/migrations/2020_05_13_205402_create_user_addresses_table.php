<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_addresses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->string('street');
            $table->string('house_number');
            $table->string('apartment_number')->nullable();
            $table->string('zip_code');
            $table->string('city');
            $table->string('voivodeship');
            $table->unsignedBigInteger('address_type_id');

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('address_type_id')->references('id')->on('address_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_addresses');
    }
}
