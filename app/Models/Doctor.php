<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $fillable = ['names', 'email', 'telf', 'created_at', 'updated_at'];

    public function analysis() {
        return $this->hasMany(Service::class);
    }

    protected $appends = [
        'clients'
    ];

    public function getClientsAttribute()
    {
        $cant = $this->hasMany(Service::class)->count();
        return $cant > 0 ? $cant : '';
    }
}
