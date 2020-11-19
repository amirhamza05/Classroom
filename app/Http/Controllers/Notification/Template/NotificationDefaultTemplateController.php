<?php

namespace App\Http\Controllers\Notification\Template;

use App\Http\Controllers\Controller;

class NotificationDefaultTemplateController extends Controller
{
    protected static $templateData = [
        'welcome' => [
            'template_name' => 'welcome',
            'from_name'     => "[[app_name]]",
            'subject'       => "Welcome to [[app_name]]",
        ],
    ];

    public static function get()
    {
        $templateList = [];
        $templateData = self::$templateData;
        foreach ($templateData as $key => $value) {
            array_push($templateList, self::addTemplate($value));
        }
        return $templateList;
    }

    public static function addTemplate($templateData)
    {
        $basePath = "notification.template.{$templateData['template_name']}.";
        return array_merge($templateData, [
            'sms_body'  => view($basePath . 'sms')->render(),
            'mail_body' => view($basePath . 'mail')->render(),
        ]);
    }
}
