'use client';

import { SubmitForm } from '@/components/submit/SubmitForm';
import { Alert } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

export default function SubmitPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-reenie text-4xl sm:text-5xl text-center mb-8">
          Share Your Message
        </h1>
        
        <Alert className="mb-8 border-blue-100 bg-blue-50 text-blue-800">
          <InfoIcon className="h-4 w-4" />
          <p className="text-sm">
            Share your message with care! Please avoid including any sensitive or personal information like phone numbers,
            addresses, or private details. Please use appropriate language.
          </p>
        </Alert>

        <SubmitForm />
      </div>
    </div>
  );
}