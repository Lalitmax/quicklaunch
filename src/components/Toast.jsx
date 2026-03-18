function Toast({ message }) {
  return (
    <div className="fixed bottom-6 right-6 bg-gray-800 border border-gray-700 shadow-2xl px-6 py-4 rounded-xl animate-slide-up">
      <span className="text-white text-sm font-medium">{message}</span>
    </div>
  );
}

export default Toast;
