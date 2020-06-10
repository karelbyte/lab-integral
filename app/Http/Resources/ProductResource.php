<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $providers =count($this->providers) > 0 ?  $this->providers->pluck('provider_id') : [];
        return [
            'id' => $this->id,
            'code' => $this->code,
            'names'=> $this->names,
            'measure' => $this->measure->description,
            'measure_id' => $this->measure_id,
            'category' => $this->category->description,
            'category_id' => $this->category_id,
            'purchase_price'=> $this->purchase_price,
            'sale_price'=> $this->sale_price,
            'providers'=> $providers
        ];
    }
}
