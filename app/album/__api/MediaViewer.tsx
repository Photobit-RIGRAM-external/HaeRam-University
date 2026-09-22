'use client';

import Image from 'next/image';

interface MediaViewerProps {
  mediaUrl: string | null;
  mediaType: 'image' | 'video' | null;
  mediaWidth?: number | null;
  mediaHeight?: number | null;
  isOpen: boolean;
  onClose: () => void;
}



export default function MediaViewer({
  mediaUrl,
  mediaType,
  mediaWidth,
  mediaHeight,
  isOpen,
  onClose,
}: MediaViewerProps) {
  if (!isOpen || !mediaUrl || !mediaType) {
    return null;
  }

  const isPortrait = mediaWidth && mediaHeight ? mediaHeight > mediaWidth : false;

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
          <div
              className={`
                relative z-10 flex items-center justify-center

                ${
                  isPortrait
                    ? 'h-[55vh] w-[70vw] sm:h-[69vh] sm:w-[69vw]'
                    : 'h-[80vh] w-[92vw] sm:h-[80vh] sm:w-[80vw]'
                }
              `}
            >
            <Image
              src={mediaUrl}
              alt="이미지"
              width={mediaWidth || 2000}
              height={mediaHeight || 1000}
              className="h-full w-full rounded-lg object-contain"
              unoptimized
            />
          </div>
        )}

       {mediaType === 'video' && (
          <div className="relative z-[10000] flex items-center justify-center w-[96vw] h-[90vh] sm:w-[90vw] sm:h-[85vh]">
            <video
              src={mediaUrl}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="max-h-full max-w-full rounded-lg object-contain"
            >
              브라우저에서 비디오를 재생할 수 없습니다.
            </video>
          </div>
        )}


  </div>


  );
}
