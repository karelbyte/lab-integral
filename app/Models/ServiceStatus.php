<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property boolean $id
 * @property string $description
 * @property string $created_at
 * @property string $updated_at
 */
class ServiceStatus extends Model
{

    protected $table = 'services_status';

    protected $fillable = ['description', 'created_at', 'updated_at'];

}
