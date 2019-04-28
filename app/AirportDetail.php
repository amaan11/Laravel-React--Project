<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AirportDetail extends Model
{
    protected $table = 'city';

    public function city()
    {
        return $this->belongsTo(City::class);
    }

}
