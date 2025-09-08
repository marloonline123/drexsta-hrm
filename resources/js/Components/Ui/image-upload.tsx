import * as React from 'react';
import { useState, useRef, useCallback } from 'react';
import { cn } from '@/Lib/utils';
import { Button } from '@/Components/Ui/button';
import { Label } from '@/Components/Ui/label';
import InputError from '@/Components/input-error';
import { Upload, X, Image as ImageIcon, FileImage, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
    name: string;
    label?: string;
    value?: string | null;
    onChange?: (file: File | null) => void;
    onRemove?: () => void;
    error?: string;
    className?: string;
    maxSize?: number; // in MB
    accept?: string;
    required?: boolean;
    description?: string;
}

export function ImageUpload({
    name,
    label = 'Upload Image',
    value,
    onChange,
    onRemove,
    error,
    className,
    maxSize = 5,
    accept = 'image/*',
    required = false,
    description = `Accepted formats: PNG, JPG, JPEG (Max size: ${maxSize}MB)`,
}: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(value || null);
    const [dragOver, setDragOver] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [hasNewFile, setHasNewFile] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = useCallback((file: File): string | null => {
        // Check file type
        if (!file.type.startsWith('image/')) {
            return 'Please select a valid image file';
        }

        // Check file size (convert MB to bytes)
        const maxSizeBytes = maxSize * 1024 * 1024;
        if (file.size > maxSizeBytes) {
            return `File size must be less than ${maxSize}MB`;
        }

        return null;
    }, [maxSize]);

    const handleFileSelect = useCallback((file: File) => {
        const validationError = validateFile(file);
        if (validationError) {
            setUploadError(validationError);
            return;
        }

        setUploadError(null);
        setHasNewFile(true);
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Call onChange with the file
        onChange?.(file);
    }, [validateFile, onChange]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        const imageFile = files.find(file => file.type.startsWith('image/'));
        
        if (imageFile) {
            handleFileSelect(imageFile);
        } else {
            setUploadError('Please drop a valid image file');
        }
    };

    const handleRemove = () => {
        setPreview(null);
        setUploadError(null);
        setHasNewFile(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onChange?.(null);
        onRemove?.();
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    // Update preview when value prop changes (for edit scenarios)
    React.useEffect(() => {
        if (value && !hasNewFile) {
            setPreview(value);
        }
    }, [value, hasNewFile]);

    return (
        <div className={cn('space-y-2', className)}>
            {label && (
                <Label htmlFor={name}>
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </Label>
            )}

            <div className="space-y-4">
                {/* Upload Area with Preview */}
                <div
                    className={cn(
                        'relative border-2 border-dashed rounded-lg transition-all duration-200',
                        'hover:border-primary/50 hover:bg-muted/50',
                        dragOver && 'border-primary bg-primary/5',
                        error || uploadError ? 'border-destructive' : 'border-border',
                        'cursor-pointer group',
                        preview ? 'p-4' : 'p-6'
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={!preview ? handleBrowseClick : undefined}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        name={name}
                        accept={accept}
                        onChange={handleFileChange}
                        className="hidden"
                        id={name}
                    />

                    {preview ? (
                        /* Preview Mode */
                        <div className="relative">
                            <div className="flex items-center justify-center">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="max-h-32 max-w-full object-contain rounded-md border"
                                />
                            </div>
                            
                            {/* Remove Button */}
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove();
                                }}
                            >
                                <X className="h-3 w-3" />
                            </Button>

                            {/* Change Image Overlay */}
                            <div
                                className={cn(
                                    'absolute inset-0 bg-black/60 opacity-0 hover:opacity-100',
                                    'transition-opacity duration-200 rounded-md',
                                    'flex items-center justify-center cursor-pointer'
                                )}
                                onClick={handleBrowseClick}
                            >
                                <div className="text-center text-white">
                                    <Upload className="h-6 w-6 mx-auto mb-2" />
                                    <p className="text-sm font-medium">Change Image</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Upload Mode */
                        <div className="flex flex-col items-center justify-center space-y-3 text-center">
                            <div className={cn(
                                'p-3 rounded-full transition-colors',
                                dragOver ? 'bg-primary/20' : 'bg-muted group-hover:bg-muted/80'
                            )}>
                                {dragOver ? (
                                    <FileImage className="h-6 w-6 text-primary" />
                                ) : (
                                    <Upload className="h-6 w-6 text-muted-foreground group-hover:text-foreground" />
                                )}
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm font-medium">
                                    {dragOver ? 'Drop your image here' : 'Upload Image'}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Drag & drop or click to browse
                                </p>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleBrowseClick();
                                }}
                            >
                                <ImageIcon className="h-4 w-4 mr-2" />
                                Browse Files
                            </Button>
                        </div>
                    )}
                </div>

                {/* Description */}
                {description && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {description}
                    </p>
                )}

                {/* Error Messages */}
                {(error || uploadError) && (
                    <InputError message={error || uploadError || undefined} />
                )}
            </div>
        </div>
    );
}