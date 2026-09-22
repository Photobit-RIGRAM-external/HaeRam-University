'use client';

import Image from "next/image";
import Link from 'next/link';

import { useDepartment } from "@/app/_modules/query";
import { useStaffs } from "@/app/_modules/query";
import { useStudents } from "@/app/_modules/query";
import { useEvents } from "@/app/_modules/query";

import { useState } from 'react';
import { use } from 'react';
import MediaViewer from '@/app/album/__api/MediaViewer';

export default function DepartmentPage({params,}: { params: Promise<{ id: string }>}) {

  const { id } = use(params);
  const { data: department } = useDepartment(id);
  const { data: staffs } = useStaffs(id);
  const { data: students } = useStudents(id);
  const { data: events } = useEvents(id);

  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [mediaWidth, setMediaWidth] = useState<number | null>(null);
  const [mediaHeight, setMediaHeight] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const expandMedia = (url: string, width: number, height: number,type: 'image' | 'video') => {
      setMediaUrl(url);
      setMediaType(type);
      setMediaWidth(width);
      setMediaHeight(height);
      setIsOpen(true);
    };

return (
    <div className="min-h-screen w-full bg-[#ebe7dd] px-2 sm:px-4 md:px-6 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-12">
      <div className="w-full max-w-[1280px] mx-auto bg-[#f5f1e8] border-x border-[#d8d0c1]">

        <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-3 sm:pb-4 md:pb-5 lg:pb-6">
          
            <div className="mb-4 sm:mb-5 md:mb-6">
              <Link
                href="/album"
                className="
                  group
                  inline-flex items-center gap-1.5
                  text-[9px] sm:text-[10px]
                  tracking-[0.2em]
                  text-[#9b917f]
                  transition-colors duration-300
                  hover:text-[#514a3e]
                "
              >
                <span className="text-xs sm:text-2xl transition-transform duration-300 group-hover:-translate-x-0.5">
                  ←
                </span>
                <span className="text-xs sm:text-lg">BACK</span>
              </Link>
          </div>

          <div className="bg-[#f5f1e8] px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-7 w-full">
            <div className="flex flex-col items-center text-center">

              <p className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-[#9b917f] mb-2"> DEPARTMENT</p>
              <h1 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-[#514a3e] tracking-tight break-keep">{department?.name}</h1>
              <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4 w-full max-w-[140px] sm:max-w-[180px]">
                <div className="h-px bg-[#cfc6b6] flex-1" />
                  <span className="text-[#9b917f] text-[10px] sm:text-xs">✦</span>
                <div className="h-px bg-[#cfc6b6] flex-1" />
              </div>

            </div>
          </div>

        </section>

        <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-2 sm:pt-4 md:pt-6 pb-6 sm:pb-8">

          <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">

            <header className="text-center border-y border-[#cfc6b6] py-4 sm:py-5">
              <p className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-[#9b917f] md:mb-2">FACULTY</p>
              <h1 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-[#514a3e]">교수진</h1>
            </header>


            <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-3">

              {staffs?.map((staff: any) => (
                <div
                  key={staff.id}
                  className="group flex flex-col items-center min-w-0 px-2 py-4 sm:px-3 sm:py-5 md:px-4 md:py-6 border border-[#d9d1c3] bg-[#faf8f3] transition-all duration-300 hover:bg-white hover:shadow-md"
                >
                  {staff.profile_url && (
                    <div
                      className="relative w-full max-w-[125px] sm:max-w-[150px] md:max-w-[180px] aspect-[3/4] overflow-hidden border border-[#d5cec2] bg-[#e9e5dc] cursor-pointer"
                    >
                      <Image
                        src={staff.profile_url}
                        alt={`${staff.name} 이미지`}
                        fill
                        sizes="(max-width: 640px) 125px, (max-width: 768px) 150px, 180px"
                        className="object-cover grayscale-[10%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]"
                        onClick={() => expandMedia(staff.profile_url, 600,800,'image')}
                        loading="eager"
                      />
                    </div>
                  )}


                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 md:mt-3 sm:mt-4 w-full min-w-0">
                    <div className="w-full text-center">
                      <p className="font-serif text-lg md:text-xl font-semibold tracking-[0.14em] text-[#514a3e]">{staff.name}</p>
                      <p className="md:mt-2 text-xs md:text-sm font-medium tracking-[0.16em] text-[#857a69]">{staff.position}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </section>

        <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">
          <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">

            <header className="text-center border-y border-[#cfc6b6] py-4 sm:py-5">
              <p className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-[#9b917f] md:mb-2">GRADUATION</p>
              <h1 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-[#514a3e]">졸업생</h1>
            </header>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-7">
              {students?.map((student: any) => (
                <div
                  key={student.id}
                  className="group flex flex-col items-center min-w-0 px-2 pt-6 pb-5 sm:px-3 sm:pt-7 sm:pb-6 md:px-4 md:pt-8 md:pb-7 border border-[#d9d1c3] bg-[#faf8f3] transition-all duration-300 hover:bg-white hover:shadow-md"
                >
                  <div className="flex gap-1 sm:gap-1.5 md:gap-3 w-full justify-center items-center">
                    {student.profile_graduate && (
                      <div className="relative w-[calc(50%-3px)] max-w-[150px] aspect-[4/5] overflow-hidden border border-[#d5cec2] bg-[#e9e5dc]">
                        <Image
                          src={student.profile_graduate}
                          alt={`${student.name} 이미지`}
                          fill
                          sizes="(max-width: 640px) 44vw, (max-width: 768px) 28vw, 150px"
                          className="object-cover grayscale-[15%] cursor-pointer transition-all duration-500 group-hover:grayscale-0"
                          onClick={() => expandMedia(student.profile_graduate, 600, 800,'image')}
                        />
                      </div>
                    )}

                    {student.profile_default && (
                      <div className="relative w-[calc(50%-3px)] max-w-[150px] aspect-[5/7] overflow-hidden border border-[#d5cec2] bg-[#e9e5dc]">
                        <Image
                          src={student.profile_default}
                          alt={`${student.name} 이미지`}
                          fill
                          sizes="(max-width: 640px) 44vw, (max-width: 768px) 28vw, 150px"
                          className="object-contain grayscale-[15%] cursor-pointer transition-all duration-500 group-hover:grayscale-0"
                          onClick={() => expandMedia(student.profile_default, 750, 1050,'image')}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center mt-4 sm:mt-5 w-full min-w-0">
                    <p className="font-serif text-sm sm:text-base md:text-lg font-semibold tracking-wide text-[#403a31] whitespace-nowrap text-center">
                      {student.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">

          <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">

            <header className="text-center border-y border-[#cfc6b6] py-4 sm:py-5">
              <p className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.25em] sm:tracking-[0.4em] text-[#9b917f] md:mb-2">DEPARTMENT ARCHIVE</p>
              <h1 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-[#514a3e] break-keep">학과 사진 · 행사  영상</h1>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-8">
              {events?.map((medium: any) => (
                <div key={medium.id} className="group w-full min-w-0 bg-[#faf8f3] border border-[#d9d1c3] p-2 sm:p-2.5 md:p-3 transition-all duration-300 hover:bg-white hover:shadow-md">
                    {medium.type === 'photo' && medium.url && (
                      <div className="relative w-full aspect-video overflow-hidden border border-[#d5cec2] bg-[#e9e5dc] cursor-pointer">
                        <Image
                          src={medium.url}
                          alt="학과 행사 사진"
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover grayscale-[8%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]"
                          onClick={() => expandMedia(medium.url, 1600,900,'image')}
                        />
                      </div>
                    )}

                    {medium.type === 'video' && medium.url && (
                      <div className="relative w-full aspect-video overflow-hidden border border-[#d5cec2] bg-[#e9e5dc]">
                        <video
                          src={medium.url}
                          className="w-full h-full object-cover cursor-pointer"
                          controls
                          playsInline
                          onClick={() => expandMedia(medium.url, 1600,900,'video')}
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">

                      <div className="h-px bg-[#d8d0c2] flex-1" />
                      <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-[#9b917f] shrink-0">
                        {medium.type === 'photo' ? 'PHOTO' : 'VIDEO'}
                      </span>
                      <div className="h-px bg-[#d8d0c2] flex-1" />

                    </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        <MediaViewer
          mediaUrl={mediaUrl}
          mediaType={mediaType}
          mediaWidth={mediaWidth}
          mediaHeight={mediaHeight}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />

        <footer className="w-full max-w-[1200px] mx-auto border-t border-[#d8d0c1] py-5 sm:py-6 px-4 sm:px-6 md:px-10 flex justify-center md:justify-end">
          <p className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.05em] sm:tracking-[0.08em] text-[#9b917f] text-center">
            © 2026 RIGRAM. All rights reserved.
          </p>
        </footer>

      </div>
    </div>

  )
}
