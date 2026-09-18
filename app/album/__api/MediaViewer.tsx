'use client';

import Image from 'next/image';

interface MediaViewerProps {
  mediaUrl: string | null;
  mediaType: 'image' | 'video' | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MediaViewer({
  mediaUrl,
  mediaType,
  isOpen,
  onClose,
}: MediaViewerProps) {
  if (!isOpen || !mediaUrl || !mediaType) {
    return null;
  }

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* 블러 + 어두운 배경 */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
          onClick={onClose}
        />

        {/* X 버튼 */}
        <button
          className="fixed top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-gray-100"
          onClick={onClose}
          aria-label="미디어 닫기"
        >
          ✕
        </button>

        {mediaType === 'image' && (
          <div className="relative z-10 flex h-[80vh] w-[80vw] items-center justify-center">
            <Image
              src={mediaUrl}
              alt="이미지"
              width={1600}
              height={900}
              className="h-full w-full rounded-lg object-contain"
              unoptimized
            />
          </div>
        )}

        {mediaType === 'video' && (
          <div className="relative z-10 flex h-[80vh] w-[80vw] items-center justify-center">
            <video
              src={mediaUrl}
              controls
              autoPlay
              className="h-full w-full rounded-lg object-contain"
            >
              브라우저에서 비디오를 재생할 수 없습니다.
            </video>
          </div>
        )}


  </div>


  );
}