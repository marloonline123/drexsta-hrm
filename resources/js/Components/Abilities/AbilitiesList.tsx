import { Ability } from '@/Types/abilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/Ui/table';
import { Badge } from '@/Components/Ui/badge';
import { Button } from '@/Components/Ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/Ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Zap } from 'lucide-react';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import EditAbilityModal from './EditAbilityModal';
import DeleteAbilityModal from './DeleteAbilityModal';
import { hasPermissionTo } from '@/Lib/permissions';
import { Auth } from '@/Types';

interface AbilitiesListProps {
    abilities: Ability[];
}

export default function AbilitiesList({ abilities }: AbilitiesListProps) {
    const { user } = usePage().props.auth as Auth;
    const [editingAbility, setEditingAbility] = useState<Ability | null>(null);
    const [deletingAbility, setDeletingAbility] = useState<Ability | null>(null);

    const getAbilityStatusColor = (usersCount: number) => {
        if (usersCount === 0) return 'secondary';
        if (usersCount <= 5) return 'default';
        if (usersCount <= 20) return 'secondary';
        return 'default';
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Abilities</CardTitle>
            </CardHeader>
            <CardContent>
                {abilities.length > 0 ? (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{'Ability Key'}</TableHead>
                                    <TableHead>{'Label'}</TableHead>
                                    <TableHead>{'Users'}</TableHead>
                                    <TableHead className="w-[70px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {abilities.map((ability) => (
                                    <TableRow key={ability.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                                    <Zap className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{ability.key}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{ability.label}</div>
                                                {ability.description && (
                                                    <div className="text-sm text-muted-foreground truncate max-w-xs">
                                                        {ability.description}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getAbilityStatusColor(ability.users_count)}>
                                                {ability.users_count} users
                                            </Badge>
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
                                                    {hasPermissionTo(user, 'abilities.edit') && (
                                                        <DropdownMenuItem onClick={() => setEditingAbility(ability)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuSeparator />
                                                    {hasPermissionTo(user, 'abilities.delete') && (
                                                        <DropdownMenuItem
                                                            onClick={() => setDeletingAbility(ability)}
                                                            className="text-destructive"
                                                            disabled={ability.users_count > 0}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <Zap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Abilities Found</h3>
                        <p className="text-muted-foreground">
                            Create your first ability to get started
                        </p>
                    </div>
                )}
            </CardContent>

            {/* Modals */}
            {editingAbility && (
                <EditAbilityModal
                    ability={editingAbility}
                    open={true}
                    onOpenChange={(open) => !open && setEditingAbility(null)}
                />
            )}

            {deletingAbility && (
                <DeleteAbilityModal
                    ability={deletingAbility}
                    open={true}
                    onOpenChange={(open) => !open && setDeletingAbility(null)}
                />
            )}
        </Card>
    );
}