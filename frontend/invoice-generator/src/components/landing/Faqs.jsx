import { useState } from "react";
import { FAQS } from "../../utils/data";
import { ChevronDown, ChevronUp } from "lucide-react";

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-red-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl font-semibold text-black max-w-2xl mx-auto leading-relaxed">
            Get all your questions answered about our AI-powered invoicing platform
          </p>
        </div>

        <div className="space-y-6">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/60 transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-white transition-all duration-300 group"
              >
                <h3 className="text-xl font-bold text-gray-800 pr-8 group-hover:text-red-700 transition-colors duration-300 leading-tight">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-300 to-red-600 rounded-full flex items-center justify-center group-hover:from-red-400 group-hover:to-red-700 transition-all duration-300 shadow-sm">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-white" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-white" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6 animate-fadeIn">
                  <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-red-200 rounded-full mb-4"></div>
                  <p className="text-gray-700 leading-relaxed font-semibold text-lg bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;