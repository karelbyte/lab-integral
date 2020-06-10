<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $product_id
 * @property integer $provider_id
 * @property string $created_at
 * @property string $updated_at
 * @property Product $product
 * @property Provider $provider
 */
class ProductProvider extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['product_id', 'provider_id', 'created_at', 'updated_at'];

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
    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }
}
