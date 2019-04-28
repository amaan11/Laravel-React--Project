<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class GetAirlineDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('airline_details',function(Blueprint $table){
            $table->bigIncrements('id');
            $table->string('flight_name');
            $table->text('flight_image_url');
            $table->integer('baggage_checkin');
            $table->integer('baggage_cabin');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
