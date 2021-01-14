
<style type="text/css">
  .updateEditor .ck-editor__editable_inline {
    min-height: 400px;
  }
</style>
<div class="row updateEditor">
<!-- <form id='comment_success'method = "post" action = "{{url($userType.'/courses/'.$commentData->course_id.'/comment/'.$commentData->id.'/update')}} "> -->
     @csrf
    <div class="form-group">
       <div id="commentEditEditor"></div>
    </div>
     <div class="pull-right">
       <button class="btn btn-danger" onclick="updateComment({{$commentData->id}})">Update Comment</button>
       </div>
</div>

<script>
  
    ClassicEditor
        .create( document.querySelector( '#commentEditEditor' ) )
        .then( editor => {
           commentEditor[{{$commentData->id}}] = editor; // Save for later use.
           editor.setData('<?php echo $commentData->comment; ?>');
      } )
        .catch( error => {
            console.error( error );
        } );
</script>