function CommentForm({ onAddComment, initialValue = '', placeholder = "Ask a question or share your thoughts...", buttonText = "Post Comment", isReply = false }) {
    try {
        const [content, setContent] = React.useState(initialValue);
        const [author, setAuthor] = React.useState('');
        const [isSubmitting, setIsSubmitting] = React.useState(false);
        const [error, setError] = React.useState('');
        
        const handleSubmit = (e) => {
            e.preventDefault();
            
            // Validate inputs
            if (!content.trim()) {
                setError('Please enter a comment.');
                return;
            }
            
            if (!author.trim()) {
                setError('Please enter your name.');
                return;
            }
            
            setIsSubmitting(true);
            setError('');
            
            try {
                // Create new comment object
                const newComment = {
                    id: generateCommentId(),
                    content: content.trim(),
                    author: author.trim(),
                    timestamp: getCurrentTimestamp(),
                    likes: 0,
                    replies: []
                };
                
                // Call the callback function with the new comment
                onAddComment(newComment);
                
                // Reset form
                setContent('');
                // Keep the author name for future comments
            } catch (error) {
                console.error('Error adding comment:', error);
                setError('Failed to post your comment. Please try again.');
                reportError(error);
            } finally {
                setIsSubmitting(false);
            }
        };
        
        return (
            <form data-name="comment-form" className="comment-form bg-white p-4 rounded-lg shadow-sm border border-gray-200" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <textarea
                        data-name="comment-content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={placeholder}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                        disabled={isSubmitting}
                    ></textarea>
                </div>
                
                <div className="mb-3">
                    <input
                        data-name="comment-author"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Your name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                        disabled={isSubmitting}
                    />
                </div>
                
                {error && (
                    <div data-name="comment-error" className="mb-3 text-red-500 text-sm">
                        {error}
                    </div>
                )}
                
                <div className="flex justify-end">
                    <button
                        data-name="comment-submit"
                        type="submit"
                        className={`px-4 py-2 rounded-md ${
                            isReply ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center">
                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                Posting...
                            </span>
                        ) : buttonText}
                    </button>
                </div>
            </form>
        );
    } catch (error) {
        console.error('CommentForm component error:', error);
        reportError(error);
        return null;
    }
}
