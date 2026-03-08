import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save } from 'lucide-react';

export default function AdminPostEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const isEditing = id !== 'new';

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        featured_image: '',
        published: false,
    });

    useEffect(() => {
        if (isEditing) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) setFormData(data);
        } catch (error: any) {
            toast({
                title: 'Error loading post',
                description: error.message,
                variant: 'destructive',
            });
            navigate('/secure-portal/posts');
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug === generateSlug(prev.title) || !prev.slug ? generateSlug(title) : prev.slug,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isEditing) {
                const { error } = await supabase
                    .from('posts')
                    .update({ ...formData, updated_at: new Date().toISOString() })
                    .eq('id', id);
                if (error) throw error;
                toast({ title: 'Success', description: 'Post updated successfully' });
            } else {
                const { error } = await supabase
                    .from('posts')
                    .insert([formData]);
                if (error) throw error;
                toast({ title: 'Success', description: 'Post created successfully' });
                navigate('/secure-portal/posts');
            }
        } catch (error: any) {
            toast({
                title: 'Error saving post',
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
                    <Button variant="ghost" size="icon" onClick={() => navigate('/secure-portal/posts')}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="font-heading text-3xl font-bold tracking-tight">
                        {isEditing ? 'Edit Post' : 'Create New Post'}
                    </h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-background p-6 md:p-8 rounded-xl border border-border">
                {/* Title & Slug */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Post Title</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={handleTitleChange}
                            placeholder="e.g. 5 Digital Marketing Strategies"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug">URL Slug</Label>
                        <Input
                            id="slug"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            placeholder="e.g. 5-digital-marketing-strategies"
                            required
                        />
                    </div>
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt / Short Description</Label>
                    <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        placeholder="A brief summary of this article..."
                        className="h-20"
                    />
                </div>

                {/* Featured Image URL */}
                <div className="space-y-2">
                    <Label htmlFor="featured_image">Featured Image URL</Label>
                    <Input
                        id="featured_image"
                        value={formData.featured_image || ''}
                        onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                {/* Main Content (HTML) */}
                <div className="space-y-2">
                    <Label htmlFor="content">Content (HTML Support)</Label>
                    <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="<p>Start writing your post content here...</p>"
                        className="min-h-[400px] font-mono"
                        required
                    />
                </div>

                {/* Publishing Status */}
                <div className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg">
                    <input
                        type="checkbox"
                        id="published"
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="published" className="text-base cursor-pointer">
                        Publish Post immediately
                    </Label>
                </div>

                {/* Submit */}
                <div className="flex justify-end border-t border-border pt-6">
                    <Button type="submit" disabled={isLoading} className="gap-2">
                        <Save size={16} />
                        {isLoading ? 'Saving...' : 'Save Post'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
