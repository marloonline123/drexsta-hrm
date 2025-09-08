<?php

namespace App\Traits\ModelScopes;

use App\Traits\GlobalScopes\HasIsActiveScope;
use App\Traits\GlobalScopes\HasSearchScope;

trait HasUserScopes {
    use HasSearchScope, HasIsActiveScope;


    public function scopeOnlyStudents($query)
    {
        return $query->where('type', 'student');
    }

    public function scopeOnlyTeachers($query)
    {
        return $query->where('type', 'teacher');
    }

    public function scopeOnlyEmployers($query)
    {
        return $query->where('type', 'employer');
    }

    public function scopeNotAdmin($query)
    {
        return $query->where('type', '!=', 'admin');
    }

    public function scopeFilterByCourses($query, array|null $coursesIds)
    {
        if (!empty($coursesIds)) {
            return $query->whereHas('courses', function ($q) use ($coursesIds) {
                $q->whereIn('id', $coursesIds);
            });
        }

        return $query;
    }
}