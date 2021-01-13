<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Layout\LayoutController as Layout;
use App\Http\Requests\Course\ScheduleCreate;
use App\Models\Course;
use App\Models\Schedule;
use App\Models\ScheduleConversation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\File;
use PDF;

class ScheduleController extends Controller
{
    public function scheduleList()
    {
        return Layout::view("course.schedule.schedule_list");
    }
    public function viewCreateSchedule()
    {
        return view("course.schedule.create_schedule");
    }

    public function createSchedule(ScheduleCreate $request)
    {
       // dd($request->all());
        Schedule::create(request()->all());
        return response()->json([
            'error' => 0,
            'msg'   => "Successfully Added Schedule",
        ]);
    }

    public function viewSchedule()
    {
        $scheduleData = Course::find(request()->course_id)->schedules()->where(['id' => request()->schedule_id])->firstOrFail();

        return Layout::view("course.schedule.dashboard", ['scheduleData' => $scheduleData]);
    }
    public function viewUpdateSchedule()
    {
        $schedule = Schedule::where(['id' => request()->schedule_id])->firstOrFail();
        return view("course.schedule.update_schedule", ['schedule' => $schedule]);
    }
    public function updateSchedule(ScheduleCreate $request)
    {
        Schedule::find(request()->schedule_id)->update(request()->all());
        return response()->json([
            'error' => 0,
            'msg'   => "Successfully Updated Schedule",
        ]);
    }
    public function deleteSchedule(){
        Schedule::find(request()->schedule_id)->delete();
        return response()->json([
            'error' => 0,
            'msg'   => "Successfully Updated Schedule",
        ]);
    }

    public function sendConversation(){
        ScheduleConversation::create(request()->all());
        return response()->json([
            'error' => 0,
            'msg'   => "Successfully Send Conversation",
        ]);
    }

    public function viewConversations(){
        $scheduleData = Course::find(request()->course_id)->schedules()->where(['id' => request()->schedule_id])->firstOrFail();

        return view("course.schedule.conversation", ['scheduleData' => $scheduleData]);
    }

    public function saveBoard(){
        $scheduleData = Course::find(request()->course_id)->schedules()->where(['id' => request()->schedule_id])->firstOrFail();
        
        $realTimeHash = Str::random(20);
        $scheduleData->update(['board_real_time_hash' => $realTimeHash]);
        
        $img = str_replace('data:image/png;base64,', '', request()->board);
        $img = str_replace(' ', '+', $img);

        $fileData = base64_decode($img);
        
        File::put($scheduleData->board,$fileData);
        
        return response()->json([
            'last_update'     => File::lastModified($scheduleData->board),
            'real_time_hash' => $realTimeHash
        ]);
    }
    public function getBoard(){
        $schedule = Schedule::where(['id' => request()->schedule_id])->firstOrFail();
        return response()->json([
            'last_update'     => File::lastModified($schedule->board),
            'real_time_hash' => $schedule->board_real_time_hash,
            'image' => (isset(request()->image))?$schedule->getBoard():"",
        ]);
    }
    public function viewWhiteBoard(){
         $scheduleData = Course::find(request()->course_id)->schedules()->where(['id' => request()->schedule_id])->firstOrFail();
        return view("course.schedule.whiteboard_test", ['scheduleData' => $scheduleData]);
    }

    public function downloadBoard(){
        $scheduleData = Course::find(request()->course_id)->schedules()->where(['id' => request()->schedule_id])->firstOrFail();
        //return view("course.schedule.whiteboard_download", ['scheduleData' => $scheduleData]);
        $pdf = PDF::loadView('course.schedule.whiteboard_download', ['scheduleData' => $scheduleData]);  
        $customPaper = array(0,0,325.53,595.28);
        $pdf->setPaper($customPaper, 'landscape');
        $pdf->getDomPDF()->set_option("enable_php", true);
        return $pdf->stream('medium.pdf');
    }
}
