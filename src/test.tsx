import * as React from "react";
import InfiniteViewer from "react-infinite-viewer";
import Ruler from "./components/InfiniteViewer/Ruler";
import "./test.css";

export default function App() {

  const horizontalGuides = React.useRef();
  const verticalGuides = React.useRef();
  const viewerRef = React.useRef<InfiniteViewer>(null);
  const targetRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    viewerRef.current!.scrollCenter();
  }, []);

  return (
    <div className="container">
      <button
        onClick={() => {
          viewerRef.current!.scrollCenter();
        }}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1,
        }}
      >
        Scroll Center
      </button>
      <Ruler
        className="guides horizontal"
        ref={horizontalGuides}
        type="horizontal"
        height={30}
      />
      <Ruler
        className="guides vertical"
        width={30}
        ref={verticalGuides}
        type="vertical"
      />
      <InfiniteViewer
        className="infinite-viewer"
        ref={viewerRef}
        useForceWheel
        onScroll={(e) => {
          // console.log("onScroll", horizontalGuides, verticalGuides);
          const _horizontalGuides = (horizontalGuides.current as any)?.guides
            ?.current;
          const _verticalGuides = (verticalGuides.current as any)?.guides
            ?.current;
          _horizontalGuides?.scroll?.(e.scrollLeft);
          _horizontalGuides?.scrollGuides?.(e.scrollTop);

          _verticalGuides?.scroll?.(e.scrollTop);
          _verticalGuides?.scrollGuides?.(e.scrollLeft);
        }}
        onPinch={(e) => {
          const zoom = Math.max(0.1, e.zoom);
          const _horizontalGuides = (horizontalGuides.current as any)?.guides
            ?.current;
          const _verticalGuides = (verticalGuides.current as any)?.guides
            ?.current;
          _horizontalGuides.zoom = zoom;
          _verticalGuides.zoom = zoom;
          (viewerRef.current as any).zoom = zoom;
        }}
      >
        <div
          className="viewport"
          style={{
            width: "400px",
            height: "400px",
            border: "1px solid #ccc",
          }}
        >
          <div className="target" ref={targetRef}>
            Target
          </div>
        </div>
      </InfiniteViewer>
    </div>
  );
}
