<?php

namespace App\Enums;

enum JobApplicationStatus: string
{
    case APPLIED = 'applied';
    case UNDER_REVIEW = 'under_review';
    case INTERVIEW = 'interview';
    case REJECTED = 'rejected';
    case HIRED = 'hired';

    public static function labels(): array
    {
        return [
            self::APPLIED->value => 'Applied',
            self::UNDER_REVIEW->value => 'Under Review',
            self::INTERVIEW->value => 'Interview',
            self::REJECTED->value => 'Rejected',
            self::HIRED->value => 'Hired',
        ];
    }
}