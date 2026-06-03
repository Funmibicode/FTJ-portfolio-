# Funmibitech Portfolio

## File Structure
```
funmibitech/
├── index.html       ← Main HTML file (open this in browser)
├── css/
│   └── style.css    ← All styles
└── js/
    └── main.js      ← All JavaScript (AOS, navbar, typewriter, EmailJS, blog fetch, back-to-top)
```

## Setup

### 1. EmailJS (Contact Form)
- Go to https://www.emailjs.com and create an account
- Create an Email Service (Gmail recommended)
- Create an Email Template with these variables:
  - `{{from_name}}` — sender's name
  - `{{reply_to}}` — sender's email  
  - `{{subject}}` — service type selected
  - `{{message}}` — message body
- In `js/main.js`, replace:
  ```js
  const EMAILJS_PUBLIC_KEY  = '8z1xtvJxqHO9MEyL6';
  const EMAILJS_SERVICE_ID  = 'service_zzo0hu7';
  const EMAILJS_TEMPLATE_ID = 'template_8tj1vi5';
  ```
  with your actual keys.

### 2. Project Live Links
In `index.html`, update the `href="#"` placeholders in the Projects section
with your real live demo URLs.

### 3. Deployment (Netlify — recommended)
- Drag the entire `funmibitech/` folder to https://app.netlify.com/drop
- Your site is live instantly with a free URL

## Dependencies (all via CDN — no install needed)
- Google Fonts: Playfair Display + Poppins
- AOS v2.3.4 (scroll animations)
- Font Awesome 6.5.2 (icons)
- EmailJS Browser v4 (contact form)
