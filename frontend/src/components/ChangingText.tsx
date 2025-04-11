import React, { useEffect, useMemo } from 'react';

export default function ChangingText({ list = [] }: { list?: string[] }) {
    const roles = useMemo(() => ["Brand", "Manufacturer", "Supplier"], []);
    let wordIndex = 0;
    let charIndex = 0;

    useEffect(() => {
        const typedText = document.getElementById("typed-text");

        const type = () => {
            if (charIndex <= roles[wordIndex].length) {
                if (typedText)
                    typedText.textContent = roles[wordIndex].substring(0, charIndex++);
                setTimeout(type, 100);
            } else {
                setTimeout(erase, 1500);
            }
        };

        const erase = () => {
            if (charIndex >= 0) {
                if (typedText)
                    typedText.textContent = roles[wordIndex].substring(0, charIndex--);
                setTimeout(erase, 50);
            } else {
                wordIndex = (wordIndex + 1) % roles.length;
                setTimeout(type, 300);
            }
        };

        type();

        return () => {
            // Cleanup if necessary
        };
    }, [roles]);

    return (
        <span className="text-lg font-semibold">
            <span id="typed-text" className="text-secondary text-2xl font-bold"></span>
            <span className="blinking-cursor text-2xl">|</span>
        </span>
    );
}
