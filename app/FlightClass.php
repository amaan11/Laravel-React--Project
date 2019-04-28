<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FlightClass extends Model
{
    protected $table = 'flight_class';

    public function classSeats()
    {
        return $this->hasMany('app\ClassSeats', 'class_id', 'id');
    }

}
