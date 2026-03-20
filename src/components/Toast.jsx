function Toast({ message }) {
  return (
    <div className="fixed bottom-3 right-3 group">
      <div className="relative bg-white/95 backdrop-blur-xl px-3 py-2 rounded-2xl shadow-[0_8px_30px_rgba(102,126,234,0.3)] border border-white/40 animate-slide-up transition-all duration-300 hover:shadow-[0_8px_30px_rgba(118,75,162,0.5)] hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 rounded-2xl"></div>
        <span className="relative bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent text-sm font-semibold tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full animate-pulse shadow-lg shadow-purple-500/50"></span>
          {message}
        </span>
      </div>
    </div>
  );
}

export default Toast;
