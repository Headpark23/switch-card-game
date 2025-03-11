function ReplyForm({ onSubmitReply, onCancel }) {
    try {
        const [content, setContent] = React.useState('');
        const [author, setAuthor] = React.useState('');
        const [isSubmitting, setIsSubmitting] = React.useState(false);
        const [error, setError] = React.useState('');
        
        const handleSubmit = (e) => {
            e.preventDefault();
            
            // Validate inputs
            if (!content.trim()) {
                setError('Please enter a reply.');
                return;
            }
            
            if (!author.trim()) {
                setError('Please enter your name.');
                return;
            }
            
            setIsSubmitting(true);
            setError('');
            
            try {
                // Create new reply object
                const newReply = {
                    id: generateCommentId(), // Reuse the comment ID generator
                    content: content.trim(),
                    author: author.trim(),
                    timestamp: getCurrentTimestamp(),
                    likes: 0
                };
                
                // Call the callback function with the new reply
                onSubmitReply(newReply);
                
                // Reset form
                setContent('');
                // Keep the author name for future replies
            } catch (error) {
                console.error('Error adding reply:', error);
                setError('Failed to post your reply. Please try again.');
                reportError(error);
            } finally {
                setIsSubmitting(false);
            }
        };
        
        return (
            <div data-name="reply-form-wrapper" className="bg-gray-50 p-4 rounded-lg">
                <form data-name="reply-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <textarea
                            data-name="reply-content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your reply..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                            disabled={isSubmitting}
                            rows="3"
                        ></textarea>
                    </div>
                    
                    <div className="mb-3">
                        <input
                            data-name="reply-author"
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Your name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                            disabled={isSubmitting}
                        />
                    </div>
                    
                    {error && (
                        <div data-name="reply-error" className="mb-3 text-red-500 text-sm">
                            {error}
                        </div>
                    )}
                    
                    <div className="flex justify-end gap-2">
                        <button
                            data-name="reply-cancel"
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-200"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            data-name="reply-submit"
                            type="submit"
                            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    Posting...
                                </span>
                            ) : "Post Reply"}
                        </button>
                    </div>
                </form>
            </div>
        );
    } catch (error) {
        console.error('ReplyForm component error:', error);
        reportError(error);
        return null;
    }
}
