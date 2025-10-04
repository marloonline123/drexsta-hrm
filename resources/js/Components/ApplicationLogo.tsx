import React from 'react';

export default function ApplicationLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} viewBox="0 0 316 316" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M305.8 81.1c-19-27.8-49.6-43.2-83.3-43.2-25.2 0-48.3 10.3-65.7 27.6-17.4-17.3-40.5-27.6-65.7-27.6-33.7 0-64.3 15.4-83.3 43.2C-15.4 122.9 3.1 204.2 88.8 259.2c19.4 12.9 44.5 12.9 63.8 0 85.8-55 104.2-136.3 53.2-178.1z"
                fill="#4F46E5"
            />
        </svg>
    );
}