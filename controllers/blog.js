const { response } = require("express");
const { default: slugify } = require("slugify");
const Blog = require("../models/blog");

// all blogs
const allBlogs = async (req, res) => {
    let response = {};
    try {
        const blogs = await Blog.find();
        response = {
            status: true,
            message: 'All blogs',
            data: blogs
        }
    } catch(e) {
        response = {
            status: false,
            message: `Following error occured: ${e.message}`,
            data: {}
        }
    }
    res.json(response);
}

// blog detail
const blogDetail = async (req, res) => {
    let response = {};
    try {
        const blog = await Blog.findById(req.params.id);
        response = {
            status: true,
            message: 'Blog detail',
            data: blog
        }
    } catch(e) {
        response = {
            status: false,
            message: `Following error occured: ${e.message}`,
            data: {}
        }
    }
    res.json(response);
}

// insert blog
const insertBlog = async (req, res) => {
    let response = {};
    try {
        const blog = new Blog({
            title: req.body.title,
            body: req.body.body
        })
        const newBlog = await blog.save();

        response = {
            status: true,
            message: 'Blog inserted successfully.',
            data: newBlog
        }
    } catch(e) {
        response = {
            status: false,
            message: `Following error occured: ${e.message}`,
            data: {}
        }
    }
    res.json(response);
}

// update blog
const updateBlog = async (req, res) => {
    let response = {};
    try {
        const blog = {
            title: req.body.title,
            body: req.body.body,
            userId: 44,
            slug: slugify(req.body.title, {
                lower: true,
                strict: true
            })
        }
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog);

        response = {
            status: true,
            message: 'Blog updated successfully.',
            data: updatedBlog
        }
    } catch(e) {
        response = {
            status: false,
            message: `Following error occured: ${e.message}`,
            data: {}
        }
    }
    res.json(response);
}

// delete blog
const deleteBlog = async (req, res) => {
    let response = {};
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

        response = {
            status: true,
            message: 'Blog deleted successfully.',
            data: deletedBlog
        }
    } catch(e) {
        response = {
            status: false,
            message: `Following error occured: ${e.message}`,
            data: {}
        }
    }
    res.json(response);
}

module.exports = {
    allBlogs,
    blogDetail,
    insertBlog,
    updateBlog,
    deleteBlog
}