import React, { useEffect } from 'react';

export default function ThankYouPage() {
  useEffect(() => {
    const confetti = document.createElement('div');
    confetti.innerHTML = "🎉🎉🎉";
    confetti.className = "text-6xl text-center animate-bounce mt-10";
    document.body.appendChild(confetti);
    return () => document.body.removeChild(confetti);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-100 via-purple-100 to-white text-center text-purple-800 p-8">
      <div>
        <h1 className="text-5xl font-bold mb-4">Thank you for your order! 💜</h1>
        <p className="text-lg">A confirmation has been sent to your email. Happy reading! 📚</p>
      </div>
    </div>
  );
}
