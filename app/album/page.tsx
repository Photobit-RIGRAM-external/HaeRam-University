'use client';

import Link from 'next/link';
import Image from "next/image";

import { useSchool } from "@/app/_modules/providers/school-provider";
import { useDepartments } from "@/app/_modules/query";
import { useForeground } from "@/app/_modules/query";
import { useHistories } from "@/app/_modules/query";
import { useExecutive } from "@/app/_modules/query";
import { useState } from 'react';

import MediaViewer from '@/app/album/__api/MediaViewer';

export default function AlbumPage() {

    const school = useSchool();
    const { data: foreground } = useForeground(school.id);
    const { data: histories } = useHistories(school.id);
    const { data: executives } = useExecutive(school.id);
    const { data: departments } = useDepartments(school.id);

    const chairman = executives?.find((executive: any) => executive.position === '이사장');
    const president = executives?.find((executive: any) => executive.position === '총장');
    const otherExecutives = executives?.filter(
      (executive: any) =>
        executive.position !== '이사장' &&
        executive.position !== '총장'
    );

    const [mediaUrl, setMediaUrl] = useState<string | null>(null);
    const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const expandMedia = (url: string,type: 'image' | 'video') => {
      setMediaUrl(url);
      setMediaType(type);
      setIsOpen(true);
    };

    return (
      <div className="min-h-screen w-full bg-[#ebe7dd] px-4 md:px-8 py-6 md:py-10">
        <div className="w-full max-w-[1600px] mx-auto bg-[#f5f1e8] border-x border-[#d8d0c1]">

          <section className="w-full px-5 md:px-10 pt-7 pb-10 md:pt-9 md:pb-12">
            <div className="flex flex-col items-center text-center">
              
              <p className="text-[9px] md:text-xs tracking-[0.4em] text-[#9b917f] mb-4">GRADUATION ALBUM</p>
              
              <div className="flex items-center justify-center gap-3 w-full max-w-[360px] mb-4">
                <div className="h-px bg-[#d8d0c2] flex-1" />
                  {school?.school_img_url && (
                    <div className="relative w-9 sm:w-11 md:w-12 aspect-square flex-shrink-0">
                      <Image src={school.school_img_url as string} alt="학교 이미지" fill unoptimized
                        className="object-contain"
                      />
                    </div>
                  )}
                <div className="h-px bg-[#d8d0c2] flex-1" />
              </div>

              <h1 className="font-serif font-semibold text-[#514a3e] tracking-tight leading-snug text-lg md:text-2xl">
                {school?.graduation_year}년 {school?.school_name} 전자졸업앨범
              </h1>

              <span className="mt-4 text-[#9b917f] text-[9px]">✦</span>

            </div>
          </section>

          <section className="w-full px-5 md:px-10 pb-10 md:pb-14">
            <div className="flex flex-col gap-4">

              <div className="relative w-full aspect-[5/2] md:aspect-[2/1] overflow-hidden border border-[#d5cec2] bg-[#e9e5dc] cursor-pointer transition-all duration-300 hover:shadow-[0_6px_18px_rgba(81,74,62,0.10)]">
                {foreground?.url && (
                  <Image 
                    src={foreground?.url} alt="학교 전경" fill
                    className="object-cover transition-transform duration-700 hover:scale-[1.015]"
                    onClick={() =>expandMedia(foreground.url, 'image')}
                  />
                  )}
              </div>

            </div>
          </section>

          <section className="w-full px-5 md:px-10 pb-10 md:pb-14">
            <div className="flex flex-col gap-6">
              <div className="columns-1 md:columns-2 gap-8 md:gap-12 border-y border-[#d8d0c1] py-5 md:py-7 px-4 md:px-8">
                {histories?.map((history: any) => (
                  <div
                    key={history.id}
                    className="mb-2 md:mb-3 break-inside-avoid text-[10px] md:text-sm text-[#514a3e] leading-relaxed"
                  >
                    <span className="font-semibold text-[#7d7365]">{history.date}</span>
                    <span className="mx-1.5 text-[#b0a798]">·</span>
                    <span>{history.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full px-5 md:px-10 pb-10 md:pb-14">

            <div className="flex flex-col gap-10">

              <header className="text-center border-y border-[#cfc6b6] py-5">
                <p className="text-[10px] md:text-xs tracking-[0.4em] text-[#9b917f] mb-2">LEADERSHIP</p>
                <h2 className="text-lg md:text-2xl font-serif font-semibold text-[#514a3e]">임원진</h2>
              </header>

              {chairman && (
                <div key={chairman.id} className="flex flex-col items-center gap-4">

                  <div className="relative w-full max-w-[1300px] overflow-hidden border border-[#d5cec2] bg-[#faf8f3] p-1 cursor-pointer">
                    <Image
                      src={chairman.profile_url as string}
                      alt={chairman.name}
                      width={1144}
                      height={643}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-[1.015]"
                      onClick={() =>expandMedia(chairman.profile_url, 'image')}
                    />
                  </div>

                  <div className="text-center">
                    <p className="font-serif text-base md:text-2xl font-semibold tracking-[0.12em] text-[#514a3e]">{chairman.name}</p>
                    <div className="flex items-center justify-center gap-3 md:mt-3">
                      <p className="text-xs md:text-base font-medium tracking-[0.16em] text-[#857a69]">{chairman.position}</p>
                    </div>
                  </div>

                </div>
              )}

              {president && (
                <div key={president.id} className="flex flex-col items-center gap-4">
                  
                  <div className="relative w-full max-w-[1300px] overflow-hidden border border-[#d5cec2] bg-[#faf8f3] p-1 cursor-pointer">
                    <Image
                      src={president.profile_url as string}
                      alt={president.name}
                      width={1144}
                      height={643}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-[1.015]"
                      onClick={() =>expandMedia(president.profile_url, 'image')}
                    />
                  </div>

                  <div className="text-center">
                    <p className="font-serif text-base md:text-2xl font-semibold tracking-[0.12em] text-[#514a3e]">{president.name}</p>
                    <div className="flex items-center justify-center gap-3 md:mt-3">
                      <p className="text-xs md:text-base font-medium tracking-[0.16em] text-[#857a69]">{president.position}</p>
                    </div>
                  </div>

                </div>
              )}

              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-6">
                {otherExecutives?.map((executive: any) => (
                  <div key={executive.id} className="flex flex-col items-center gap-2 min-w-0">
                    <div className="w-full overflow-hidden border border-[#d5cec2] bg-[#faf8f3] p-1 cursor-pointer transition-all duration-300 hover:shadow-[0_4px_14px_rgba(81,74,62,0.08)]">
                      <Image
                        src={executive.profile_url as string}
                        alt={executive.name}
                        width={1144}
                        height={643}
                        className="object-cover w-full h-full transition-transform duration-500 h"
                        onClick={() => expandMedia(executive.profile_url, 'image')}
                      />
                    </div>

                    <div className="text-center">
                      <p className="font-serif text-sm md:text-xl font-semibold tracking-[0.14em] text-[#514a3e]">{executive.name}</p>
                      <p className="md:mt-2 text-xs md:text-sm font-medium tracking-[0.16em] text-[#857a69]">{executive.position}</p>
                    </div>

                  </div>
                ))}
              </div>

            </div>

          </section>

          <section className="w-full px-5 md:px-10 pb-10 md:pb-14">
            <div className="flex flex-col gap-7">

              <header className="text-center border-y border-[#cfc6b6] py-5">
                <p className="text-[10px] md:text-xs tracking-[0.4em] text-[#9b917f] mb-2">DEPARTMENTS</p>
                <h2 className="text-lg md:text-2xl font-serif font-semibold text-[#514a3e]">학과별 졸업사진</h2>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {departments?.map((dept:any) => (
                  <div key={dept.id}>
                    <Link
                      href={`/album/${dept.id}`}
                      className="group flex items-center justify-between px-4 md:px-5 py-4 border border-[#d9d1c3] bg-[#faf8f3] text-[#514a3e] transition-all duration-300 hover:bg-[#fffdf8] hover:border-[#bdb3a3]"
                    >
                      <span className="font-serif text-xs md:text-base">{dept.name}</span>
                      <span className="text-[#9b917f] text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </section>

          <MediaViewer
            mediaUrl={mediaUrl}
            mediaType={mediaType}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />

          <footer className="w-full border-t border-[#d8d0c1] py-6 md:py-8 px-5 md:px-10 flex justify-center md:justify-end">
            <p className="text-[10px] md:text-xs tracking-[0.08em] text-[#9b917f]">
              © 2026 RIGRAM. All rights reserved.
            </p>
          </footer>

        </div>
      </div>
    );
}
