<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = ['firstName', 'lastName', 'email', 'mobile', 'password', 'otp', 'otp_expires_at'];
    protected $attributes = [
        'otp' => '0',
    ];
}
