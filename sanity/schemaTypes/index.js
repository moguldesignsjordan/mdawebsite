// sanity/schemaTypes/index.js

// 1. Import the schemas we KNOW exist
import post from './post'
import project from './project' 

// 2. Export the schema definition
export const schema = {
  types: [
    post,
    project,
  ],
}