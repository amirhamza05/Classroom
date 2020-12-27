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
        $course = auth()->user()->courses()->where(['id' => $request->course_id])->first();
        if (!isset($course)) {
            return abort(404, 'Course Not Found.');
        }

        if (isset(request()->load_content) && !$course->isAccept() && auth()->user()->isTeacher()) {
            //course is not accept from teacher then confirm page open
            return response(view('course.page.confirm', ['courseData' => $course]));
        }

        return $next($request);
    }
}
