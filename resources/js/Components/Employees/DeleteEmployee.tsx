import { Employee } from '@/Types'
import React from 'react'
import { DeleteModal } from '../Shared/DeleteModal';
import { useForm } from '@inertiajs/react';
import { Button } from '../Ui/button';

export default function DeleteEmployee({ employee }: { employee: Employee }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const form = useForm()

    const handleDelete = () => {
        form.delete(route('dashboard.employees.destroy', employee.username));
    }
  return (
    <div>
          <Button
              onClick={() => setIsOpen(true)}
              disabled={form.processing}
              variant="destructive"
          >
              Delete Employee
          </Button>
        <DeleteModal 
            open={isOpen}
            onOpenChange={setIsOpen}
            onConfirm={handleDelete}
            loading={form.processing}
            title="Delete Employee"
            description="Are you sure you want to delete this employee? This action cannot be undone."
            actionButtonText="Delete Employee"
        />
    </div>
  )
}
