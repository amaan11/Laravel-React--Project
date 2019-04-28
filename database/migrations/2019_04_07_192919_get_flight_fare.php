<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class GetFlightFare extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fare_details',function(Blueprint $table){
            $table->bigIncrements('id');
            $table->integer('flight_id');
            $table->integer('base_fare');
            $table->integer('surcharges');
            $table->integer('other_services');
            $table->integer('total_fare');


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
