<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $fillable = ['names', 'email', 'telf', 'created_at', 'updated_at'];
}
