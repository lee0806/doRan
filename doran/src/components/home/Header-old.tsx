"use client";

import { useState } from "react";
import { SearchIcon, FilterIcon } from "@/components/common/Icons";
import Input from "@/components/common/Input";

interface HeaderProps {
  onSearch?: (query: string) => void;
  onFilterOpen?: () => void;
}

export default function Header({ onSearch, onFilterOpen }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="bg-white border-b border-[var(--border-light)] px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-xl font-bold text-gradient">도란</h1>
          <p className="text-sm text-[var(--text-muted)]">
            따뜻한 소통 커뮤니티
          </p>
        </div>
        <button
          onClick={onFilterOpen}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FilterIcon size={20} />
        </button>
      </div>

      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="게시물, 사용자를 검색해보세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<SearchIcon size={18} />}
          className="text-sm"
        />
      </form>
    </header>
  );
}
