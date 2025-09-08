# DeleteModal Component

A reusable, customizable delete confirmation modal component built with shadcn/ui components and full internationalization support.

## Features

- ✅ Customizable action button text and variant
- ✅ Custom confirmation function
- ✅ Default warning text and messages (with i18n support)
- ✅ Optional custom text and children content
- ✅ Customizable title
- ✅ Loading states with disabled interactions
- ✅ Multiple size variants
- ✅ Custom icons support
- ✅ RTL layout compatible

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Whether the modal is open |
| `onOpenChange` | `(open: boolean) => void` | - | Function to call when modal should close |
| `onConfirm` | `() => void \| Promise<void>` | - | Function to call when delete action is confirmed |
| `title` | `string` | `t('common.confirmDelete')` | Title of the modal |
| `description` | `string` | `t('common.deleteWarning')` | Description text for the modal |
| `children` | `React.ReactNode` | - | Custom children to display instead of default content |
| `actionButtonText` | `string` | `t('common.delete')` | Text for the action (delete) button |
| `cancelButtonText` | `string` | `t('common.cancel')` | Text for the cancel button |
| `loading` | `boolean` | `false` | Whether the action is currently loading |
| `icon` | `React.ReactNode` | `<AlertTriangle>` | Custom icon to display |
| `actionVariant` | `ButtonVariant` | `'destructive'` | Variant of the action button |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the modal |
| `showIcon` | `boolean` | `true` | Whether to show the default warning icon |

## Basic Usage

```tsx
import { DeleteModal } from '@/components/ui/delete-modal';
import { useState } from 'react';

function MyComponent() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteItem();
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Delete failed:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <Button 
                variant="destructive" 
                onClick={() => setShowDeleteModal(true)}
            >
                Delete Item
            </Button>

            <DeleteModal
                open={showDeleteModal}
                onOpenChange={setShowDeleteModal}
                onConfirm={handleDelete}
                loading={isDeleting}
            />
        </>
    );
}
```

## Advanced Usage Examples

### Custom Title and Description

```tsx
<DeleteModal
    open={isOpen}
    onOpenChange={setIsOpen}
    onConfirm={handleDelete}
    title="Delete Company"
    description="Are you sure you want to delete this company? This action cannot be undone."
    actionButtonText="Delete Company"
/>
```

### Archive Action (Non-destructive)

```tsx
<DeleteModal
    open={isOpen}
    onOpenChange={setIsOpen}
    onConfirm={handleArchive}
    title="Archive Item"
    description="The item will be moved to archives and can be restored later."
    actionButtonText="Archive"
    actionVariant="outline"
    icon={<Archive className="h-5 w-5 text-blue-600" />}
/>
```

### Custom Content with Children

```tsx
<DeleteModal
    open={isOpen}
    onOpenChange={setIsOpen}
    onConfirm={handleDeleteMultiple}
    title="Delete Multiple Items"
    size="lg"
>
    <div className="space-y-3">
        <p>You are about to delete the following items:</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {selectedItems.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
        <p className="text-destructive text-sm font-medium">
            This action cannot be undone.
        </p>
    </div>
</DeleteModal>
```

### With Company/User Preview

```tsx
<DeleteModal
    open={isOpen}
    onOpenChange={setIsOpen}
    onConfirm={handleDeleteCompany}
    title={`Delete Company "${company.name}"`}
    description="This will permanently remove all associated data."
>
    <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={company.logo} alt={company.name} />
                    <AvatarFallback>{company.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{company.name}</p>
                    <p className="text-sm text-muted-foreground">{company.industry}</p>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-2 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <p className="text-sm text-destructive">
                This action will permanently delete all company data and cannot be undone.
            </p>
        </div>
    </div>
</DeleteModal>
```

## Internationalization

The component automatically uses translations from the i18n configuration:

```typescript
// English
common: {
    confirmDelete: 'Confirm Delete',
    deleteWarning: 'This action cannot be undone. Are you sure you want to proceed?',
    delete: 'Delete',
    cancel: 'Cancel',
    loading: 'Loading...'
}

// Arabic
common: {
    confirmDelete: 'تأكيد الحذف',
    deleteWarning: 'لا يمكن التراجع عن هذا الإجراء. هل أنت متأكد من رغبتك في المتابعة؟',
    delete: 'حذف',
    cancel: 'إلغاء',
    loading: 'جارٍ التحميل...'
}
```

## Styling

The component follows the shadcn/ui design system and includes:

- Responsive design (mobile-first)
- Purple color scheme adherence
- RTL layout support
- Loading states with visual feedback
- Accessibility features
- Animation transitions

## Dependencies

- `@radix-ui/react-dialog`
- `lucide-react`
- `class-variance-authority`
- Custom hooks: `useLanguage`
- shadcn/ui components: `Button`, `Dialog`

## Implementation Notes

1. **Error Handling**: The component catches and logs errors from the `onConfirm` function but lets the parent handle specific error UI.

2. **Loading States**: When `loading` is true, the modal cannot be closed and all interactive elements are disabled.

3. **Accessibility**: Built on Radix UI primitives for full accessibility support including focus management and keyboard navigation.

4. **Performance**: Uses React hooks efficiently and prevents unnecessary re-renders.