# Image Resize Extension For Tiptap


- create src in root dir
    - create components in src
    - create index.js inside src

- Install react and react-dom. `npm install --save-dev react react-dom`

- Now we do not want to install react the same version in the project that will install my project, so I'm adding it to peerDependencies as well. 

```json
"peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
}
```

- Installing storybook. `npx sb init`
    - Select `vite` and go ahead.
- Create Folder inside components. 
- Create `index.js` and create any components as we want. Also export all components in `index.js`.
- Create `Requirements.stories.jsx` and add the the component that you want to use.

- Installing additional packages. `npm install --save-dev `
