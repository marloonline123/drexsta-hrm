<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasCompanyScope;

class BaseModel extends Model
{
    use HasCompanyScope;
}
