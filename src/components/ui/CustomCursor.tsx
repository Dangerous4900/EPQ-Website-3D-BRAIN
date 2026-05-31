import { useEffect, useState, useRef } from 'react';
import { useStore } from '../../store/useStore';

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hoveredPart = useStore((state) => state.hoveredPart);
  const activeHover = isHovered || !!hoveredPart;
  
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  
  useEffect(() => {
    let animationFrameId: number;
    let initialized = false;
    
    const updatePosition = (e: MouseEvent) => {
      if (!initialized) {
        currentPos.current = { x: e.clientX, y: e.clientY };
        initialized = true;
      }
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth physics-based render loop
    const render = () => {
      // 0.15 makes the cursor glide smoothly but with ultra-high responsiveness
      const ease = 0.15;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * ease;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) scale(${activeHover ? 1.4 : 1})`;
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    animationFrameId = requestAnimationFrame(render);

    // Attach listeners to clickable controls for responsive hover cues
    const addHoverListeners = () => {
      const clickables = document.querySelectorAll(
        'button, [role="button"], a, input, select, textarea, .cursor-pointer, [onclick]'
      );
      
      const onEnter = () => setIsHovered(true);
      const onLeave = () => setIsHovered(false);

      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [isVisible, isHovered, activeHover]);

  if (!isVisible) return null;

  return (
    <>
      {/* Hide native browser pointer only on devices equipped with a mouse/stylus */}
      <style>{`
        @media (pointer: fine) {
          body, 
          button, 
          a, 
          [role="button"], 
          input, 
          select, 
          textarea, 
          .cursor-pointer {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* Central precision white dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 -ml-2 -mt-2 bg-white rounded-full pointer-events-none z-[10000] hidden md:block transition-shadow duration-300"
        style={{
          boxShadow: activeHover 
            ? '0 0 16px 5px rgba(255, 255, 255, 0.95)' 
            : '0 0 10px 3px rgba(255, 255, 255, 0.92)'
        }}
      />
    </>
  );
}
