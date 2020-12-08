@extends($layout)
@section('title', 'Teachers in '.$courseData->name)
@section('content')
	<style type="text/css">
		.course .header{
			font-size: 14px;
			border: 2px solid #eeeeee;
			height: 55px;
			padding-top: 16px;
			border-width: 0px 0px 1px 0px;
			margin-left: 2px;
			overflow-x: auto;
			position: -webkit-sticky;position: sticky;
  			top: 0;
  			background-color: #ffffff;
  			z-index: 999;
  			box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
		}
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
        		<button onclick="addTeacher('{{$courseData->id}}')">Add Teacher</button>
        	</div>

      		</div>	
      	</div>
        <div class="box">
        	
        
          <table class="table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            <?php $teachers = $courseData->teachers()->get(); ?>
            @foreach ($teachers as $key => $teacher)
            	<tr>
            		<td style="width: 15%"><img src="http://127.0.0.1:8000/upload/avatars/default_avatar.png" class="listImg"></td>
            		<td style="width: 50%;padding-top: 20px">{{$teacher->full_name}}</td>
            		<td style="width: 20%;padding-top: 20px">{{$teacher->pivot->role}}</td>
            		<td style="width: 15%;padding-top: 20px">
            			<button class="btn-sm">btn</button>
            			<button class="btn-sm btn-success">btn</button>
            		</td>
            	</tr>  
            @endforeach
             
            </tbody>
          </table>
          
        </div>
      </div>
    </div>


			
			
		</div>
		
	</div>
	
@stop