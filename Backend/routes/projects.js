const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const router = express.Router();

// Multer — memory storage, Cloudinary handles persistence
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

// Helper: upload a buffer to Cloudinary and return the secure URL
const uploadToCloudinary = (buffer, mimetype) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'portfolio', resource_type: 'image' },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });

// ──── PUBLIC ROUTES ────

// GET /api/projects — list all projects (public)
router.get('/', async (req, res) => {
  try {
    const { tag } = req.query; // optional filter: ?tag=DV or ?tag=UX
    const filter = tag ? { tag: tag.toUpperCase() } : {};
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/projects/:id — single project (public)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ──── ADMIN-ONLY ROUTES ────

// POST /api/projects — create project
router.post('/', auth, upload.array('images', 10), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.files && req.files.length > 0) {
      data.images = await Promise.all(
        req.files.map((f) => uploadToCloudinary(f.buffer, f.mimetype))
      );
    }
    // Parse tags if sent as comma-separated string
    if (typeof data.tags === 'string') {
      data.tags = data.tags.split(',').map((t) => t.trim()).filter(Boolean);
    }
    const project = await Project.create(data);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/projects/:id — update project
router.put('/:id', auth, upload.array('images', 10), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.files && req.files.length > 0) {
      const kept = data.existingImages
        ? (typeof data.existingImages === 'string' ? JSON.parse(data.existingImages) : data.existingImages)
        : [];
      const newUrls = await Promise.all(
        req.files.map((f) => uploadToCloudinary(f.buffer, f.mimetype))
      );
      data.images = [...kept, ...newUrls]; // Cloudinary secure URL
    } else if (data.existingImages) {
      data.images = typeof data.existingImages === 'string' ? JSON.parse(data.existingImages) : data.existingImages;
    }
    delete data.existingImages;
    if (typeof data.tags === 'string') {
      data.tags = data.tags.split(',').map((t) => t.trim()).filter(Boolean);
    }
    const project = await Project.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/projects/:id — delete project + its Cloudinary images
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // Clean up Cloudinary images (best-effort, non-blocking)
    if (project.images && project.images.length > 0) {
      const publicIds = project.images
        .filter((url) => url && url.includes('cloudinary.com'))
        .map((url) => {
          const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/);
          return match ? match[1] : null;
        })
        .filter(Boolean);

      if (publicIds.length > 0) {
        cloudinary.api.delete_resources(publicIds).catch((err) =>
          console.warn('Cloudinary cleanup warning:', err.message)
        );
      }
    }

    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
