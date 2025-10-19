/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

// import Loading from '@/app/loading';

import LiveTrainingForm from '../_components/LiveTraningForm';
import { LucideClockFading } from 'lucide-react';

// Helper to convert datetime-local strings (YYYY-MM-DDTHH:mm) to a full ISO 8601 string (YYYY-MM-DDTHH:mm:ss.000Z)
// This ensures Prisma accepts the datetime string.
const normalizeDateTimeToISO = (value: string | null | undefined): string | null => {
  if (!value) return null;
  // Create a Date object from the input string (interpreted as local time by the browser)
  const date = new Date(value);
  // Check for invalid date
  if (isNaN(date.getTime())) {
    console.error(`Invalid date string received: ${value}`);
    return null;
  }
  // Convert to ISO string and remove the 'Z' (which implies UTC) to send a local time string.
  // Prisma will interpret this based on the server's timezone settings or treat it as naive.
  // Alternatively, you could convert to UTC if your server expects UTC: date.toISOString()
  // For most cases, converting to UTC using .toISOString() is safest for databases.
  return date.toISOString(); // This produces YYYY-MM-DDTHH:mm:ss.sssZ format
};

function CreateLiveTrainingPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any | undefined>(undefined);
  // const [createLiveTraining] = useCreateLiveTrainingMutation();

  const onSubmit = async (data: any) => {
    setFormData(data);
    try {
      setLoading(true);

      // Helper function to convert datetime-local to ISO string
      const toISOString = (dateValue: any): string | undefined => {
        if (!dateValue) return undefined;
        try {
          // If it's already a valid date string, parse it
          const date = new Date(dateValue);
          // Check if date is valid
          if (isNaN(date.getTime())) return undefined;
          return date.toISOString();
        } catch {
          return undefined;
        }
      };

      interface Video {
        title: string;
        description: string;
        duration: string;
        videoUrl: string;
        thumbnail: string;
      }

      interface Resource {
        name: string;
        type: string;
        textUrl: string;
      }

      interface Question {
        question: string;
        image: string;
      }

      interface Assignment {
        title: string;
        image: string;
        score: string; // Changed to string
        description: string;
        startTimeAssignment: string;
        endTimeAssignment: string;
        questions: Question[];
      }

      interface Module {
        title: string;
        slug: string;
        description: string;
        moduleType: string;
        status: string;
        liveClassLink: string;
        liveClassSummary: string;
        liveStartTime: string;
        liveEndTime: string;
        recordingUrl: string;
        sandboxLab: string;
        startTimeSandbox: string;
        endTimeSandbox: string;
        videos: Video[];
        resources: Resource[];
        assignment?: Assignment;
      }

      interface FormattedData {
        price: number;
        discountPrice: number;
        relatedTopics: string[];
        learningOutcome: string[];
        requirement: string[];
        tags: string[];
        modules: Module[];
        [key: string]: any;
      }

      const formattedData: FormattedData = {
        ...data,
        price: parseFloat(data.price) || 0,
        discountPrice: parseFloat(data.discountPrice) || 0,
        relatedTopics: Array.isArray(data.relatedTopics)
          ? data.relatedTopics.map((item: { value: string }) => item.value)
          : [],
        learningOutcome: Array.isArray(data.learningOutcome)
          ? data.learningOutcome.map((item: { value: string }) => item.value)
          : [],
        requirement: Array.isArray(data.requirement)
          ? data.requirement.map((item: { value: string }) => item.value)
          : [],
        tags: Array.isArray(data.tags) ? data.tags.map((item: { value: string }) => item.value) : [],
        modules: (data.modules || []).map(
          (module: any): Module => ({
            title: module.title,
            slug: module.slug,
            description: module.description,
            moduleType: module.moduleType,
            status: module.status,
            liveClassLink: module.liveClassLink,
            liveClassSummary: module.liveClassSummary,
            // Fix: Convert datetime-local to ISO string
            liveStartTime: toISOString(module.liveStartTime) || '',
            liveEndTime: toISOString(module.liveEndTime) || '',
            recordingUrl: module.recordingUrl,
            sandboxLab: module.sendboxLab,
            // Fix: Convert datetime-local to ISO string
            startTimeSandbox: toISOString(module.startTimeSendbox) || '',
            endTimeSandbox: toISOString(module.endTimeSendbox) || '',
            videos: (module.videos || []).map(
              (video: any): Video => ({
                title: video.title,
                description: video.description,
                duration: video.duration,
                videoUrl: video.videoUrl,
                thumbnail: video.thumbnail,
              })
            ),
            resources: (module.resourcesList || []).map(
              (resource: any): Resource => ({
                name: resource.name,
                type: resource.type,
                textUrl: resource.textUrl,
              })
            ),
            assignment: module.assignment
              ? {
                  title: module.assignment.title,
                  image: module.assignment.image,
                  // Fix: Convert score to string
                  score: module.assignment.score ? String(module.assignment.score) : '0',
                  description: module.assignment.description,
                  // Fix: Convert datetime-local to ISO string
                  startTimeAssignment: toISOString(module.assignment.startTimeAssignment) || '',
                  endTimeAssignment: toISOString(module.assignment.endTimeAssignment) || '',
                  questions: (module.assignment.questions || []).map(
                    (q: any): Question => ({
                      question: q.question,
                      image: q.image,
                    })
                  ),
                }
              : undefined,
          })
        ),
      };

      // const response = await createLiveTraining(formattedData).unwrap();
      toast.success('Live Training Created Successfully');
      // console.log('response:::::', response);
      window.history.back();
    } catch (err: any) {
      console.error('Error creating live training:', err);
      toast.error(err?.data?.message || 'Failed To Create Live Training');
      console.log('Full error:', err);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { title: 'Manage Live Training', link: '/dashboard/admin/manage-live-training' },
    { title: 'Create Live Training', link: '/dashboard/admin/manage-live-training/create' },
  ];

  return (
    <div className="py-5">
      <div className="ml-4 cursor-pointer text-xl">
        {/* <BreadCrumb items={breadcrumbItems} /> */}
      </div>
      {loading ? <LucideClockFading /> : <LiveTrainingForm onSubmit={onSubmit} liveTraining={formData} loading={loading} />}
    </div>
  );
}

export default CreateLiveTrainingPage;
