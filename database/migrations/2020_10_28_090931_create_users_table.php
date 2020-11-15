<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('login_id')->unique();
            $table->enum('user_type', ['Admin', 'Student','Teacher']);
            $table->string('full_name',100);
            $table->string('nick_name',100);
            $table->string('password',100);
            $table->string('phone');
            $table->string('email');
            $table->boolean('phone_verified')->default(0);
            $table->boolean('email_verified')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
