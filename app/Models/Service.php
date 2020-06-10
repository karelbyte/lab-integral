<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Service extends Model
{
    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['client_id', 'moment', 'doctor',  'price', 'note', 'discount', 'advance', 'status_id', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function analysis()
    {
        return $this->hasMany(ServiceDetails::class);
    }

    public function status()
    {
        return $this->hasOne(ServiceStatus::class, 'id', 'status_id');
    }
}
