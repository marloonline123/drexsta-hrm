import React from 'react';
import { Input } from '@/Components/Ui/input';
import { Label } from '@/Components/Ui/label';
import { Textarea } from '@/Components/Ui/textarea';
import { Button } from '@/Components/Ui/button';
import InputError from '@/Components/input-error';
import { AbilityFormData } from '@/Types/abilities';

interface AbilityFormProps {
    data: AbilityFormData;
    setData: (key: string, value: string) => void;
    errors: Record<string, string>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
}

export default function AbilityForm({
    data,
    setData,
    errors,
    processing,
    onSubmit,
}: AbilityFormProps) {
    return (
        <form onSubmit={onSubmit}>
            <div className="space-y-4">
                {/* Key */}
                <div className="space-y-2">
                    <Label htmlFor="key">
                        Key <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="key"
                        placeholder="e.g. finance_approver"
                        value={data.key}
                        onChange={(e) => setData('key', e.target.value)}
                        className={errors.key ? 'border-red-500' : ''}
                    />
                    <InputError message={errors.key} />
                </div>

                {/* Label */}
                <div className="space-y-2">
                    <Label htmlFor="label">
                        Label <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="label"
                        placeholder="e.g. Finance Approver"
                        value={data.label}
                        onChange={(e) => setData('label', e.target.value)}
                        className={errors.label ? 'border-red-500' : ''}
                    />
                    <InputError message={errors.label} />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Describe the ability's purpose"
                        value={data.description || ''}
                        onChange={(e) => setData('description', e.target.value)}
                        className={errors.description ? 'border-red-500' : ''}
                    />
                    <InputError message={errors.description} />
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-2 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.history.back()}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit"
                        disabled={processing}
                    >
                        {processing ? 'Saving...' : 'Save Ability'}
                    </Button>
                </div>
            </div>
        </form>
    );
}