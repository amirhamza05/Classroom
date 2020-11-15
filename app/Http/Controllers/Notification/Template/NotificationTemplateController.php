<?php

namespace App\Http\Controllers\Notification\Template;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

//model
use App\NotificationTemplate;

//controller
use App\Http\Controllers\Notification\Template\NotificationDefaultTemplateController as DefaultTemplate;
use App\Http\Controllers\Notification\Template\NotificationTemplateProcessController as ProcessTemplate;

class NotificationTemplateController extends Controller
{

    public static function reset(){
    	NotificationTemplate::truncate();
    	NotificationTemplate::insert(DefaultTemplate::get());
    }

    public static function set($templateName, $variableData){
    	$ProcessTemplate = new ProcessTemplate();
    	return $ProcessTemplate->set($templateName, $variableData);
    }
    public static function customSet($templateData, $variableData){
    	$ProcessTemplate = new ProcessTemplate();
    	return $ProcessTemplate->customSet($templateData, $variableData);
    }
}
