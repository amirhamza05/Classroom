<?php

use App\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'login_id'  => 'admin',
            'user_type' => 'Admin',
            'full_name' => 'Admin',
            'nick_name' => 'Admin',
            'password'  => bcrypt('admin'),
            'phone'     => '01234567891',
            'email'     => 'admin@' . config('app.name') . ".com",
        ]);
    }
}
