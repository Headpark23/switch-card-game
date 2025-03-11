// Helper functions for comment operations

// Generate a unique ID for comments
function generateCommentId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

// Save comments to local storage with timestamp to prevent duplicates
function saveCommentsToStorage(comments) {
    try {
        // Add timestamp to track when comments were last saved
        const commentData = {
            comments,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('switchGameComments', JSON.stringify(commentData));
        return true;
    } catch (error) {
        console.error('Error saving comments to storage:', error);
        return false;
    }
}

// Load comments from local storage with timestamp check
function loadCommentsFromStorage() {
    try {
        const savedData = localStorage.getItem('switchGameComments');
        if (!savedData) return null;
        
        const parsedData = JSON.parse(savedData);
        // Check if data is older than 5 minutes
        const lastUpdated = new Date(parsedData.lastUpdated);
        const now = new Date();
        const fiveMinutes = 5 * 60 * 1000;
        
        if (now - lastUpdated > fiveMinutes) {
            // Data is stale, clear it
            localStorage.removeItem('switchGameComments');
            return null;
        }
        
        return parsedData.comments;
    } catch (error) {
        console.error('Error loading comments from storage:', error);
        return null;
    }
}

// Save comment to database using Trickle API with duplicate check
async function saveCommentToDatabase(comment) {
    try {
        // Check if comment already exists
        const existingComments = await trickleListObjects('comments', 100, true);
        const isDuplicate = existingComments.items.some(item => 
            item.objectData.id === comment.id ||
            (item.objectData.content === comment.content && 
             item.objectData.author === comment.author &&
             Math.abs(new Date(item.objectData.timestamp) - new Date(comment.timestamp)) < 5000)
        );
        
        if (!isDuplicate) {
            await trickleCreateObject('comments', comment);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error saving comment to database:', error);
        return false;
    }
}

// Load comments from database using Trickle API with deduplication
async function loadCommentsFromDatabase() {
    try {
        const result = await trickleListObjects('comments', 100, true);
        
        // Deduplicate comments based on content and timestamp
        const uniqueComments = [];
        const seen = new Set();
        
        result.items.forEach(item => {
            const comment = item.objectData;
            const key = `${comment.content}-${comment.author}-${comment.timestamp}`;
            
            if (!seen.has(key)) {
                seen.add(key);
                uniqueComments.push(comment);
            }
        });
        
        // Sort by timestamp to ensure consistent order
        return uniqueComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
        console.error('Error loading comments from database:', error);
        return [];
    }
}

// Update comment in database with validation
async function updateCommentInDatabase(commentId, updates) {
    try {
        const comment = await trickleGetObject('comments', commentId);
        if (!comment) {
            console.error('Comment not found:', commentId);
            return false;
        }
        
        const updatedComment = { ...comment.objectData, ...updates };
        await trickleUpdateObject('comments', commentId, updatedComment);
        return true;
    } catch (error) {
        console.error('Error updating comment in database:', error);
        return false;
    }
}

// Sort comments by newest first
function sortCommentsByNewest(comments) {
    return [...comments].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// Sort comments by most likes
function sortCommentsByLikes(comments) {
    return [...comments].sort((a, b) => (b.likes || 0) - (a.likes || 0));
}

// Sort comments by most replies
function sortCommentsByReplies(comments) {
    return [...comments].sort((a, b) => (b.replies?.length || 0) - (a.replies?.length || 0));
}

// Filter comments by search term
function filterCommentsBySearchTerm(comments, searchTerm) {
    if (!searchTerm) return comments;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return comments.filter(comment => 
        comment.content.toLowerCase().includes(lowerSearchTerm) || 
        comment.author.toLowerCase().includes(lowerSearchTerm)
    );
}

// Remove duplicate comments
function removeDuplicateComments(comments) {
    const seen = new Set();
    return comments.filter(comment => {
        const key = `${comment.content}-${comment.author}-${comment.timestamp}`;
        const isDuplicate = seen.has(key);
        seen.add(key);
        return !isDuplicate;
    });
}
