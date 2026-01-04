import type { FC } from "react";

interface PaginationProps {
    page: number;
    totalPages: number;
    onChange: (newPage: number) => void;
}

const MAX_VISIBLE_PAGES = 5;

export const Pagination: FC<PaginationProps> = ({ page, totalPages, onChange }) => {

    const handlePrev = () => onChange(Math.max(1, page - 1));
    const handleNext = () => onChange(Math.min(totalPages, page + 1));

    const getPageNumbers = () => {
        let start = Math.max(1, page - Math.floor(MAX_VISIBLE_PAGES / 2));
        const end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);

        start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
            <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                           bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700
                           text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed
                           backdrop-blur-sm"
            >
                Попередня
            </button>

            {pages.map(p => (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    className={`px-4 py-2 min-w-10 rounded-lg font-medium text-sm transition-all duration-200 
                                backdrop-blur-sm border ${
                        p === page
                            ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-900/30"
                            : "bg-gray-800/50 text-gray-300 border-gray-700 hover:bg-gray-700/70 hover:text-white"
                    }`}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                           bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700
                           text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed
                           backdrop-blur-sm"
            >
                Наступна
            </button>
        </div>
    );
};
