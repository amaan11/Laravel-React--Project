<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|

 */
Route::group(['middleware' => 'auth'], function () {
    Route::get('/', 'LoginController@index');

    Route::get('login', 'LoginController@index');
    Route::post('login', 'LoginController@login');
    Route::get('signup', 'LoginController@index');
    Route::post('signup', 'LoginController@signup');
    Route::post('social-login', 'LoginController@socialLogin');
    // Route::post('googleLogin', 'SocialLoginController@googleLogin');
    // Route::post('facebookLogin', 'SocialLoginController@facebookLogin');
    Route::post('login/forgetPassword', 'LoginController@find');
    Route::get('login/forgetPassword', ['as' => 'login/forgetPassword', function () {
        return view('welcome');
    }]);

    Route::put('login/resetPassword', 'LoginController@reset');
    Route::resource('flight', 'FlightController');
    // Route::resource('flight/Flight/', 'FlightController');
    Route::resource('flight/details', 'SignupController');
    Route::get('get-city', 'CityController@getCity');
    // Route::post('apply-filter', 'FlightController@store');
    Route::post('sort-flight', 'FlightController@store');
});

// Auth::routes();
