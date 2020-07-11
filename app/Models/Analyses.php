<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $description
 * @property string $content
 * @property float $price
 * @property string $created_at
 * @property string $updated_at
 */
class Analyses extends Model
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
    protected $fillable = ['description', 'code', 'content', 'price', 'affects', 'created_at', 'updated_at', 'affects'];


    public function details()
    {
        return $this->hasMany(AnalysesDetails::class, 'analysis_id', 'id');
    }

    public function services()
    {
        return $this->hasMany(ServiceDetails::class, 'analysis_id', 'id');
    }

}
