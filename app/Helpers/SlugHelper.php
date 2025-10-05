<?php


function generateSlug($string, $separator = '-')
{
    if (is_null($string) || $string === '') {
        return "";
    }

    $string = (string) $string;
    $string = trim($string);
    $string = mb_strtolower($string, "UTF-8");

    // Replace common punctuation and unsafe characters with separator
    $string = preg_replace('/[\/\\\\?#[\]@!$&\'()*+,;=.%^~`<>|"]/u', $separator, $string);

    // Keep all unicode letters, numbers, dashes, and spaces
    $string = preg_replace('/[^\p{L}\p{N}\s_-]+/u', '', $string);

    // Replace Arabic-specific variants (optional normalization)
    $string = str_replace(
        ['أ', 'إ', 'آ', 'ة', 'ء', 'ئ', 'ؤ'],
        ['ا', 'ا', 'ا', 'ه', 'ا', 'ى', 'و'],
        $string
    );

    // Replace multiple spaces/hyphens with a single space
    $string = preg_replace('/[\s\-]+/', ' ', $string);

    // Convert spaces/underscores to separator
    $string = preg_replace('/[\s_]/', $separator, $string);

    // Trim leading/trailing separators
    $string = trim($string, $separator);

    // Ensure result is not just separators
    if ($string === '' || preg_match("/^[" . preg_quote($separator, '/') . "]+$/", $string)) {
        return "";
    }

    return $string;
}

function uniqueSlug(string $model, string $title): string {
    $slug = generateSlug($title);
    if ($model::where('slug', $slug)->exists()) {
        $slug = $slug . '-' . rand(1000, 9999);
        return uniqueSlug($model, $slug);
    }
    return $slug;
}