import React, { useState } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { Resizable } from "re-resizable";
import { Node as ProsemirrorNode } from "prosemirror-model";
import { Direction } from "re-resizable/lib/resizer";

interface WrapperProps {
  node: ProsemirrorNode;
  updateAttributes: (attrs: unknown) => void;
  editor: any;
}

const parsePosition = (positionString: string) => {
  const positions: string[] = positionString.split(";").filter(Boolean);
  const styleObject: { [key: string]: string } = {};
  positions.forEach((pos: string) => {
    const [property, value]: string[] = pos.split(":").map((s: string) => s.trim());
    styleObject[property] = value;
  });
  return styleObject;
};


export default function ResizableImageWrapper(props: WrapperProps) {
  const defaultWidth = props.node.attrs.width;
  const defaultHeight = props.node.attrs.height;

  const [isClicked, setIsClicked] = useState(false);
  const [marginLeft, setMarginLeft] = useState(props.node.attrs?.marginLeft ?? 0);

  const handleImageClick = () => {
    setIsClicked(true);
  };

  const handleContainerClick = () => {
    setIsClicked(true);
  };

  const handleMouseLeave = () => {
    setIsClicked(false);
  };

  const handleLeftArrowClick = () => {
    props.updateAttributes({
      marginLeft,
    });
    setMarginLeft(marginLeft - 10);
  };

  const handleRightArrowClick = () => {
    props.updateAttributes({
      marginLeft,
    });
    setMarginLeft(marginLeft + 10);
  };
  const dotsPosition = [
    'top: -4px; left: -4px; cursor: nwse-resize;',
    'top: -4px; right: -4px; cursor: nesw-resize;',
    'bottom: -4px; left: -4px; cursor: nesw-resize;',
    'bottom: -4px; right: -4px; cursor: nwse-resize;',
];


  return (
    <NodeViewWrapper className="image-resizer">
      <div
        style={{
          marginTop: "10px",
          position: "relative",
        }}
        onClick={handleContainerClick}
        onMouseLeave={handleMouseLeave}
      >
        <Resizable
          // className="resizable-image"
          defaultSize={{
            width: defaultWidth ? defaultWidth : "200",
            height: defaultHeight ? defaultHeight : "80",
          }}
          onResize={(
            e: MouseEvent | TouchEvent,
            direction: Direction,
            ref: HTMLElement
          ) => {
            props.updateAttributes({
              width: ref.style.width,
              height: ref.style.height,
            });
          }}
          maxWidth={"100%"}
          style={{
            backgroundImage: `url(${props.node.attrs.src})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            marginLeft: `${marginLeft}px`,
            position: "relative",
          }}
          lockAspectRatio={false}
        >
          {isClicked &&
            dotsPosition.map((position, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#8c8c8c",
                  borderRadius: "30%",
                  ...parsePosition(position),
                }}
              />
            ))}
          {isClicked && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <button className="arrow-button" onClick={handleLeftArrowClick} style={{ transform: "scale(1.5)", marginRight: "10px", background: "gray", border: "none", color: "#fff", cursor: "pointer", transition: "transform 0.5s ease" }}>
                &#8592;
                </button>
                <button className="arrow-button" onClick={handleRightArrowClick} style={{ transform: "scale(1.5)", background: "gray", border: "none", color: "#fff", cursor: "pointer", transition: "transform 0.5s ease" }}>
                &#8594;
                </button>
            </div>
          )}
        </Resizable>
      </div>
    </NodeViewWrapper>
  );
}
