<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $service_id
 * @property integer $analysis_id
 * @property string $content
 * @property string $barcode
 * @property int $barcode_quantity
 * @property string $created_at
 * @property string $updated_at
 * @property Analysis $analysis
 * @property Service $service
 */
class ServiceDetails extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'services_details';

    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['service_id', 'analysis_id', 'description', 'price', 'content', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function analysis()
    {
        return $this->belongsTo(Analyses::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
