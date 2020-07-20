<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $name
 * @property string $address
 * @property string $email
 * @property string $telf
 * @property string $created_at
 * @property string $updated_at
 */
class Client extends Model
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
    protected $fillable = ['names', 'address', 'birthday', 'email', 'telf', 'created_at', 'updated_at'];

    protected $appends = [
        'services'
    ];

    public function getServicesAttribute()
    {
        $cant = $this->hasMany(Service::class)->count();
        return $cant > 0 ? $cant : '';
    }

}
