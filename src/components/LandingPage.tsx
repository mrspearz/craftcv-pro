import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  FileText, 
  Download,
  Check,
  ArrowRight,
  Star,
  Award,
  TrendingUp,
  Crown,
  Target,
  Briefcase,
  Users,
  Eye,
  Gem,
  Wand2
} from 'lucide-react';
import { Logo } from './Logo';
import '../animations.css';

interface LandingPageProps {
  onGetStarted: () => void;
}

const PremiumFeatureCard = ({ 
  icon: Icon, 
  title, 
  description
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => (
  <div className="group relative bg-gradient-to-br from-slate-900/70 via-slate-800/50 to-purple-950/50 backdrop-blur-xl p-6 rounded-2xl border border-violet-500/20 hover:border-violet-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/20 animate-float-gentle overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-violet-400/10 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
    <div className="relative z-10">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 animate-glow">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-violet-300 transition-colors duration-300">{title}</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

const StatsCard = ({ 
  number, 
  label,
  icon: Icon
}: { 
  number: string; 
  label: string;
  icon: React.ElementType;
}) => (
  <div className="text-center group animate-float-button">
    <div className="mb-4 flex justify-center">
      <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg animate-glow">
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2">{number}</div>
    <div className="text-sm text-slate-300 font-medium">{label}</div>
  </div>
);


export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/15 rounded-full blur-2xl animate-float-gentle animate-delay-1"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-indigo-500/8 rounded-full blur-3xl animate-float-slow animate-delay-2"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-violet-400/12 rounded-full blur-xl animate-float-gentle animate-delay-3"></div>
      </div>

      {/* Premium Navigation */}
      <nav className="relative z-50 border-b border-violet-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Logo size="sm" variant="default" animate={true} />
            
            <div className="flex items-center space-x-4">
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8 mr-6">
                <a href="#features" className="text-slate-300 hover:text-violet-400 transition-colors text-sm font-medium relative group">
                  Features
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-400 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#success" className="text-slate-300 hover:text-violet-400 transition-colors text-sm font-medium relative group">
                  Success Stories
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </div>
              
              {/* Auth Buttons */}
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-violet-400 transition-colors"
              >
                Login
              </button>
              
              {/* Premium CTA Button */}
              <button 
                onClick={() => navigate('/signup')}
                className="group relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white px-6 py-3 text-sm rounded-xl font-semibold transition-all duration-500 shadow-2xl hover:shadow-violet-500/30 hover:-translate-y-1 overflow-hidden animate-float-button animate-glow"
              >
                <span className="relative z-10 flex items-center">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Sign Up for Free
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Premium Hero */}
      <section className="relative py-16 sm:py-18 px-4 sm:px-6 overflow-hidden">
        {/* Consistent Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-violet-500/10 to-purple-500/15 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-indigo-500/8 to-violet-500/12 rounded-full blur-3xl animate-float-gentle animate-delay-2"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-indigo-500/20 rounded-full border border-violet-400/30 mb-8 backdrop-blur-xl animate-float-gentle">
            <div className="w-2 h-2 bg-violet-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-violet-200 font-medium text-sm tracking-wide">Professional Resume Builder</span>
            <div className="w-2 h-2 bg-violet-400 rounded-full ml-2 animate-pulse"></div>
          </div>
          
          {/* Compelling Headline */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Create Resumes That
              <span className="block bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-shift mt-2">
                Get You Hired
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Stand out from the crowd with professional resume templates designed by hiring experts. Our ATS-optimized designs ensure your resume gets past automated filters and into the hands of real recruiters. 
              <span className="text-violet-300 font-bold block mt-2">Join 100,000+ professionals who landed their dream jobs using ResumePilot.</span>
            </p>
          </div>
          
          {/* Premium CTA Section */}
          <div className="flex flex-col items-center gap-8 mb-12">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button 
                onClick={() => navigate('/signup')}
                className="group relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white font-bold px-12 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-violet-500/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 overflow-hidden animate-float-button animate-glow"
              >
                <span className="relative z-10 flex items-center">
                  <Briefcase className="w-5 h-5 mr-3" />
                  Sign Up for Free
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
              
              <button 
                onClick={() => navigate('/signup')}
                className="group text-slate-300 hover:text-white transition-colors duration-300 px-6 py-4 rounded-xl border border-slate-700 hover:border-violet-500/50 backdrop-blur-sm"
              >
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  View Templates
                </span>
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-slate-400 text-sm">
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-violet-400" />
                <span>100% Free • No signup required</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-violet-400" />
                <span>Your data stays private</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Premium Trust Indicators */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatsCard number="75K+" label="Professional CVs Crafted" icon={Briefcase} />
            <StatsCard number="98%" label="Interview Success" icon={Target} />
            <StatsCard number="4.9★" label="Premium Rating" icon={Crown} />
            <StatsCard number="12+" label="Professional Templates" icon={Gem} />
          </div>
        </div>
      </section>
      
      {/* Client Success Section */}
      <section id="success" className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Success
              <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-shift">
                Stories
              </span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              See how our resume builder helped people land their dream jobs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-slate-800/60 via-slate-900/50 to-purple-950/40 backdrop-blur-xl p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/40 transition-all duration-500 animate-float-gentle">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl mr-4 shadow-xl animate-glow">
                  S
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Sarah Chen</div>
                  <div className="text-violet-300 text-sm font-medium">Senior Engineer → Google</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-violet-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-200 leading-relaxed">
                "Three interviews in one week. The design speaks before I do. Google offered 45% more than expected."
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-slate-800/60 via-slate-900/50 to-purple-950/40 backdrop-blur-xl p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/40 transition-all duration-500 animate-float-gentle animate-delay-1">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl mr-4 shadow-xl animate-glow">
                  M
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Marcus Johnson</div>
                  <div className="text-violet-300 text-sm font-medium">VP Marketing → Meta</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-violet-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-200 leading-relaxed">
                "Headhunters started calling within days. Meta's VP team reached out directly. This isn't just a CV—it's a career catalyst."
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-slate-800/60 via-slate-900/50 to-purple-950/40 backdrop-blur-xl p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/40 transition-all duration-500 animate-float-gentle animate-delay-2">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl mr-4 shadow-xl animate-glow">
                  A
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Amanda Rodriguez</div>
                  <div className="text-violet-300 text-sm font-medium">Data Director → Amazon</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-violet-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-200 leading-relaxed">
                "From data analyst to director in 8 months. Amazon's team said it was the most polished CV they'd seen."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Before/After Section */}
      <section className="py-20 bg-gray-900/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See the transformation
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              From outdated resumes that get ignored to modern designs that get interviews
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">✗</span>
                  </div>
                  <h3 className="text-red-400 font-semibold">Outdated Resume</h3>
                </div>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Generic template everyone uses</li>
                  <li>• Poor formatting and spacing</li>
                  <li>• Not ATS-optimized (gets filtered out)</li>
                  <li>• Boring design that doesn't stand out</li>
                  <li>• Hard to read and poorly structured</li>
                </ul>
                <div className="mt-4 text-red-400 font-bold text-sm">Result: 0-2% response rate</div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-900 font-bold text-sm">✓</span>
                  </div>
                  <h3 className="text-amber-400 font-semibold">ResumePilot Resume</h3>
                </div>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Professional, modern design</li>
                  <li>• Perfect formatting and spacing</li>
                  <li>• 100% ATS-optimized (passes all filters)</li>
                  <li>• Eye-catching but professional</li>
                  <li>• Clear structure that highlights achievements</li>
                </ul>
                <div className="mt-4 text-amber-400 font-bold text-sm">Result: 15-25% response rate</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full border border-amber-500/30">
              <TrendingUp className="w-5 h-5 mr-2 text-amber-400" />
              <span className="text-amber-400 font-semibold">Average 10x increase in interview invitations</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Refined Features Section */}
      <section id="features" className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Resume
              <span className="block bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent mt-1 animate-gradient-shift">
                Builder Features
              </span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Everything you need to create professional resumes that get results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PremiumFeatureCard
              icon={Target}
              title="ATS-Optimized Templates"
              description="All templates pass Applicant Tracking Systems so your resume gets seen by real people."
            />
            <PremiumFeatureCard
              icon={Wand2}
              title="Easy Resume Builder"
              description="Drag-and-drop interface with smart suggestions and live preview as you build."
            />
            <PremiumFeatureCard
              icon={Shield}
              title="100% Private"
              description="Your resume data stays on your device. No accounts, no uploads, no tracking."
            />
            <PremiumFeatureCard
              icon={Crown}
              title="Professional Templates"
              description="Multiple professional designs for different industries and career levels."
            />
            <PremiumFeatureCard
              icon={TrendingUp}
              title="Get More Interviews"
              description="Users report 3x more interview callbacks with our professionally designed resumes."
            />
            <PremiumFeatureCard
              icon={Gem}
              title="Perfect PDF Export"
              description="Download high-quality PDFs that look perfect on any device or when printed."
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your
            <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-shift">
              Perfect Resume?
            </span>
          </h2>
          <p className="text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who've landed their dream jobs with our resume builder. 
            <span className="text-violet-300 font-semibold">Start building your professional resume today.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button 
              onClick={() => navigate('/signup')}
              className="group relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white font-semibold px-10 py-4 text-lg rounded-xl shadow-xl hover:shadow-violet-500/30 transition-all duration-500 hover:-translate-y-1 overflow-hidden animate-float-button"
            >
              <span className="relative z-10 flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Sign Up for Free
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
            </button>
            
            <div className="flex items-center text-slate-400 text-sm">
              <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mr-2 animate-pulse"></div>
              <span>Free access • No registration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-violet-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="md:col-span-2">
              <Logo size="md" variant="default" animate={true} className="mb-6" />
              <p className="text-slate-300 leading-relaxed">
                Elevating careers through masterful CV craftsmanship. Where professional excellence meets 
                cutting-edge technology to create opportunities that transform lives.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-base">Craftsmanship</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="hover:text-violet-400 transition-colors cursor-pointer flex items-center">
                  <Gem className="w-4 h-4 mr-2" />Professional Templates
                </li>
                <li className="hover:text-violet-400 transition-colors cursor-pointer flex items-center">
                  <Target className="w-4 h-4 mr-2" />ATS Mastery
                </li>
                <li className="hover:text-violet-400 transition-colors cursor-pointer flex items-center">
                  <Eye className="w-4 h-4 mr-2" />Live Preview
                </li>
                <li className="hover:text-violet-400 transition-colors cursor-pointer flex items-center">
                  <Download className="w-4 h-4 mr-2" />PDF Export
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-base">Excellence</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="hover:text-violet-400 transition-colors cursor-pointer flex items-center">
                  <Shield className="w-4 h-4 mr-2" />Privacy Policy
                </li>
                <li className="hover:text-violet-400 transition-colors cursor-pointer flex items-center">
                  <FileText className="w-4 h-4 mr-2" />Terms of Service
                </li>
                <li className="hover:text-violet-400 transition-colors cursor-pointer flex items-center">
                  <Users className="w-4 h-4 mr-2" />Contact Us
                </li>
                <li className="hover:text-violet-400 transition-colors cursor-pointer flex items-center">
                  <Award className="w-4 h-4 mr-2" />Support Center
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-violet-500/20 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400">
              &copy; 2024 ResumePilot. Crafted with precision for professional excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};