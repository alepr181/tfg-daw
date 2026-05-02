<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable([
    'name',
    'email',
    'password',
    'role',
    'account_status',
    'two_factor_code',
    'two_factor_expires_at',
])]
#[Hidden([
    'password',
    'remember_token'
])]
class User extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;


    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
