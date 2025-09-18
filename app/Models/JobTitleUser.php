<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobTitleUser extends Model
{
    protected $table = 'job_title_user';

    protected $fillable = [
        'company_id',
        'job_title_id',
        'employee_id',
    ];

    public function jobTitle()
    {
        return $this->belongsTo(JobTitle::class);
    }

    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id');
    }
}
