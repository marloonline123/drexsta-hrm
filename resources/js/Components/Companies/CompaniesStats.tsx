import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Company } from '@/Types/companies';
import { PaginatedData } from '@/Types/global';
import { t } from 'i18next';

export default function CompaniesStats({ companies }: { companies: PaginatedData<Company> }) {
    const companiesData: Company[] = companies.data || [];
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        {t('companies.totalCompanies')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="text-2xl font-bold">{companies.meta?.total}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        {t('companies.activeCompanies')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-green-600">
                        {companiesData.filter(c => c.is_active).length}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        {t('companies.employeesCount')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="text-2xl font-bold">
                        {companies.meta?.employees_count}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
