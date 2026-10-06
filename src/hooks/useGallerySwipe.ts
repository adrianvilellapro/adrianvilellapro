import { useRef } from 'react';
import type { MouseEvent, PointerEvent } from 'react';

// Leave vertical scrolling and pinch zoom to the browser; handle only deliberate horizontal swipes.
export function useGallerySwipe(navigate: (direction: number) => void) {
  const gesture = useRef<{ id: number; x: number; y: number; vertical: boolean } | null>(null);
  const suppressClick = useRef(false);

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    suppressClick.current = false;
    if (event.pointerType === 'mouse') return;
    if (!event.isPrimary) { gesture.current = null; suppressClick.current = true; return; }
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, vertical: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const x = Math.abs(event.clientX - start.x);
    const y = Math.abs(event.clientY - start.y);
    if (y > 12 && y > x) start.vertical = true;
    if (x > 12 || y > 12) suppressClick.current = true;
  };
  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    const start = gesture.current;
    gesture.current = null;
    if (!start || start.id !== event.pointerId) return;
    const x = event.clientX - start.x;
    const y = event.clientY - start.y;
    if (!start.vertical && Math.abs(x) >= 36 && Math.abs(x) > Math.abs(y) * 1.4) {
      suppressClick.current = true;
      navigate(x < 0 ? 1 : -1);
    }
  };
  const cancel = () => { gesture.current = null; };
  const onClickCapture = (event: MouseEvent<HTMLElement>) => {
    if (suppressClick.current && event.detail !== 0) {
      event.preventDefault();
      event.stopPropagation();
    }
    suppressClick.current = false;
  };
  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: cancel, onLostPointerCapture: cancel, onClickCapture };
}
