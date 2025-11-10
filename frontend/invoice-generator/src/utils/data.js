import { Sparkles, BarChart2, Mail, FileText, LayoutDashboard, Users, Plus } from "lucide-react";

export const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Invoice Creation",
    description:
      "Paste any text, email, or receipt, and let our AI instantly generate a complete, professional invoice for you",
  },
  {
    icon: BarChart2,
    title: "AI-Powered Dashboard",
    description:
      "Get smart, actionable insights about your business finances, generated automatically by our AI analyst",
  },
  {
    icon: Mail,
    title: "Smart Reminders",
    description:
      "Automatically generate polite and effective payment reminder emails for overdue invoices with a single click.",
  },
  {
    icon: FileText,
    title: "Easy To Manage",
    description:
      "Easily manage all your invoices, track payments, and send reminders for overdue payments.",
  },
];

export const TESTIMONIALS = [
    {
        quote: "The AI insights cut my late payments by 65% with smart reminder strategies that actually work.",
        author: "Sarah Chen",
        title: "Freelance Designer",
        avatar: "/avatars/sarah-chen.jpg",
    },{
        quote: "Automated friendly reminders that feel human saved me 10 hours per week chasing payments.",
        author: "Marcus Rodriguez",
        title: "Small Business Owner",
        avatar: "/avatars/marcus-rodriguez.jpg",
    },{
        quote: "From 20-minute invoices to 30 seconds with AI-optimized payment terms for each client.",
        author: "David Kim",
        title: "IT Consultant",
        avatar: "/avatars/david-kim.jpg",
    },
];

export const FAQS = [
    {
        question: "How does the AI generate smarter invoices?",
        answer: "Our AI analyzes your client history, industry standards, and payment patterns to suggest optimal due dates, payment terms, and personalized messaging that increases on-time payments."
    },
    {
        question: "What makes the payment reminders 'friendly'?",
        answer: "The AI customizes reminder tone and timing based on each client's relationship and payment history, using natural language that feels human while maintaining professionalism."
    },
    {
        question: "Can the AI really predict late payments?",
        answer: "Yes, by analyzing payment patterns, client behavior, and industry data, our AI identifies high-risk invoices and suggests proactive strategies to prevent delays."
    },
    {
        question: "How long does it take to generate my first AI-powered invoice?",
        answer: "Less than 30 seconds! Just input client details and let our AI handle the rest, including smart term suggestions and professional formatting."
    },
    {
        question: "Will the automated reminders annoy my clients?",
        answer: "No, the AI optimizes timing and messaging frequency to be helpful rather than intrusive, actually improving client relationships through better communication."
    },
    {
        question: "What business insights can I get from invoice data?",
        answer: "Our AI reveals cash flow patterns, identifies your most reliable clients, and provides revenue forecasts to help you make smarter business decisions."
    },
    {
        question: "Is my financial data secure with your AI system?",
        answer: "Absolutely. We use bank-level encryption and never share your data. All AI processing happens in secure, compliant environments."
    },
];

export const NAVIGATION_MENU=[
    { id:"dashboard", name:"Dashboard", icon: LayoutDashboard },
    { id:"invoices", name:"Invoices", icon: FileText },
    { id:"invoices/new", name:"Create Invoice", icon: Plus },
    { id:"profile", name:"Profile", icon: Users}
]