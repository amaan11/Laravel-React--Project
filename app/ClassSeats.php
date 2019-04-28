<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClassSeats extends Model
{
    protected $table = 'class_seats';

    function class ()
    {
        return $this->belongsTo('App\FlightClass', 'class_id', 'id');

    }

}
