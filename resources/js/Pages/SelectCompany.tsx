import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Button } from '@/Components/Ui/button';
import { Badge } from '@/Components/Ui/badge';
import { SelectCompanyHeader } from '@/Components/Companies/Public/SelectCompanyHeader';
import { Head, router } from '@inertiajs/react';
import {
    Building2,
    Users,
    CheckCircle,
    ArrowRight,
    Briefcase,
    MapPin,
    Star
} from 'lucide-react';
import { useState } from 'react';
import { Company } from '@/Types/companies';


interface SelectCompanyProps {
    companies: Company[];
}


export default function SelectCompany({ companies }: SelectCompanyProps) {
    const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCompanySelect = async (company: Company) => {
        setIsLoading(true);
        setSelectedCompany(company.id);

        try {
            router.post(`/select-company/${company.id}`, {}, {
                onSuccess: () => {
                    // Success handling is done by the controller redirect
                },
                onError: () => {
                    setIsLoading(false);
                    setSelectedCompany(null);
                }
            });
        } catch {
            setIsLoading(false);
            setSelectedCompany(null);
        }
    };

    const getRoleColor = (role: string | null) => {
        switch (role?.toLowerCase()) {
            case 'admin':
            case 'owner':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'manager':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'employee':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const getRoleIcon = (role: string | undefined) => {
        switch (role?.toLowerCase()) {
            case 'admin':
            case 'owner':
                return Star;
            case 'manager':
                return Users;
            case 'employee':
                return Briefcase;
            default:
                return Building2;
        }
    };
    console.log(companies);
    

    return (
        <>
            <SelectCompanyHeader />
            <Head title="Select Company" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-14">
                <div className="container mx-auto px-4 py-8">
                    {/* Header Section */}
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                            <Building2 className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Choose Your Company
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Select the company you'd like to access to continue with your work
                        </p>
                    </div>

                    {/* Companies Grid */}
                    {companies.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {companies.map((company, index) => {
                                const RoleIcon = getRoleIcon(company.myRole);
                                const isSelected = selectedCompany === company.id;

                                return (
                                    <div
                                        key={company.id}
                                        className={`animate-in fade-in slide-in-from-bottom duration-500 delay-${Math.min(index * 100, 500)}`}
                                    >
                                        <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                                            isSelected
                                                ? 'ring-2 ring-primary shadow-lg bg-primary/5'
                                                : 'hover:shadow-lg'
                                        }`}>
                                            {/* Company Logo */}
                                            <div className="relative">
                                                <div className="h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                                                    {company.logo_url ? (
                                                        <img
                                                            src={company.logo_url}
                                                            alt={`${company.name} logo`}
                                                            className="h-16 w-16 object-contain"
                                                        />
                                                    ) : (
                                                        <Building2 className="h-16 w-16 text-gray-400" />
                                                    )}
                                                </div>
                                                {isSelected && (
                                                    <div className="absolute top-4 right-4">
                                                        <div className="bg-primary text-white rounded-full p-2">
                                                            <CheckCircle className="h-4 w-4" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <CardHeader className="pb-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                            {company.name}
                                                        </CardTitle>
                                                        <CardDescription className="text-base text-gray-600 dark:text-gray-300">
                                                            {company.industry}
                                                        </CardDescription>
                                                    </div>
                                                </div>

                                                {/* Role Badge */}
                                                {company.myRole && (
                                                    <div className="flex items-center gap-2 mt-3">
                                                        <RoleIcon className="h-4 w-4 text-primary" />
                                                        <Badge
                                                            variant="secondary"
                                                            className={`text-xs font-medium ${getRoleColor(company.myRole)}`}
                                                        >
                                                            {company.myRole}
                                                        </Badge>
                                                    </div>
                                                )}

                                                {/* Job Titles */}
                                                {company.myJobTitles && company.myJobTitles.length > 0 && (
                                                    <div className="mt-3">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Briefcase className="h-4 w-4 text-primary" />
                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                Your Job Titles:
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {company.myJobTitles.slice(0, 3).map((jobTitle) => (
                                                                <Badge
                                                                    key={jobTitle.id}
                                                                    variant="outline"
                                                                    className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                                                                >
                                                                    {jobTitle.title}
                                                                </Badge>
                                                            ))}
                                                            {company.myJobTitles.length > 3 && (
                                                                <Badge
                                                                    variant="outline"
                                                                    className="text-xs bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-700"
                                                                >
                                                                    +{company.myJobTitles.length - 3} more
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </CardHeader>

                                            <CardContent className="pt-0">
                                                <div className="space-y-3 mb-6">
                                                    {/* <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>
                                                            Established: {new Date(company.established_date).getFullYear()}
                                                        </span>
                                                    </div> */}

                                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>
                                                            Member since {new Date(company.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>

                                                <Button
                                                    onClick={() => handleCompanySelect(company)}
                                                    disabled={isLoading}
                                                    className="w-full group"
                                                    size="lg"
                                                >
                                                    {isLoading && selectedCompany === company.id ? (
                                                        <>
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                                            Selecting...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Select Company
                                                            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                                                        </>
                                                    )}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-16 animate-in fade-in slide-in-from-bottom duration-500">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                                <Building2 className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                No Companies Available
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                                You don't have access to any companies yet. Please contact your administrator to get access to a company.
                            </p>
                            <Button variant="outline" onClick={() => window.history.back()}>
                                Go Back
                            </Button>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="text-center mt-16 animate-in fade-in slide-in-from-bottom duration-500 delay-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Need help? Contact your administrator for company access
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
