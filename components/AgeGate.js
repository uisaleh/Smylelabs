'use client';
import { useEffect, useState } from 'react';

export default function AgeGate() {
  const [show, setShow] = useState(false);
  const [no, setNo] = useState(false);
  useEffect(() => { try { if (!localStorage.getItem('smyle-21')) setShow(true); } catch (e) { setShow(true); } }, []);
  if (!show) return null;
  const yes = () => { try { localStorage.setItem('smyle-21', '1'); } catch (e) {} setShow(false); };
  return (
    <div className="lb3" role="dialog" aria-modal="true" aria-label="Age verification" style={{ background: 'rgba(19,19,19,.9)', zIndex: 90 }}>
      <div style={{ background: '#fff', maxWidth: 420, width: '100%', padding: 32, display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'center', alignItems: 'center' }}>
        <img src="/assets/brand/logo-black.webp" alt="Smyle Labs" style={{ height: 34, width: 'auto' }} />
        <h2 className="up d2">Are you 21+?</h2>
        <p className="sm g">You must be 21 or older to enter this site. Our products are for aromatherapy use only.</p>
        {no ? <p className="no3" role="status">Sorry, you must be 21 or older to visit Smyle Labs.</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, width: '100%' }}>
            <button className="bo" onClick={() => setNo(true)}>No</button>
            <button className="bk" onClick={yes}>Yes, I’m 21+</button>
          </div>
        )}
      </div>
    </div>
  );
}
