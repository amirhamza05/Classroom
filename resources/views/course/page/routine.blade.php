
<style type="text/css">
	.routine{
		padding: 15px;
	}
	table{
      width: 100%;
      background-color: #ffffff;
    }
    td{
      padding: 10px;
      border: 1px solid #eeeeee;
      text-align: center;
    }
    th{
      font-weight: bold;
      font-size: 14px;
      padding: 10px;
      border: 1px solid #eeeeee;
      text-align: center;
    }
</style>

<div class="routine">
	<table>
		<tr>
			<th class="td1">Course Name</th>
			<th class="td1">Schedule Name</th>
			<th class="td1">Status</th>
			<th class="td1">Length</th>
			<th class="td1">Start Time</th>
			<th class="td1">End Time</th>
			<th class="td1"></th>
		</tr>
		@foreach($courseList as $key => $course)
			<?php $schedules = $course->schedules()->get();  ?>
			
			@foreach($schedules as $key1 => $schedule)
				<?php if($schedule->isEnd())continue; ?>
				<tr>
					<td class="td2">{{$course->name}}</td>
					<td class="td2">{{$schedule->name}}</td>
					<td class="td2">
						@if($schedule->isRunning())
                    <label class="label label-success"><i class="fas fa-dot-circle"></i> Class Going On</label>
                  @endif
                  @if($schedule->isNotStart())
                    <label class="label label-primary"><i class="fa fa-clock-o" aria-hidden="true"></i> Class is Not Start</label>
                  @endif
					</td>
					<td class="td2">{{$schedule->getLength()}}</td>
					<td class="td2">{{$schedule->start_time}}</td>
					<td class="td2">{{$schedule->end_time}}</td>
					<td class="td2">
						<a href="{{url($userType.'/courses/'.$course->id.'/schedule/'.$schedule->id)}}"><button style="padding: 3px;background-color: #595959" class="btn-sm"><i class="fa fa-sign-in" aria-hidden="true"></i> Enter</button></a>
					</td>
				</tr>
			@endforeach
		@endforeach
		
	</table>
</div>
