'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import './gallery.css'

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, src: '/gallery/img1.jpeg', alt: 'Birthday moment 1', caption: 'Happy memories' },
  { id: 2, src: '/gallery/img2.jpeg', alt: 'Birthday moment 2', caption: 'Celebrating together' },
  { id: 3, src: '/gallery/img3.jpeg', alt: 'Birthday moment 3', caption: 'Joyful times' },
  { id: 4, src: '/gallery/img4.jpeg', alt: 'Birthday moment 4', caption: 'Special moments' },
  { id: 5, src: '/gallery/img6.jpeg', alt: 'Birthday moment 5', caption: 'Childish memories' },
  { id: 6, src: '/gallery/img7.jpeg', alt: 'Birthday moment 6', caption: 'Wonderful days' },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handlePrevious = () => {
    if (!selectedImage) return;
    const currentIndex = GALLERY_IMAGES.findIndex(img => img.id === selectedImage.id);
    const previousIndex = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    setSelectedImage(GALLERY_IMAGES[previousIndex]);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = GALLERY_IMAGES.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
    setSelectedImage(GALLERY_IMAGES[nextIndex]);
  };

  const handleImageError = (imageId: number) => {
    setImageErrors(prev => new Set(prev).add(imageId));
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            📸 Photo Gallery
          </h2>
          <p className="text-xl text-foreground/70">
            Precious moments and cherished memories
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {GALLERY_IMAGES.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="cursor-pointer group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-square"
            >
              {imageErrors.has(image.id) ? (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-2">📷</div>
                    <p className="text-foreground/50 text-sm">{image.caption}</p>
                  </div>
                </div>
              ) : (
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={() => handleImageError(image.id)}
                />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end justify-start p-4">
                <p className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full max-h-[80vh] bg-card rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors"
                aria-label="Close gallery"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <div className="relative w-full h-96 sm:h-[60vh]">
                {imageErrors.has(selectedImage.id) ? (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📷</div>
                      <p className="text-foreground text-lg">{selectedImage.caption}</p>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={selectedImage.src || "/placeholder.svg"}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    onError={() => handleImageError(selectedImage.id)}
                  />
                )}
              </div>

              {/* Caption */}
              <div className="p-6 bg-card-foreground/5">
                <p className="text-center text-lg font-semibold text-foreground">
                  {selectedImage.caption}
                </p>
              </div>

              {/* Navigation */}
              <div className="absolute inset-x-0 bottom-0 flex justify-between items-center p-4 bg-gradient-to-t from-black/50 to-transparent">
                <button
                  onClick={handlePrevious}
                  className="bg-primary text-primary-foreground rounded-full p-3 hover:bg-primary/90 transition-colors"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="text-white text-sm font-medium">
                  {GALLERY_IMAGES.findIndex(img => img.id === selectedImage.id) + 1} / {GALLERY_IMAGES.length}
                </div>

                <button
                  onClick={handleNext}
                  className="bg-primary text-primary-foreground rounded-full p-3 hover:bg-primary/90 transition-colors"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
