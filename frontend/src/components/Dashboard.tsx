'use client';

import React, { memo, useEffect, useState } from 'react';

import { LinksTable } from '@/components/LinksTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useLink } from '@/context/LinkContext';
import { useDeleteLink } from '@/hooks/useDeleteLink';
import { useFetchLinks } from '@/hooks/useFetchLinks';

import CreateShortLinkForm from './CreateShortLinkForm';
import SearchBar from './SearchBar';

const Dashboard: React.FC = () => {
  const { searchQuery, setSearchQuery } = useLink();
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const limit = 10;

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1); // Reset to first page on new search
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const { links, pagination, isLoading } = useFetchLinks(currentPage, limit, debouncedSearchQuery);
  const { deleteLinkMutation, isPending: isDeleting } = useDeleteLink();

  const handleDelete = async (code: string) => {
    if (window.confirm(`Are you sure you want to delete the link with code "${code}"?`)) {
      try {
        await deleteLinkMutation(code);
      } catch (error) {
        console.error('Error deleting link', error);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    if (!pagination) return [];

    const { totalPages, page } = pagination;
    const pages: number[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="">
          <h1 className="sm:text-4xl text-3xl font-bold  text-sky-500">URL Shortener</h1>

          <p className="text-muted-foreground mt-1 text-base">
            Create and manage your short links efficiently
          </p>
        </div>

        <CreateShortLinkForm />

        {/* Actions */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-lg">Your Links</CardTitle>
                <CardDescription>Manage all your shortened URLs in one place</CardDescription>
              </div>
              <SearchBar value={searchQuery} onChange={handleSearchChange} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Table */}
            <LinksTable
              links={links}
              isLoading={isLoading}
              onDelete={handleDelete}
              isDeleting={isDeleting}
            />

            {/* Search Results */}
            {searchQuery && links.length === 0 && !isLoading && (
              <div className="text-center py-8 text-muted-foreground">
                No links found matching &quot;{searchQuery}&quot;
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        size="default"
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={
                          currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                        }
                      />
                    </PaginationItem>

                    {getPageNumbers().map((pageNum, index) => {
                      const prevPage = getPageNumbers()[index - 1];
                      const showEllipsis = prevPage && pageNum - prevPage > 1;

                      return (
                        <React.Fragment key={pageNum}>
                          {showEllipsis && (
                            <PaginationItem>
                              <span className="px-4">...</span>
                            </PaginationItem>
                          )}
                          <PaginationItem>
                            <PaginationLink
                              size="default"
                              onClick={() => handlePageChange(pageNum)}
                              isActive={currentPage === pageNum}
                              className="cursor-pointer"
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        </React.Fragment>
                      );
                    })}

                    <PaginationItem>
                      <PaginationNext
                        size="default"
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={
                          currentPage === pagination.totalPages
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            {/* Pagination Info */}
            {pagination && (
              <div className="text-center text-sm text-muted-foreground">
                Showing {links.length === 0 ? 0 : (currentPage - 1) * limit + 1} to{' '}
                {Math.min(currentPage * limit, pagination.total)} of {pagination.total} links
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default memo(Dashboard);
