import { Link } from "react-router-dom";
import { PosterPreview } from "./PosterPreview";
import { StarsRating } from "./StarsRating";
import { GenreBadge } from "./GenreBadge";
import type { IMovie } from "../models/IMovie.ts";
import type { FC } from "react";

interface MoviesListCardProps {
    movie: IMovie;
}

export const MoviesListCard: FC<MoviesListCardProps> = ({ movie }) => {
    return (
        <div className="group relative bg-gray-800/70 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl hover:shadow-red-900/50 hover:-translate-y-4 hover:scale-105">
            <Link to={`/movie/${movie.id}`}>
                <PosterPreview posterPath={movie.poster_path} title={movie.title} />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
            </Link>

            <div className="p-6 space-y-4 relative z-10">
                <h3 className="font-extrabold text-2xl text-white line-clamp-2 group-hover:text-red-500 transition-colors duration-300">
                    {movie.title}
                </h3>

                <StarsRating rating={movie.vote_average} />

                <div className="flex flex-wrap gap-3">
                    {movie.genre_ids?.map(id => (
                        <GenreBadge key={id} genreId={id} />
                    ))}
                </div>
            </div>
        </div>
    );
};
