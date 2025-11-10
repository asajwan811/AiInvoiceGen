import {Link} from 'react-router-dom'
import HERO_IMG from'../../assets/hero-img.png'
import { useAuth } from '../../context/AuthContext';

const Hero = () => {
    const {isAuthenticated}=useAuth();
  return <section className="relative bg-red-50 overflow-hidden">
    <div className="ansolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-left max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-red-700 leading-tight mb-6">
                AI-Powered Invoicing, Made <span className="bg-gradient-to-r from-red-700 to-red-500 text-white px-4 py-[0.5] rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-red-500 border-2 border-transparent hover:border-red-300">Effortless</span>
            </h1>
            <p className="text-center text-xl sm:text-xl text-gray-700 mb-8 leading-relaxed  max-w-3xl mx-auto">
                Let our AI create invoices from simple text, generate payment reminders, and provide smart insights to help you manage your finances.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                {isAuthenticated ? (
                    <Link to="/dashboard" className="bg-gradient-to-r from-blue-950 to-blue-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-900 transition-all duration-200 hover:scale-105 hover:shadow-2xl transform">
                        Go to Dashboard
                    </Link>
                ) : (
                    <Link to="/signup" className="bg-gradient-to-r from-red-500 to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-800 transition-all duration-200 hover:scale-105 hover:shadow-2xl transform">
                        Get Started for Free
                    </Link>
                )} 
                <a href="#features" className="px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-2xl transform">
                    Learn More
                </a>       
            </div>
        </div>
        <div className="mt-12 -75sm:mt-16 relative max-w-5xl mx-auto">
            <img src={HERO_IMG} alt="Invoice App Screenshot" className="rounded-2xl shadow-2xl shadow-gray-300 border-4 border-gray-200/20"/>
        </div>
    </div>
  </section>
}

export default Hero