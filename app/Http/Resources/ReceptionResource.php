<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReceptionResource extends JsonResource
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
            'code' => $this->code,
            'moment'=> $this->moment,
            'status_id' => $this->status_id,
            'status' => $this->status,
            'products' => ReceptionDetailsResource::collection($this->details)
        ];
    }
}
