import post from './post'
import { blockContent } from './blockContent'
import { category } from './category'
import { post } from './post'
import { author } from './author'
import project from './project' // <--- 1. IMPORT THIS

export const schema = {
  types: [post, author, category, blockContent, project], // <--- 2. ADD THIS
}
