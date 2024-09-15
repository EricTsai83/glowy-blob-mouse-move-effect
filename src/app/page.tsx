"use client";
import { useEffect, useRef, useState } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Home() {
  const blobRef = useRef<HTMLDivElement | null>(null);
  const [hoveredText, setHoveredText] = useState("HOVER ME");
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to store interval ID

  // Glow effect
  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      if (blobRef.current) {
        const { clientX, clientY } = event;
        const blob = blobRef.current;

        // Get blob dimensions
        const blobWidth = blob.offsetWidth;
        const blobHeight = blob.offsetHeight;

        // Center blob on cursor
        blob.style.left = `${clientX - blobWidth / 2}px`;
        blob.style.top = `${clientY - blobHeight / 2}px`;
      }
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  // Text effect
  const handleMouseOver = (event: React.MouseEvent<HTMLHeadingElement>) => {
    let iteration = 0;
    const target = event.currentTarget;
    const text = target.dataset.value || "";

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setHoveredText((prevText) =>
        prevText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join(""),
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current!);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        ref={blobRef}
        className="bg-white h-34vmax aspect-square absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#7FFFD4] to-[#9370DB] opacity-80 animate-blob-rotate-scale"
      ></div>
      <div className="w-full h-full absolute z-20 backdrop-blur-[12vmax]"></div>
      <h1
        data-value="HOVER ME"
        className="font-mono text-white text-[clamp(3rem,10vw,10rem)] whitespace-nowrap p-[0_clamp(1rem,2vw,3rem)] rounded-[clamp(0.4rem,0.75vw,1rem)] m-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
        onMouseOver={handleMouseOver}
      >
        {hoveredText}
      </h1>
    </div>
  );
}
