/**
 * DeleteModal Usage Examples
 * 
 * This file demonstrates various ways to use the DeleteModal component
 * with different configurations and scenarios.
 */

import React, { useState } from 'react';
import { DeleteModal } from '@/Components/Shared/DeleteModal';
import { Button } from '@/Components/Ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/Components/Ui/avatar';
import { Trash2, Archive, UserX, Building, AlertTriangle } from 'lucide-react';

export function DeleteModalExamples() {
    const [basicModalOpen, setBasicModalOpen] = useState(false);
    const [customModalOpen, setCustomModalOpen] = useState(false);
    const [archiveModalOpen, setArchiveModalOpen] = useState(false);
    const [multiItemModalOpen, setMultiItemModalOpen] = useState(false);
    const [userDeleteModalOpen, setUserDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Mock data
    const selectedCompany = {
        id: 1,
        name: 'Acme Corporation',
        industry: 'Technology',
        logo: '/images/acme-logo.png'
    };

    const selectedItems = [
        { id: 1, name: 'Document 1.pdf' },
        { id: 2, name: 'Image 2.jpg' },
        { id: 3, name: 'Spreadsheet 3.xlsx' }
    ];

    const selectedUser = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@company.com',
        avatar: '/images/john-avatar.jpg'
    };

    const handleBasicDelete = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        setBasicModalOpen(false);
        console.log('Basic delete completed');
    };

    const handleCustomDelete = async () => {
        console.log('Custom delete action for company:', selectedCompany.name);
        setCustomModalOpen(false);
    };

    const handleArchive = async () => {
        console.log('Archive action completed');
        setArchiveModalOpen(false);
    };

    const handleMultiItemDelete = async () => {
        console.log('Deleting multiple items:', selectedItems);
        setMultiItemModalOpen(false);
    };

    const handleUserDelete = async () => {
        console.log('Deleting user:', selectedUser.name);
        setUserDeleteModalOpen(false);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="max-w-4xl">
                <h1 className="text-3xl font-bold mb-2">DeleteModal Examples</h1>
                <p className="text-muted-foreground mb-6">
                    Various configurations of the DeleteModal component
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Basic Usage */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">1. Basic Usage</h3>
                        <p className="text-sm text-muted-foreground">
                            Simple delete modal with default text and styling
                        </p>
                        <Button 
                            variant="destructive" 
                            onClick={() => setBasicModalOpen(true)}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Basic Delete
                        </Button>
                    </div>

                    {/* Custom Title and Description */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">2. Custom Content</h3>
                        <p className="text-sm text-muted-foreground">
                            Custom title, description, and company preview
                        </p>
                        <Button 
                            variant="destructive" 
                            onClick={() => setCustomModalOpen(true)}
                        >
                            <Building className="h-4 w-4 mr-2" />
                            Delete Company
                        </Button>
                    </div>

                    {/* Archive Action */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">3. Archive Action</h3>
                        <p className="text-sm text-muted-foreground">
                            Different action with outline variant
                        </p>
                        <Button 
                            variant="outline" 
                            onClick={() => setArchiveModalOpen(true)}
                        >
                            <Archive className="h-4 w-4 mr-2" />
                            Archive Item
                        </Button>
                    </div>

                    {/* Multiple Items */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">4. Multiple Items</h3>
                        <p className="text-sm text-muted-foreground">
                            Custom children with list of items
                        </p>
                        <Button 
                            variant="destructive" 
                            onClick={() => setMultiItemModalOpen(true)}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Multiple
                        </Button>
                    </div>

                    {/* User Deletion */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">5. User Deletion</h3>
                        <p className="text-sm text-muted-foreground">
                            User-specific delete with avatar and details
                        </p>
                        <Button 
                            variant="destructive" 
                            onClick={() => setUserDeleteModalOpen(true)}
                        >
                            <UserX className="h-4 w-4 mr-2" />
                            Delete User
                        </Button>
                    </div>
                </div>
            </div>

            {/* 1. Basic Delete Modal */}
            <DeleteModal
                open={basicModalOpen}
                onOpenChange={setBasicModalOpen}
                onConfirm={handleBasicDelete}
                loading={loading}
            />

            {/* 2. Custom Company Delete Modal */}
            <DeleteModal
                open={customModalOpen}
                onOpenChange={setCustomModalOpen}
                onConfirm={handleCustomDelete}
                title={`Delete Company "${selectedCompany.name}"`}
                description="Are you sure you want to delete this company? This will permanently remove all associated data."
                actionButtonText="Delete Company"
            >
                <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={selectedCompany.logo} alt={selectedCompany.name} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    {selectedCompany.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{selectedCompany.name}</p>
                                <p className="text-sm text-muted-foreground">{selectedCompany.industry}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
                        <p className="text-sm text-destructive">
                            This action will permanently delete all company data, employees, and cannot be undone.
                        </p>
                    </div>
                </div>
            </DeleteModal>

            {/* 3. Archive Modal */}
            <DeleteModal
                open={archiveModalOpen}
                onOpenChange={setArchiveModalOpen}
                onConfirm={handleArchive}
                title="Archive Item"
                description="The item will be moved to archives and can be restored later."
                actionButtonText="Archive"
                actionVariant="outline"
                icon={
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <Archive className="h-5 w-5 text-blue-600" />
                    </div>
                }
            />

            {/* 4. Multiple Items Delete Modal */}
            <DeleteModal
                open={multiItemModalOpen}
                onOpenChange={setMultiItemModalOpen}
                onConfirm={handleMultiItemDelete}
                title="Delete Multiple Items"
                size="lg"
            >
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        You are about to delete the following {selectedItems.length} items:
                    </p>
                    <div className="max-h-32 overflow-y-auto border rounded-lg">
                        <ul className="divide-y">
                            {selectedItems.map((item, index) => (
                                <li key={item.id} className="p-3 flex items-center gap-3">
                                    <div className="w-2 h-2 bg-destructive rounded-full flex-shrink-0" />
                                    <span className="text-sm">{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                        <p className="text-sm text-destructive font-medium">
                            This action cannot be undone.
                        </p>
                    </div>
                </div>
            </DeleteModal>

            {/* 5. User Delete Modal */}
            <DeleteModal
                open={userDeleteModalOpen}
                onOpenChange={setUserDeleteModalOpen}
                onConfirm={handleUserDelete}
                title={`Remove User "${selectedUser.name}"`}
                description="This will permanently remove the user from the system and revoke all access."
                actionButtonText="Remove User"
            >
                <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    {selectedUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{selectedUser.name}</p>
                                <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                            </div>
                        </div>
                    </div>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                        <li>• All user data will be permanently deleted</li>
                        <li>• User will lose access to all systems</li>
                        <li>• Associated records will be anonymized</li>
                        <li>• This action cannot be reversed</li>
                    </ul>
                </div>
            </DeleteModal>
        </div>
    );
}