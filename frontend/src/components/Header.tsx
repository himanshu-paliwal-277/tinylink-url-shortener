import { LinkIcon } from 'lucide-react';
import Link from 'next/link';
import React, { memo } from 'react';

const Header: React.FC = () => {
  return (
    <header className=" bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center justify-between py-5 px-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <LinkIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            TinyLink
          </span>
        </Link>
      </div>
    </header>
  );
};

export default memo(Header);
