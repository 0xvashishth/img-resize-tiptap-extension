# Image Resize Extension For Tiptap


### Usage

```js
import { ResizableImage } from "img-resize-tiptap-extension";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

const extensions = [StarterKit, Image, ResizableImage];
const editor = useEditor({
  extensions,
  content,
});

<EditorContent
  editor={editor}
  style={{ border: "1px solid black", height: "100px", padding: "10px" }}
/>;

```

- Feel free to raise Pull Request if you find any bug or any improvement.