export const UserInfo = () => {
    return (
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/60 transition-colors duration-200">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500
            to-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-md ring-2 ring-gray-700/70">
                U
            </div>

            <span className="text-sm font-medium text-gray-200">
                UserName
            </span>
        </div>
    );
};
