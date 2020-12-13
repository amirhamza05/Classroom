@php
    $userType = strtolower(Auth::user()->user_type);
    $teacherSideBar = [
        'dashboard' => [
            'icon'  => 'fas fa-home',
            'title' => 'Dashboard'
        ],
        'courses' => [
            'icon'  => 'fas fa-chalkboard-teacher',
            'title' => 'Courses'
        ],
        'routine' => [
            'icon'  => 'fas fa-calendar-alt',
            'title' => 'Routine'
        ],
        'profile' => [
            'icon'  => 'fas fa-user',
            'title' => 'Profile'
        ],
        'logout' => [
            'icon'  => 'fas fa-sign-out-alt',
            'title' => 'Logout'
        ],
    ];
@endphp

<div class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <div>EduHome</div>
        </div>
        <a title="profile" class="inbox-avatar" style="border-radius: 0%" href="{{url($userType.'/profile')}}">
            <div class="sidebar-user-info">
                <img style="border-radius: 100%;border: 1px solid #eeeeee"  width="74" hieght="70" src="{{asset('upload/avatars/default_avatar.png')}}">
                <div style="font-size: 17px;font-weight: bold;">{{Auth::user()->full_name}}</div>
                <div style="font-size: 14px;">{{Auth::user()->user_type}}</div>
            </div>
        </a>
    <div class="sidebar-menu">
        <ul class="nav">
            @foreach($teacherSideBar as $key => $value)
               <a href="{{url($userType.'/'.$key)}}" page-title="{{$value['title']}}" title="{{$key}}">
                    <li id="sidebar_{{$key}}" class="{{ request()->is($userType.'/'.$key) ? 'active' : '' }}">
                        <div class="li-area">
                            <span class="{{$value['icon']}}"></span>
                            <span class="li-title">{{$value['title']}}</span>
                        </div>
                    </li>
                </a> 
            @endforeach
            
        </ul>
    </div>
</div>