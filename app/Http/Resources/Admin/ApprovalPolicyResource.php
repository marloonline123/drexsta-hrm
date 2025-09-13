<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApprovalPolicyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'company_id' => $this->company_id,
            'action' => $this->action,
            'steps' => $this->steps,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}