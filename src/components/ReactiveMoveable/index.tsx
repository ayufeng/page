import React, { useContext, useEffect } from "react";
import Moveable from "react-moveable";
import {
  SET_CURRENT_DRAG_COMPONENT,
  SET_MOVEABLE_OPTIONS,
  UPDATE_COMPONENT_LIST_BY_CURRENT_DRAG,
} from "../../stores/action-type";
import { Context } from "../../stores/context";

const layout = {
  frame: { translate: [0, 0] },
} as any;
export default () => {
  const { currentDragComponent ,moveableOptions = {}, commonDispatch } = useContext(Context);
  const {
    target,
    elementGuidelines,
    frame = { translate: [0, 0] },
    bounds,
    verticalGuidelines,
    horizontalGuidelines,
  } = moveableOptions as any;

  const onWinResize = React.useCallback(() => {
    const parentEl = document.querySelector(".editor-area-scroll");
    const { left, right, top, bottom } =
      parentEl?.getBoundingClientRect() || {};
    commonDispatch({
      type: SET_MOVEABLE_OPTIONS,
      payload: {
        bounds: {
          left,
          right,
          top,
          bottom,
        },
      },
    });
  }, []);

  useEffect(() => {
    onWinResize();
    window.addEventListener("resize", onWinResize);
    return () => {
      window.removeEventListener("resize", onWinResize);
    };
  }, []);

  useEffect(() => {
    const { layout = {}} = currentDragComponent;
    commonDispatch({
      type: SET_MOVEABLE_OPTIONS,
      payload: layout,
    });
  }, [currentDragComponent]);

  return (
    <Moveable
      target={target}
      // ------------------ 辅助线开始 ------------------
      elementGuidelines={elementGuidelines}
      verticalGuidelines={verticalGuidelines}
      horizontalGuidelines={horizontalGuidelines}
      // ------------------ 辅助线结束 ------------------
      // ------------------ 限制范围开始 ------------------
      snappable={true}
      snapThreshold={5}
      isDisplaySnapDigit={true}
      snapGap={true}
      snapElement={true}
      snapVertical={true}
      snapHorizontal={true}
      snapCenter={false}
      snapDigit={0}
      bounds={bounds}
      // ------------------ 限制范围结束 ------------------
      // ------------------ 拖拽开始 ------------------
      draggable={true}
      throttleDrag={0}
      startDragRotate={0}
      throttleDragRotate={0}
      // ------------------ 拖拽结束 ------------------
      zoom={1}
      origin={true}
      padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
      // ------------------ 调整大小开始 ------------------
      resizable={true}
      keepRatio={false}
      throttleResize={0}
      edge={false}
      renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
      // ------------------ 调整大小结束 ------------------
      onDragStart={(e) => {
        e.set(frame.translate);
      }}
      onDrag={(e) => {
        layout.frame.translate = e.beforeTranslate;
        e.target.style.transform = `translate(${e.beforeTranslate[0]}px, ${e.beforeTranslate[1]}px)`;
      }}
      onDragEnd={({ target, isDrag, clientX, clientY }) => {
        // console.log('onDragEnd', target, isDrag, clientX, clientY)
        const { frame } = layout;
        commonDispatch({
          type: SET_CURRENT_DRAG_COMPONENT,
          payload: {
            layout: {
              frame,
              clientX,
              clientY,
            },
          },
        });
        commonDispatch({
          type: UPDATE_COMPONENT_LIST_BY_CURRENT_DRAG,
          payload: {
            data: {
              layout: {
                frame,
                clientX,
                clientY,
              },
            },
          },
        });
      }}
      onResizeStart={(e) => {
        e.setOrigin(["%", "%"]);
        e.dragStart && e.dragStart.set(frame.translate);
      }}
      onResize={({ target, width, height, drag }) => {
        const beforeTranslate = drag.beforeTranslate;
        layout.width = width;
        layout.height = height;
        layout.frame.translate = drag.beforeTranslate;
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;
        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
      }}
      onResizeEnd={({ lastEvent }) => {
        // console.log("lastEvent", lastEvent);
        if (lastEvent) {
          const { frame, width, height } = layout;
          commonDispatch({
            type: SET_CURRENT_DRAG_COMPONENT,
            payload: {
              layout: {
                frame,
                width,
                height,
              },
            },
          });
          commonDispatch({
            type: UPDATE_COMPONENT_LIST_BY_CURRENT_DRAG,
            payload: {
              data: {
                layout: {
                  frame,
                  width,
                  height,
                },
              },
            },
          });
        }
      }}
    />
  );
};
