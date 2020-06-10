<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AnalisesResource extends JsonResource
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
            'description' => $this->description,
            'code' => $this->code,
            'content'=> $this->content,
            'price' => $this->price,
            'affects' => $this->affects === 1,
            'products' => AnalisesDetailsResource::collection($this->details)
        ];
    }
}
