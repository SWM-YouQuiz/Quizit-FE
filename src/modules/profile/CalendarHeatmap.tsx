"use client";

import CalendarHeatmap from "react-calendar-heatmap";
import "@/modules/profile/styles/calendarHeatmap.css";

const CalendarHeatmapComponent = () => {
    return (
        <CalendarHeatmap
            startDate={new Date("2016-01-01")}
            endDate={new Date("2016-05-01")}
            values={[
                { date: "2016-01-02", count: 12 },
                { date: "2016-01-22", count: 122 },
                { date: "2016-01-30", count: 38 },
            ]}
            gutterSize={2}
            classForValue={(value) => {
                if (!value) {
                    return "color-empty";
                }
                return `color-scale-${value.count}`;
            }}
        />
    );
};
export default CalendarHeatmapComponent;
