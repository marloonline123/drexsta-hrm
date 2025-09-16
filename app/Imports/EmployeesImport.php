<?php

namespace App\Imports;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class EmployeesImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new User([
            'name'     => $row['name'],
            'email'    => $row['email'],
            'username' => $this->generateUsername($row['name']),
            'password' => Hash::make($row['password'] ?? 'password'),
        ]);
    }

    /**
     * Generate a unique username from the employee name.
     */
    private function generateUsername($name)
    {
        $username = strtolower(str_replace(' ', '.', $name));
        $count = User::where('username', 'like', $username . '%')->count();
        
        if ($count > 0) {
            $username .= '.' . ($count + 1);
        }
        
        return $username;
    }
}