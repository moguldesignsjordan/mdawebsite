// sanity/schemaTypes/index.js

// 1. Import the schemas we KNOW exist
import post from './post'
import project from './project' 
import product from './product'

// 2. Export the schema definition
export const schema = {
  types: [
    post,
    project,
    product,
  ],
}