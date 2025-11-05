import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const formId = import.meta.env.VITE_FORMSPREE_ID;

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setStatus('idle');
      setError('Please provide a valid email.');
      return;
    }

    if (!formId) {
      window.location.href = `mailto:pitproductionpro@gmail.com?subject=Portfolio%20Contact&body=${encodeURIComponent(data.message || '')}`;
      setStatus('success');
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(e.currentTarget),
      });
      if (!res.ok) throw new Error('Network error');
      setStatus('success');
      e.currentTarget.reset();
    } catch (err) {
      setStatus('idle');
      setError('Submission failed. Please try again later.');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm mb-1" htmlFor="name">Name</label>
        <input id="name" name="name" required className="w-full rounded-xl border border-ink/20 bg-white px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm mb-1" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required className="w-full rounded-xl border border-ink/20 bg-white px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm mb-1" htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required className="w-full rounded-xl border border-ink/20 bg-white px-3 py-2"></textarea>
      </div>
      <div className="flex items-start gap-2">
        <input id="consent" name="consent" type="checkbox" required className="mt-1" />
        <label htmlFor="consent" className="text-sm">I consent to having this website store my submitted information.</label>
      </div>
      {error && <p className="text-primary text-sm" role="alert">{error}</p>}
      {status === 'success' && <p className="text-green-700 text-sm" role="status">Thanks! Your message was sent.</p>}
      <button className="btn btn-primary" disabled={status === 'loading'}>{status === 'loading' ? 'Sending…' : 'Send message'}</button>
    </form>
  );
}

