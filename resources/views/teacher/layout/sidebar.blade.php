<!DOCTYPE html>
<html>
<head>
    <title></title>
   
</head>
<body>

  <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.4.2/css/all.css'>
  <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'>
		<!-- JQuery Lib -->
	<script type="text/javascript" src="assets/lib/jquery.js"></script>
	<!-- Bootstrap Lib -->
	<link href="https://fonts.googleapis.com/css?family=Exo 2" rel="stylesheet">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="http://coderoj.com/style/lib/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="http://coderoj.com/style/lib/font-awesome/css/font-awesome.css">
	<script type="text/javascript" src="http://coderoj.com/style/lib/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="http://coderoj.com/style/lib/editarea_0_8_2/edit_area/edit_area_full.js"></script>
  <link href="https://fonts.googleapis.com/css?family=Exo 2" rel="stylesheet">

<script type="text/javascript">
	var _token = "{{ csrf_token() }}";
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  font-family: 'Josefin Sans', sans-serif;
}

body{
   background-color: #f3f5f9;
}

.wrapper{
  display: flex;
  position: relative;
}

.wrapper .sidebar{
  width: 200px;
  height: 100%;
  background:  #6d1432;
  padding: 30px 0px;
  position: fixed;
}

.wrapper .sidebar h3{
      text-align: center;
	   	font-family: 'Niconne', cursive;
	    font-weight: 900;
      color:white;
      margin-left:-50px;
      margin-bottom: 20px;
      margin-top:-8px;
}

.wrapper .sidebar ul li{
  padding: 15px;
  border-bottom: 1px solid #bdb8d7;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  border-top: 1px solid rgba(255,255,255,0.05);
}    
.wrapper .sidebar ul li a{
  color:  #fcf6f8;
  display: block;
  text-decoration:none;
}

.wrapper .sidebar ul li a .fas{
  width: 25px;
}

.wrapper .sidebar ul li:hover{
  background-color: #b32e5a;
}
    
.wrapper .sidebar ul li:hover a{
  color: #fff;
}
.wrapper .container{
  width: 100%;
  margin-left: 180px;
}

.wrapper .container .header {
  padding: 35px;
  background: #fff;
  color: #717171;
  border-bottom: 1px solid #e0e4e8;
}
.wrapper .container .header a{
  float:right;
  margin-right:30px;
 margin-top:-10px;
 color:#b32e5a;
 font-size:20px;
 text-decoration:none; 
}
.wrapper .container .header a .hover{
  color: #fff;
}
.wrapper .container .header i{
 float:right;
 margin-right:30px;
 margin-top:-8px;
 color:#b32e5a;
 font-size:20px;
 text-decoration:none; 
 cursor:pointer;
}
.wrapper .container .header i .hover{
  color: #fff;
}

</style>
</head>
<body>
<div class="wrapper">
<div class="sidebar">  
    <h3>EduHome</h3>
        <ul>
            <li><a href="#"><i class="fas fa-home"></i>Home</a></li>
        
            <li><a href="#"><i class="fas fa-chalkboard-teacher"></i>My Class</a></li>
            <li><a href="#"><i class="fas fa-calendar-alt"></i>Class Routine</a></li>
            <li><a href="#"><i class="fas fa-user-circle"></i>My Profile</a></li>
            <li><a href="#"><i class="fas fa-address-card"></i>About</a></li>

        </ul> 
        
      </div>
  
  <div class="container">
  <div class="header">
  <a href="/logout"><span class="fas fa-sign-out-alt"></span>&nbsp;Logout</a>
  <i class="fas fa-plus-circle" data-toggle="modal" data-target="#classroomModal">&nbsp;Create</i>

 
</div>
</div>
<div class="modal fade" id="classroomModal" tabindex="-1" aria-labelledby="classroomModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="classroomModalLabel">Create Class</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form>
      <div class="modal-body">
      <div class="form-group" > 
      <label for="titile">Class Title</label>
      <input type="text" class="form-control" name="title" placeholder="class titile" >
      </div>
     <div class="form-group"> 
    <label for="subject">Subject</label>
     <input type="text" class="form-control" name="subject" placeholder="Subject" >
     </div>
     <div class="form-group"> 
     <label for="section">Section</label>
     <input type="text" class="form-control" name="section" placeholder="section" >
     </div>
     <div class="form-group"> 
     <label for="room">Room</label>
     <input type="text" class="form-control" name="room" placeholder="room" >
     </div>
     <div class="form-group"> 
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Create</button>
      </div>
      </form>
    </div>
  </div>
</body>
</html>