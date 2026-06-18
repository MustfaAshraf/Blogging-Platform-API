import Post from '../models/post.model.js';

// @route   GET /posts
// @desc    Get all posts (Public)
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name email')
            .sort({ createdAt: -1 }); // Newest posts first

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: `Server Error: ${error.message}` });
    }
};

// @route   POST /posts
// @desc    Create a post (Protected)
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const newPost = new Post({
            title,
            content,
            author: req.user._id 
        });

        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: `Server Error: ${error.message}` });
    }
};

// @route   PUT /posts/:id
// @desc    Update a post (Protected, Owner Only)
export const updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Forbidden: You can only update your own posts.' });
        }

        if (title) post.title = title;
        if (content) post.content = content;

        const updatedPost = await post.save();

        res.status(200).json(updatedPost);
    } catch (error) {
        if (error.name === 'CastError') return res.status(400).json({ error: 'Invalid Post ID.' });
        res.status(500).json({ error: `Server Error: ${error.message}` });
    }
};

// @route   DELETE /posts/:id
// @desc    Delete a post (Protected, Owner Only)
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Forbidden: You can only delete your own posts.' });
        }

        await post.deleteOne();

        res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (error) {
        if (error.name === 'CastError') return res.status(400).json({ error: 'Invalid Post ID.' });
        res.status(500).json({ error: `Server Error: ${error.message}` });
    }
};