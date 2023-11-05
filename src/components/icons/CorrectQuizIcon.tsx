import * as React from "react";

const CorrectQuizIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m12 15.044-2.333 1.081.583-2.162-1.75-1.801 2.528-.18L12 10l.972 1.982 2.528.18-1.75 1.801.583 2.162L12 15.045Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 4.5H5V21h14V4.5h-4m-6 0V6h6V4.5m-6 0V3h6v1.5" />
    </svg>
);
export default CorrectQuizIcon;
