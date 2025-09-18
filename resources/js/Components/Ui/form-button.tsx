import React from 'react'
import { Button } from './button'
import { Loader } from 'lucide-react'

interface FormButtonProps {
    text: string
    loadingText?: string
    className?: string
    isLoading?: boolean
}

export default function FormButton({text, loadingText, className, isLoading}: FormButtonProps) {
  return (
      <Button type="submit" disabled={isLoading} className={className}>
          {isLoading ? (
            <span className='flex gap-2'><Loader className="mr-2 h-4 w-4 animate-spin" />{loadingText}</span>
          ) : text}
      </Button>
  )
}
