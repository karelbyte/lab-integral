<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $reception_id
 * @property integer $product_id
 * @property float $cant
 * @property string $created_at
 * @property string $updated_at
 * @property Product $product
 * @property Reception $reception
 */
class ReceptionStatus extends Model
{
    /**
     * @var array
     */

    protected $table = 'reception_status';

    protected $fillable = ['description'];

    public function reception()
    {
        return $this->belongsTo(Reception::class, 'status_id', 'id');
    }
}
