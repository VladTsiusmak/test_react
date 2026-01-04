import type { FC } from "react";

interface PosterPreviewProps {
    posterPath: string;
    title: string;
}

export const PosterPreview: FC<PosterPreviewProps> = ({ posterPath, title }) => {
    const baseUrl = "https://image.tmdb.org/t/p/w500";

    return (
        <div className="relative rounded-xl overflow-hidden shadow-2xl group">
            <img
                src={posterPath ? `${baseUrl}${posterPath}` : "/no-poster.png"}
                alt={title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60
            via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
    );
};
