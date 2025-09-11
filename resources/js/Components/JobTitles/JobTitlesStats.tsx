import { JobTitle } from '@/Types/job-titles';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Badge } from '@/Components/Ui/badge';
import { PaginatedData } from '@/Types/global';
import { BadgeCheck, CircleCheck, CircleX } from 'lucide-react';

interface JobTitlesStatsProps {
    jobTitles: PaginatedData<JobTitle>;
}

export default function JobTitlesStats({ jobTitles }: JobTitlesStatsProps) {
    const totalJobTitles = jobTitles.meta.total_job_titles || jobTitles.meta.total || 0;
    const activeJobTitles = jobTitles.data.filter(et => et.is_active).length;
    const inactiveJobTitles = totalJobTitles - activeJobTitles;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Job Titles</CardTitle>
                    <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalJobTitles}</div>
                    <p className="text-xs text-muted-foreground">
                        All job titles in system
                    </p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Job Titles</CardTitle>
                    <CircleCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{activeJobTitles}</div>
                    <p className="text-xs text-muted-foreground">
                        Currently active job titles
                    </p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Inactive Job Titles</CardTitle>
                    <CircleX className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{inactiveJobTitles}</div>
                    <p className="text-xs text-muted-foreground">
                        Currently inactive job titles
                    </p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Percentage</CardTitle>
                    <Badge className="text-xs" variant="secondary">
                        {totalJobTitles > 0 ? Math.round((activeJobTitles / totalJobTitles) * 100) : 0}%
                    </Badge>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {totalJobTitles > 0 ? Math.round((activeJobTitles / totalJobTitles) * 100) : 0}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Of job titles are active
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}