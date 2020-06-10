<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function resources() {

    }

    public function list(Request $request)
    {
        $take = (int) $request->input('pagination.rowsPerPage');
        $skip = ((int) $request->input('pagination.page') -1 ) * $take;
        $data = Client::query();
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
        $found = Client::query()->where('names', $request->input('names'))->first();
        if ($found === null) {
             Client::query()->create($request->all());;
            return response()->json('Datos guardados correctamente.');
        } else {
            return response()->json('Ya existe un cliente con ese nombre!', 500);
        }
    }


    public function update(Request $request)
    {
        Client::query()->where('id', $request->id)->update($request->all());
        return response()->json('Datos actualizados correctamente.');
    }


    public function destroy(Request $request)
    {
        try {
            Client::query()->where('id', $request->id)->delete();
            return response()->json('Dato eliminado correctamente.');
        } catch ( \PDOException $e ) {
            if ($e->getCode() === '23000') {
                return response()->json('El cliente esta en bitacora, no puede ser eliminado!', 500);
            }
        }
        catch ( \Exception $e ) {
            return response()->json($e);
        }
    }
}
