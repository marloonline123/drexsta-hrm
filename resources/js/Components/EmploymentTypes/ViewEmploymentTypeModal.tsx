import { EmploymentType } from '@/Types/employment-types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/Ui/dialog';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Badge } from '@/Components/Ui/badge';
import { Briefcase, Calendar, FileText, X, Shield } from 'lucide-react';

interface ViewEmploymentTypeModalProps {
    employmentType: EmploymentType;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ViewEmploymentTypeModal({ 
    employmentType, 
    open, 
    onOpenChange 
}: ViewEmploymentTypeModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Employment Type Details</DialogTitle>
                    <DialogDescription>
                        View detailed information about this employment type.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Briefcase className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">{employmentType.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{employmentType.slug}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Description</span>
                                </div>
                                <p className="text-sm text-muted-foreground pl-6">
                                    {employmentType.description || 'No description provided'}
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Shield className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Status</span>
                                </div>
                                <div className="pl-6">
                                    <Badge variant={employmentType.is_active ? 'default' : 'secondary'}>
                                        {employmentType.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Created</span>
                                </div>
                                <p className="text-sm text-muted-foreground pl-6">
                                    {employmentType.created_at}
                                </p>
                            </div>

                            {employmentType.company && (
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Company</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground pl-6">
                                        {employmentType.company.name}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            <X className="h-4 w-4 mr-2" />
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}