<?php

use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('inventories')->group(function () {
    Route::post('list', 'InventoryController@list');
});

Route::prefix('services')->group(function () {
    Route::post('list', 'ServiceController@list');
    Route::get('resources', 'ServiceController@resources');
    Route::post('post', 'ServiceController@store');
    Route::post('update', 'ServiceController@update');
    Route::post('eraser', 'ServiceController@destroy');
    Route::get('get-content/{id}', 'ServiceController@getcontent');
    Route::post('store-content', 'ServiceController@storeContent');
    Route::post('set-status', 'ServiceController@setStatus');
});


Route::prefix('clients')->group(function () {
    Route::post('list', 'ClientController@list');
    Route::get('resources', 'ClientController@resources');
    Route::post('post', 'ClientController@store');
    Route::post('update', 'ClientController@update');
    Route::post('eraser', 'ClientController@destroy');
});

Route::prefix('doctors')->group(function () {
    Route::post('list', 'DoctorsController@list');
    Route::get('resources', 'DoctorsController@resources');
    Route::post('post', 'DoctorsController@store');
    Route::post('update', 'DoctorsController@update');
    Route::post('eraser', 'DoctorsController@destroy');
});


Route::prefix('analysis')->group(function () {
    Route::post('list', 'AnalysisController@list');
    Route::get('resources', 'AnalysisController@resources');
    Route::post('post', 'AnalysisController@store');
    Route::post('update', 'AnalysisController@update');
    Route::post('eraser', 'AnalysisController@destroy');
});


Route::prefix('receptions')->group(function () {
    Route::post('list', 'ReceptionController@list');
    Route::get('resources', 'ReceptionController@resources');
    Route::post('post', 'ReceptionController@store');
    Route::post('update', 'ReceptionController@update');
    Route::post('eraser', 'ReceptionController@destroy');
    Route::post('apply', 'ReceptionController@apply');
});

Route::prefix('products')->group(function () {
    Route::post('list', 'ProductController@list');
    Route::get('resources', 'ProductController@resources');
    Route::post('post', 'ProductController@store');
    Route::post('update', 'ProductController@update');
    Route::post('eraser', 'ProductController@destroy');
});


Route::prefix('measures')->group(function () {
    Route::post('list', 'MeasureController@list');
    Route::post('post', 'MeasureController@store');
    Route::post('update', 'MeasureController@update');
    Route::post('eraser', 'MeasureController@destroy');
});


Route::prefix('categories')->group(function () {
    Route::post('list', 'CategoryController@list');
    Route::post('post', 'CategoryController@store');
    Route::post('update', 'CategoryController@update');
    Route::post('eraser', 'CategoryController@destroy');
});


Route::prefix('providers')->group(function () {
    Route::post('list', 'ProviderController@list');
    Route::post('post', 'ProviderController@store');
    Route::post('update', 'ProviderController@update');
    Route::post('eraser', 'ProviderController@destroy');
});
