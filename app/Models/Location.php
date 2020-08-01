<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = ['names', 'symbol', 'address', 'email', 'telf', 'created_at', 'updated_at'];
}
