<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NotificationQueue extends Model
{
    public $timestamps = true;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'type','to','from_name', 'subject', 'body'
    ];
}
