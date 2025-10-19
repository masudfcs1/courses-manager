'use client';

import { useState } from 'react';
import {
  Beaker,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileText,
  PlayCircle,
  Users,
} from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

interface Video {
  id: string;
  title: string;
  duration: string;
  recordVideo: string;
  status: 0 | 2;
  resources?: Resource[];
}

interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'excel' | 'doc' | 'zip';
}

interface Module {
  id: string;
  title: string;
  description: string;
  actions: 'live' | 'upcoming' | 'recorded';
  liveClass: string;
  resources: string;
  sendboxLab: string;
  startTimeSendbox: string;
  endTimeSendbox: string;
  statusDescription: 0 | 1;
  videos: Video[];
  resourcesList: Resource[];
}

interface Instructor {
  id: string;
  name: string;
  slug: string;
  title: string;
  profile: string;
}

function createSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const courseData = {
  id: 'course-1',
  title: 'Semiconductor Fundamentals & VLSI Design',
  slug: createSlug('Semiconductor Fundamentals & VLSI Design'),
  image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  priceBD: 3500,
  description:
    'Learn the core principles of semiconductor technology and modern VLSI design with practical simulation tools and real-world projects.',
  relatedTopics: ['Semiconductor', 'VLSI', 'Chip Design', 'Verilog'],
  learningOutcome: [
    'Understand semiconductor physics and device operation',
    'Design and simulate digital circuits using Verilog',
    'Gain hands-on experience with EDA tools',
    'Build and optimize your own VLSI projects',
  ],
  requirement: [
    'Basic knowledge of digital electronics',
    'A computer with internet access',
    'Interest in chip design or hardware engineering',
  ],
  overview:
    'This course provides in-depth coverage of semiconductor concepts, fabrication processes, and advanced VLSI design techniques.',
  createdAt: '2025-10-01',
  updatedAt: '2025-10-04',
  instructors: [
    {
      id: 'inst-1',
      name: 'Dr. Anika Rahman',
      slug: createSlug('Dr. Anika Rahman'),
      title: 'Senior VLSI Engineer, Intel',
      profile: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 'inst-2',
      name: 'Engr. Saiful Islam',
      slug: createSlug('Engr. Saiful Islam'),
      title: 'Semiconductor Researcher, BUET',
      profile: 'https://randomuser.me/api/portraits/men/47.jpg',
    },
  ],
  modules: [
    {
      id: 'module-1',
      title: 'Introduction to Semiconductors',
      description: 'Fundamental concepts of semiconductor physics and materials',
      actions: 'live' as const,
      liveClass: 'https://zoom.us/j/123456789',
      resources: '',
      sendboxLab: 'https://sandbox.example.com/semiconductor-lab',
      startTimeSendbox: '2024-01-15T10:00:00Z',
      endTimeSendbox: '2024-01-15T12:00:00Z',
      statusDescription: 0 as const,
      videos: [],
      resourcesList: [
        { id: 'res-1', name: 'Semiconductor Basics.pdf', type: 'pdf' as const },
        { id: 'res-2', name: 'Material Properties Chart.xlsx', type: 'excel' as const },
      ],

      // 🌈 Optional Assessment
      assessment: {
        isAssessmentAvailable: true,
        title: 'Semiconductor Fundamentals Assessment',
        image: 'https://images.unsplash.com/photo-1618897996310-2c2b418a3b1f?auto=format&fit=crop&w=800&q=80',
        description: 'Evaluate your understanding of semiconductor basics through conceptual and applied questions.',
        startTimeAssessment: '2024-01-20T10:00:00Z',
        endTimeAssessment: '2024-01-22T23:59:00Z',
        questions: [
          {
            id: 'q-1',
            question: 'Explain the difference between intrinsic and extrinsic semiconductors.',
            image: '',
          },
          {
            id: 'q-2',
            question: 'Analyze the following P-N junction diagram and describe the depletion region.',
            image: 'https://images.unsplash.com/photo-1618897996310-2c2b418a3b1f?auto=format&fit=crop&w=800&q=80',
          },
        ],
      },
    },
    {
      id: 'module-2',
      title: 'Advanced Circuit Design',
      description: 'Learn advanced techniques for designing semiconductor circuits',
      actions: 'upcoming' as const,
      liveClass: 'https://zoom.us/j/987654321',
      sendboxLab: 'https://sandbox.example.com/circuit-lab',
      startTimeSendbox: '2024-01-22T14:00:00Z',
      endTimeSendbox: '2024-01-22T16:00:00Z',
      statusDescription: 0 as const,
      videos: [
        {
          id: 'video-2-1',
          title: 'Circuit Analysis Fundamentals',
          duration: '20:15',
          recordVideo: 'https://example.com/recorded/video4.mp4',
          status: 0 as const,
        },
        {
          id: 'video-2-2',
          title: 'Transistor Applications',
          duration: '25:30',
          recordVideo: 'https://example.com/recorded/video5.mp4',
          status: 0 as const,
        },
      ],
      resourcesList: [
        { id: 'res-3', name: 'Circuit Design Guide.pdf', type: 'pdf' as const },
        { id: 'res-4', name: 'Component Specifications.zip', type: 'zip' as const },
      ],

      // 🎯 Optional Assessment
      assessment: {
        isAssessmentAvailable: true,
        title: 'Advanced Circuit Design Challenge',
        image: 'https://images.unsplash.com/photo-1618897996310-2c2b418a3b1f?auto=format&fit=crop&w=800&q=80',
        description: 'Test your circuit design skills with simulation-based and theoretical tasks.',
        startTimeAssessment: '2024-01-25T10:00:00Z',
        endTimeAssessment: '2024-01-28T23:59:00Z',
        questions: [
          {
            id: 'q-1',
            question: 'Design a simple amplifier circuit and provide the simulation output.',
            image: '',
          },
          {
            id: 'q-2',
            question: 'Discuss the impact of transistor sizing on power efficiency.',
            image: '',
          },
        ],
      },
    },
    {
      id: 'module-3',
      title: 'Fabrication Processes',
      description: 'Understanding semiconductor manufacturing and fabrication',
      actions: 'recorded' as const,
      sendboxLab: 'https://sandbox.example.com/fab-lab',
      startTimeSendbox: '2024-01-29T09:00:00Z',
      endTimeSendbox: '2024-01-29T11:00:00Z',
      statusDescription: 0 as const,
      videos: [
        {
          id: 'video-3-1',
          title: 'Clean Room Procedures',
          duration: '16:40',
          recordVideo: 'https://example.com/recorded/video6.mp4',
          status: 2 as const,
        },
        {
          id: 'video-3-2',
          title: 'Photolithography Techniques',
          duration: '22:10',
          recordVideo: 'https://example.com/recorded/video7.mp4',
          status: 2 as const,
        },
        {
          id: 'video-3-3',
          title: 'Etching and Deposition',
          duration: '19:25',
          recordVideo: 'https://example.com/recorded/video8.mp4',
          status: 0 as const,
        },
      ],
      resourcesList: [
        { id: 'res-5', name: 'Fabrication Process Flow.pdf', type: 'pdf' as const },
        { id: 'res-6', name: 'Equipment Manual.doc', type: 'doc' as const },
      ],

      // 💎 Optional Assessment
      assessment: {
        isAssessmentAvailable: false,
        title: '',
        description: '',
        startTimeAssessment: '',
        endTimeAssessment: '',
        questions: [],
      },
    },
  ],
};

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return '📄';
    case 'excel':
      return '📊';
    case 'doc':
      return '📝';
    case 'zip':
      return '📦';
    default:
      return '📎';
  }
};

