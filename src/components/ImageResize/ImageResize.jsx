import Image from '@tiptap/extension-image';
import React from 'react';

const ImageResize = Image.extend({
    addAttributes() {
        return {
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            style: {
                default: 'width: 100%; height: auto; cursor: pointer;',
            },
        };
    },
    addNodeView() {
        return ({ node, editor, getPos }) => {
            const { view, options: { editable }, } = editor;
            const { src, alt, style } = node.attrs;
            const $container = document.createElement('div');
            const $img = document.createElement('img');
            $container.appendChild($img);
            $img.setAttribute('src', src);
            $img.setAttribute('alt', alt);
            $img.setAttribute('style', style);
            $img.setAttribute('draggable', 'true');
            if (!editable)
                return { dom: $img };
            const dotsPosition = [
                'top: -4px; left: -4px; cursor: nwse-resize;',
                'top: -4px; right: -4px; cursor: nesw-resize;',
                'bottom: -4px; left: -4px; cursor: nesw-resize;',
                'bottom: -4px; right: -4px; cursor: nwse-resize;',
            ];
            let isResizing = false;
            let startX, startWidth, startHeight;
            $container.addEventListener('click', () => {
                $container.setAttribute('style', `position: relative; border: 1px dashed #6C6C6C; ${style} cursor: pointer;`);
                Array.from({ length: 4 }, (_, index) => {
                    const $dot = document.createElement('div');
                    $dot.setAttribute('style', `position: absolute; width: 12px; height: 12px; background-color: #6C6C6C; border-radius: 50%; ${dotsPosition[index]}`);
                    $dot.addEventListener('mousedown', e => {
                        e.preventDefault();
                        isResizing = true;
                        startX = e.clientX;
                        startWidth = $container.offsetWidth;
                        startHeight = $container.offsetHeight;
                        const onMouseMove = (e) => {
                            if (!isResizing)
                                return;
                            const deltaX = e.clientX - startX;
                            const aspectRatio = startWidth / startHeight;
                            const newWidth = startWidth + deltaX;
                            const newHeight = newWidth / aspectRatio;
                            $container.style.width = newWidth + 'px';
                            $container.style.height = newHeight + 'px';
                            $img.style.width = newWidth + 'px';
                            $img.style.height = newHeight + 'px';
                        };
                        const onMouseUp = () => {
                            if (isResizing) {
                                isResizing = false;
                            }
                            if (typeof getPos === 'function') {
                                const newAttrs = Object.assign(Object.assign({}, node.attrs), { style: `${$img.style.cssText}` });
                                view.dispatch(view.state.tr.setNodeMarkup(getPos(), null, newAttrs));
                            }
                            document.removeEventListener('mousemove', onMouseMove);
                            document.removeEventListener('mouseup', onMouseUp);
                        };
                        document.addEventListener('mousemove', onMouseMove);
                        document.addEventListener('mouseup', onMouseUp);
                    });
                    $container.appendChild($dot);
                });
            });
            document.addEventListener('click', (e) => {
                if (!$container.contains(e.target)) {
                    $container.removeAttribute('style');
                    if ($container.childElementCount > 2) {
                        for (let i = 0; i < 4; i++) {
                            $container.removeChild($container.lastChild);
                        }
                    }
                }
            });
            // $container.style.position = 'realative';
            // $img.style.position = 'absolute';
            // $container.addEventListener('mousedown', (e) => {
            //     e.stopPropagation();
            //     isResizing = true;
            //     startX = e.clientX;
            //     startY = e.clientY;
            //     startWidth = parseInt(document.defaultView.getComputedStyle($container).width, 10);
            //     startHeight = parseInt(document.defaultView.getComputedStyle($container).height, 10);
            // });
            // window.addEventListener('mousemove', (e) => {
            //     if (!isResizing) return;
            //     const deltaX = e.clientX - startX;
            //     const deltaY = e.clientY - startY;
            //     $container.style.width = startWidth + deltaX + 'px';
            //     $container.style.height = startHeight + deltaY + 'px';
            //     $img.style.width = startWidth + deltaX + 'px';
            //     $img.style.height = startHeight + deltaY + 'px';
            // });
            // window.addEventListener('mouseup', (e) => {
            //     e.stopPropagation();
            //     isResizing = false;
            // });
            
            // $container.addEventListener('click', (e) => {
            //     e.stopPropagation();
            // });
            
            // $img.addEventListener('dragstart', (e) => {
            //     e.preventDefault();
            // });
            // $img.addEventListener('mousedown', (e) => {
            //     e.stopPropagation();
            //     const shiftX = e.clientX - $img.getBoundingClientRect().left;
            //     const shiftY = e.clientY - $img.getBoundingClientRect().top;
            
            //     function moveAt(pageX, pageY) {
            //         $img.style.left = pageX - shiftX + 'px';
            //         $img.style.top = pageY - shiftY + 'px';
            //     }
            
            //     function onMouseMove(e) {
            //         moveAt(e.pageX, e.pageY);
            //     }
            
            //     // Add the mousemove event listener to the document
            //     document.addEventListener('mousemove', onMouseMove);
            
            //     // Add the mouseup event listener to the document
            //     document.onmouseup = function() {
            //         document.removeEventListener('mousemove', onMouseMove);
            //         document.onmouseup = null;
            //     };
            // });
            return {
                dom: $container,
            };
        };
    },
});

export default ImageResize;