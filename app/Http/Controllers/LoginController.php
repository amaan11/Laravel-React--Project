<?php

namespace App\Http\Controllers;

use App\NewUser;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    public function index()
    {
        return view('welcome');
    }

    public function login(Request $request)
    {

        $input = $request->all();

        $login_user = NewUser::where('username', $input['username'])->where('password', $input['password'])->get();

        $response['status'] = false;
        $response['data'] = '';

        if (!empty($login_user->toArray())) {

            $user = new User();
            $user->username = $input['username'];
            $user->password = $input['password'];
            if ($user->save()) {
                $response['status'] = false;
                $response['data'] = '';

            }

            $response['status'] = true;
            $response['data'] = $login_user;

        } else {
            $response['data'] = $input;
        }
        return $response;

    }

    public function find(Request $request)
    {

        $input = $request->all();
        $userInput = implode("", $input);
        // echo"$userInput";
        // die;
        $existingUser = DB::table('new_user')->where('username', $userInput)->orWhere('email', $userInput)->get();

        return response()->json($existingUser);

    }

    public function reset(Request $request)
    {

        $userInput = $request->input;

        $existingUser = Newuser::where('email', $userInput)->orWhere('username', $userInput)->first();
        $existingUser->password = $request->password;

        if ($existingUser->save()) {
            return response()->json('Updated password successfully');
        } else {
            return response()->json('Update unsucessful..Please Try again!');

        }
    }
    public function logout()
    {

    }
}
