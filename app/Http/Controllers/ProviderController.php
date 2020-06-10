<?php

namespace App\Http\Controllers;

use App\Models\Provider;
use Illuminate\Http\Request;

class ProviderController extends Controller
{

    public function list(Request $request)
    {
        $take = (int) $request->input('pagination.rowsPerPage');
        $skip = ((int) $request->input('pagination.page') -1 ) * $take;
        $data = Provider::query();
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
        $total = $data->select('*')->count();
        $list = $data->skip($skip)->take($take)->get();
        $result = [
            'total' => $total,
            'list' =>  $list,
        ];
        return response()->json($result);
    }

    public function store(Request $request)
    {
        Provider::query()->create($request->all());
        return response()->json('Datos guardados correctamente.');
    }


    public function update(Request $request)
    {
        Provider::query()->where('id', $request->id)->update($request->all());
        return response()->json('Datos actualizados correctamente.');
    }


    public function destroy(Request $request)
    {
        Provider::query()->where('id', $request->id)->delete();
        return response()->json('Dato eliminado correctamente.');
    }
}
