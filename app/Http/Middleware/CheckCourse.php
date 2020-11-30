<?php

namespace App\Http\Middleware;

use Closure;
use App\Course;

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
        $courseId = $request->courseId;
        $courseData = Course::find($courseId);
        if(!isset($courseData)){
            return abort(404, 'Course Not Found.');
        }
        return $next($request);
    }
}
