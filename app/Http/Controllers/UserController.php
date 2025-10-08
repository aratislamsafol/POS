<?php
namespace App\Http\Controllers;

use App\Helper\JWTToken;
use App\Mail\OTPMail;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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

    public function UserLogin(Request $request)
    {
        $count = User::where('email', '=', $request->input('email'))
            ->where('password', '=', $request->input('password'))
            ->count();

        if ($count == 1) {
            $token = JWTToken::CreateToken($request->input('email'));
            return response()->json([
                'status'  => 'success',
                'message' => 'User Login Successful',
                'token'   => $token,
            ]);

        } else {
            return response()->json([
                'status'  => 'failed',
                'message' => 'unauthorized',
            ]);
        }
    }

    public function SendOTPCode(Request $request)
    {
        $email = $request->input();

        $otp   = rand(1000, 9999);
        $count = User::where('email', '=', $email)->count();

        if ($count == 1) {
            // Otp send to Email Address, OTP CODE Table Insert
            Mail::to($email)->send(new OTPMail($otp));
            User::where('email', $email)
                ->update(['otp' => $otp]);

            return response()->json([
                'status'  => 'success',
                'message' => '4 Digit Code Send',
            ]);
        } else {
            return response()->json([
                'status'  => 'failed',
                'message' => 'unauthraized',
            ]);
        }
    }

    public function VerifyOTP(Request $request)
    {
        $email = $request->input('email');
        $otp   = $request->input('otp');
        $count = User::where('email', '=', $email)
            ->where('otp', '=', $otp)->count();

        if ($count == 1) {
            // Database otp
            User::where('email', '=', $email)->update(['otp' => 0]);
            $token = JWTToken::CreateToken($request->input('email'));
            return response()->json([
                'status'  => 'success',
                'message' => 'OTP Verification Successful',
                'token'   => $token,
            ]);

        } else {
            return response()->json([
                'status'  => 'failed',
                'message' => 'unauthraized',
            ]);
        }
    }

    public function ResetPassword(Request $request)
    {
        try {
            $userEmail = $request->header('email');
           
            User::where('email', '=', $userEmail)->update(['password'=> $request->input('password')]);
            return response()->json([
                'status'  => 'success',
                'message' => 'Request Successful',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status'  => 'failed',
                'message' => 'unauthraized',
            ], 401);
        }

    }
}
