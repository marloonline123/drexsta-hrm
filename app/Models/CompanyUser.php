<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyUser extends Model
{
    // protected static function booted(): void
    // {
    //     self::created(static function (CompanyUser $companyUser): void {
    //         $companyUser->updated_at = now();
    //         $companyUser->created_at = now();
    //         $companyUser->save();
    //     });
    // }

    protected $table = 'company_user';

    public $timestamps = true;

    protected $fillable = [
        'company_id',
        'user_id',
        'role',
    ];
}
