<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    // Both fillable and guarded are required .Suppose a user manipulated the request body and hence the data can be filled into model though we dont want to fill some columns like role or id.Hence what we can do is specify the columns that need to be filled 
    //Fillable  => specify which field of model will be filled.

    protected $fillable=[];

    // Guarded  => specify which field of model will not  be filled.

    protected $guarded=['id'];

    protected $rules=[
        'first_name' => 'required',
        'last_name' => 'required',
        'email' => 'required | email | unique:users,email',
        'contact' => 'required|digits:10',
        'username' =>'required',
        'password' => 'required',
       
     ];

     public function validate($data)
    {
        $val = \Validator::make($data, $this->rules);
        if ($val->fails()) {
            $this->errors = $val->errors();
            return false;
        }

        return true;
    }
     public function getError(){
         return $this->errors;
     }
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    // protected $fillable = [
    //     'name', 'email', 'password',
    // ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    // protected $hidden = [
    //     'password', 'remember_token',
    // ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    // protected $casts = [
    //     'email_verified_at' => 'datetime',
    // ];
}
