<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServicesResource;
use App\Models\Analyses;
use App\Models\Client;
use App\Models\Doctor;
use App\Models\Service;
use App\Models\ServiceDetails;
use Carbon\Carbon;
use http\Env\Response;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function resources() {
        $data = [
            'clients' => Client::query()->select('id', 'names')->get(),
            'analysis' => Analyses::query()->select('id', 'code', 'description', 'content', 'price')->get(),
            'doctors' => Doctor::query()->select('id', 'names')->get()
        ];
        return response()->json($data);
    }

    function getAge ($age) {
        $cumpleanos = Carbon::parse($age);
        $hoy = Carbon::now();
        $annos = $hoy->diffInYears($cumpleanos);
        return $annos;
    }
    public function getContent($id) {
        $cont = ServiceDetails::query()->find($id);
        $service = Service::query()->find($cont->service_id);
        $doctor = (Doctor::query()->find($service->doctor_id))->names;
        $moment = $service->moment;
        $code = $service->barcode;
        $client = Client::query()->find($service->client_id);
        $name = $client->names;
        $age = $this->getAge($client->birthday);
        $content = '';
        if ($cont->head !== 1) {

            $header = "<br><br><br><br><span>MEDICO: <b>$doctor</b></span><br>"
                . "<span>FECHA: <b>$moment</b></b></span><br>"
                . "<span>PACIENTE: <b>$name</b></span><br>"
                . "<span>CLAVE: <b>$code</b></span><br>"
                . "<span>EDAD: <b>$age</b></span><br>";
            $content = $header . $cont->content;
        } else {
            $content = $cont->content;
        }

        return response()->json($content);
    }

    public function setStatus(Request $request) {
        Service::query()->where('id', $request->id)->update([
            'status_id' => 2
        ]);
        return response()->json('Se cambio el estado del servicio a entregado!');
    }

    public function storeContent(Request $request) {
        ServiceDetails::query()->where('id', $request->input('id'))->update([
            'content' => $request->input('content'),
            'head' => 1
        ]);
        return response()->json('Datos actulizados con exito!');
    }

    public function list(Request $request)
    {
        $take = (int) $request->input('pagination.rowsPerPage');
        $skip = ((int) $request->input('pagination.page') -1 ) * $take;
        $data = Service::query()->with('analysis');
        $sortBy = $request->input('pagination.sortBy');
        if ($sortBy !== null && $sortBy !== '') {
            $sort = (bool) $request->input('pagination.descending') ? 'desc' : 'asc';
            $data->orderby($sortBy, $sort);
        }
        $value = $request->input('filter.val');
        if ($value !== null && $value !== '') {
            $tableJoin = $request->input('filter.field.join');
            if ($tableJoin !== null)  {
                $data = $data->leftJoin($tableJoin, $tableJoin . '.id', 'services.'. substr($tableJoin, 0, -1). '_id' );
            }
            $field = $request->input('filter.field.value');
            $data = $request->input('filter.field.type') === 'text' ?
            $data->where($field,  'LIKE', '%'. $value .'%') :
            $data->where($field, $value);
        }

        $total = $data->select('services.*')->count();
        $list = $data->skip($skip)->take($take)->get();
        $result = [
            'total' => $total,
            'list' =>  ServicesResource::collection($list),
        ];
        return response()->json($result);
    }

    public function store(Request $request)
    {
        $service = Service::query()->create($request->all());
        $details = $request->input('analysis');
        $priceTotal = 0;
        foreach ($details as $det) {
            $content = Analyses::query()->find($det['analysis_id']);
            $service->analysis()->create([
                'analysis_id' => $det['analysis_id'],
                'content' => $content->content,
                'description' => $det['description'],
            ]);
            $priceTotal +=  $det['price'];
        }
        $service->price =  $priceTotal - $request->input('discount');
        $service->save();
        return response()->json('Datos guardados correctamente.');
    }

    public function update(Request $request)
    {
        $service = Service::query()->find($request->id);
        $service->update(
            $request->all()
        );
        $service->analysis()->delete();
        $details = $request->input('analysis');
        $priceTotal = 0;
        foreach ($details as $det) {
            $content = Analyses::query()->find($det['analysis_id']);
            $service->analysis()->create([
                'analysis_id' => $det['analysis_id'],
                'content' => $content->content,
                'description' => $det['description'],
            ]);
            $priceTotal +=  $det['price'];
        }
        $service->price =  $priceTotal - $request->input('discount');
        $service->save();
        return response()->json('Datos actualizados correctamente.');
    }

    public function destroy(Request $request)
    {
        Service::query()->where('id', $request->id)->delete();
        return response()->json('Dato eliminado correctamente.');
    }
}
