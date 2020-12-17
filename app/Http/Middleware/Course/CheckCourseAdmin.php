<?php

namespace App\Http\Middleware\Course;

use Closure;

class CheckCourseAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $course = auth()->user()->courses()->where(['id' => $request->course_id])->first();
        if (!$course->isAdmin()) {
            return abort(401, 'You can not access this area.');
        }
        return $next($request);
    }
}
