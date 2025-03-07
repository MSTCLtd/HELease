import { useState, useRef } from "react";

const ProductImageGallery = ({ images }: { images: string[] }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0, show: false });
    const zoomRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!zoomRef.current) return;

        const { left, top, width, height } = zoomRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomPosition({ x, y, show: true });
    };

    const handleMouseLeave = () => {
        setZoomPosition({ ...zoomPosition, show: false });
    };

    return (
        <div className="flex flex-col md:flex-row md:space-x-4 relative">
            {/* Thumbnail List */}
            <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        onMouseOver={() => setSelectedImage(img)}
                        className={`w-16 h-16 border cursor-pointer object-cover rounded-md transition ${selectedImage === img ? "border-blue-500 ring-2 ring-blue-500" : "border-gray-300"
                            }`}
                    />
                ))}
            </div>

            {/* Main Image with Zoom */}
            <div
                className="relative w-full h-auto border overflow-hidden rounded-lg cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                ref={zoomRef}
            >
                <img src={selectedImage} alt="Product" className="w-full h-full object-cover" />
            </div>

            {/* External Zoomed Image */}
            {zoomPosition.show && (
                <div
                    className="absolute w-full h-full border overflow-hidden rounded-lg hidden md:block right-[-100%] top-0 bg-no-repeat bg-cover z-10"
                    style={{
                        backgroundImage: `url(${selectedImage})`,
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundSize: "300%", // Zoom level
                    }}
                />
            )}
        </div>
    );
};

export default ProductImageGallery;