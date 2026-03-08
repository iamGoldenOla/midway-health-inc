import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, ThumbsUp, Reply } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
  replies?: Comment[];
}

const sampleComments: Comment[] = [
  {
    id: 1,
    author: 'Emmanuel Okonkwo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    date: '2 days ago',
    content: 'This is exactly what I needed to read today! Your insights on content strategy are always spot on. Looking forward to more posts like this.',
    likes: 12,
    replies: [
      {
        id: 2,
        author: 'Akinola Olujobi',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
        date: '1 day ago',
        content: 'Thank you Emmanuel! I appreciate your kind words. More great content coming soon!',
        likes: 5,
      }
    ]
  },
  {
    id: 3,
    author: 'Amaka Nwosu',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    date: '3 days ago',
    content: 'Great article! I\'ve been implementing these strategies and already seeing results. Would love to see a follow-up piece on advanced tactics.',
    likes: 8,
  },
  {
    id: 4,
    author: 'David Adeleke',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    date: '5 days ago',
    content: 'Very insightful read. The part about storytelling really resonated with me. Thanks for sharing!',
    likes: 15,
  },
];

function CommentCard({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className={`${isReply ? 'ml-12 mt-4' : ''}`}>
      <div className="flex gap-4">
        <img
          src={comment.avatar}
          alt={comment.author}
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />
        <div className="flex-1">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-heading font-bold text-foreground">{comment.author}</h4>
              <span className="text-xs text-muted-foreground">{comment.date}</span>
            </div>
            <p className="text-muted-foreground text-sm">{comment.content}</p>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ThumbsUp size={14} />
              <span>{comment.likes}</span>
            </button>
            {!isReply && (
              <button 
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Reply size={14} />
                <span>Reply</span>
              </button>
            )}
          </div>

          {showReplyForm && (
            <div className="mt-4 flex gap-2">
              <Input placeholder="Write a reply..." className="flex-1" />
              <Button size="sm">Reply</Button>
            </div>
          )}

          {comment.replies?.map((reply) => (
            <CommentCard key={reply.id} comment={reply} isReply />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CommentSection() {
  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="flex items-center gap-2 mb-8">
        <MessageCircle className="text-primary" size={24} />
        <h3 className="text-xl font-heading font-bold text-foreground">
          Comments ({sampleComments.length + 1})
        </h3>
      </div>

      {/* Comment Form */}
      <div className="bg-card p-6 rounded-xl shadow-card mb-8">
        <h4 className="font-heading font-bold text-foreground mb-4">Leave a Comment</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input placeholder="Your Name *" />
          <Input type="email" placeholder="Your Email *" />
        </div>
        <Textarea 
          placeholder="Write your comment here..." 
          rows={4}
          className="mb-4"
        />
        <Button>Post Comment</Button>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {sampleComments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
