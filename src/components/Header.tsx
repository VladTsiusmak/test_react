import { type ChangeEvent, type FormEvent, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { getGenres } from "../redux/slices/genreSlice.ts";
import { movieActions } from "../redux/slices/movieSlice.ts";
import type { IGenre } from "../models/IGenre.ts";
import { UserInfo } from "./UserInfo.tsx";

export const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { items, loading: genresLoading } = useAppSelector(store => store.genres);
    const { selectedGenreId, query, language } = useAppSelector(store => store.movies);

    useEffect(() => {
        if (!items.length) dispatch(getGenres(language));
    }, [language]);

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(movieActions.setQuery(event.target.value));
        dispatch(movieActions.setPage(1));
        if (location.pathname === "/") {
            dispatch(movieActions.loadMovies({ page: 1, query: event.target.value, genreId: selectedGenreId, language }));
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (location.pathname !== "/") {
            navigate("/");
        }
        dispatch(movieActions.loadMovies({ page: 1, query, genreId: selectedGenreId, language }));
    };

    const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const genreId = event.target.value ? Number(event.target.value) : undefined;
        dispatch(movieActions.setGenre(genreId));
        dispatch(movieActions.setPage(1));
        dispatch(movieActions.loadMovies({ page: 1, query, genreId, language }));
    };

    const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const lang = event.target.value;
        dispatch(movieActions.setLanguage(lang));
        dispatch(movieActions.loadMovies({ page: 1, query, genreId: selectedGenreId, language: lang }));
        dispatch(getGenres(lang));
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/95 to-transparent backdrop-blur-md transition-all duration-300">
                <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">

                    {/* Top row: logo + avatar (avatar only shown here on mobile) */}
                    <div className="flex items-center justify-between lg:justify-start">
                        <Link to="/" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-red-600 tracking-tight flex items-center gap-2 sm:gap-3 hover:text-red-500 transition">
                            🎬 Movies
                        </Link>

                        <div className="lg:hidden">
                            <UserInfo />
                        </div>
                    </div>

                    {/* Search */}
                    <form onSubmit={handleSubmit} className="w-full lg:flex-1 lg:max-w-2xl">
                        <div className="relative">
                            <input
                                type="text"
                                value={query}
                                onChange={handleQueryChange}
                                placeholder="Шукати фільми..."
                                className="w-full min-w-0 bg-gray-800/90 border border-gray-700 rounded-full px-4 sm:px-6 py-3 sm:py-4 pr-14 sm:pr-16 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/30 transition-all duration-300"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 rounded-full p-2.5 sm:p-3 transition-all duration-200 shadow-lg"
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Filters row: genre + language + avatar (avatar shown here only on desktop) */}
                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                        <select
                            value={selectedGenreId ?? ""}
                            onChange={handleGenreChange}
                            disabled={genresLoading}
                            className="flex-1 min-w-0 lg:flex-none bg-gray-800/90 border border-gray-700 rounded-xl px-3 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition"
                        >
                            <option value="">Всі жанри</option>
                            {items.map((g: IGenre) => (
                                <option key={g.id} value={g.id}>
                                    {g.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={language}
                            onChange={handleLanguageChange}
                            className="flex-1 min-w-0 lg:flex-none bg-gray-800/90 border border-gray-700 rounded-xl px-3 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition"
                        >
                            <option value="ru-RU">RU</option>
                            <option value="en-US">EN</option>
                            <option value="uk-UA">UA</option>
                            <option value="de-DE">DE</option>
                        </select>

                        <div className="hidden lg:block lg:ml-4">
                            <UserInfo />
                        </div>
                    </div>
                </div>
            </header>

            <div className="h-40 sm:h-44 lg:h-40" />
        </>
    );
};
