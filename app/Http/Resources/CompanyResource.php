<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CompanyResource extends JsonResource
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
            'industry' => $this->industry,
            'slug' => $this->slug,
            'logo_url' => $this->logo_path
                ? Storage::disk(config('filesystems.default'))->url($this->logo_path)
                : null,
            'myRole' => $this->when('users', function () {
                return $this->users->firstWhere('id', request()->user()->id)?->pivot->role;
            }) ?? null,
            'myJobTitles' => $this->whenLoaded('jobTitles', function () {
                return $this->jobTitles->map(fn ($jobTitle) => [
                    'id' => $jobTitle->id,
                    'title' => $jobTitle->title,
                ]);
            }),
            'established_date' => $this->created_at?->format('Y-m-d'),
            'created_at' => $this->created_at,
        ];
    }
}
