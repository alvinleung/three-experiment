"use client";

import React, { MutableRefObject, RefObject, useEffect, useRef } from "react";
import { RotatingModel } from "./RotatingModel";
import { useWindowSize } from "usehooks-ts";

type Props = {};

const ModelComponent = (props: Props) => {
  const canvasRef = useRef() as RefObject<HTMLCanvasElement>;
  const { width, height } = useWindowSize({ initializeWithValue: false });

  const rotModelAppRef = useRef() as MutableRefObject<RotatingModel>;

  useEffect(() => {
    if (!width || !height || !rotModelAppRef.current) return;
    rotModelAppRef.current.resize(width, height);
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    rotModelAppRef.current = new RotatingModel(canvas);
    return () => {
      rotModelAppRef.current.cleanup();
    };
  }, []);

  return (
    <canvas
      className="fixed z-10 inset-0"
      width={width}
      height={height}
      ref={canvasRef}
    />
  );
};

export default ModelComponent;
