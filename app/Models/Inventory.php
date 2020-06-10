<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $product_id
 * @property float $cant
 * @property string $created_at
 * @property string $updated_at
 * @property Product $product
 */
class Inventory extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['product_id', 'cant', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
