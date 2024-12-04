import React, { useState, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (location: string) => Promise<void>;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const searchTimeout = useRef<NodeJS.Timeout>();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    if (e.target.value.trim()) {
      searchTimeout.current = setTimeout(() => {
        onSearch(e.target.value.trim());
      }, 500);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md mx-auto mb-6">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a city..."
        className="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500
                 dark:text-white transition-all duration-300"
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        {isLoading ? (
          <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
        ) : (
          <Search className="w-5 h-5 text-gray-400" />
        )}
      </div>
    </form>
  );
};