'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import ImageCompress from 'quill-image-compress';
import { Controller, useFormContext } from 'react-hook-form';
import { Quill } from 'react-quill';

import { cn } from '@/lib/utils';

import 'react-quill/dist/quill.snow.css';

type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// Register the ImageCompress module with Quill
Quill.register('modules/imageCompress', ImageCompress);

const FormTextArea = ({ name, label, rows, value, placeholder, required = false, className }: TextAreaProps) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  type QuillConfig = {
    readOnly?: boolean;
    placeholder?: string;
  };

  const config: QuillConfig = useMemo(
    () => ({
      readOnly: false,
      placeholder: placeholder || 'Start typing...',
    }),
    [placeholder]
  );

  const hasError = errors[name];

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <div className="relative">
            <div
              className={cn(
                className,
                'overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 dark:bg-gray-900',
                hasError
                  ? 'border-red-200 focus-within:border-red-400 dark:border-red-800 dark:focus-within:border-red-500'
                  : 'border-gray-200 focus-within:border-blue-400 dark:border-gray-700 dark:focus-within:border-blue-500',
                'focus-within:shadow-md focus-within:ring-1',
                hasError
                  ? 'focus-within:ring-red-100 dark:focus-within:ring-red-900/20'
                  : 'focus-within:ring-blue-100 dark:focus-within:ring-blue-900/20',
                className
              )}
            >
              <ReactQuill
                value={field.value || ''}
                onChange={(newContent) => {
                  field.onChange(newContent);
                  setValue(name, newContent);
                }}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                    ['link', 'image'],
                    ['clean'],
                  ],
                  imageCompress: {
                    quality: 0.7,
                    maxWidth: 1024,
                    maxHeight: 1024,
                    imageType: 'image/jpeg',
                  },
                }}
                formats={[
                  'header',
                  'bold',
                  'italic',
                  'underline',
                  'strike',
                  'blockquote',
                  'list',
                  'bullet',
                  'indent',
                  'link',
                  'image',
                ]}
                placeholder={config.placeholder}
                className={cn(
                  className,
                  'modern-quill border-none',
                  '[&_.ql-editor]:min-h-[100px] [&_.ql-editor]:text-[15px] [&_.ql-editor]:leading-relaxed',
                  '[&_.ql-toolbar]:border-none [&_.ql-toolbar]:bg-gray-50/80 dark:[&_.ql-toolbar]:bg-gray-800/80',
                  '[&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-100 dark:[&_.ql-toolbar]:border-gray-800',
                  '[&_.ql-container]:border-none',
                  '[&_.ql-editor]:bg-white dark:[&_.ql-editor]:bg-gray-900',
                  '[&_.ql-editor]:text-gray-900 dark:[&_.ql-editor]:text-gray-100',
                  // Toolbar styling
                  '[&_.ql-toolbar_.ql-picker-label]:text-gray-700 dark:[&_.ql-toolbar_.ql-picker-label]:text-gray-300',
                  '[&_.ql-toolbar_.ql-stroke]:stroke-gray-700 dark:[&_.ql-toolbar_.ql-stroke]:stroke-gray-300',
                  '[&_.ql-toolbar_.ql-fill]:fill-gray-700 dark:[&_.ql-toolbar_.ql-fill]:fill-gray-300',
                  // Button states
                  '[&_.ql-toolbar_button:hover]:bg-white/60 dark:[&_.ql-toolbar_button:hover]:bg-gray-700/60',
                  '[&_.ql-toolbar_button.ql-active]:bg-blue-50 dark:[&_.ql-toolbar_button.ql-active]:bg-blue-900/30',
                  '[&_.ql-toolbar_button.ql-active_.ql-stroke]:stroke-blue-600 dark:[&_.ql-toolbar_button.ql-active_.ql-stroke]:stroke-blue-400',
                  '[&_.ql-toolbar_button.ql-active_.ql-fill]:fill-blue-600 dark:[&_.ql-toolbar_button.ql-active_.ql-fill]:fill-blue-400',
                  // Placeholder
                  '[&_.ql-editor.ql-blank::before]:text-gray-400 dark:[&_.ql-editor.ql-blank::before]:text-gray-500',
                  '[&_.ql-editor.ql-blank::before]:font-normal'
                )}
                theme="snow"
              />
            </div>

            {/* Error message */}
            {hasError && (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
                <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                This field is required
              </p>
            )}
          </div>
        )}
      />

      <style jsx global>{`
        .modern-quill .ql-toolbar {
          padding: 16px 20px;
          border-radius: 16px 16px 0 0;
        }

        .modern-quill .ql-container {
          border-radius: 0 0 16px 16px;
        }

        .modern-quill .ql-editor {
          padding: 20px;
          line-height: 1.6;
        }

        .modern-quill .ql-toolbar button {
          border-radius: 8px;
          padding: 8px;
          margin: 0 1px;
          width: 34px;
          height: 34px;
          transition: all 0.15s ease;
        }

        .modern-quill .ql-toolbar .ql-picker {
          border-radius: 8px;
        }

        .modern-quill .ql-snow .ql-tooltip {
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          border: 1px solid #f1f5f9;
          padding: 12px 16px;
        }

        .dark .modern-quill .ql-snow .ql-tooltip {
          background: #1e293b;
          border-color: #334155;
          color: #f1f5f9;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .modern-quill .ql-snow .ql-tooltip input[type='text'] {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 10px 14px;
          background: #f8fafc;
          font-size: 14px;
        }

        .dark .modern-quill .ql-snow .ql-tooltip input[type='text'] {
          border-color: #475569;
          background: #334155;
          color: #f1f5f9;
        }

        .modern-quill .ql-editor:focus {
          outline: none;
        }

        .dark .modern-quill .ql-container,
        .dark .modern-quill .ql-editor {
          background: #111827 !important; /* matches dark mode bg */
          border: none !important;
        }

        .modern-quill .ql-editor blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 16px;
          margin: 16px 0;
          color: #64748b;
          font-style: italic;
        }

        .dark .modern-quill .ql-editor blockquote {
          border-left-color: #60a5fa;
          color: #94a3b8;
        }

        .modern-quill .ql-toolbar .ql-picker-options {
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid #f1f5f9;
          padding: 8px;
          background: white;
        }

        .dark .modern-quill .ql-toolbar .ql-picker-options {
          background: #1e293b;
          border-color: #334155;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .modern-quill .ql-toolbar .ql-picker-item {
          padding: 8px 12px;
          border-radius: 6px;
          margin: 2px 0;
        }

        .modern-quill .ql-toolbar .ql-picker-item:hover {
          background: #f1f5f9;
        }

        .dark .modern-quill .ql-toolbar .ql-picker-item:hover {
          background: #334155;
        }
      `}</style>
    </div>
  );
};

export default FormTextArea;
