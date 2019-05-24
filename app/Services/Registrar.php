<?php namespace App\Services;

use App\User;
use Illuminate\Contracts\Auth\Registrar as RegistrarContract;
use Mail;
use Validator;

class Registrar implements RegistrarContract
{

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    public function create(array $data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => \Hash::make($data['password']),
            //generates a random string that is 20 characters long
            'verification_code' => str_random(20),
        ]);

//do your role stuffs here

        //send verification mail to user
        //---------------------------------------------------------
        $data['verification_code'] = $user->verification_code;

        Mail::send('emails.welcome', $data, function ($message) use ($data) {
            $message->from('no-reply@site.com', "Site name");
            $message->subject("Welcome to site name");
            $message->to($data['email']);
        });

        return $user;
    }

}
