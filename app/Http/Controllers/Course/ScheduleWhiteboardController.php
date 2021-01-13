<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\ScheduleWhiteboard;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use PDF;

class ScheduleWhiteboardController extends Controller
{
    public function addPage()
    {
        $board = ScheduleWhiteboard::create();
        return response()->json([
            'board_hash' => $board->board_hash,
        ]);
    }

    public function getBoard()
    {
        $whiteBoard = ScheduleWhiteboard::where(['board_hash' => request()->board_hash])->firstOrFail();
        return response()->json([
            'last_update'      => File::lastModified($whiteBoard->board),
            'last_update_hash' => $whiteBoard->last_update_hash,
            'image'            => (isset(request()->image)) ? $whiteBoard->getBoard() : "",
        ]);
    }

    public function saveBoard()
    {
        $whiteBoard = ScheduleWhiteboard::where(['board_hash' => request()->board_hash])->firstOrFail();

        $lastUpdateHash = Str::random(20);
        $whiteBoard->update(['last_update_hash' => $lastUpdateHash]);

        $img = str_replace('data:image/png;base64,', '', request()->board);
        $img = str_replace(' ', '+', $img);

        $fileData = base64_decode($img);

        File::put($whiteBoard->board, $fileData);

        return response()->json([
            'last_update'      => File::lastModified($whiteBoard->board),
            'last_update_hash' => $lastUpdateHash,
        ]);
    }
    public function viewWhiteboard()
    {

        $scheduleData = Course::find(request()->course_id)->schedules()->where(['id' => request()->schedule_id])->firstOrFail();

        if (!isset(request()->board)) {
            $totalBoard      = $scheduleData->whiteboards()->count();
            $board           = $totalBoard == 0 ? ScheduleWhiteboard::create() : $scheduleData->whiteboards()->first();
            $board           = $board->board_hash;
            request()->board = $board;
        }

        $whiteboardData = $scheduleData->whiteboards()->where(['board_hash' => request()->board])->firstOrFail();

        return view("course.schedule.whiteboard_test", [
            'scheduleData'   => $scheduleData,
            'whiteboardData' => $whiteboardData,
        ]);
        //$scheduleData = Course::find(request()->course_id)->schedules()->where(['id' => request()->schedule_id])->firstOrFail();
        //return view("course.schedule.whiteboard_test", ['scheduleData' => $scheduleData]);
    }

    public function downloadBoard()
    {

        $scheduleData = Course::find(request()->course_id)->schedules()->where(['id' => request()->schedule_id])->firstOrFail();

        //return view("course.schedule.whiteboard_download", ['scheduleData' => $scheduleData]);
        $pdf = PDF::loadView('course.schedule.whiteboard_download', [
            'scheduleData' => $scheduleData,
        ]);

        $customPaper = array(0, 0, 325.53, 595.28);
        $pdf->setPaper($customPaper, 'landscape');
        $pdf->getDomPDF()->set_option("enable_php", true);
        return $pdf->stream('medium.pdf');
    }
}
