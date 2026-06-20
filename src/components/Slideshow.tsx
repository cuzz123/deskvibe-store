"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SLIDES } from "@/lib/products";

const INTERVAL = 5000;

export default function Slideshow() {
  const [current, setCurrent] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);
  const startTimer = useCallback(() => {
    if (prefersReduced) return;
    stopTimer();
    timerRef.current = setInterval(next, INTERVAL);
  }, [next, stopTimer, prefersReduced]);

  // Detect reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [startTimer, stopTimer]);

  const slide = SLIDES[current];

  return (
    <div className="relative overflow-hidden bg-stone-100" onMouseEnter={stopTimer} onMouseLeave={startTimer} aria-roledescription="carousel" aria-label="Featured products slideshow">
      <div className="sr-only" aria-live="polite" aria-atomic="true">Showing slide {current + 1} of {SLIDES.length}: {slide.title}</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px] max-h-[560px]">
        {/* Content */}
        <div className="flex flex-col justify-center px-8 lg:px-14 py-12 order-2 lg:order-1">
          <span className="text-xs uppercase tracking-[2px] text-indigo-600 font-bold mb-3">{slide.tag}</span>
          <h2 className="text-3xl lg:text-[2.5rem] lg:leading-[1.1] font-bold tracking-tight text-stone-900 mb-4 text-wrap balance">{slide.title}</h2>
          <p className="text-stone-600 leading-relaxed mb-6 max-w-md">{slide.description}</p>
          <Link
            href={slide.href}
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-stone-800 transition-colors duration-150 w-fit"
          >
            {slide.cta}
            <span className="text-lg leading-none">→</span>
          </Link>
        </div>
        {/* Visual */}
        <div className="order-1 lg:order-2 bg-stone-200 flex items-center justify-center min-h-[280px] lg:min-h-0 overflow-hidden relative">
          <Image
            src={`/images/slide-${current}.jpg`}
            alt={slide.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority={current === 0}
          />
        </div>
      </div>

      {/* Dots */}
      {!prefersReduced && SLIDES.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all rounded-full ${i === current ? "w-7 h-2.5 bg-stone-900" : "w-2.5 h-2.5 bg-stone-400 hover:bg-stone-600"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 pointer-events-none">
        <button onClick={prev} className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-stone-900 hover:text-white transition-colors duration-150" aria-label="Previous slide">
          <span className="text-lg leading-none">‹</span>
        </button>
        <button onClick={next} className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-stone-900 hover:text-white transition-colors duration-150" aria-label="Next slide">
          <span className="text-lg leading-none">›</span>
        </button>
      </div>
    </div>
  );
}
