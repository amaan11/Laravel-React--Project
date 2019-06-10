<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Redirect;
use Validator;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('welcome');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function signup(Request $request)
    {
        $data = $request->all();

        //Check For validation

        $rules = array(
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'username' => 'required',
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        $existingUser = User::where('email', $data['email'])->first();
        if ($existingUser) {
            return Redirect::back()->withErrors(['Account with email "' . $data['email'] . '" already exist'])->withInput();

        }

        if (!empty($data)) {
            $user = new User();
            $user->first_name = $data['firstname'];
            $user->last_name = $data['lastname'];
            $user->email = $data['email'];
            $user->username = $data['username'];
            $user->contact = $data['contact'];
            $user->password = Hash::make($data['password']);

            if ($user->save()) {
                // Mail::to($data['email'])->send(new WelcomeMail());

                return response()->json('Saved successfully');
            } else {
                return response()->json('Something went wrong!');
            }

        }
    }

    public function login(Request $request)
    {

        $input = $request->all();

        $rules = array(
            'email' => 'required|email',
            'password' => 'required',
        );

        $validator = Validator::make($input, $rules);

        if ($validator->fails()) {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        $response['status'] = false;
        $response['data'] = '';

        // $validPassword = password_verify($input['password'], );

        $login_user = User::where('email', $input['email'])->first();
        if ($login_user) {
            $validPassword = password_verify($input['password'], $login_user->password);

        }

        if ($validPassword) {
            $response['status'] = true;
            $response['data'] = $login_user;

        }
        return $response;

    }

    public function socialLogin(Request $request)
    {
        $data = $request->all();

        if (empty($data)) {
            return Redirect::back()->with('Missing Inputs');
        }

        $existingUser = User::where('provider_name', $data['providerName'])->where('provider_id', $data['providerId'])->first();

        if ($existingUser) {
            return response()->json('login Successful');
        } else {

            $socialUser = new User();

            $name = explode(" ", $data['name']);

            $socialUser->first_name = $name[0] ? strToLower($name[0]) : '';
            $socialUser->last_name = $name[1] ? strToLower($name[1]) : '';
            $socialUser->email = $data['email'];
            $socialUser->provider_id = $data['providerId'];
            $socialUser->provider_name = $data['providerName'];
            // $social_user->password = str_random(10);
            $socialUser->access_token = $data['access_token'];

            if ($socialUser->save()) {
                return response()->json('login Successful');
            } else {
                return response()->json('login Failed');

            }
        }
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
