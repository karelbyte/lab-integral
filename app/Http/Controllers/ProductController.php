<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Measure;
use App\Models\Product;
use App\Models\Provider;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function resources() {
       $data = [
           'measures' => Measure::query()->select('id', 'description')->get(),
           'categories' => Category::query()->select('id', 'description')->get(),
           'providers' => Provider::query()->select('id as value', 'names as label')->get(),
       ];
       return response()->json($data);
    }

    public function list(Request $request)
    {
        $take = (int) $request->input('pagination.rowsPerPage');
        $skip = ((int) $request->input('pagination.page') -1 ) * $take;
        $data = Product::query()->with('measure', 'category', 'providers');
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
            'list' =>  ProductResource::collection($list),
        ];
        return response()->json($result);
    }

    public function store(ProductRequest $request)
    {
        $found = Product::query()->where('code', $request->input('code'))->first();
        if ($found === null) {
            $product = Product::query()->create($request->all());;
            $product->providers()->createMany($request->input('providers'));
            if ($request->has('with_cant') && (int) $request->input('cant') > 0 ) {
               $product->inventory()->create([ 'cant' => $request->input('cant')]);
            }
            return response()->json('Datos guardados correctamente.');
        } else {
            return response()->json('Ya existe un producto con ese codigo!', 500);
        }
    }


    public function update(Request $request)
    {
        $product = Product::query()->find($request->id);
        $product->update($request->all());
        $product->providers()->delete();
        $product->providers()->createMany($request->input('providers'));
        return response()->json('Datos actualizados correctamente.');
    }


    public function destroy(Request $request)
    {
        try {
            Product::query()->where('id', $request->id)->delete();
            return response()->json('Dato eliminado correctamente.');
        } catch ( \PDOException $e ) {
           if ($e->getCode() === '23000') {
               return response()->json('El dato esta en uso, no puede ser eliminado!', 500);
           }
        }
        catch ( \Exception $e ) {
            return response()->json($e);
        }
    }
}
