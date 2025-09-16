import React from 'react'
import EmployeeItem from './EmployeeItem'
import { Employee } from '@/Types'

export default function EmployeesList({ employees }: { employees: Employee[] }) {
    return (
        <div className="grid gap-4">
            {employees.map((employee, index) => (
                <EmployeeItem key={employee.id} employee={employee} index={index} />
            ))}
        </div>
    )
}
