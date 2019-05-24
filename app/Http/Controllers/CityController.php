<?php

namespace App\Http\Controllers;

use App\City;

class CityController extends Controller
{
    public function getCity()
    {
        $city = City::all();
        return $city;
    }
}
