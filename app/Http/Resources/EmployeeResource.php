<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'username' => $this->username,
            'email_verified_at' => $this->email_verified_at?->format('Y-m-d H:i:s'),
            'active_company_id' => $this->active_company_id,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
            'deleted_at' => $this->deleted_at?->format('Y-m-d H:i:s'),
            'roles' => $this->when('roles', RoleResource::collection($this->roles)->resolve()),
            'permissions' => $this->when('permissions', PermissionResource::collection($this->getAllPermissions())->resolve()),
            'abilities' => $this->when('abilities', $this->abilities),
            'departments' => $this->when('departments', $this->departments),
            'jobTitles' => $this->when('jobTitles', $this->jobTitles),
        ];
    }
}