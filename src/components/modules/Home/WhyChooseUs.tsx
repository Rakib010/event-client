import { Shield, Users, Heart, Zap } from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "Safe & Secure",
        description: "Verified users and secure payment processing for your peace of mind",
    },
    {
        icon: Users,
        title: "Community Driven",
        description: "Connect with like-minded people who share your interests and passions",
    },
    {
        icon: Heart,
        title: "Easy to Use",
        description: "Simple interface to find, join, or create events in just a few clicks",
    },
    {
        icon: Zap,
        title: "Instant Matching",
        description: "Find the perfect event companions based on your interests and location",
    },
];

export function WhyChooseUs() {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
            <div className="w-11/12 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Why Choose EventMates?</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Join thousands of people who have found their perfect event companions
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
