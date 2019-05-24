<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookingDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booking_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('flight_id');
            $table->string('first_name');
            $table->string('middle_name');
            $table->string('last_name');
            $table->integer('age');
            $table->string('email');
            $table->integer('contact_number');
            $table->enum('status', ['pending', 'confirmed']);
            $table->string('class');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('booked_flight_details');
    }
}
