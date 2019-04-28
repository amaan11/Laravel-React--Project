<?php

namespace App\Http\Controllers;

use App\NewUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    public function index()
    {
    }

    public function login(Request $request)
    {

        $input = $request->all();

        $user = NewUser::where('username', $input['username'])->where('password', $input['password'])->get();

        $response['status'] = false;
        $response['data'] = '';

        if (!empty($user->toArray())) {
            $response['status'] = true;
            $response['data'] = $user;

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
}
