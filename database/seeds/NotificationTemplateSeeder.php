<?php

use Illuminate\Database\Seeder;

//controller
use App\Http\Controllers\Notification\Template\NotificationTemplateController as NotificationTemplate;

class NotificationTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        NotificationTemplate::reset();
    }
}
