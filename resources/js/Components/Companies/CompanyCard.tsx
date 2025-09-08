import { Company } from '@/Types/companies'
import { Button } from '@/Components/Ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/Ui/dropdown-menu';
import {
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    MapPin,
    Users,
    Phone,
    Mail,
    Calendar,
    CheckCircle,
    XCircle,
    Globe,
    FileText,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/Ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/Components/Ui/dialog';
import { DeleteModal } from '@/Components/Shared/DeleteModal';
import { Badge } from '@/Components/Ui/badge';
import { useState } from 'react';
import { useLanguage } from '@/Hooks/use-language';
import { router } from '@inertiajs/react';

export default function CompanyCard({ company }: { company: Company }) {
    const [viewCompany, setViewCompany] = useState<Company | null>(null);
    const [deleteCompany, setDeleteCompany] = useState<Company | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { t } = useLanguage();

    const getStatusBadge = (isActive: boolean) => {
        return isActive ? (
            <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                {t('companies.active')}
            </Badge>
        ) : (
            <Badge className="bg-red-100 text-red-800">
                <XCircle className="h-3 w-3 mr-1" />
                {t('companies.inactive')}
            </Badge>
        );
    };

    const handleDeleteCompany = async () => {
        if (!deleteCompany) return;

        setIsDeleting(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Here you would make the actual API call
            // await fetch(`/companies/${deleteCompany.id}`, { method: 'DELETE' });

            console.log('Company deleted:', deleteCompany.name);
            setDeleteCompany(null);
        } catch (error) {
            console.error('Failed to delete company:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={company.logo_url || ""} alt={company.name} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                                {company.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg">{company.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{company.industry}</p>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setViewCompany(company)}>
                                <Eye className="h-4 w-4 mr-2" />
                                {t('common.view')}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.visit(route('dashboard.companies.edit', company.id))}>
                                <Edit className="h-4 w-4 mr-2" />
                                {t('common.edit')}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDeleteCompany(company)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                {t('common.delete')}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center gap-2">
                    {getStatusBadge(company.is_active)}
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{company.employees_count} {t('companies.employeesCount')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{company.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{company.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{company.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{t('companies.establishedDate')}: {company.established_date}</span>
                    </div>
                </div>
            </CardContent>

            {/* View Company Dialog */}
            <Dialog open={!!viewCompany} onOpenChange={() => setViewCompany(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{t('companies.companyDetails')}</DialogTitle>
                    </DialogHeader>
                    {viewCompany && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={viewCompany.logo_url} alt={viewCompany.name} />
                                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                                        {viewCompany.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-xl font-bold">{viewCompany.name}</h3>
                                    <p className="text-muted-foreground">{viewCompany.industry}</p>
                                    {getStatusBadge(viewCompany.is_active)}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium mb-3">{t('companies.contactInfo')}</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            {viewCompany.email}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            {viewCompany.phone}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Globe className="h-4 w-4" />
                                            {viewCompany?.website ?? 'N/A'}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium mb-3">{t('companies.businessInfo')}</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4" />
                                            12000
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4" />
                                            {viewCompany.employees_count} employees
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            Est. {new Date(viewCompany.established_date).getFullYear()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2">{t('companies.address')}</h4>
                                <p className="text-sm text-muted-foreground">{viewCompany.address}</p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Modal */}
            <DeleteModal
                open={!!deleteCompany}
                onOpenChange={() => setDeleteCompany(null)}
                onConfirm={handleDeleteCompany}
                loading={isDeleting}
                title={deleteCompany ? `${t('companies.deleteCompany')} "${deleteCompany.name}"` : ''}
                description={deleteCompany ?
                    `${t('companies.confirmDelete')} ${t('companies.deleteWarning')}`
                    : ''
                }
            />
        </Card>
    )
}
