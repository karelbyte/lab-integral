<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ServicesResource extends JsonResource
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
            'discount' => $this->discount,
            'price' => $this->price,
            'advance' => $this->advance,
            'balance' => number_format($this->price - $this->advance, 2, '.', ''),
            'moment'=> $this->moment,
            'doctor' =>  $this->doctor,
            'client_id' => $this->client_id,
            'client' => $this->client->names,
            'status_id' => $this->status_id,
            'status' => $this->status->description,
            'note' => $this->note,
            'analysis' => ServiceDetailsResource::collection($this->analysis),
            'analysis_description' => count($this->analysis) > 1 ? 'Multiples' : $this->analysis[0]->description
        ];
    }
}
