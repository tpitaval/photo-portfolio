import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm({ 
  serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY 
}) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

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
      const missing = [];
      if (!serviceId) missing.push('VITE_EMAILJS_SERVICE_ID');
      if (!templateId) missing.push('VITE_EMAILJS_TEMPLATE_ID');
      if (!publicKey) missing.push('VITE_EMAILJS_PUBLIC_KEY');
      
      setError(`Email service is not configured. Missing: ${missing.join(', ')}`);
      console.error('EmailJS configuration missing:', {
        serviceId: serviceId || 'MISSING',
        templateId: templateId || 'MISSING',
        publicKey: publicKey ? 'SET' : 'MISSING',
        allEnv: import.meta.env
      });
      console.error('Missing variables:', missing);
      console.error('Please set these environment variables on Render.com or in .env file');
      return;
    }

    try {
      // Initialize EmailJS first (required in some versions)
      emailjs.init(publicKey);

      // Log for debugging (remove in production if needed)
      console.log('Sending email with:', {
        serviceId,
        templateId: templateId.substring(0, 10) + '...',
        publicKey: publicKey.substring(0, 10) + '...',
      });

      // Prepare template parameters (match your EmailJS template variables)
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        // Add any other variables your EmailJS template expects
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('EmailJS success:', result);
      setStatus('success');
      e.currentTarget.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      console.error('Full error object:', {
        code: err.code,
        text: err.text,
        status: err.status,
        message: err.message,
        stack: err.stack
      });
      
      // Show user-friendly error message
      let errorMessage = 'Submission failed. Please try again later.';
      
      if (err.text) {
        errorMessage = err.text;
      } else if (err.message) {
        errorMessage = err.message;
      } else if (err.code === 400) {
        errorMessage = 'Invalid request. Please check your email and message.';
      } else if (err.code === 401) {
        errorMessage = 'Authentication failed. Please contact the administrator.';
      } else if (err.code === 403) {
        errorMessage = 'Access denied. Please contact the administrator.';
      }
      
      setStatus('idle');
      setError(errorMessage);
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

