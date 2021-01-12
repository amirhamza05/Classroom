
<style type="text/css">

.tabs {
width: 100%;
  margin: 0 auto;
}
#tab-button {
  display: table;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}
#tab-button li {
  display: table-cell;
  width: 20%;
}
#tab-button li a {
  display: block;
  padding: .5em;
  background: #eee;
  border: 1px solid #ddd;
  text-align: center;
  color: #000;
  text-decoration: none;
}
#tab-button li:not(:first-child) a {
  border-left: none;
}
#tab-button li a:hover,
#tab-button .is-active a {
  border-bottom-color: transparent;
  background: #fff;
}
.tab-contents {
  padding: .5em 2em 1em;
  border: 1px solid #ddd;
}



.tab-button-outer {
  display: none;
}
.tab-contents {
  margin-top: 20px;
}
@media screen and (min-width: 768px) {
  .tab-button-outer {
    position: relative;
    z-index: 2;
    display: block;
  }
  .tab-select-outer {
    display: none;
  }
  .tab-contents {
    position: relative;
    top: -1px;
    margin-top: 0;
  }
}
</style>
<div class="tabs">
  <div class="tab-button-outer">
    <ul id="tab-button">
      <li><a class="active">Basic Info</a></li>
      <li><a href="#tab02">Tab 2</a></li>
      <li><a href="#tab03">Tab 3</a></li>
      <li><a href="#tab04">Tab 4</a></li>
      <li><a href="#tab05">Tab 5</a></li>
    </ul>
  </div>
  <div class="tab-select-outer">
    <select id="tab-select">
      <option value="#tab01">Tab 1</option>
      <option value="#tab02">Tab 2</option>
      <option value="#tab03">Tab 3</option>
      <option value="#tab04">Tab 4</option>
      <option value="#tab05">Tab 5</option>
    </select>
  </div>

<div class="iframe-container" style="">
     
</div>
  <div class="tab-body" style="height: 400px;overflow-y: scroll;">
  	@include("course.schedule.whiteboard")
    
  </div>

  
</div>
