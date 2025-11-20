interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Header({ isDarkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 dark:from-pink-700 dark:via-purple-700 dark:to-indigo-700 text-white py-8 px-4 print:hidden relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 text-6xl food-emoji">🍕</div>
        <div className="absolute top-8 right-16 text-5xl food-emoji" style={{ animationDelay: '0.5s' }}>🍔</div>
        <div className="absolute bottom-4 left-1/4 text-4xl food-emoji" style={{ animationDelay: '1s' }}>🌮</div>
        <div className="absolute bottom-8 right-1/4 text-5xl food-emoji" style={{ animationDelay: '1.5s' }}>🍦</div>
      </div>

      <div className="container mx-auto flex items-center justify-between relative z-10">
        <div>
          <h1 className="text-5xl font-bold mb-2 drop-shadow-lg">
            <span className="inline-block hover:scale-110 transition-transform">🍽️</span>
            {' '}Menu Maker{' '}
            <span className="inline-block hover:scale-110 transition-transform">✨</span>
          </h1>
          <p className="text-white/90 text-lg mt-2 font-medium">
            Create awesome restaurant menus for dining and play! 🎨🎉
          </p>
        </div>
        <button
          onClick={onToggleDarkMode}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all hover:scale-110 hover:rotate-12 backdrop-blur-sm"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
