import React from 'react'
import { Button } from './button'
import { Loader } from 'lucide-react'

interface FormButtonProps {
    text: string
    loadingText?: string
    className?: string
    isLoading?: boolean
    type?: "button" | "submit" | "reset"
}

export default function FormButton({text, loadingText, className, isLoading, type = 'submit'}: FormButtonProps) {
  return (
      <Button disabled={isLoading} className={className} type={type} >
          {isLoading ? (
            <span className='flex gap-2'><Loader className="mr-2 h-4 w-4 animate-spin" />{loadingText}</span>
          ) : text}
      </Button>
  )
}
