<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFlightTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flight', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('airline_id');
            $table->string('flight_number');
            $table->string('departure_city');
            $table->string('arrival_city');
            $table->date('departure_date');
            $table->time('departure_time');
            $table->time('arrival_time');
            $table->date('arrival_date');
            $table->time('duration');
            $table->integer('stop_count');
            $table->string('stop_name');
            $table->integer('price');
            $table->integer('seatsLeft');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flight');
    }
}
