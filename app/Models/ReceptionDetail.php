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
class ReceptionDetail extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['reception_id', 'product_id', 'cant', 'created_at', 'updated_at'];


    protected $hidden = ['created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function reception()
    {
        return $this->belongsTo(Reception::class);
    }
}
