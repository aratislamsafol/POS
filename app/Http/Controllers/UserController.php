<?php
namespace App\Http\Controllers;

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
}
