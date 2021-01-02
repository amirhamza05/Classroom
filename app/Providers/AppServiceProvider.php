<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use View;
use App\Http\Controllers\Layout\LayoutController as Layout;

use App\Models\User;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        
       
            view()->composer('*', function($view)
         {
          if (Auth::check()) {
       
           View::share('userType', strtolower(Auth::user()->user_type));
          }
        });
           
    }
}
