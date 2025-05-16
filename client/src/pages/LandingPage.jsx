import { motion } from "motion/react";
import screenshot from "../assets/screenshot.png"
import { useNavigate } from "react-router-dom";

import { Idea01Icon, Share07Icon, SourceCodeIcon, Download04Icon, KeyboardIcon, SecurityCheckIcon } from "hugeicons-react";

const SiteHeader = () => {
    const navigate = useNavigate()
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/70 backdrop-blur-lg border-b border-white/10 shadow-md"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-20 py-4 flex items-center justify-between">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">
                    ZephyrLint
                </div>
                <button
                    onClick={() => navigate("/login")}
                    className="hover:cursor-pointer bg-gradient-to-r from-indigo-400 to-indigo-600 text-white text-sm font-medium px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:from-indigo-500 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105"
                >
                    Get Started
                </button>
            </div>
        </motion.header>
    );
};

const SiteFooter = () => {
    return (
        <footer className="border-t border-white/10 text-neutral-500 text-sm">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 text-center ">
                <p>&copy; {new Date().getFullYear()} CodeReviewAI. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default function LandingPageAurora() {
    const navigate = useNavigate()

    const features = [
        {
            icon: <Idea01Icon />,
            title: "AI-Backed Insights",
            desc: "AI spots bugs and improves your code instantly — faster, smarter reviews."
        },
        {
            icon: <Share07Icon />,
            title: "Instant Sharing",
            desc: "Instantly share review links — viewable by anyone, no sign-up needed."
        },
        {
            icon: <SourceCodeIcon />,
            title: "Works with Any Code",
            desc: "Supports JavaScript, Python, HTML, CSS, and other major languages seamlessly."
        },
        {
            icon: <Download04Icon />,
            title: "Copy or Download",
            desc: "Grab your reviewed code and feedback anytime — with just one click."
        },
        {
            icon: <KeyboardIcon />,
            title: "Keyboard-First Workflow",
            desc: "Use Ctrl + Enter to trigger a review instantly. Speed matters."
        },
        {
            icon: <SecurityCheckIcon />,
            title: "Privacy First",
            desc: "Your data is yours. Delete reviews anytime — we respect your privacy."
        }
    ];


    return (
        <div className="min-h-screen bg-neutral-950 text-white  selection:bg-purple-500 selection:text-white">
            <SiteHeader />


            <main className="pt-16">
                <section
                    id="hero"
                    className="relative px-6 md:px-20 py-32 md:py-40 text-center  mx-auto overflow-hidden"
                >
                    {/* Aurora Background */}
                    <div className="absolute w-full inset-0 z-10 opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-full h-full bg-gradient-to-r from-indigo-400 via-pink-500 to-red-500 rounded-full blur-[100px] animate-pulse-slower"></div>
                        <div className="absolute bottom-0 right-1/4 w-full h-full bg-gradient-to-l from-blue-600 via-teal-500 to-green-500 rounded-full blur-[120px] animate-pulse-slower"></div>
                    </div>

                    <div className="relative z-20">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-5xl md:text-7xl mx-auto max-w-4xl font-semibold  py-4  mb-6  text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-300 to-purple-300"
                        >
                            Review Code. Instantly. Intelligently.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                            className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-neutral-400 leading-relaxed"
                        >
                            Paste your code and get precise, AI-powered reviews in seconds — with actionable suggestions, smart insights, and stunning clarity.
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                            onClick={() => navigate("/login")}
                            className=" hover:cursor-pointer inline-block bg-gradient-to-r from-indigo-400 to-indigo-600 text-white text-lg font-medium px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:from-indigo-500 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105"
                        >
                            Get Started Free
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
                            className="mt-16 mx-auto w-full max-w-4xl h-auto bg-white/5 rounded-3xl border border-white/10 shadow-xl shadow-purple-500/10 overflow-hidden"
                        >
                            <img src={screenshot} alt="App Screenshot" className="w-full h-auto object-cover" />
                        </motion.div>
                    </div>

                </section>


                {/* Features Section - Glassmorphism Style */}
                <section id="features" className="px-6 md:px-20 py-24 max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ staggerChildren: 0.15 }}
                        className="grid gap-8 md:grid-cols-3"
                    >
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                                className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-purple-500/20"
                            >
                                {feature.icon}
                                <h3 className="text-2xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">{feature.title}</h3>
                                <p className="text-base text-neutral-400 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* CTA Section (previously footer) - Refined Style */}
                <section id="cta" className="text-center py-20 md:py-32 px-6 md:px-20 max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-5xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-400"
                    >
                        Supercharge Your Code Reviews Today
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-md md:text-lg max-w-xl mx-auto mb-10 text-neutral-400"
                    >
                        Level up your workflow with blazing-fast, intelligent, and beautifully presented code feedback. No noise — just clarity.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                        onClick={() => navigate("/login")}
                        className="hover:cursor-pointer inline-block bg-gradient-to-r from-indigo-400 to-indigo-600 text-white text-lg font-medium px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:from-indigo-500 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105"
                    >
                        Get Started Free
                    </motion.button>

                </section>
            </main>

            <SiteFooter />

            <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.03); }
        }
        .animate-pulse-slower {
          animation: pulse-slower 10s infinite ease-in-out;
        }
        /* Smooth scroll for anchor links */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
        </div>
    );
}

