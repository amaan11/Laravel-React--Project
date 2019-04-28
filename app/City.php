<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $table = 'city';

    public function airportDetail()
    {
        return $this->hasMany(AirportDetail::class);
    }

}
