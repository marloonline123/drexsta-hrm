import { Head, Link, router } from '@inertiajs/react';
import { Building, MapPin, Search, X } from 'lucide-react';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Badge } from '@/Components/Ui/badge';
import { JobPosting } from '@/Types/job-postings';
import { useLanguage } from '@/Hooks/use-language';
import { PaginatedData } from '@/Types/global';
import { Company } from '@/Types/companies';
import PublicLayout from '@/Layouts/PublicLayout';
import { Input } from '@/Components/Ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/Ui/select';
import { Department } from '@/Types/deparments';
import { EmploymentType } from '@/Types/employment-types';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from '@/Hooks/use-debounce';


interface JobPostingsIndexProps {
    postings: PaginatedData<JobPosting>;
    company: Company;
    departments: Department[];
    employmentTypes: EmploymentType[];
    filters: {
        search: string;
        department: string;
        employment_type: string;
    };
}

export default function PublicJobPostingsIndex({ postings: initialPostings, company, departments, employmentTypes, filters }: JobPostingsIndexProps) {
    const { t } = useLanguage();
    const [postings, setPostings] = useState(initialPostings.data);
    const [nextPageUrl, setNextPageUrl] = useState(initialPostings.links.next);
    const [search, setSearch] = useState(filters.search || '');
    const [department, setDepartment] = useState(filters.department || '');
    const [employmentType, setEmploymentType] = useState(filters.employment_type || '');

    const debouncedSearch = useDebounce(search, 300);

    const loadMorePostings = useCallback(() => {
        if (!nextPageUrl) return;

        router.get(nextPageUrl,{}, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page: any) => {
                const newPostings = page.props.postings as PaginatedData<JobPosting>;
                setPostings((prevPostings) => [...prevPostings, ...newPostings.data]);
                setNextPageUrl(newPostings.links.next);
            },
        });
    }, [nextPageUrl]);

    useEffect(() => {
        const params: Partial<typeof filters> = { search: debouncedSearch, department, employment_type: employmentType };
        if (!debouncedSearch) delete params.search;
        if (!department) delete params.department;
        if (!employmentType) delete params.employment_type;

        router.get(route('jobs.index', { company: company.slug }), params as any, {
            preserveState: true,
            replace: true,
            onSuccess: (page: any) => {
                const newPostings = page.props.postings as PaginatedData<JobPosting>;
                setPostings(newPostings.data);
                setNextPageUrl(newPostings.links.next);
            }
        });
    }, [debouncedSearch, department, employmentType, company.slug]);

    const clearFilters = () => {
        setSearch('');
        setDepartment('');
        setEmploymentType('');
    };

    return (
        <PublicLayout>
            <Head title={t('publicJobs.title')} />
            <div className="space-y-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-2 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder={t('publicJobs.searchPlaceholder')}
                                    className="pl-10"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <Select value={department} onValueChange={setDepartment}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('publicJobs.filterDepartment')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">{t('publicJobs.allDepartments')}</SelectItem>
                                    {departments.map(dep => (
                                        <SelectItem key={dep.id} value={dep.id.toString()}>{dep.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={employmentType} onValueChange={setEmploymentType}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('publicJobs.filterEmploymentType')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">{t('publicJobs.allTypes')}</SelectItem>
                                    {employmentTypes.map(type => (
                                        <SelectItem key={type.id} value={type.id.toString()}>{type.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {(search || department || employmentType) && (
                             <Button variant="ghost" onClick={clearFilters} className="mt-4">
                                <X className="h-4 w-4 mr-2" />
                                {t('publicJobs.clearFilters')}
                            </Button>
                        )}
                    </CardContent>
                </Card>

                {postings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {postings.map((posting) => (
                            <Link key={posting.slug} href={route('jobs.show', { company: company.slug, jobPosting: posting.slug })}>
                                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:shadow-primary/10">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <CardTitle className="text-lg leading-tight line-clamp-2 flex-1">{posting.title}</CardTitle>
                                            <Badge variant={posting.is_remote ? 'secondary' : 'outline'} className="shrink-0">
                                                {posting.is_remote ? t('publicJobs.remote') : posting.employmentType.name}
                                            </Badge>
                                        </div>
                                        <CardDescription className="flex items-center text-sm">
                                            <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                                            <span className="font-medium">{posting.company.name}</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="space-y-2">
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <MapPin className="h-4 w-4 mr-2" />
                                                <span>{posting.location || t('publicJobs.remote')}</span>
                                            </div>
                                            {posting.min_salary && posting.max_salary && (
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <span className="font-medium text-foreground">
                                                        ${posting.min_salary.toLocaleString()} - ${posting.max_salary.toLocaleString()}
                                                    </span>
                                                </div>
                                            )}
                                            {posting.description && (
                                                <p className="text-sm text-muted-foreground line-clamp-2 mt-3">
                                                    {posting.description.replace(/<[^>]*>/g, '').substring(0, 120)}...
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Search className="h-16 w-16 mx-auto text-muted-foreground" />
                        <h3 className="mt-4 text-xl font-semibold">{t('publicJobs.noResults')}</h3>
                        <p className="mt-2 text-muted-foreground">{t('publicJobs.tryDifferentFilters')}</p>
                    </div>
                )}
                {nextPageUrl && (
                    <div className="text-center mt-8">
                        <Button onClick={loadMorePostings}>{t('publicJobs.loadMore')}</Button>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
