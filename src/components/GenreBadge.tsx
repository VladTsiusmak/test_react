import { useAppSelector } from "../redux/store";
import type {FC} from "react";

interface GenreBadgeProps {
    genreId: number;
}

export const GenreBadge:FC<GenreBadgeProps> = ({ genreId }) => {
    const genre = useAppSelector(store =>
        store.genres.items.find(g => g.id === genreId)
    );
    if (!genre) return null;
    return (
        <span className="px-3 py-1.5 text-xs font-medium text-indigo-300 bg-indigo-900/30 rounded-full border border-indigo-800/50 backdrop-blur-sm transition hover:bg-indigo-900/50 hover:border-indigo-700/60 hover:scale-105">
            {genre.name}
        </span>
    );
};
