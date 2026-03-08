import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

export default function AdminPortfolio() {
    const navigate = useNavigate();
    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('portfolio')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setItems(data || []);
        } catch (error: any) {
            toast({
                title: 'Error loading portfolio',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const deleteItem = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this portfolio item?')) return;

        try {
            const { error } = await supabase.from('portfolio').delete().eq('id', id);
            if (error) throw error;

            toast({ title: 'Success', description: 'Item deleted successfully.' });
            fetchItems();
        } catch (error: any) {
            toast({
                title: 'Error deleting item',
                description: error.message,
                variant: 'destructive',
            });
        }
    };

    if (isLoading) {
        return <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="font-heading text-3xl font-bold tracking-tight">Portfolio Management</h1>
                <Button className="flex items-center gap-2" onClick={() => navigate('/secure-portal/portfolio/new')}>
                    <Plus size={16} /> New Item
                </Button>
            </div>

            <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border flex justify-between items-center">
                    <div className="relative w-72">
                        <Input placeholder="Search portfolio..." />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground uppercase">
                            <tr>
                                <th className="px-6 py-3 font-medium">Image</th>
                                <th className="px-6 py-3 font-medium">Project Title</th>
                                <th className="px-6 py-3 font-medium">Category</th>
                                <th className="px-6 py-3 font-medium">Date Added</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                        No portfolio items found. Add your first project!
                                    </td>
                                </tr>
                            ) : (
                                items.map((item) => (
                                    <tr key={item.id} className="hover:bg-muted/30">
                                        <td className="px-6 py-4">
                                            <div className="h-12 w-16 bg-muted rounded overflow-hidden">
                                                {item.featured_image ? (
                                                    <img src={item.featured_image} alt={item.title} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Img</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium">{item.title}</td>
                                        <td className="px-6 py-4">{item.category}</td>
                                        <td className="px-6 py-4">
                                            {format(new Date(item.created_at), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                                <Edit size={14} />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={() => deleteItem(item.id)}
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
