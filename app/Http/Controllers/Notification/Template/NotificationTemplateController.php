<?php

namespace App\Http\Controllers\Notification\Template;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Notification\Template\NotificationDefaultTemplateController as DefaultTemplate;
use App\Http\Controllers\Notification\Template\NotificationTemplateProcessController as ProcessTemplate;
use App\Models\NotificationTemplate;

class NotificationTemplateController extends Controller
{

    public static function reset()
    {
        NotificationTemplate::truncate(); //delete all row from notification table
        NotificationTemplate::insert(DefaultTemplate::get()); //insert all data in notification table
    }

    public static function set($templateName, $variableData)
    {
        $ProcessTemplate = new ProcessTemplate();
        return $ProcessTemplate->set($templateName, $variableData);
    }
    public static function customSet($templateData, $variableData)
    {
        $ProcessTemplate = new ProcessTemplate();
        return $ProcessTemplate->customSet($templateData, $variableData);
    }
}
