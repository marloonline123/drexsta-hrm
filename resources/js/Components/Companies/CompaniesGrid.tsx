import React from 'react'
import CompanyCard from './CompanyCard'
import { Company } from '@/Types/companies'

export default function CompaniesGrid({ companies }: { companies: Company[] }) {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
          ))}
      </div>
  )
}
