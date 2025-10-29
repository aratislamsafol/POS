<?php 
namespace App\Helper;

use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTToken{
    public static function CreateToken($userEmail, $userID) {
        
        $key = env('JWT_KEY');
        $payload = [
            'iss' => 'laravel_token',
            'iat' => time(),
            'exp' =>time()+3600,
            'userEmail' => $userEmail,
            'userID' => $userID
        ];

        $encode = JWT::encode($payload, $key, 'HS256');
        return $encode;
    }

    public static function CreateTokenForSetPassword($userEmail) {
        $key = env('JWT_KEY');
        $payload = [
            'iss' => 'laravel_token',
            'iat' => time(),
            'exp' =>time()+60*15,
            'userEmail' => $userEmail,
            'userID' => '0'
        ];

        $encode = JWT::encode($payload, $key, 'HS256');
        return $encode;
    }

    public static function VerifyToken($encode):string|object {
        try{
            if($encode == null) {
                return 'unauthorized';
            } else {
                $key = env('JWT_KEY');
                $decoded = JWT::decode($encode, new Key($key, 'HS256'));
        
                return $decoded;
            }
            
        } catch(Exception $e) {
            return 'Unauthorized';
        }
       
    }


}
?>