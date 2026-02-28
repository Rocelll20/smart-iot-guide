import React from 'react';

export default function EmergencyPage() {
    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto animation-fade-in relative z-10 px-4 mt-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Emergency Hub</h1>
                    <p className="text-white/60 text-sm">Critical interventions and real-time alerts.</p>
                </div>
            </div>

            <div className="bg-[#111624] rounded-2xl p-8 border border-white/5 min-h-[400px] flex items-center justify-center">
                <p className="text-red-400 text-lg">No active emergencies.</p>
            </div>
        </div>
    );
}
