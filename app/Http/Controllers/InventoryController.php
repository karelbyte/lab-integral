<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function list(Request $request)
    {
        $take = (int) $request->input('pagination.rowsPerPage');
        $skip = ((int) $request->input('pagination.page') -1 ) * $take;
        $data = Inventory::query()->leftJoin('products', 'products.id', 'inventories.product_id')
            ->leftJoin('measures', 'products.measure_id', 'measures.id')
            ->leftJoin('categories', 'products.category_id', 'categories.id');
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
        $total = $data->select(
            'inventories.product_id', 'inventories.cant',
            'products.names', 'products.code', 'products.sale_price', 'products.measure_id', 'products.category_id',
            'measures.description as measure',
            'categories.description as category'
        )->count();
        $list = $data->skip($skip)->take($take)->get();
        $result = [
            'total' => $total,
            'list' => $list,
        ];
        return response()->json($result);
    }
}
