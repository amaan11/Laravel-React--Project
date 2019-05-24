<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FlightTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('flight')->insert([
            'airline_id' => '101',
            'flight_number' => 'AE201',
            'departure_city' => 'Bangalore',
            'arrival_city' => 'Ahmedabad',
            'departure_date' => '2019-05-01',
            'arrival_date' => '2019-05-01',
            'departure_time' => '21:10:00',
            'arrival_time' => '23:10:00',
            'duration' => '2:00:00',
            'stop_count' => '0',
            'stop_name' => '',

        ]);
        DB::table('flight')->insert([
            'airline_id' => '102',
            'flight_number' => 'GH201',
            'departure_city' => 'Bangalore',
            'arrival_city' => 'Ahmedabad',
            'departure_date' => '2019-05-01',
            'arrival_date' => '2019-05-01',
            'departure_time' => '8:10:00',
            'arrival_time' => '10:10:00',
            'duration' => '2:00:00',
            'stop_count' => '0',
            'stop_name' => '',

        ]);
        DB::table('flight')->insert([
            'airline_id' => '101',
            'flight_number' => 'AE341',
            'departure_city' => 'Bangalore',
            'arrival_city' => 'Ahmedabad',
            'departure_date' => '2019-05-01',
            'arrival_date' => '2019-05-01',
            'departure_time' => '18:10:00',
            'arrival_time' => '23:10:00',
            'duration' => '5:00:00',
            'stop_count' => '1',
            'stop_name' => 'Hyderabad',

        ]);
        DB::table('flight')->insert([
            'airline_id' => '102',
            'flight_number' => 'KH201',
            'departure_city' => 'Bangalore',
            'arrival_city' => 'Ahmedabad',
            'departure_date' => '2019-05-01',
            'arrival_date' => '2019-05-01',
            'departure_time' => '21:10:00',
            'arrival_time' => '23:10:00',
            'duration' => '2:00:00',
            'stop_count' => '0',
            'stop_name' => '',

        ]);

    }
}
