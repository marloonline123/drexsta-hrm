import { JobTitle } from '@/Types/job-titles';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/Ui/table';
import { Badge } from '@/Components/Ui/badge';
import { Button } from '@/Components/Ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/Ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Eye, BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import EditJobTitleModal from './EditJobTitleModal';
import DeleteJobTitleModal from './DeleteJobTitleModal';
import ViewJobTitleModal from './ViewJobTitleModal';
import { truncateText } from '@/Lib/utils';

interface JobTitlesListProps {
    jobTitles: JobTitle[];
}

export default function JobTitlesList({ jobTitles }: JobTitlesListProps) {
    const [editingJobTitle, setEditingJobTitle] = useState<JobTitle | null>(null);
    const [deletingJobTitle, setDeletingJobTitle] = useState<JobTitle | null>(null);
    const [viewingJobTitle, setViewingJobTitle] = useState<JobTitle | null>(null);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Job Titles</CardTitle>
            </CardHeader>
            <CardContent>
                {jobTitles.length > 0 ? (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="w-[70px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {jobTitles.map((jobTitle) => (
                                    <TableRow key={jobTitle.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                                    <BadgeCheck className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{jobTitle.title}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {jobTitle.slug}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="max-w-[200px] truncate">
                                                {truncateText(jobTitle.description) || 'No description'}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={jobTitle.is_active ? 'default' : 'secondary'}>
                                                {jobTitle.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {jobTitle.created_at}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => setViewingJobTitle(jobTitle)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => setEditingJobTitle(jobTitle)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem 
                                                        onClick={() => setDeletingJobTitle(jobTitle)}
                                                        className="text-destructive"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <BadgeCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">No Job Titles</h3>
                            <p className="text-muted-foreground">
                                Create your first job title to get started
                            </p>
                        </CardContent>
                    </Card>
                )}
            </CardContent>

            {/* Modals */}
            {editingJobTitle && (
                <EditJobTitleModal
                    jobTitle={editingJobTitle}
                    open={true}
                    onOpenChange={(open) => !open && setEditingJobTitle(null)}
                    onSuccess={() => {
                        setEditingJobTitle(null);
                    }}
                />
            )}

            {deletingJobTitle && (
                <DeleteJobTitleModal
                    jobTitle={deletingJobTitle}
                    open={true}
                    onOpenChange={(open) => !open && setDeletingJobTitle(null)}
                    onSuccess={() => {
                        setDeletingJobTitle(null);
                    }}
                />
            )}

            {viewingJobTitle && (
                <ViewJobTitleModal
                    jobTitle={viewingJobTitle}
                    open={true}
                    onOpenChange={(open) => !open && setViewingJobTitle(null)}
                />
            )}
        </Card>
    );
}