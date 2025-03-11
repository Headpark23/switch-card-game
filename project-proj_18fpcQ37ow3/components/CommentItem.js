function CommentItem({ comment, onAddReply, onLikeComment, onLikeReply }) {
    try {
        const [showReplyForm, setShowReplyForm] = React.useState(false);
        const [showReplies, setShowReplies] = React.useState(false);
        const [hasLiked, setHasLiked] = React.useState(false);
        
        const handleLike = () => {
            if (!hasLiked) {
                onLikeComment();
                setHasLiked(true);
            }
        };
        
        const handleReplySubmit = (reply) => {
            onAddReply(reply);
            setShowReplyForm(false);
            setShowReplies(true);
        };
        
        const toggleReplyForm = () => {
            setShowReplyForm(!showReplyForm);
        };
        
        const toggleReplies = () => {
            setShowReplies(!showReplies);
        };
        
        const replyCount = comment.replies?.length || 0;
        
        return (
            <div data-name="comment-item" className="comment-container p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
                <div data-name="comment-header" className="flex items-center gap-2 mb-2">
                    <div data-name="comment-author-avatar" className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
                        <span className="font-bold">{comment.author.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                        <span data-name="comment-author" className="comment-author">{comment.author}</span>
                        <span data-name="comment-time" className="comment-time ml-2" title={formatDateTime(comment.timestamp)}>
                            {formatRelativeTime(comment.timestamp)}
                        </span>
                    </div>
                </div>
                
                <div data-name="comment-body" className="comment-body py-2">
                    {comment.content}
                </div>
                
                <div data-name="comment-actions" className="comment-actions">
                    <div 
                        data-name="like-action" 
                        className={`comment-action ${hasLiked ? 'active' : ''}`}
                        onClick={handleLike}
                    >
                        <i className={`${hasLiked ? 'fas' : 'far'} fa-thumbs-up`}></i>
                        <span>{comment.likes || 0}</span>
                    </div>
                    
                    <div 
                        data-name="reply-action" 
                        className="comment-action"
                        onClick={toggleReplyForm}
                    >
                        <i className="far fa-comment"></i>
                        <span>Reply</span>
                    </div>
                </div>
                
                {showReplyForm && (
                    <div data-name="reply-form-container" className="mt-4 ml-8">
                        <ReplyForm 
                            onSubmitReply={handleReplySubmit} 
                            onCancel={() => setShowReplyForm(false)}
                        />
                    </div>
                )}
                
                {replyCount > 0 && (
                    <div data-name="replies-toggle" className="mt-3">
                        <button 
                            className="reply-toggle" 
                            onClick={toggleReplies}
                        >
                            <i className={`fas fa-chevron-${showReplies ? 'down' : 'right'} text-xs`}></i>
                            <span>{replyCount} {replyCount === 1 ? 'reply' : 'replies'}</span>
                        </button>
                    </div>
                )}
                
                {showReplies && replyCount > 0 && (
                    <div data-name="comment-replies" className="comment-replies mt-3">
                        {comment.replies.map(reply => (
                            <ReplyItem 
                                key={reply.id} 
                                reply={reply} 
                                onLikeReply={() => onLikeReply(reply.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('CommentItem component error:', error);
        reportError(error);
        return null;
    }
}

function ReplyItem({ reply, onLikeReply }) {
    try {
        const [hasLiked, setHasLiked] = React.useState(false);
        
        const handleLike = () => {
            if (!hasLiked) {
                onLikeReply();
                setHasLiked(true);
            }
        };
        
        return (
            <div data-name="reply-item" className="py-3">
                <div data-name="reply-header" className="flex items-center gap-2 mb-2">
                    <div data-name="reply-author-avatar" className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center">
                        <span className="font-bold text-xs">{reply.author.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                        <span data-name="reply-author" className="comment-author text-sm">{reply.author}</span>
                        <span data-name="reply-time" className="comment-time ml-2 text-xs" title={formatDateTime(reply.timestamp)}>
                            {formatRelativeTime(reply.timestamp)}
                        </span>
                    </div>
                </div>
                
                <div data-name="reply-body" className="comment-body py-1 pl-8 text-sm">
                    {reply.content}
                </div>
                
                <div data-name="reply-actions" className="pl-8">
                    <div 
                        data-name="reply-like-action" 
                        className={`comment-action ${hasLiked ? 'active' : ''}`}
                        onClick={handleLike}
                    >
                        <i className={`${hasLiked ? 'fas' : 'far'} fa-thumbs-up text-sm`}></i>
                        <span className="text-sm">{reply.likes || 0}</span>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ReplyItem component error:', error);
        reportError(error);
        return null;
    }
}
