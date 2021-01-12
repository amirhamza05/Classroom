@extends($layout)
@section('title', 'Schedule List')


<script type="text/javascript">
  function currTimeSecond(){
    return new Date().getTime() / 1000 | 0;
  }
  var timerList = [];
  var startTime = currTimeSecond();

</script>

  <style type="text/css">

    .course .body{
      padding: 10px;
    }
    .body-header{
      padding: 7px 10px 7px 10px;
      background-color: #ffffff;
      border: 1px solid #eeeeee;
      margin-bottom: 10px;
    }
    .body-header .title{
      font-size: 17px;
      font-weight: bold;
      margin-top: 5px;
    }
    .body .box{
      padding: 7px 10px 7px 10px;
      background-color: #ffffff;
      border: 1px solid #eeeeee;
      margin-bottom: 10px;
    }
    table{
      width: 100%;
      background-color: #ffffff;
    }
    td{
      padding: 5px;
      border: 1px solid #eeeeee;
      text-align: center;
    }
    th{
      font-weight: bold;
      font-size: 14px;
      padding: 5px;
      border: 1px solid #eeeeee;
      text-align: center;
    }
    .listImg{
      height: 50px;
      width: 50px;
      border-radius: 100%;
    }
  </style>

  <div class="course">
    @include("course.header")
    <div class="body">



    <div class="row">
      <div class="col-md-12">
        <div class="body-header">
          <div class="row">

          <div class="pull-left title">Schedule Class List</div>
          <div class="pull-right">
            @if($courseData->isAdmin())
            <button class="btn-success" onclick="loadCreateSchedule()">Create Schedule</button>
            @endif
          </div>

          </div>
        </div>
        <div class="box">


          <table class="table">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Class Information</th>
                <th>Live Class</th>
                <th>Timer</th>
                <th>Length</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Content</th>
                @if($courseData->isAdmin())
                <th>Action</th>
              @endif

              </tr>
            </thead>
            <tbody>
            <?php $schedules = $courseData->schedules()->orderBy('id', 'DESC')->get();?>
            @foreach ($schedules as $key => $schedule)
              <tr>
                <td style="padding-top: 20px">{{$schedule->id}}</td>
                <td style="padding-top: 20px">
                  {{$schedule->name}}
                </td>
                <td style="padding-top: 20px">
                  @if($schedule->isRunning())
                    <label class="label label-success"><i class="fas fa-dot-circle"></i> Class Going On</label>
                  @endif
                  @if($schedule->isNotStart())
                    <label class="label label-primary"><i class="fa fa-clock-o" aria-hidden="true"></i> Class is Not Start</label>
                  @endif
                  @if($schedule->isEnd())
                    <label class="label label-danger"><i class="fa fa-minus-circle" aria-hidden="true"></i> Class is End</label>
                  @endif
                </td>
                <td style="padding-top: 10px;width: 10%;">
                  @if($schedule->isRunning())
                    <span id="timer_{{$schedule->id}}"></span><br/> Remaining
                  @endif
                  @if($schedule->isNotStart())
                     <span id="timer_{{$schedule->id}}"></span> <br/>Before
                  @endif
                  @if($schedule->isEnd())
                    -
                  @endif
                  <script type="text/javascript">
                      timerList[{{$schedule->id}}] = {{$schedule->getTimer()}};
                  </script>
                </td>
                <td style="padding-top: 10px">
                  {{$schedule->getLength()}}
                </td>
                <td style="padding-top: 20px">{{$schedule->start_time->format('d M Y H:i a')}}</td>
                <td style="padding-top: 20px">{{$schedule->end_time->format('d M Y H:i a')}}</td>
                <td style="padding-top: 20px"><a href="{{url($userType.'/courses/'.$courseData->id.'/schedule/'.$schedule->id)}}"><button style="padding: 3px;background-color: #595959" class="btn-sm"><i class="fa fa-sign-in" aria-hidden="true"></i> Enter</button></a></td>
                @if($courseData->isAdmin())
                <td style="width: 10%;padding-top: 20px">
                  <button class="btn-success btn-sm" onclick="loadUpdateSchedule({{$schedule->id}})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                  <button class="btn-sm" onclick="deleteSchedule({{$schedule->id}})"><i class="fa fa-trash"></i></button>

                </td>
                @endif
              </tr>
            @endforeach

            </tbody>
          </table>

        </div>
      </div>
    </div>

  </div>
</div>

<script type="text/javascript">
  setInterval(function(){ setTimer(); }, 1000);
  function setSingelTimer(key , seconds){
    var currTime = currTimeSecond();
    calSeconds = seconds - (currTime - startTime);
    time = timeConvert(calSeconds);
    $("#timer_"+key).html(time.hour+":"+time.minute+":"+time.second);
    if(calSeconds <=0 && seconds > 0){
      timerList[key] = 0;
      setTimeout(function(){  url.load(); }, 500);
    }
  }

  function setTimer(){
    $.each(timerList, function(key, seconds) {
      setSingelTimer(key,seconds);
    });
  }
  
</script>