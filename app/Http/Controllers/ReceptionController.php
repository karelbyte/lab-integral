<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Http\Resources\ReceptionResource;
use App\Models\Inventory;
use App\Models\Product;
use App\Models\Reception;
use App\Models\ReceptionDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReceptionController extends Controller
{

    public function resources() {
        $data = [
            'products' => Product::query()->select('id as product_id', 'names', 'code',  DB::raw('0 as cant'))->get()
        ];
        return response()->json($data);
    }

    public function list(Request $request)
    {
        $take = (int) $request->input('pagination.rowsPerPage');
        $skip = ((int) $request->input('pagination.page') -1 ) * $take;
        $data = Reception::query()->with(['details' => function ($q) {
            $q->with('product');
        }])->leftJoin('reception_status', 'reception_status.id', 'receptions.status_id');
        $sortBy = $request->input('pagination.sortBy');
        if ($sortBy !== null && $sortBy !== '') {
            $sort = (bool) $request->input('pagination.descending') ? 'desc' : 'asc';
            $data = $data->orderby($sortBy, $sort);
        }
        $value = $request->input('filter.val');
        if ($value !== null && $value !== '') {
            $field = $request->input('filter.field.value');
            $data = $request->input('filter.field.type') === 'text' ?
                $data->where($field,  'LIKE', '%'.$value .'%') :
                $data->where($field, $value);
        }
        $total = $data->select('receptions.*', 'reception_status.description as status')->count();
        $list = $data->skip($skip)->take($take)->get();
        $result = [
            'total' => $total,
            'list' =>  ReceptionResource::collection($list),
        ];
        return response()->json($result);
    }

    public function store(Request $request)
    {
        $found = Reception::query()->where('code', $request->input('code'))->first();
        if ($found === null) {
            $reception = Reception::query()->create($request->all());;
            $reception->details()->createMany($request->input('products'));
            return response()->json('Datos guardados correctamente.');
        } else {
            return response()->json('Ya existe una recepción con ese codigo!', 500);
        }
    }


    public function update(Request $request)
    {
        $found = Reception::query()->where('code', $request->input('code'))
            ->where('id', '<>',  $request->id)
            ->first();
        if ($found === null) {
            $reception = Reception::query()->find($request->id);
            $reception->update([
                'code' => $request->code,
                'moment' => Carbon::parse($request->moment),
                'note' => $request->note
            ]);
            $reception->details()->delete();
            $reception->details()->createMany($request->input('products'));
            return response()->json('Datos actualizados correctamente.');
        } else {
            return response()->json('Ya existe una recepción con ese codigo!', 500);
        }
    }

    public function destroy(Request $request)
    {
        Reception::query()->where('id', $request->id)->delete();
        return response()->json('Dato eliminado correctamente.');
    }

    public function apply(Request $request)
    {
        $data = ReceptionDetail::query()->where('reception_id', $request->id)->get();
        foreach ($data as $item) {
            $invetori = Inventory::query()->where('product_id', $item->product_id)->first();
            if ($invetori === null) {
                Inventory::query()->create([
                    'product_id' =>  $item->product_id,
                    'cant' => $item->cant
                ]);
            } else {
                $invetori->cant += $item->cant;
                $invetori->save();
            }
        }
        Reception::query()->where('id', $request->id)->update(['status_id' => 2]);
        return response()->json('Dato eliminado correctamente.');
    }

}
