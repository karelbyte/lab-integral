<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $code
 * @property string $moment
 * @property string $note
 * @property boolean $status
 * @property string $created_at
 * @property string $updated_at
 * @property ReceptionDetail[] $details
 */
class Reception extends Model
{
    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    protected $hidden = ['created_at', 'updated_at'];

    /**
     * @var array
     */
    protected $fillable = ['code', 'moment', 'note', 'status', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function details()
    {
        return $this->hasMany(ReceptionDetail::class);
    }

    public function status()
    {
        return $this->hasOne(ReceptionStatus::class, 'id', 'status_id');
    }
}
