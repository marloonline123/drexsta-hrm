import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/Components/Ui/dialog';
import { JobTitle } from '@/Types/job-titles';
import { Badge } from '@/Components/Ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Label } from '@/Components/Ui/label';
import { format } from 'date-fns';

interface ViewJobTitleModalProps {
    jobTitle: JobTitle;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ViewJobTitleModal({ jobTitle, open, onOpenChange }: ViewJobTitleModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Job Title Details</DialogTitle>
                </DialogHeader>

                <Card className="border-0 shadow-none">
                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="flex items-center justify-between">
                            <span>{jobTitle.title}</span>
                            <Badge variant={jobTitle.is_active ? 'default' : 'secondary'}>
                                {jobTitle.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Slug</Label>
                                <p className="text-sm">{jobTitle.slug}</p>
                            </div>
                            
                            <div className="space-y-2">
                                <Label>Created At</Label>
                                <p className="text-sm">
                                    {jobTitle.created_at ? format(new Date(jobTitle.created_at), 'PPP') : 'N/A'}
                                </p>
                            </div>
                            
                            <div className="space-y-2 md:col-span-2">
                                <Label>Description</Label>
                                <p className="text-sm">
                                    {jobTitle.description || 'No description provided'}
                                </p>
                            </div>
                            
                            {jobTitle.company && (
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Company</Label>
                                    <p className="text-sm">{jobTitle.company.name}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}