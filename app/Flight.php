<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    protected $table = 'flight';

    public function airlineDetails()
    {
        return $this->belongsTo('App\AirlineDetail', 'airline_id', 'id');

    }
    public function fareDetails()
    {
        return $this->hasOne('App\FareDetails');
    }

}
