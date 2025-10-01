<?php

namespace App\Providers;

use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::before(function ($user, $ability) {
            // if ($user->hasRole('Super Admin')) {
            //     return true;
            // }
            // if (!$user->is_active) {
            //     return Response::deny('Your account is disabled. Please contact the administrator.');
            // }

            return null;
        });
    }
}
