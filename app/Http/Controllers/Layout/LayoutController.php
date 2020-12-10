<?php

namespace App\Http\Controllers\Layout;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LayoutController extends Controller
{
    public static function isLayout()
    {
        if (isset(request()->layout)) {
            return request()->layout == 0 ? 0 : 1;
        }
        return 1;
    }
    public static function debugPage(){
        return isset(request()->debug)? 1:0;
    }
    public static function getLayout()
    {
        return self::isLayout() ? "layout" : 'body_layout';
    }
    public static function view($page, $data = [])
    {
        if (isset(request()->preload_sidebar)) {
            $page = "includes.sidebar";
            //sleep(10);
        }
        else if (isset(request()->load_content) || isset(request()->debug)) {
            $page = $page;
            //sleep(5);
        }
        else{
            $page = "preload_layout";
        }

        $v = view($page, $data);

        if($page == "preload_layout"){
            $html = $v->render();
            $html = str_replace("\n", "", $html);
            $html = str_replace("\r", "", $html);
            $html = str_replace("\t", "", $html);
            $html = str_replace("  ", "", $html);
            echo "$html";
            return;
        }
        
        return $v;
    }
}
