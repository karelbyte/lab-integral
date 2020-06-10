<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ServiceDetailsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'analysis_id' => $this->analysis_id,
            'description' => $this->description,
            'code' => $this->analysis->code,
            'price' => $this->analysis->price,
            'barcode'=> $this->barcode,
            'barcode_quantity' => $this->barcode_quantity
        ];
    }
}
