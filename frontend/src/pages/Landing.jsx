import { Link } from 'react-router-dom';
import blobHaikei from '../assets/images/blob-haikei.svg';
import undrawBlogging from '../assets/images/undraw_blogging_38kl (1).svg';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background blob */}
      <div className="absolute inset-0 z-0">
        <img 
          src={blobHaikei} 
          alt="Background decoration" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-xxl font-bold text-shadow mb-6">
                FocusFlow
              </h1>
              <h2 className="text-xl font-semibold text-primary mb-4">
                Master Your Productivity
              </h2>
              <p className="text-md text-gray-600 mb-8 leading-relaxed">
                Boost your focus with the Pomodoro Technique, track your progress, 
                and build lasting productivity habits. Transform your work sessions 
                into focused, efficient blocks of time.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/signup"
                  className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 shadow-soft"
                >
                  Get Started
                </Link>
                <Link 
                  to="/login"
                  className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Sign In
                </Link>
              </div>
              
              {/* Features */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary text-lg">🍅</span>
                  </div>
                  <h3 className="text-sm font-semibold text-shadow mb-2">Pomodoro Timer</h3>
                  <p className="text-xs text-gray-600">25-minute focused work sessions</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary text-lg">📊</span>
                  </div>
                  <h3 className="text-sm font-semibold text-shadow mb-2">Analytics</h3>
                  <p className="text-xs text-gray-600">Track your productivity patterns</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary text-lg">🔥</span>
                  </div>
                  <h3 className="text-sm font-semibold text-shadow mb-2">Streaks</h3>
                  <p className="text-xs text-gray-600">Build consistent habits</p>
                </div>
              </div>
            </div>
            
            {/* Right side - Illustration */}
            <div className="relative">
              <div className="relative z-20">
                <img 
                  src={undrawBlogging} 
                  alt="Productivity illustration" 
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
