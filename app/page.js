'use client'
import React, { useState } from 'react';

export default function Page() {
  const [offer, setOffer] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/dmforge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offer, audience, tone }),
      });
      const data = await response.json();
      setOutput(data.dm);
    } catch {
      setOutput('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>DMForge - Cold DM Generator</h1>
      <input placeholder="What do you offer?" value={offer} onChange={e => setOffer(e.target.value)} /><br />
      <input placeholder="Who's your ideal client?" value={audience} onChange={e => setAudience(e.target.value)} /><br />
      <input placeholder="Tone (e.g., friendly, bold)" value={tone} onChange={e => setTone(e.target.value)} /><br />
      <button onClick={handleGenerate} disabled={loading}>{loading ? "Working..." : "Generate DM"}</button>
      {output && (
        <div>
          <h2>Your Cold DM:</h2>
          <textarea readOnly value={output} rows={10} style={{ width: "100%" }} />
        </div>
      )}
    </div>
  );
}