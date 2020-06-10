<?php

namespace App\Models;

use App\Models\Analyses;
use App\Models\Product;
use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $analysis_id
 * @property integer $product_id
 * @property float $cant
 * @property string $created_at
 * @property string $updated_at
 * @property Analyses $analyses
 * @property Product $product
 */
class AnalysesDetails extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'analyses_details';

    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['analysis_id', 'product_id', 'cant', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function analyses()
    {
        return $this->belongsTo(Analyses::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
