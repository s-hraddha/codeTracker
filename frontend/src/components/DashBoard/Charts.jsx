import React from "react";
import {
    BarChart, Bar,
    LineChart, Line,
    PieChart, Pie, Cell,
    XAxis, YAxis,
    CartesianGrid, Tooltip, Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function Charts({ data = [], type = "bar" }) {
    // Defensive check
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="text-center text-gray-400 py-10">
                No chart data available
            </div>
        );
    }

    return (
        <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
                {type === "bar" ? (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="solved" fill="#8884d8" />
                    </BarChart>
                ) : type === "line" ? (
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="solved" stroke="#82ca9d" />
                    </LineChart>
                ) : (
                    <PieChart>
                        <Tooltip />
                        <Legend />
                        <Pie
                            data={data}
                            dataKey="solved"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                )}
            </ResponsiveContainer>
        </div>
    );
}
