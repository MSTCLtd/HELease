import { Card } from "flowbite-react";
import { FaCode, FaPaintBrush, FaBullhorn, FaChartLine } from "react-icons/fa"; // Import icons

const FeaturesGrid = () => {
    const features = [
        { title: "Direct Purchase", icon: <FaCode size={40} /> },
        { title: "Operational Lease(s)", icon: <FaPaintBrush size={40} /> },
        { title: "Full Service Lease(s)", icon: <FaBullhorn size={40} /> },
        { title: "Hybrid Lease(s)", icon: <FaChartLine size={40} /> },
    ];

    return (<>
        <h2 className="text-2xl text-center mb-5 font-semibold text-yellow-50"><span className="underlined">Solutions</span></h2>
        <div className="flex items-center justify-center bg-transparent dark:bg-gray-900 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                {features.map((feature, index) => (
                    <Card key={index} className="flex flex-col items-center p-6 text-center">
                        <center className="text-[#fe6901]">{feature.icon}</center>
                        <h3 className="mt-4 text-lg font-light text-gray-900 dark:text-white font-bakbak">{feature.title}</h3>
                    </Card>
                ))}
            </div>
        </div>
    </>
    );
};

export default FeaturesGrid;
