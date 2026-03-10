const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const router = express.Router();

// Multer config — Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'portfolio',
    allowed_formats: ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
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
      data.images = req.files.map((f) => f.path); // Cloudinary secure URL
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
      // Merge with existing images kept by the client
      const kept = data.existingImages
        ? (typeof data.existingImages === 'string' ? JSON.parse(data.existingImages) : data.existingImages)
        : [];
      data.images = [...kept, ...req.files.map((f) => f.path)]; // Cloudinary secure URL
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
