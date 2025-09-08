<?php

namespace App\Services\Shared;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Exception;

class FileService
{

    public function __construct(protected ?string $disk = null)
    {
        // Use .env FILESYSTEM_DISK or fallback to 'public'
        $this->disk = $disk ?? config('filesystems.default', 'public');
    }

    /**
     * Store an uploaded image and return its storage path.
     */
    public function storeImage(UploadedFile $image, string $directory = 'images/others', ?string $customName = null): string
    {
        try {
            // Ensure the directory has no trailing slash
            $directory = rtrim($directory, '/');

            // Generate a filename (custom or original)
            $filename = $customName
                ? $customName . '.' . $image->extension()
                : $image->hashName();

            // Ensure uniqueness
            $filename = $this->ensureUniqueFilename($directory, $filename);

            // Store the file
            return $image->storeAs($directory, $filename, $this->disk);
        } catch (Exception $e) {
            throw new Exception("Image upload failed: " . $e->getMessage(), 0, $e);
        }
    }

    /**
     * Delete a file from storage.
     */
    public function deleteFile(string $filePath): bool
    {
        try {
            if (Storage::disk($this->disk)->exists($filePath)) {
                return Storage::disk($this->disk)->delete($filePath);
            }
            return false;
        } catch (Exception $e) {
            throw new Exception("File deletion failed: " . $e->getMessage(), 0, $e);
        }
    }

    protected function ensureUniqueFilename(string $directory, string $filename, int $attempt = 0): string
    {
        $disk = Storage::disk($this->disk);

        // Split filename into name + extension
        $name = pathinfo($filename, PATHINFO_FILENAME);
        $extension = pathinfo($filename, PATHINFO_EXTENSION);

        // Append suffix if not first attempt
        $candidate = $attempt > 0
            ? "{$name}_{$attempt}." . $extension
            : $filename;

        // Full path for existence check
        $path = $directory . '/' . $candidate;

        // If exists → recurse with incremented attempt
        if ($disk->exists($path)) {
            return $this->ensureUniqueFilename($directory, $filename, $attempt + 1);
        }

        return $candidate;
    }
}
