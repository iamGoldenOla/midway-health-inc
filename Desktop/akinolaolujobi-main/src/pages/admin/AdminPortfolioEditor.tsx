import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save } from 'lucide-react';

export default function AdminPortfolioEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const isEditing = id !== 'new';

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        client_name: '',
        description: '',
        featured_image: '',
        project_url: '',
        completion_date: '',
    });

    useEffect(() => {
        if (isEditing) {
            fetchItem();
        }
    }, [id]);

    const fetchItem = async () => {
        try {
            const { data, error } = await supabase
                .from('portfolio')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) setFormData(data);
        } catch (error: any) {
            toast({
                title: 'Error loading portfolio item',
                description: error.message,
                variant: 'destructive',
            });
            navigate('/secure-portal/portfolio');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                ...formData,
                completion_date: formData.completion_date || null
            };

            if (isEditing) {
                const { error } = await supabase
                    .from('portfolio')
                    .update(payload)
                    .eq('id', id);
                if (error) throw error;
                toast({ title: 'Success', description: 'Item updated successfully' });
            } else {
                const { error } = await supabase
                    .from('portfolio')
                    .insert([payload]);
                if (error) throw error;
                toast({ title: 'Success', description: 'Item created successfully' });
                navigate('/secure-portal/portfolio');
            }
        } catch (error: any) {
            toast({
                title: 'Error saving item',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/secure-portal/portfolio')}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="font-heading text-3xl font-bold tracking-tight">
                        {isEditing ? 'Edit Portfolio Item' : 'New Portfolio Item'}
                    </h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-background p-6 md:p-8 rounded-xl border border-border">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Project Title</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            placeholder="e.g. Web Design, Speaking, Content Strategy"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="client_name">Client Name (Optional)</Label>
                        <Input
                            id="client_name"
                            value={formData.client_name || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="completion_date">Completion Date (Optional)</Label>
                        <Input
                            id="completion_date"
                            type="date"
                            value={formData.completion_date || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="featured_image">Featured Image URL</Label>
                    <Input
                        id="featured_image"
                        value={formData.featured_image}
                        onChange={handleInputChange}
                        placeholder="https://example.com/project-image.jpg"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="project_url">Project/Case Study URL (Optional link)</Label>
                    <Input
                        id="project_url"
                        value={formData.project_url || ''}
                        onChange={handleInputChange}
                        placeholder="https://client-website.com"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe the project goals, your role, and the outcome..."
                        className="h-32"
                        required
                    />
                </div>

                <div className="flex justify-end border-t border-border pt-6">
                    <Button type="submit" disabled={isLoading} className="gap-2">
                        <Save size={16} />
                        {isLoading ? 'Saving...' : 'Save Item'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
