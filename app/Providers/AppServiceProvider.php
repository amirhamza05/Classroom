<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use View;
use App\Http\Controllers\Layout\LayoutController as Layout;

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
    }
}
