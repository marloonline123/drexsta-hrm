<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class EmployeesExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return User::chunk();
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            'ID',
            'Name',
            'Email',
            'Username',
            'Email Verified At',
            'Created At',
            'Updated At',
        ];
    }

    /**
     * @param User $employee
     * @return array
     */
    public function map($employee): array
    {
        return [
            $employee->id,
            $employee->name,
            $employee->email,
            $employee->username,
            $employee->email_verified_at,
            $employee->created_at,
            $employee->updated_at,
        ];
    }
}