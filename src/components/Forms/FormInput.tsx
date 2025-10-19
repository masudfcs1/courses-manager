// FormInput.tsx
'use client';

import React from 'react';
import { getErrorMessageByPropertyName } from '@/utils/schema-validator';
import { Controller, useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';

interface IInput {
  name: string;
  type?: string;
  size?: 'large' | 'small';
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  readonly?: boolean;
  required?: boolean;
  defaultValue?: string;
  className?: string;
}
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

const FormInput = ({
  name,
  type,
  size = 'large',
  value,
  id,
  defaultValue,
  placeholder,
  validation,
  label,
  readonly,
  className,
  required = false,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={{ required }}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input
            type={type}
            className={cn('w-full', className)}
            {...field}
            placeholder={placeholder}
            readOnly={readonly}
          />
        )}
      />
      {errors[name] && <p className="text-sm text-red-500">This field is required</p>}
    </div>
  );
};

export default FormInput;
