export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="font-heading text-3xl font-bold tracking-tight">Dashboard</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Placeholder cards to show layout. Will be filled with real counts. */}
                <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Blog Posts</h3>
                    </div>
                    <div className="text-2xl font-bold">0</div>
                </div>

                <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Portfolio Items</h3>
                    </div>
                    <div className="text-2xl font-bold">0</div>
                </div>

                <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">New Submissions</h3>
                    </div>
                    <div className="text-2xl font-bold">0</div>
                </div>
            </div>
        </div>
    );
}
