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
        User::create(
            [
                'login_id'  => 'admin',
                'user_type' => 'Admin',
                'full_name' => 'Admin',
                'nick_name' => 'Admin',
                'password'  => bcrypt('admin'),
                'phone'     => '01234567891',
                'email'     => 'admin@' . config('app.name') . ".com",
            ]
        );
        User::create(
            [
                'login_id'  => 'teacher',
                'user_type' => 'Teacher',
                'full_name' => 'Teacher',
                'nick_name' => 'Teacher',
                'password'  => bcrypt('teacher'),
                'phone'     => '01234567891',
                'email'     => 'teacher@' . config('app.name') . ".com",
            ]
        );
        User::create(
            [
                'login_id'  => 'student',
                'user_type' => 'Student',
                'full_name' => 'Student',
                'nick_name' => 'Student',
                'password'  => bcrypt('student'),
                'phone'     => '01234567891',
                'email'     => 'student@' . config('app.name') . ".com",
            ]
        );
    }
}
