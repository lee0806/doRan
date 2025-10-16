import React from "react";
import { useJoinCarousel } from "@/store/JoinPage/joinCarouselStore";

export default function SelectionMainSection() {
  const { images, index, init, next, prev } = useJoinCarousel();
  return (
    <div>
      <div className="p-4 gap-8 flex justify-center items-center overflow-hidden">
        {index === 0 ? (
          <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
        ) : (
          <div className="w-4 h-4 bg-gray-300 rounded-full flex justify-center items-center cursor-pointer"></div>
        )}
        {index === 1 ? (
          <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
        ) : (
          <div className="w-4 h-4 bg-gray-300 rounded-full flex justify-center items-center cursor-pointer"></div>
        )}
        {index === 2 ? (
          <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
        ) : (
          <div className="w-4 h-4 bg-gray-300 rounded-full flex justify-center items-center cursor-pointer"></div>
        )}
        {index === 3 ? (
          <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
        ) : (
          <div className="w-4 h-4 bg-gray-300  rounded-full flex justify-center items-center cursor-pointer"></div>
        )}
      </div>
    </div>
  );
}
