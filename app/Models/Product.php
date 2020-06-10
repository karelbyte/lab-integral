<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $measure_id
 * @property integer $category_id
 * @property string $code
 * @property string $names
 * @property float $purchase_price
 * @property float $sale_price
 * @property string $created_at
 * @property string $updated_at
 * @property Category $category
 * @property Measure $measure
 * @property ProductProvider[] $productProviders
 */
class Product extends Model
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
    protected $fillable = ['measure_id', 'category_id', 'code', 'names', 'purchase_price', 'sale_price', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function measure()
    {
        return $this->belongsTo(Measure::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function providers()
    {
        return $this->hasMany(ProductProvider::class);
    }


    public function inventory()
    {
        return $this->hasOne(Inventory::class);
    }
}
