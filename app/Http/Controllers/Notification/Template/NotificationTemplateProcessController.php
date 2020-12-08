<?php

namespace App\Http\Controllers\Notification\Template;

use App\Http\Controllers\Controller;

//model
use App\Models\NotificationTemplate;

class NotificationTemplateProcessController extends Controller
{
    protected $intialVariableData;
    protected $variableData;
    protected $templateData;
    protected $selectOption;

    public function __construct()
    {
        $this->setInitialData();
        $this->selectOption = ['from_name', 'subject', 'sms_body', 'mail_body'];
    }

    public function setInitialData()
    {
        $this->intialVariableData = [
            'app_name' => config('app.name'),
        ];
    }

    public function set($templateName = '', $variableData = [])
    {
        $this->templateData = $this->getTemplateData($templateName);
        $this->variableData = $variableData;
        return $this->processTemplate();
    }

    public function customSet($templateData, $variableData = [])
    {
        foreach ($this->selectOption as $key => $value) {
            if (!isset($templateData[$value])) {
                return [
                    'error' => "can not found $value field",
                ];
            }
        }
        $this->templateData = $templateData;
        $this->variableData = $variableData;
        return $this->processTemplate();
    }

    public function processTemplate()
    {
        if (!isset($this->templateData)) {
            return [
                'error' => "template name is not valid",
            ];
        }

        if (!isset($this->variableData[0])) {
            return $this->singleTemplate($this->variableData);
        }

        $templateData = [];
        foreach ($this->variableData as $key => $value) {
            array_push($templateData, $this->singleTemplate($value));
        }
        return $templateData;
    }

    public function getTemplateData($templateName)
    {
        $data = NotificationTemplate::select($this->selectOption)->where('template_name', $templateName)->first();
        if (isset($data)) {
            $data = $data->toArray();
        }
        return $data;
    }

    public function singleTemplate($variableData)
    {
        $variableData = array_merge($variableData, $this->intialVariableData);
        $templateData = [];
        foreach ($this->templateData as $key => $value) {
            $templateData[$key] = $this->textProcess($value, $variableData);
        }
        return $templateData;
    }

    public function textProcess($text, $variableData)
    {
        foreach ($variableData as $key => $value) {
            $text = str_replace('[[' . $key . ']]', $value, $text);
        }
        return $text;
    }
}
