<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use View;
use App\Models\Course;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        View::share('layout', 'no_layout');

        view()->composer('*', function ($view) {
            if (Auth::check()) {
                View::share('userType', strtolower(Auth::user()->user_type));
            }
            if (isset(request()->course_id)) {
                $courseData = Course::where('id', request()->course_id)->get()->first();
                View::share('courseData', $courseData);
            }
        });
    }
}
