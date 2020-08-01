<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function resources() {
        return Location::query()->select('id', 'names', 'symbol')->get();
    }

    public function list(Request $request)
    {
        $take = (int) $request->input('pagination.rowsPerPage');
        $skip = ((int) $request->input('pagination.page') -1 ) * $take;
        $data = Location::query();
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
        $found = Location::query()->where('names', $request->input('names'))->first();
        if ($found === null) {
            Location::query()->create($request->except('services'));;
            return response()->json('Datos guardados correctamente.');
        } else {
            return response()->json('Ya existe un lugar con ese nombre!', 500);
        }
    }


    public function update(Request $request)
    {
        Location::query()->where('id', $request->id)->update($request->except('services'));
        return response()->json('Datos actualizados correctamente.');
    }


    public function destroy(Request $request)
    {
        try {
            Location::query()->where('id', $request->id)->delete();
            return response()->json('Dato eliminado correctamente.');
        } catch ( \PDOException $e ) {
            if ($e->getCode() === '23000') {
                return response()->json('El lugar esta en bitácora, no puede ser eliminado!', 500);
            }
        }
        catch ( \Exception $e ) {
            return response()->json($e);
        }
    }
}
