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

Route::get('/', function () {
    return view('welcome');
});
Route::get('login', 'LoginController@index');
Route::post('login', 'LoginController@login');
Route::resource('signup', 'SignupController');
Route::resource('home', 'SignupController');
Route::post('googleLogin', 'SocialLoginController@googleLogin');
Route::post('facebookLogin', 'SocialLoginController@facebookLogin');
Route::post('login/forgetPassword', 'LoginController@find');
Route::get('login/forgetPassword', ['as' => 'login/forgetPassword', function () {
    return view('welcome');
}]);

Route::put('login/resetPassword', 'LoginController@reset');
Route::resource('Flight', 'FlightController');
Route::resource('flight/Flight/', 'FlightController');
Route::resource('flight/details', 'SignupController');

// Auth::routes();
