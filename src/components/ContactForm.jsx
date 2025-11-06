import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  
  // EmailJS configuration from environment variables
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setStatus('idle');
      setError('Please provide a valid email.');
      return;
    }

    // Check if EmailJS is configured
    if (!serviceId || !templateId || !publicKey) {
      setStatus('idle');
      setError('Email service is not configured. Please contact the site administrator.');
      console.error('EmailJS configuration missing:', {
        serviceId: serviceId || 'MISSING',
        templateId: templateId || 'MISSING',
        publicKey: publicKey ? 'SET' : 'MISSING'
      });
      console.error('Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY');
      return;
    }

    try {
      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_email: 'pitproductionpro@gmail.com', // Recipient email
        },
        publicKey // Public key passed as 4th parameter
      );

      setStatus('success');
      e.currentTarget.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      console.error('Error details:', {
        code: err.code,
        text: err.text,
        status: err.status
      });
      setStatus('idle');
      setError(err.text || 'Submission failed. Please try again later.');
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

