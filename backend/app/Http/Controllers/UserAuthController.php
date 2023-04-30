<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserAuthController extends Controller
{
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 422);
        }

        $authAttempt = Auth::attempt([
            'email'=> $request->email,
            'password'=>$request->password
        ]);

        if(!$authAttempt){
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $user  = $request->user();
        $token = $request->user()
                ->createToken('user_auth_token')
                ->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);

    }

    public function logout(Request $request){
        $user = $request->user();
        $request->user()->tokens()->delete();
        $response = [
            'user' => $user,
            'message' => 'Logged Out'
        ];

        return response()->json($response, 200);
    }

}
