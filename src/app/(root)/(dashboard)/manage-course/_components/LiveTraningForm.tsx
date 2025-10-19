/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useEffect, useState } from 'react';
import { Calendar, ChevronDown, ChevronRight, FileText, Plus, Trash, Upload, Video } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import FormTextArea from '@/components/Forms/FormTextArea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Forms/ShadcnForm';
import { Button } from '@/components/ui/button';


// Enums
export enum TrainingStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export enum TrainingLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}
export enum ModuleType {
  LIVE_CLASS = 'LIVE_CLASS',
  RECORDED_VIDEO = 'RECORDED_VIDEO',
}
export enum ModuleStatus {
  UPCOMING = 'UPCOMING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

// ✅ Updated: Added `score` field
export interface AssignmentQuestion {
  id?: string;
  question: string;
  image?: string;
  score?: number; // <-- new field
}

export interface ModuleAssignment {
  title?: string;
  image?: string;
  description?: string;
  startTimeAssignment?: Date | string;
  endTimeAssignment?: Date | string;
  questions: AssignmentQuestion[];
}

export interface TrainingVideo {
  id?: string;
  title: string;
  description?: string;
  duration?: string;
  videoUrl?: string;
  thumbnail?: string;
  order: number;
}

export interface ModuleResource {
  id?: string;
  name: string;
  type: string;
  textUrl?: string;
  fileSize?: string;
}

export interface TrainingModule {
  id?: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  moduleType: ModuleType;
  order: number;
  duration?: number;
  resources?: string;
  liveClassLink?: string;
  liveClassSummary?: string;
  liveStartTime?: Date | string;
  liveEndTime?: Date | string;
  recordingUrl?: string;
  sendboxLab?: string;
  startTimeSendbox?: Date | string;
  endTimeSendbox?: Date | string;
  status: ModuleStatus;
  videos: TrainingVideo[];
  resourcesList: ModuleResource[];
  assignment?: ModuleAssignment;
}

export interface LiveTraining {
  id?: string;
  title: string;
  slug: string;
  image?: string;
  price: number;
  description?: string;
  relatedTopics: { value: string }[];
  learningOutcome: { value: string }[];
  requirement: { value: string }[];
  overview?: string;
  status: TrainingStatus;
  level: TrainingLevel;
  category?: string;
  tags: { value: string }[];
  discountPrice?: number;
  currentEnrollment?: number;
  featured: boolean;
  certificateIncluded: boolean;
  modules: TrainingModule[];
}

interface LiveTrainingFormProps {
  liveTraining?: LiveTraining;
  onSubmit: (data: LiveTraining) => void;
  loading?: boolean;
}

// Module Sub-Component
const ModuleFormSection = ({ control, moduleIndex, remove }: any) => {
  const moduleType = control._formValues?.modules?.[moduleIndex]?.moduleType;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLiveClass, setShowLiveClass] = useState(false);
  const [showSandboxLab, setShowSandboxLab] = useState(false);
  const [showAssignment, setShowAssignment] = useState(false);

