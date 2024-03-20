// Import your component
import React from 'react';
import {ResizableImage} from '../index';
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image  from '@tiptap/extension-image';

const extensions = [
  StarterKit,
  Image,
  ResizableImage
]

const content = '<p>Hello World!</p>'

// Export a default export named 'default' (if applicable)
export default {
  title: 'ImageResize', // Define the title for your stories
  component: ResizableImage, // Specify the component being used in the stories
};

// Define your stories using the 'args' pattern
export const App = (args) => {
  
  const editor = useEditor({
    extensions,
    content,
  });

    return (
       <>
       {/* <div style={{ border: '1px solid black', height: '100px' }}> */}
       <EditorContent editor={editor} style={{ border: '1px solid black', height: '100px', padding: '10px' }}/>
       {/* <ImageResize /> */}
       {/* </div> */}
      </>
    );
};