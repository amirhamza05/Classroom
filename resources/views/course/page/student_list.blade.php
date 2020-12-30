@extends($layout)
@section('title', 'Teachers in '.$courseData->name)

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
      				
      		<div class="pull-left title">Teachers</div>
      		<div class="pull-right">
      			@if($courseData->isAdmin())
        		<button onclick="addStudent()">Add Student</button>
        		@endif
        	</div>

      		</div>	
      	</div>
        <div class="box">
        	
        
          <table class="table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Status</th>
                @if($courseData->isAdmin())
                <th>Action</th>
            	@endif

              </tr>
            </thead>
            <tbody>
            <?php $students = $courseData->students()->get();  ?>
            @foreach ($students as $key => $student)
            	<tr>
            		<td style="width: 15%"><img src="http://127.0.0.1:8000/upload/avatars/default_avatar.png" class="listImg"></td>
            		<td style="width: 50%;padding-top: 20px">{{$student->full_name}}</td>
            		<td style="width: 20%;padding-top: 20px">{{$student->pivot->status}}</td>
            		@if($courseData->isAdmin())
            		<td style="width: 15%;padding-top: 20px">
            			<button class="btn-sm" onclick="deleteStudent({{$student->id}})">Delete</button>
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