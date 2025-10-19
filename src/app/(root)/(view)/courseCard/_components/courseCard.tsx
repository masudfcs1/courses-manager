import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { liveTrainingData } from './liveTrainingData';

// Utility function to create slugs from text

const CourseCard = () => {
  return (
    <div className="container grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
      {liveTrainingData.map((course) => (
        <div
          key={course.id}
          className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:bg-slate-50 dark:hover:shadow-slate-200"
        >
          <Image
            src={course.image ?? '/default-course-image.png'}
            width={1024}
            height={1024}
            alt={course.title}
            className="h-48 w-full object-cover"
          />
          <div className="p-5">
            <Link href={`/live-training-details/${course.slug}`} className="hover:text-blue-500">
              <h2 className="mb-1 text-sm font-bold text-indigo-700">{course.title}</h2>
              <p className="mb-3 line-clamp-2 text-sm text-gray-600">{course.description}</p>
              <p className="mb-3 flex justify-end text-lg font-semibold text-green-600">৳ {course.priceBD}</p>
            </Link>
            {/* Related Topics */}
            {/* <div className="mb-4 flex flex-wrap gap-2">
              {course.relatedTopics.map((topic, i) => (
                <span key={i} className="rounded-full bg-indigo-100 px-3 py-1 text-xs text-indigo-700">
                  #{topic}
                </span>
              ))}
            </div> */}

            {/* Instructors */}
            <div>
              {/* <h3 className="mb-2 text-sm font-semibold text-gray-700">Instructors:</h3> */}
              <div className="flex flex-wrap items-center gap-3">
                {course.instructors.map((inst) => (
                  <Link
                    href={`/user/${inst.slug}`}
                    key={inst.id}
                    className="flex items-center gap-2 hover:text-blue-500"
                  >
                    {/* <Image
                      src={inst.profile ? inst.profile : '/default-profile.png'}
                      alt={inst.name}
                      width={24}
                      height={24}
                      className="rounded-full border-2 border-indigo-200"
                    /> */}

                    {inst.profile ? (
                      // <Image
                      //   src={inst.profile ?? '/default-avatar.png'}
                      //   alt={inst.profile}
                      //   width={24}
                      //   height={24}
                      //   className="rounded-full"
                      // />
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 text-center text-xs dark:border-gray-300 dark:text-black">
                        {inst.slug?.charAt(1).toUpperCase()}
                      </div>
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 text-sm font-medium text-gray-600">
                        {inst.slug?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-medium text-gray-800  hover:text-blue-500">{inst.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
