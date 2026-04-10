import React, { useEffect, useRef } from 'react';

function App() {
  const cursorRef = useRef(null);
  const revealCanvasRef = useRef(null);
  const gridCanvasRef = useRef(null);
  const baseLayerRef = useRef(null);
  const baseImgRef = useRef(null);
  const nameBlockRef = useRef(null);
  const navLinkRef = useRef(null);
  const socialIconsRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const revealCanvas = revealCanvasRef.current;
    const gridBg = gridCanvasRef.current;
    const baseLayer = baseLayerRef.current;
    const baseImg = baseImgRef.current;
    const nameBlock = nameBlockRef.current;
    const navLink = navLinkRef.current;
    const socialIcons = socialIconsRef.current;
    const subtitle = subtitleRef.current;

    if (!cursor || !revealCanvas || !gridBg || !baseLayer || !baseImg || !nameBlock || !navLink || !socialIcons || !subtitle) {
      return undefined;
    }

    const rctx = revealCanvas.getContext('2d');
    const gctx = gridBg.getContext('2d');

    if (!rctx || !gctx) {
      return undefined;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blobX = mouseX;
    let blobY = mouseY;
    let speed = 0;
    let time = 0;
    let frameId = 0;

    const echoes = [];
    const MAX_TRAIL = 6;

    const revealImg = new Image();
    revealImg.src = '/img1.png';

    function resize() {
      revealCanvas.width = window.innerWidth;
      revealCanvas.height = window.innerHeight;
      gridBg.width = window.innerWidth;
      gridBg.height = window.innerHeight;
    }

    function onMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '0.8';
    }

    function getImageRect() {
      const imgNatW = revealImg.naturalWidth || baseImg.naturalWidth || 1;
      const imgNatH = revealImg.naturalHeight || baseImg.naturalHeight || 1;
      const aspect = imgNatW / imgNatH;
      const maxH = window.innerHeight * 0.85;
      const maxW = window.innerWidth * 0.85;
      let drawH = maxH;
      let drawW = drawH * aspect;
      if (drawW > maxW) {
        drawW = maxW;
        drawH = drawW / aspect;
      }
      const drawX = (window.innerWidth - drawW) / 2;
      const drawY = window.innerHeight - drawH + window.innerHeight * 0.02;
      return { x: drawX, y: drawY, w: drawW, h: drawH };
    }

    function drawGrid(t) {
      const w = gridBg.width;
      const h = gridBg.height;
      const spacing = 56;
      const ox = (mouseX - w / 2) * 0.04;
      const oy = (mouseY - h / 2) * 0.04;

      gctx.clearRect(0, 0, w, h);
      gctx.strokeStyle = 'rgba(26, 26, 26, 0.08)';
      gctx.lineWidth = 0.7;

      const startX = -spacing + (ox % spacing);
      const startY = -spacing + (oy % spacing);

      for (let x = startX; x <= w + spacing; x += spacing) {
        gctx.beginPath();
        gctx.moveTo(x, 0);
        gctx.lineTo(x + Math.sin(t + x * 0.01) * 2, h);
        gctx.stroke();
      }

      for (let y = startY; y <= h + spacing; y += spacing) {
        gctx.beginPath();
        gctx.moveTo(0, y);
        gctx.lineTo(w, y + Math.cos(t + y * 0.01) * 2);
        gctx.stroke();
      }
    }

    function animate() {
      time += 0.016;

      const prevBlobX = blobX;
      const prevBlobY = blobY;
      blobX += (mouseX - blobX) * 0.075;
      blobY += (mouseY - blobY) * 0.075;

      speed = Math.sqrt((blobX - prevBlobX) ** 2 + (blobY - prevBlobY) ** 2) * 4;

      cursor.style.left = `${blobX}px`;
      cursor.style.top = `${blobY}px`;

      const imgRect = baseImg.getBoundingClientRect();
      const isOverImage = blobX >= imgRect.left
        && blobX <= imgRect.right
        && blobY >= imgRect.top
        && blobY <= imgRect.bottom;
      cursor.classList.toggle('on-image', isOverImage);

      if (speed > 3) {
        echoes.push({ x: blobX, y: blobY, age: 0, size: 0.6 + Math.min(speed * 0.012, 0.2) });
        if (echoes.length > MAX_TRAIL) echoes.shift();
      }

      for (let i = echoes.length - 1; i >= 0; i -= 1) {
        echoes[i].age += 0.09;
        if (echoes[i].age >= 1) echoes.splice(i, 1);
      }

      const W = revealCanvas.width;
      const H = revealCanvas.height;
      rctx.clearRect(0, 0, W, H);

      if (revealImg.complete && revealImg.naturalWidth > 0) {
        const rect = getImageRect();
        const baseRadius = 88 + Math.min(speed * 0.8, 24);

        rctx.save();
        rctx.beginPath();
        rctx.arc(blobX, blobY, baseRadius, 0, Math.PI * 2);

        for (const echo of echoes) {
          const alpha = 1 - echo.age;
          const radius = baseRadius * echo.size * alpha;
          if (radius > 8) {
            rctx.moveTo(echo.x + radius, echo.y);
            rctx.arc(echo.x, echo.y, radius, 0, Math.PI * 2);
          }
        }

        rctx.clip();
        rctx.drawImage(revealImg, rect.x, rect.y, rect.w, rect.h);
        rctx.restore();
      }

      const cx = W / 2;
      const cy = H / 2;
      const px = (mouseX - cx) * 0.012;
      const py = (mouseY - cy) * 0.012;

      nameBlock.style.transform = `translate(${-px * 0.8}px, ${-py * 0.8}px)`;
      navLink.style.transform = `translate(${-px * 0.65}px, ${-py * 0.65}px)`;
      socialIcons.style.transform = `translate(${-px * 0.75}px, ${-py * 0.75}px)`;
      subtitle.style.transform = `translate(${-px * 0.7}px, ${-py * 0.7}px)`;
      baseLayer.style.transform = `translate(${-px * 0.28}px, ${-py * 0.28}px)`;
      revealCanvas.style.transform = `translate(${-px * 0.28}px, ${-py * 0.28}px)`;

      drawGrid(time);
      frameId = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', onMouseMove);
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor" ref={cursorRef} />

      <canvas className="grid-bg" ref={gridCanvasRef} />

      <div className="base-layer" ref={baseLayerRef}>
        <img ref={baseImgRef} src="/img2.png" alt="Base layer" />
      </div>

      <canvas id="revealCanvas" ref={revealCanvasRef} />

      <div className="name-block" ref={nameBlockRef}>
        <span className="first">Max</span>
        <span className="last">Verstappen</span>
      </div>

      <a
        href="https://www.redbullracing.com"
        target="_blank"
        rel="noreferrer noopener"
        className="nav-link"
        ref={navLinkRef}
      >
        Oracle Red Bull Racing
      </a>

      <div className="subtitle" ref={subtitleRef}>4x World Champion</div>

      <div className="social-icons" ref={socialIconsRef}>
        <a href="https://www.instagram.com/maxverstappen1/" target="_blank" rel="noreferrer noopener" aria-label="Instagram">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </a>
        <a href="https://x.com/Max33Verstappen" target="_blank" rel="noreferrer noopener" aria-label="X / Twitter">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>
    </>
  );
}

export default App;
