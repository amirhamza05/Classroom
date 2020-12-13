<?php

namespace App\Http\Middleware;

use Closure;

class CheckCourse
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
        $courseData = auth()->user()->courses()->where(['id' => $request->course_id])->first();
        if (!isset($courseData)) {
            return abort(404, 'Course Not Found.');
        }
        return $next($request);
    }
}
