<?php

namespace App\Http\Controllers;

use App\Http\Resources\AnalisesResource;
use App\Models\Analyses;
use Doctrine\DBAL\Query\QueryException;
use Illuminate\Http\Request;

class AnalysisController extends Controller
{
    public function list(Request $request)
    {
        $take = (int) $request->input('pagination.rowsPerPage');
        $skip = ((int) $request->input('pagination.page') -1 ) * $take;
        $data = Analyses::query()->with(['details' => function ($q) {
            $q->with('product');
        }]);
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
            'list' =>  AnalisesResource::collection($list),
        ];
        return response()->json($result);
    }

    public function store(Request $request)
    {
        $found = Analyses::query()->where('description', $request->input('description'))->first();
        if ($found === null) {
            $analisis = Analyses::query()->create($request->all());;
            $analisis->details()->createMany($request->input('products'));
            return response()->json('Datos guardados correctamente.');
        } else {
            return response()->json('Ya existe un analisis con esa descripción!', 500);
        }
    }

    public function update(Request $request)
    {
        $found = Analyses::query()->where('description', $request->input('description'))
            ->where('id', '<>',  $request->id)
            ->first();
        if ($found === null) {
            $analysis = Analyses::query()->find($request->id);
            $analysis->update([
                'description' => $request->description,
                'code' => $request->code,
                'content' => $request->input('content'),
                'price' => $request->price,
                'affects' => $request->affects
            ]);
            $analysis->details()->delete();
            $analysis->details()->createMany($request->input('products'));
            return response()->json('Datos actualizados correctamente.');
        } else {
            return response()->json('Ya existe un analisis con esa descripción!', 500);
        }
    }

    public function pdf ($id) {
        $contents = Analyses::query()->find($id);
        $pdf = \App::make('snappy.pdf.wrapper');
        $pdf->loadHTML($contents->content);
        return $pdf->inline();
    }

    public function clones ($id) {
      $toClone = Analyses::find($id);
      $clone = $toClone->replicate();
      $clone->description = $toClone->description . '-Copia-';
      $clone->push();
      return http_response_code(200);
    }


    public function destroy(Request $request)
    {

        $analysis = Analyses::query()->findOrFail($request->id);
        if ($analysis->services()->count() > 0) {
            return response()->json('El análisis esta en bitácora, no puede ser eliminado!', 402);
        } else {
            Analyses::destroy($request->id);
            return response()->json('Dato eliminado correctamente.');
        }

    }
}
