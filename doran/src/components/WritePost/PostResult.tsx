import React from "react";

export default function PostResult() {
  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-between items-center z-50">
        <div className="ml-2 text-l text-gray-500 hover:text-gray-700 active:text-gray-900 cursor-pointer">
          뒤로 가기
        </div>
        <div className="items-center">
          <button
            type="button"
            className="mr-2 text-l text-gray-500 hover:text-gray-700 active:text-gray-900 cursor-pointer"
          >
            임시 저장
          </button>
          <button
            type="button"
            className="ml-2 px-6 py-2 bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-colors cursor-pointer"
          >
            게시하기
          </button>
        </div>
      </div>
    </>
  );
}
