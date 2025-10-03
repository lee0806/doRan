import React from "react";

export default function PostCard() {
  return (
    <>
      <div className="grid justify-center">
        <div className="max-w-md w-full bg-white shadow-md rounded-2xl p-4 m-4">
          <div className="flex items-center w-full mb-4 justify-center bg-gray-200 h-60 ">
            <div>이미지가 들어갈 자리입니다.</div>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            게시물 제목입니다. 게시물 제목입니다. 게시물 제목입니다.
          </h2>
          <p className="text-sm font-medium text-gray-700 mb-4">
            게시물 내용의 일부가 여기에 표시됩니다. 더 많은 내용을 보려면
            클릭하세요.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-1 items-center">
              <p className="font-medium text-xs text-gray-400">from</p>
              <p className="font-semibold text-sm text-gray-800">이찬진</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-gray-500"
                >
                  <path d="M12 21c-.3 0-.5-.1-.7-.3l-7.1-7.1c-2.4-2.4-2.4-6.3 0-8.7 2.3-2.3 6-2.4 8.4-.2 2.4-2.2 6.1-2.1 8.4.2 2.4 2.4 2.4 6.3 0 8.7l-7.1 7.1c-.2.2-.4.3-.7.3z" />
                </svg>
                3
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
