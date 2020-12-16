@extends($layout)
@section('title', 'Profile')
<style>



</style>

<div class="row">
    <div class="col-md-12">
  
    <div class="user-profile" style="background-color: #E8EAF6">
    
        <div class="profile-header-background">
       
            <div class="profile_background"></div>
            <center><img id="load_cover_photo" style="margin-top:10px; height: 250px; width: 100%;" src="/img/user_profile/cover.jpg" alt="cover"> 

            <div class="text-center">
                <img id="load_profile_photo" style="margin-top:-150px; height: 180px; width: 180px;" src="/img/avatar/{{ Auth::user()->avatar }}" alt="Avatar"  class="avatar img-circle">
                 <h2 style="margin-top:0px;">{{Auth::user()->full_name}}
              
             <font style="font-size: 16px;font-weight: bold;"><span class="glyphicon glyphicon-flag"></span> </font>
             </h2>
             </center>
         </div>
         <div class="action-buttons">
            <div class="row">
            <div class="col-md-12">
                   <nav class="nav-sidebar">
                       <ul class="nav">          
                            @include('user.profile_sidebar')   
                       </ul> 
                    </nav>
                </div>
            </div>
            </div>
  <div class="row">
 <div class="col-md-8">

      <div class="row">
         <div class="col-md-6">
            <label>User Id</label>
             </div>
           <div class="col-md-6">
           <p>{{Auth::user()->login_id}}</p>
           </div>
         </div>
      <div class="row">
         <div class="col-md-6">
          <label>Full Name</label>
              </div>
              <div class="col-md-6">
                   <p>{{Auth::user()->full_name}}</p>
                       </div>
                         </div>
                          <div class="row">
                             <div class="col-md-6">
                                 <label>Email</label>
                                </div>
                                 <div class="col-md-6">
                                 <p>{{Auth::user()->email}}</p>
                                 </div>
                               </div>
                            <div class="row">
                         <div class="col-md-6">
                         <label>Phone</label>
                        </div>
                    <div class="col-md-6">
                 <p>{{Auth::user()->phone}}</p>
             </div>
         </div>
                                  
     </div>
        
  
    

<script type="text/javascript">
     set_user_id('{{Auth:user()->login_id');
     
</script>

