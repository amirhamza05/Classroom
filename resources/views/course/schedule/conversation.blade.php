

<style type="text/css">
.direct-chat .box-body {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    position: relative;
    overflow-x: hidden;
    padding: 0;
}
.direct-chat.chat-pane-open .direct-chat-contacts {
    -webkit-transform: translate(0,  0);
    -ms-transform: translate(0,  0);
    -o-transform: translate(0,  0);
    transform: translate(0,  0);
}
.direct-chat-messages {
    -webkit-transform: translate(0,  0);
    -ms-transform: translate(0,  0);
    -o-transform: translate(0,  0);
    transform: translate(0,  0);
    padding: 10px;
    height: 350px;
    overflow: auto;
}
.direct-chat-msg, .direct-chat-text {
    display: block;
}
.direct-chat-msg {
    margin-bottom: 10px;
}
.direct-chat-msg:before, .direct-chat-msg:after {
    content: " ";
    display: table;
}
.direct-chat-msg:after {
    clear: both;
}
.direct-chat-messages, .direct-chat-contacts {
    -webkit-transition: -webkit-transform .5s ease-in-out;
    -moz-transition: -moz-transform .5s ease-in-out;
    -o-transition: -o-transform .5s ease-in-out;
    transition: transform .5s ease-in-out;
}
.direct-chat-text {
    border-radius: 5px;
    position: relative;
    padding: 5px 10px;
    background: #F6E2CE;
    border: 1px solid #d2d6de;
    margin: 5px 0 0 50px;
    color: #444;
}
.direct-chat-text:after, .direct-chat-text:before {
    position: absolute;
    right: 100%;
    top: 15px;
    border: solid transparent;
    border-right-color: #F6E2CE;
    content: ' ';
    height: 0;
    width: 0;
    pointer-events: none;
}
.direct-chat-text:after {
    border-width: 5px;
    margin-top: -5px;
}
.direct-chat-text:before {
    border-width: 6px;
    margin-top: -6px;
}
.right .direct-chat-text {
    margin-right: 50px;
    margin-left: 0;
    background-color: #C1DFED;
}
.right .direct-chat-text:after, .right .direct-chat-text:before {
    right: auto;
    left: 100%;
    border-right-color: transparent;
    border-left-color: #C1DFED;
}
.direct-chat-img {
    border-radius: 50%;
    float: left;
    width: 40px;
    height: 40px;
}
.right .direct-chat-img {
    float: right;
}

</style>

<div id="conversationMessage">
<?php $conversations = $scheduleData->conversations()->orderBy('id', 'ASC')->get();?>
@foreach($conversations as $conversation)
	 <div class="direct-chat-msg {{$conversation->user_id != auth()->user()->id ?'left':'right'}}">
             <div class="direct-chat-info clearfix">
                <span class="direct-chat-name pull-left">{{$conversation->user->full_name}} ({{$conversation->user->user_type}})</span>
                <span class="direct-chat-timestamp pull-right" title="">{{ $conversation->created_at}}</span>
            </div>
              <!-- /.direct-chat-info -->
             <img class="direct-chat-img" src="/upload/avatars/default_avatar.png" alt="Message User Image"><!-- /.direct-chat-img -->
             <div class="direct-chat-text">
                {{$conversation->message}}
             </div>
              <!-- /.direct-chat-text -->
    </div>
@endforeach
</div>
<script type="text/javascript">
	$('#conversationBody').scrollTop($('#conversationMessage').height())
</script>


