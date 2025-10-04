<?php

namespace App\Enums;

enum JobPostingStatus: string
{
    case DRAFT = 'draft';
    case OPEN = 'open';
    case CLOSED = 'closed';

    public static function labels(): array
    {
        return [
            self::DRAFT->value => 'Draft',
            self::OPEN->value => 'Open',
            self::CLOSED->value => 'Closed',
        ];
    }
}