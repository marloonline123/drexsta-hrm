import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Employee } from '@/Types/employees';
import { router } from '@inertiajs/react';
import { User, Key } from 'lucide-react';
import { Separator } from '@/Components/Ui/separator';
import { Badge } from '@/Components/Ui/badge';
import { Checkbox } from '@/Components/Ui/checkbox';
import { FormEvent, useState } from 'react';
import { Ability } from '@/Types/approval-policies';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Employees',
        href: route('dashboard.employees.index'),
    },
];

interface AssignAbilitiesProps {
    employee: Employee;
    abilities: Ability[]; // We'll need to define proper types for abilities
}

export default function AssignAbilities({ employee, abilities }: AssignAbilitiesProps) {
    const [selectedAbilities, setSelectedAbilities] = useState<number[]>(
        employee.permissions?.map(permission => permission.id) || []
    );

    const handleAbilityToggle = (abilityId: number) => {
        setSelectedAbilities(prev => 
            prev.includes(abilityId) 
                ? prev.filter(id => id !== abilityId)
                : [...prev, abilityId]
        );
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        router.post(route('dashboard.employees.assign-abilities', employee.id), {
            abilities: selectedAbilities
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Assign Abilities - ${employee.name}`} />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Key className="h-8 w-8" />
                            Assign Abilities
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Manage abilities for employee: {employee.name}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Employee Info Card */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Employee</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="bg-primary/10 rounded-full p-4">
                                        <User className="h-12 w-12 text-primary" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-semibold">{employee.name}</h3>
                                        <p className="text-muted-foreground">{employee.email}</p>
                                    </div>
                                </div>
                                
                                <Separator />
                                
                                <div>
                                    <h4 className="font-semibold mb-2">Current Abilities</h4>
                                    {employee.permissions && employee.permissions.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {employee.permissions.map((permission) => (
                                                <Badge key={permission.id} variant="secondary" className="mr-2 mb-2">
                                                    {permission.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground text-sm">No abilities assigned</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Abilities Assignment Card */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Available Abilities</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {abilities && abilities.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {abilities.map((ability) => (
                                                <div 
                                                    key={ability.id} 
                                                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                                                >
                                                    <Checkbox
                                                        id={`ability-${ability.id}`}
                                                        checked={selectedAbilities.includes(ability.id)}
                                                        onCheckedChange={() => handleAbilityToggle(ability.id)}
                                                    />
                                                    <div className="flex-1">
                                                        <label 
                                                            htmlFor={`ability-${ability.id}`} 
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            {ability.key}
                                                        </label>
                                                        {ability.description && (
                                                            <p className="text-xs text-muted-foreground mt-1">
                                                                {ability.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <Key className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                            <h3 className="text-lg font-semibold mb-2">No abilities available</h3>
                                            <p className="text-muted-foreground">
                                                Create abilities first to assign them to employees.
                                            </p>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-end gap-3 pt-4">
                                        <Button 
                                            type="button" 
                                            variant="outline"
                                            onClick={() => router.visit(route('dashboard.employees.edit', employee.id))}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit">
                                            Save Abilities
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}