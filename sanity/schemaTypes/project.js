// sanity/schemaTypes/project.js

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    // --- NEW FIELD ADDED HERE ---
defineField({
      name: 'projectType',
      title: 'Project Categories',
      type: 'array', // <--- CHANGED FROM 'string' TO 'array'
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Web Design', value: 'Web Design' },
          { title: 'Branding', value: 'Branding' },
          { title: 'Automation', value: 'Automation' },
          { title: 'App Development', value: 'App Development' },
          { title: 'Project Management', value: 'Project Management' },
          { title: 'Mobile App', value: 'Mobile App' },
        ],
        layout: 'grid' // Displays as checkboxes in Studio
      },
      validation: (Rule) => Rule.required().min(1).error('Select at least one category.'),
    }),
    // ---------------------------
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline (e.g. "4 Weeks")',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'My Role (e.g. "Lead Developer")',
      type: 'string',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'projectLink',
      title: 'Live Link',
      type: 'url',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Feature Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Case Study Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
  ],
})