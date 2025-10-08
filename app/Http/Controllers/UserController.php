<?php
namespace App\Http\Controllers;

use App\Helper\JWTToken;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function UserRegistration(Request $request)
    {
        try {
            User::create($request->input());

            return response()->json([
                'status'  => 'success',
                'message' => 'user registration successfully',
            ]);

        } catch (Exception $e) {
            return response()->json([
                'status'  => 'failed',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    function UserLogin (Request $request) {
        $count = User::where('email','=', $request->input('email'))
            ->where('password', '=', $request->input('password'))
            ->count();
        
        if($count == 1) {
            $token = JWTToken::CreateToken($request->input('email'));
            return response()->json([
                'status'=> 'success',
                'message'=>'User Login Successful',
                'token' => $token
            ]);

        } else{
            return response()->json([
                'status'=> 'failed',
                'message'=>'unauthorized'
            ]);
        }
    }
}
