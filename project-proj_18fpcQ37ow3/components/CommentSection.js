function CommentSection() {
    try {
        const [comments, setComments] = React.useState([]);
        const [isLoading, setIsLoading] = React.useState(true);
        const [sortOption, setSortOption] = React.useState('newest');
        const [searchTerm, setSearchTerm] = React.useState('');
        const [lastUpdate, setLastUpdate] = React.useState(null);
        
        // Load comments on component mount
        React.useEffect(() => {
            const loadComments = async () => {
                setIsLoading(true);
                
                try {
                    // Try to load from database first
                    let loadedComments = [];
                    
                    try {
                        // Check if we have recent comments in local storage
                        const cachedComments = loadCommentsFromStorage();
                        
                        if (cachedComments) {
                            loadedComments = cachedComments;
                        } else {
                            // Load from database if no valid cache
                            loadedComments = await loadCommentsFromDatabase();
                            // Update local storage with fresh data
                            saveCommentsToStorage(loadedComments);
                        }
                        
                        // Remove any duplicates
                        loadedComments = removeDuplicateComments(loadedComments);
                        
                    } catch (dbError) {
                        console.error('Database error:', dbError);
                        // Try local storage as fallback
                        const cachedComments = loadCommentsFromStorage();
                        if (cachedComments) {
                            loadedComments = removeDuplicateComments(cachedComments);
                        }
                    }
                    
                    setComments(loadedComments);
                    setLastUpdate(new Date().toISOString());
                } catch (error) {
                    console.error('Error loading comments:', error);
                    reportError(error);
                } finally {
                    setIsLoading(false);
                }
            };
            
            loadComments();
            
            // Set up periodic refresh
            const refreshInterval = setInterval(loadComments, 5 * 60 * 1000); // Refresh every 5 minutes
            
            return () => clearInterval(refreshInterval);
        }, []);
        
        // Save comments whenever they change
        React.useEffect(() => {
            const saveComments = async () => {
                if (!isLoading && comments.length > 0 && lastUpdate) {
                    // Save to local storage
                    saveCommentsToStorage(comments);
                    
                    // Save new comments to database
                    const newComments = comments.filter(comment => 
                        new Date(comment.timestamp) > new Date(lastUpdate)
                    );
                    
                    for (const comment of newComments) {
                        try {
                            await saveCommentToDatabase(comment);
                        } catch (error) {
                            console.error('Error saving comment to database:', error);
                        }
                    }
                    
                    setLastUpdate(new Date().toISOString());
                }
            };
            
            saveComments();
        }, [comments, isLoading, lastUpdate]);
        
        const handleAddComment = async (newComment) => {
            try {
                // Check for duplicates before adding
                const isDuplicate = comments.some(comment => 
                    comment.content === newComment.content && 
                    comment.author === newComment.author
                );
                
                if (!isDuplicate) {
                    setComments(prevComments => [newComment, ...prevComments]);
                    await saveCommentToDatabase(newComment);
                }
            } catch (error) {
                console.error('Error adding comment:', error);
                reportError(error);
            }
        };
        
        const handleAddReply = async (commentId, reply) => {
            try {
                const updatedComments = comments.map(comment => 
                    comment.id === commentId 
                        ? { 
                            ...comment, 
                            replies: [...(comment.replies || []), reply] 
                          }
                        : comment
                );
                
                setComments(updatedComments);
                
                // Update the comment with new reply in database
                const commentToUpdate = updatedComments.find(c => c.id === commentId);
                if (commentToUpdate) {
                    await updateCommentInDatabase(commentId, commentToUpdate);
                }
            } catch (error) {
                console.error('Error adding reply:', error);
                reportError(error);
            }
        };
        
        const handleLikeComment = async (commentId, isReply = false, parentCommentId = null) => {
            try {
                if (isReply && parentCommentId) {
                    // Handle liking a reply
                    const updatedComments = comments.map(comment => 
                        comment.id === parentCommentId 
                            ? { 
                                ...comment, 
                                replies: comment.replies.map(reply => 
                                    reply.id === commentId 
                                        ? { ...reply, likes: (reply.likes || 0) + 1 } 
                                        : reply
                                ) 
                              }
                            : comment
                    );
                    
                    setComments(updatedComments);
                    
                    // Update parent comment in database
                    const parentComment = updatedComments.find(c => c.id === parentCommentId);
                    if (parentComment) {
                        await updateCommentInDatabase(parentCommentId, parentComment);
                    }
                } else {
                    // Handle liking a top-level comment
                    const updatedComments = comments.map(comment => 
                        comment.id === commentId 
                            ? { ...comment, likes: (comment.likes || 0) + 1 } 
                            : comment
                    );
                    
                    setComments(updatedComments);
                    
                    // Update comment in database
                    const updatedComment = updatedComments.find(c => c.id === commentId);
                    if (updatedComment) {
                        await updateCommentInDatabase(commentId, updatedComment);
                    }
                }
            } catch (error) {
                console.error('Error updating likes:', error);
                reportError(error);
            }
        };
        
        // Sort and filter comments based on current options
        const getFilteredAndSortedComments = () => {
            let filteredComments = filterCommentsBySearchTerm(comments, searchTerm);
            
            switch(sortOption) {
                case 'likes':
                    return sortCommentsByLikes(filteredComments);
                case 'replies':
                    return sortCommentsByReplies(filteredComments);
                case 'newest':
                default:
                    return sortCommentsByNewest(filteredComments);
            }
        };
        
        const filteredAndSortedComments = getFilteredAndSortedComments();
        
        return (
            <section id="comments" data-name="comments-section" className="mt-12 pt-8 border-t border-gray-200">
                <div data-name="comments-container" className="max-w-4xl mx-auto px-4">
                    <div data-name="comments-header" className="comment-header">
                        <h2 className="text-2xl font-bold mb-4">Discussion</h2>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                            <div className="comment-count">
                                {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search comments..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9 pr-4 py-2 border rounded-md w-full"
                                    />
                                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                </div>
                                
                                <div className="comment-sort">
                                    <span>Sort by:</span>
                                    <span 
                                        className={`sort-option ${sortOption === 'newest' ? 'active' : ''}`}
                                        onClick={() => setSortOption('newest')}
                                    >
                                        Newest
                                    </span>
                                    <span 
                                        className={`sort-option ${sortOption === 'likes' ? 'active' : ''}`}
                                        onClick={() => setSortOption('likes')}
                                    >
                                        Most Likes
                                    </span>
                                    <span 
                                        className={`sort-option ${sortOption === 'replies' ? 'active' : ''}`}
                                        onClick={() => setSortOption('replies')}
                                    >
                                        Most Replies
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <CommentForm onAddComment={handleAddComment} />
                    
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <i className="fas fa-spinner fa-spin text-3xl text-blue-500"></i>
                        </div>
                    ) : filteredAndSortedComments.length > 0 ? (
                        <div data-name="comments-list" className="mt-8 space-y-6">
                            {filteredAndSortedComments.map(comment => (
                                <CommentItem 
                                    key={comment.id} 
                                    comment={comment} 
                                    onAddReply={(reply) => handleAddReply(comment.id, reply)}
                                    onLikeComment={() => handleLikeComment(comment.id)}
                                    onLikeReply={(replyId) => handleLikeComment(replyId, true, comment.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            {searchTerm ? 'No comments match your search.' : 'No comments yet. Be the first to start the discussion!'}
                        </div>
                    )}
                </div>
            </section>
        );
    } catch (error) {
        console.error('CommentSection component error:', error);
        reportError(error);
        return null;
    }
}
