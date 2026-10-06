// Test-only entry: never included in the production build or the public assets.
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import CvViewer from '../../src/card/CvViewer';
import '../../src/card/card.scss';

function Harness() {
  const [open, setOpen] = useState(false);
  return <main><button onClick={() => setOpen(true)}>Ver CV</button>
    {open && <CvViewer url="/test-cv.pdf" onClose={() => setOpen(false)} />}
  </main>;
}
createRoot(document.getElementById('root')!).render(<Harness />);