type ModuleState = typeof courseData.modules;

export default function CourseDetailsPage() {
  const [modules, setModules] = useState<ModuleState>(courseData.modules);
  const course = courseData;

  // const handleVideoStatusToggle = (moduleId: string, videoId: string) => {
  //   setModules((prevModules) =>
  //     prevModules.map((module) => {
  //       if (module.id === moduleId) {
  //         return {
  //           ...module,
  //           videos: module.videos.map((video) =>
  //             video.id === videoId ? { ...video, status: video.status === 0 ? 2 : 0 } : video
  //           ),
  //         };
  //       }
  //       return module;
  //     })
  //   );
  // };

  const getStatusBadge = (action: Module['actions']) => {
    switch (action) {
      case 'live':
        return (
          <Badge className="bg-blue-600 text-white">
            <span className="mr-1.5 h-2 w-2 animate-pulse rounded-full bg-white" />
            Live
          </Badge>
        );
      case 'upcoming':
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-600">
            Upcoming
          </Badge>
        );
      case 'recorded':
        return (
          <Badge variant="secondary" className="text-muted-foreground">
            Recorded
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const totalVideos = course.modules.reduce((acc, module) => acc + module.videos.length, 0);
  const totalDuration = course.modules.reduce((acc, module) => {
    return (
      acc +
      module.videos.reduce((videoAcc, video) => {
        const [minutes, seconds] = video.duration.split(':').map(Number);
        return videoAcc + minutes + seconds / 60;
      }, 0)
    );
  }, 0);
  const totalHours = Math.floor(totalDuration / 60);
  const totalMinutes = Math.round(totalDuration % 60);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="relative h-[400px] w-full overflow-hidden">
        <img src={course.image || '/placeholder.svg'} alt={course.title} className="h-full w-full object-cover" />
        <div className="from-background via-background/45 absolute inset-0 bg-gradient-to-t to-transparent dark:from-[#0e1426] dark:via-[#0e1426]/85 dark:to-transparent" />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-32 grid gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-foreground mb-4 text-balance font-serif text-4xl font-bold leading-tight sm:text-5xl">
                {course.title}
              </h1>
              <p className="text-muted-foreground text-pretty text-lg leading-relaxed">{course.overview}</p>
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
              {course.relatedTopics.map((topic) => (
                <Badge key={topic} variant="secondary" className="px-3 py-1 text-sm">
                  {topic}
                </Badge>
              ))}
            </div>

            <Card className="border-border bg-card mb-8 p-6">
              <h2 className="text-card-foreground mb-6 text-2xl font-semibold">What Youll Learn</h2>
              <div className="space-y-4">
                {course.learningOutcome.map((outcome, index) => (
                  <div key={index} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <p className="text-muted-foreground leading-relaxed">{outcome}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Training Curriculum Section */}
            <Card className="from-card to-card/50 mb-8 border-blue-600/10 bg-gradient-to-br p-6 shadow-lg shadow-blue-600/5">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-card-foreground text-2xl font-semibold">Training Curriculum</h2>
                <div className="flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-2 text-sm font-medium text-blue-600">
                  <BookOpen className="h-4 w-4" />
                  {course.modules.length} Modules • {totalHours}h {totalMinutes}m
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-3">
                {modules.map((module, moduleIndex) => (
                  <AccordionItem
                    key={module.id}
                    value={module.id}
                    className="from-secondary/30 to-secondary/10 overflow-hidden rounded-xl border-blue-600/10 bg-gradient-to-br transition-all hover:shadow-md"
                  >
                    <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]]:bg-blue-600/5">
                      <div className="flex flex-1 items-start gap-4 text-left">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-600/70 text-sm font-bold text-white shadow-lg shadow-blue-600/20">
                          {moduleIndex + 1}
                        </div>
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <h3 className="text-card-foreground font-semibold">{module.title}</h3>
                            {getStatusBadge(module.actions)}
                          </div>
                          <p className="text-muted-foreground mt-1 text-sm">{module.description}</p>
                          <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
                            <PlayCircle className="h-3.5 w-3.5" />
                            {module.videos.length} videos
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="ml-14 space-y-4 pt-2">
                        {(module.liveClass || module.sendboxLab) && (
                          <div className="flex flex-wrap gap-3">
                            {module.liveClass && (
                              <Button  asChild className="bg-blue-600 text-white hover:bg-blue-700">
                                <a href={module.liveClass} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Join Live Class
                                </a>
                              </Button>
                            )}
                            {module.sendboxLab && (
                              <Button asChild variant="outline">
                                <a href={module.sendboxLab} target="_blank" rel="noopener noreferrer">
                                  <Beaker className="mr-2 h-4 w-4" />
                                  Open Sandbox Lab
                                </a>
                              </Button>
                            )}
                          </div>
                        )}

                        {module.startTimeSendbox && module.endTimeSendbox && (
                          <Card className="bg-secondary/50">
                            <div className="flex items-center gap-3 p-4">
                              <Calendar className="text-muted-foreground h-5 w-5" />
                              <div className="flex-1">
                                <p className="text-card-foreground text-sm font-medium">Lab Session Schedule</p>
                                <p className="text-muted-foreground text-xs">
                                  {formatDate(module.startTimeSendbox)} - {formatDate(module.endTimeSendbox)}
                                </p>
                              </div>
                            </div>
                          </Card>
                        )}

                        {module.videos.map((video, videoIndex) => (
                          <div
                            key={video.id}
                            className="bg-background/50 hover:bg-background/80 group rounded-lg border border-blue-600/10 p-4 transition-all hover:border-blue-600/30 hover:shadow-md"
                          >
                            <div className="flex items-start gap-3">
                              <Checkbox
                                checked={video.status === 2}
                                // onCheckedChange={() => handleVideoStatusToggle(module.id, video.id)}
                                className="mt-1 h-5 w-5"
                              />
                              <div className="flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="text-card-foreground font-medium transition-colors group-hover:text-blue-600">
                                    {videoIndex + 1}. {video.title}
                                  </h4>
                                  <span className="bg-secondary text-secondary-foreground flex flex-shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium">
                                    <Clock className="h-3 w-3" />
                                    {video.duration}
                                  </span>
                                </div>
                                {video.status === 2 && (
                                  <div className="mt-1 flex items-center gap-1 text-xs text-green-600">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Completed
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {module.resourcesList && module.resourcesList.length > 0 && (
                        <div className="bg-secondary/30 mt-3 space-y-2 rounded-lg p-3">
                          <div className="text-muted-foreground flex items-center gap-2 text-xs font-semibold">
                            <FileText className="h-3.5 w-3.5" />
                            Resources Available:
                          </div>
                          <div className="space-y-1.5">
                            {module.resourcesList.map((resource) => (
                              <button
                                key={resource.id}
                                className="bg-background/50 text-muted-foreground hover:bg-background hover:text-foreground flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-all"
                              >
                                <span className="text-base">{getResourceIcon(resource.type)}</span>
                                <span className="flex-1 text-left">{resource.name}</span>
                                <Download className="h-3.5 w-3.5 text-black opacity-0 transition-opacity group-hover:opacity-100" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>

            <Card className="border-border bg-card mb-8 p-6">
              <h2 className="text-card-foreground mb-6 text-2xl font-semibold">Requirements</h2>
              <div className="space-y-4">
                {course.requirement.map((req, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />
                    <p className="text-muted-foreground leading-relaxed">{req}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-border bg-card mb-8 p-6">
              <h2 className="text-card-foreground mb-4 flex items-center gap-2 text-2xl font-semibold">
                <BookOpen className="h-6 w-6 text-blue-600" />
                Training Description
              </h2>
              <p className="text-muted-foreground leading-relaxed">{course.description}</p>
            </Card>

            <Card className="border-border bg-card p-6">
              <h2 className="text-card-foreground mb-6 text-2xl font-semibold">Your Instructors</h2>
              <div className="space-y-6">
                {course.instructors.map((instructor) => (
                  <div key={instructor.id} className="flex gap-4">
                    <img
                      src={instructor.profile || '/placeholder.svg'}
                      alt={instructor.name}
                      className="ring-border h-16 w-16 rounded-full object-cover ring-2"
                    />
                    <div>
                      <h3 className="text-card-foreground text-lg font-semibold">{instructor.name}</h3>
                      <p className="text-muted-foreground text-sm">{instructor.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-border bg-card sticky top-8 p-6">
              {/* Price */}
              <div className="border-border mb-6 border-b pb-6">
                <div className="text-muted-foreground mb-2 text-sm">Training Price</div>
                <div className="text-4xl font-bold text-blue-600">৳{course.priceBD.toLocaleString()}</div>
              </div>

              {/* CTA Button */}
              <Link href={`/manage-course/create`} passHref>
              <Button  className="mb-6 w-full bg-blue-600 text-white hover:bg-blue-700">
                Enroll Now
              </Button>
              </Link>

              {/* Course Info */}
              <div className="border-border space-y-4 border-t pt-6">
                <div className="flex items-center gap-3 text-sm">
                  <PlayCircle className="text-muted-foreground h-5 w-5" />
                  <div>
                    <div className="text-muted-foreground">Total Duration</div>
                    <div className="text-card-foreground font-medium">
                      {totalHours}h {totalMinutes}m • {totalVideos} videos
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="text-muted-foreground h-5 w-5" />
                  <div>
                    <div className="text-muted-foreground">Created</div>
                    <div className="text-card-foreground font-medium">
                      {new Date(course.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Clock className="text-muted-foreground h-5 w-5" />
                  <div>
                    <div className="text-muted-foreground">Last Updated</div>
                    <div className="text-card-foreground font-medium">
                      {new Date(course.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Users className="text-muted-foreground h-5 w-5" />
                  <div>
                    <div className="text-muted-foreground">Instructors</div>
                    <div className="text-card-foreground font-medium">
                      {course.instructors.length} Expert {course.instructors.length > 1 ? 'Instructors' : 'Instructor'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-secondary/50 mt-6 rounded-lg p-4">
                <p className="text-secondary-foreground text-balance text-sm leading-relaxed">
                  This course includes lifetime access to all materials and future updates.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-16" />
    </div>
  );
}