  const {
    fields: videoFields,
    append: appendVideo,
    remove: removeVideo,
  } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.videos`,
  });

  const {
    fields: resourceFields,
    append: appendResource,
    remove: removeResource,
  } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.resourcesList`,
  });

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.assignment.questions`,
  });

  return (
    <div className="rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-800">
      <div
        className="flex cursor-pointer items-center justify-between p-4"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-2">
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Module {moduleIndex + 1}</h4>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            remove(moduleIndex);
          }}
        >
          <Trash className="h-4 w-4 text-red-500" />
        </Button>
      </div>
      {!isCollapsed && (
        <div className="space-y-4 p-6 pt-0">
          {/* Module Basic Info */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={control}
              name={`modules.${moduleIndex}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Module Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter module title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`modules.${moduleIndex}.moduleType`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Module Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ModuleType.LIVE_CLASS}>Live Class</SelectItem>
                        <SelectItem value={ModuleType.RECORDED_VIDEO}>Recorded Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`modules.${moduleIndex}.status`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ModuleStatus.UPCOMING}>Upcoming</SelectItem>
                        <SelectItem value={ModuleStatus.IN_PROGRESS}>In Progress</SelectItem>
                        <SelectItem value={ModuleStatus.COMPLETED}>Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name={`modules.${moduleIndex}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <FormTextArea placeholder="Module description" {...field} className="min-h-[50px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Live Class Toggle Button */}
          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowLiveClass(!showLiveClass)}
              className="flex items-center gap-2"
            >
              {showLiveClass ? <ChevronDown className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
              {showLiveClass ? 'Hide Live Class' : 'Add Live Class'}
            </Button>
          </div>
          {showLiveClass && moduleType === ModuleType.LIVE_CLASS && (
            <div className="space-y-4 border-t pt-4">
              <h5 className="font-medium text-gray-700 dark:text-white">Live Class Details</h5>
              <FormField
                control={control}
                name={`modules.${moduleIndex}.liveClassLink`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Class Link</FormLabel>
                    <FormControl>
                      <Textarea placeholder="https://meet.google.com/xxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`modules.${moduleIndex}.liveClassSummary`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Class Summary</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Summary of live class content..." {...field} className="min-h-[70px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={control}
                  name={`modules.${moduleIndex}.liveStartTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`modules.${moduleIndex}.liveEndTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name={`modules.${moduleIndex}.recordingUrl`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recording URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Recording URL after session" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {/* Sandbox Lab Toggle Button */}
          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowSandboxLab(!showSandboxLab)}
              className="flex items-center gap-2"
            >
              {showSandboxLab ? <ChevronDown className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
              {showSandboxLab ? 'Hide Sandbox Lab' : 'Add Sandbox Lab'}
            </Button>
          </div>
          {showSandboxLab && (
            <div className="space-y-4 border-t pt-4">
              <h5 className="font-medium text-gray-700 dark:text-white">Sandbox Lab Details</h5>
              <FormField
                control={control}
                name={`modules.${moduleIndex}.sendboxLab`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sandbox Lab Link</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Sandbox environment URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={control}
                  name={`modules.${moduleIndex}.startTimeSendbox`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lab Start Time</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`modules.${moduleIndex}.endTimeSendbox`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lab End Time</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          {/* Assignment Toggle Button */}
          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setShowAssignment(!showAssignment);
                if (!showAssignment) {
                  const current = control._formValues.modules[moduleIndex];
                  if (!current.assignment) {
                    control._formValues.modules[moduleIndex].assignment = {
                      title: '',
                      description: '',
                      image: '',
                      startTimeAssignment: '',
                      endTimeAssignment: '',
                      questions: [],
                    };
                  }
                }
              }}
              className="flex items-center gap-2"
            >
              {showAssignment ? <ChevronDown className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
              {showAssignment ? 'Hide Assignment' : 'Add Assignment'}
            </Button>
          </div>
          {showAssignment && (
            <div className="border-t pt-4">
              <h5 className="mb-3 font-medium text-gray-700 dark:bg-gray-800 dark:text-white">Assignment</h5>
              <div className="mt-4 space-y-4 rounded border p-4 dark:border-slate-300 dark:bg-gray-800">
                <FormField
                  control={control}
                  name={`modules.${moduleIndex}.assignment.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assignment Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Semiconductor Fundamentals Assignment" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`modules.${moduleIndex}.assignment.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the assignment..." {...field} className="min-h-[60px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={control}
                    name={`modules.${moduleIndex}.assignment.startTimeAssignment`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            {...field}
                            value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`modules.${moduleIndex}.assignment.endTimeAssignment`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            {...field}
                            value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={control}
                  name={`modules.${moduleIndex}.assignment.image`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assignment Image URL (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ✅ Score Field */}
                <FormField
                  control={control}
                  name={`modules.${moduleIndex}.assignment.score`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Score</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Questions */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-medium text-gray-700 dark:text-white">Questions</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        appendQuestion({
                          question: '',
                          image: '',
                          score: 0, // ✅ initialize with default score
                        })
                      }
                    >
                      <Plus className="mr-1 h-4 w-4" /> Add Question
                    </Button>
                  </div>
                  {questionFields.map((q, qIndex) => (
                    <div
                      key={q.id}
                      className="mb-3 rounded border bg-gray-50  p-3 dark:border-slate-300 dark:bg-gray-700"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-sm font-medium">Question {qIndex + 1}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeQuestion(qIndex)}>
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      <div className="mt-2 space-y-2">
                        <FormField
                          control={control}
                          name={`modules.${moduleIndex}.assignment.questions.${qIndex}.question`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Question Text</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Enter question..." {...field} className="min-h-[60px]" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`modules.${moduleIndex}.assignment.questions.${qIndex}.image`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Image URL (optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="https://example.com/q-image.jpg" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                  {questionFields.length === 0 && (
                    <p className="text-sm italic text-gray-500 dark:text-white">No questions added yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Videos Section */}
          <div className="border-t pt-4">
            <div className="mb-3 flex items-center justify-between dark:border-slate-300">
              <h5 className="font-medium text-gray-700 dark:text-white">Videos</h5>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendVideo({
                    title: '',
                    description: '',
                    duration: '',
                    videoUrl: '',
                    thumbnail: '',
                    order: videoFields.length,
                  })
                }
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> Add Video
              </Button>
            </div>
            {videoFields.map((video, videoIndex) => (
              <div
                key={video.id}
                className="mb-3 rounded-md border border-gray-200 bg-white p-3 dark:border-slate-400 dark:bg-gray-800"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Video {videoIndex + 1}</span>
                  <Button type="button" variant="ghost" onClick={() => removeVideo(videoIndex)}>
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <FormField
                    control={control}
                    name={`modules.${moduleIndex}.videos.${videoIndex}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Video Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Video title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`modules.${moduleIndex}.videos.${videoIndex}.duration`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Duration (HH:MM:SS)</FormLabel>
                        <FormControl>
                          <Input placeholder="00:30:00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`modules.${moduleIndex}.videos.${videoIndex}.videoUrl`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-sm">Video URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Video URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Resources Section */}
          <div className="border-t pt-4">
            <div className="mb-3 flex items-center justify-between">
              <h5 className="font-medium text-gray-700 dark:text-white">Resources</h5>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendResource({
                    name: '',
                    type: '',
                    textUrl: '',
                    fileSize: '',
                  })
                }
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> Add Resource
              </Button>
            </div>
            {resourceFields.map((resource, resourceIndex) => (
              <div
                key={resource.id}
                className="mb-3 rounded-md border border-gray-200 bg-white p-3 dark:border-slate-300 dark:bg-gray-800"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Resource {resourceIndex + 1}</span>
                  <Button type="button" variant="ghost" onClick={() => removeResource(resourceIndex)}>
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <FormField
                    control={control}
                    name={`modules.${moduleIndex}.resourcesList.${resourceIndex}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Resource Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Resource name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`modules.${moduleIndex}.resourcesList.${resourceIndex}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Resource Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Resource name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`modules.${moduleIndex}.resourcesList.${resourceIndex}.textUrl`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-sm">URL</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Resource URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main Form Component
export const LiveTrainingForm = ({ liveTraining, onSubmit, loading = false }: LiveTrainingFormProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  // const { role } = getUserInfo() as any;

  const defaultModule = {
    title: '',
    slug: '',
    description: '',
    content: '',
    moduleType: ModuleType.LIVE_CLASS,
    order: 0,
    duration: 0,
    status: ModuleStatus.UPCOMING,
    videos: [],
    resourcesList: [],
    assignment: undefined,
  };

  const form = useForm<LiveTraining>({
    defaultValues: liveTraining ?? {
      title: '',
      slug: '',
      image: '',
      price: 0,
      description: '',
      relatedTopics: [],
      learningOutcome: [],
      requirement: [],
      overview: '',
      status: TrainingStatus.ACTIVE,
      level: TrainingLevel.BEGINNER,
      category: '',
      tags: [],
      discountPrice: 0,
      featured: false,
      certificateIncluded: false,
      modules: [],
    },
  });

  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    control: form.control,
    name: 'modules',
  });

  const {
    fields: topicFields,
    append: appendTopic,
    remove: removeTopic,
  } = useFieldArray({
    control: form.control,
    name: 'relatedTopics',
  });

  const {
    fields: outcomeFields,
    append: appendOutcome,
    remove: removeOutcome,
  } = useFieldArray({
    control: form.control,
    name: 'learningOutcome',
  });

  const {
    fields: requirementFields,
    append: appendRequirement,
    remove: removeRequirement,
  } = useFieldArray({
    control: form.control,
    name: 'requirement',
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control: form.control,
    name: 'tags',
  });

  useEffect(() => {
    if (liveTraining) {
      form.reset(liveTraining);
      if (liveTraining.image) {
        setImageUrl(liveTraining.image);
      }
    }
  }, [liveTraining, form]);

  const handleImageUpload = async (url: string) => {
    setImageUrl(url);
    form.setValue('image', url);
  };

  // const deleteImage = async () => {
  //   if (!imageUrl) return;
  //   const key = imageUrl.split('/').pop();
  //   try {
  //     await axios.delete(`/upload-file`, { data: { key } });
  //     setImageUrl('');
  //     form.setValue('image', '');
  //   } catch (err: any) {
  //     toast.error('Failed To Delete Image');
  //   }
  // };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue('title', title);
    if (!liveTraining) {
      form.setValue('slug', generateSlug(title));
    }
  };

  const onSubmitForm = (data: LiveTraining) => {
    const cleanedData = {
      ...data,
      modules: data.modules.map((mod) => ({
        ...mod,
        assignment: mod.assignment
          ? {
              ...mod.assignment,
              questions: Array.isArray(mod.assignment.questions)
                ? mod.assignment.questions.map((q) => ({
                    ...q,
                    score: typeof q.score === 'number' ? q.score : 0,
                  }))
                : [],
            }
          : undefined,
      })),
    };
    onSubmit(cleanedData);
  };

  const categories = ['Engineering', 'VLSI', 'Semiconductor', 'Programming', 'Design'];
  const statuses = ['DRAFT', 'ACTIVE', 'INACTIVE'];
  const levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        <div className="space-y-6 p-4">
          {/* Tabs */}
          <div className="flex space-x-4 border-b">
            {['basic', 'content', 'modules', 'settings'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800 dark:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Basic Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Training title" {...field} onChange={handleTitleChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug *</FormLabel>
                      <FormControl>
                        <Input placeholder="training-slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value ?? ''}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Level" />
                          </SelectTrigger>
                          <SelectContent>
                            {levels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (BDT)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discountPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Training description" {...field} className="min-h-[120px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="overview"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Overview</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Training overview" {...field} className="min-h-[120px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel>Training Image</FormLabel>
                {/* <div className="mt-2">
                  {!imageUrl && <ImageUpload handleImageUpload={handleImageUpload} />}
                  {imageUrl && <ExistingImageUrl imageUrl={imageUrl} onDelete={deleteImage} />}
                </div> */}
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <FormLabel>Related Topics</FormLabel>
                  <Button type="button" variant="outline" onClick={() => appendTopic({ value: '' })}>
                    <Plus className="mr-2 h-4 w-4" /> Add
                  </Button>
                </div>
                {topicFields.map((field, index) => (
                  <div key={field.id} className="mb-2 flex items-center gap-2">
                    <Input {...form.register(`relatedTopics.${index}.value`)} placeholder="Topic" className="flex-1" />
                    <Button type="button" variant="ghost" onClick={() => removeTopic(index)}>
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <FormLabel>Learning Outcomes</FormLabel>
                  <Button type="button" variant="outline" onClick={() => appendOutcome({ value: '' })}>
                    <Plus className="mr-2 h-4 w-4" /> Add
                  </Button>
                </div>
                {outcomeFields.map((field, index) => (
                  <div key={field.id} className="mb-2 flex items-center gap-2">
                    <Input
                      {...form.register(`learningOutcome.${index}.value`)}
                      placeholder="Outcome"
                      className="flex-1"
                    />
                    <Button type="button" variant="ghost" onClick={() => removeOutcome(index)}>
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <FormLabel>Requirements</FormLabel>
                  <Button type="button" variant="outline" onClick={() => appendRequirement({ value: '' })}>
                    <Plus className="mr-2 h-4 w-4" /> Add
                  </Button>
                </div>
                {requirementFields.map((field, index) => (
                  <div key={field.id} className="mb-2 flex items-center gap-2">
                    <Input
                      {...form.register(`requirement.${index}.value`)}
                      placeholder="Requirement"
                      className="flex-1"
                    />
                    <Button type="button" variant="ghost" onClick={() => removeRequirement(index)}>
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <FormLabel>Tags</FormLabel>
                  <Button type="button" variant="outline" onClick={() => appendTag({ value: '' })}>
                    <Plus className="mr-2 h-4 w-4" /> Add
                  </Button>
                </div>
                {tagFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="relative m-1 inline-flex items-center rounded-full bg-gray-100 px-2 text-gray-700 shadow-sm dark:bg-gray-500 dark:text-white"
                  >
                    <Input
                      {...form.register(`tags.${index}.value`)}
                      placeholder="Tag"
                      className="w-auto border-none bg-transparent p-0 pr-2 text-sm placeholder:text-gray-400 focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="absolute -right-1 -top-1 rounded-full bg-white p-[2px] text-gray-500 transition hover:bg-gray-50 hover:text-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modules Tab */}
          {activeTab === 'modules' && (
            <div className="space-y-4">
              <div className="mb-1 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Training Modules</h3>
                {moduleFields.length > 0 && (
                  <div className="sticky top-0 z-10 mb-1 flex flex-wrap gap-2 rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                    {moduleFields.map((_, index) => (
                      <Button
                        key={index}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const el = document.getElementById(`module-${index}`);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            el.classList.add('ring-2', 'ring-blue-500');
                            setTimeout(() => el.classList.remove('ring-2', 'ring-blue-500'), 1500);
                          }
                        }}
                        className="h-8 w-8 p-0 text-sm font-medium"
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </div>
                )}
                <Button type="button" onClick={() => appendModule(defaultModule)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Module
                </Button>
              </div>
              {moduleFields.map((field, index) => (
                <div id={`module-${index}`} key={field.id}>
                  <ModuleFormSection control={form.control} moduleIndex={index} remove={removeModule} />
                </div>
              ))}
              {moduleFields.length === 0 && (
                <div className="rounded-lg border-2 border-dashed border-gray-300 py-12 text-center">
                  <Video className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                  <p className="mb-4 text-gray-500">No modules added yet</p>
                  <Button type="button" onClick={() => appendModule(defaultModule)}>
                    Create First Module
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Training Status</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <FormLabel>Featured Training</FormLabel>
                      <p className="text-sm text-gray-500 dark:text-white">Display on featured section</p>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="certificateIncluded"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <FormLabel>Certificate Included</FormLabel>
                      <p className="text-sm text-gray-500 dark:text-white">Provide certificate upon completion</p>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-4 border-t pt-6">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : liveTraining ? 'Update Training' : 'Create Training'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LiveTrainingForm;
