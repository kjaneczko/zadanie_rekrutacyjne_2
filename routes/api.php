<?php

use Illuminate\Http\Request;

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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');

    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::group([
            'prefix' => 'user'
        ], function() {
            Route::get('list', 'UserController@index');
            Route::post('create', 'UserController@create');
            Route::get('show/{user}', 'UserController@show');
            Route::get('edit/{user}', 'UserController@edit');
            Route::get('update/{user}', 'UserController@update');
            Route::get('delete/{user}', 'UserController@delete');
        });
    });
});
