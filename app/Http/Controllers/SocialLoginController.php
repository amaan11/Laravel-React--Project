<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SocialLoginController extends Controller
{

    public function socialLogin(Request $request)
    {

        $existing_user = SocialLogin::where('provider_id', $request->provider_id)->first();

        if ($existing_user) {
            return response()->json('login Successful');
        } else {
            $data = $request->all();

            $user = new SocialLogin();

            $user->name = $data['name'];
            $user->email = $data['email'];
            $user->provider_id = $data['id'];
            $user->provider_name = $data['provider'];
            $user->access_token = $data['access_token'];

            if ($user->save()) {
                return response()->json('login Successful');
            } else {
                return response()->json('login Failed');

            }
        }

    }
    // public function googleLogin(Request $request)
    // {

    //     $id = $request->googleId;
    //     $google_user = GoogleUser::where('google_id', $id)->get();

    //     if (count($google_user) != 0) {

    //         return response()->json("login Successful");
    //     } else {

    //         $data = $request->all();

    //         $user = new GoogleUser();

    //         $user->name = $data['name'];
    //         $user->email = $data['email'];
    //         $user->google_id = $data['googleId'];
    //         $user->access_token = $data['access_token'];

    //         if ($user->save()) {
    //             return response()->json('login Successful');
    //         } else {
    //             return response()->json('login Failed');

    //         }
    //     }
    // }

    // public function facebookLogin(Request $request)
    // {
    //     $facebook_user = FacebookUser::where('facebook_id', $request->facebookId)->get();

    //     if (count($facebook_user) != 0) {
    //         return response()->json('login Successful');
    //     } else {
    //         $data = $request->all();

    //         $user = new FacebookUser();

    //         $user->name = $data['name'];
    //         $user->email = $data['email'];
    //         $user->facebook_id = $data['facebookId'];
    //         $user->access_token = $data['access_token'];

    //         if ($user->save()) {
    //             return response()->json('login Successful');
    //         } else {
    //             return response()->json('login Failed');

    //         }
    //     }

    // }
}
