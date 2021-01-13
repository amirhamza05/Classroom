<?php

namespace App\Models;
use Illuminate\Foundation\Auth\UpdateDetail as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
class UpdateDetail extends Model
{
    protected $fillable = [
        'full_name', 'nick_name', 'email', 'phone',
    ];
   
}
