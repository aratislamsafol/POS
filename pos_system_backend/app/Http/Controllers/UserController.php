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
        $user = User::where('email', '=', $request->input('email'))
            ->where('password', '=', $request->input('password'))
            ->first();
            // return response()->json(['user'=> $user]);
        if ($user) {
            $token = JWTToken::CreateToken($user->email, $user->id);

            return response()->json([
                'status'  => 'success',
                'message' => 'User Login Successful',
                'token'   => $token,
            ])->cookie('token', $token, 60 * 24, '/', null, true, true);

        } else {
            return response()->json([
                'status'  => 'failed',
                'message' => 'unauthorized',
            ]);
        }
    }

    public function SendOTPCode(Request $request)
    {
        $email = $request->input('email');
        $otp   = rand(100000, 999999);
        $count = User::where('email', '=', $email)->count();

        if ($count == 1) {
            // OTP Email Address
            Mail::to($email)->send(new OTPMail($otp));
            // OTO Code Table Update
            User::where('email', '=', $email)->update(['otp' => $otp]);

            return response()->json([
                'status'  => 'success',
                'email'   => $email,
                'message' => '6 Digit OTP Code has been send to your email !',
            ], 200);
        } else {
            return response()->json([
                'status'  => 'failed',
                'message' => 'unauthorized',
            ]);
        }
    }

    public function VerifyOTP(Request $request)
    {
        $email = $request->input('email');
        $otp   = $request->input('otp');
        $user = User::where('email', '=', $email)
            ->where('otp', '=', $otp)->first();

        if ($user) {
            // Database otp
            User::where('email', '=', $email)->update(['otp' => 0]);
            $token = JWTToken::CreateToken($request->input('email'), $user->id );
            // $secure = app()->environment('production');
            return response()->json([
                'status'  => 'success',
                'message' => 'OTP Verification Successful',
                'token'   => $token,
            ])->cookie('reset_token', $token, 15, '/', null, true, true);

        } else {
            return response()->json([
                'status'  => 'failed',
                'message' => 'unauthraized',
            ], 401);
        }
    }

    public function ResetPassword(Request $request)
    {
        try {
            $userEmail = $request->header('email');

            User::where('email', '=', $userEmail)->update(['password' => $request->input('newPassword')]);
            return response()->json([
                'status'  => 'success',
                'message' => 'Request Successful',
            ], 200)->withoutCookie('reset_token');
        } catch (Exception $e) {
            return response()->json([
                'status'  => 'failed',
                'message' => 'unauthraized',
            ], 401);
        }

    }

    public function UserLogout()
    {
        return response()->json([
            'status'  => 'success',
            'message' => 'Logout successful',
        ])->cookie('token', '', -1, '/', null, true, true);
    }

    public function UserProfile() {

    }

    public function UpdateProfile() {
            
    }

}
