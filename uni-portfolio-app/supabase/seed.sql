-- Seed data for Shreekala Pandey portfolio

-- Profile
insert into public.profile (
  full_name,
  pronouns,
  headline,
  tagline,
  bio,
  email,
  location,
  social_links
) values (
  'Shreekala Pandey',
  'She/Her',
  'Brand Growth Strategist | Help Founders to turn Product into Brand through Content, Positioning & Storytelling',
  'Marketing Diva',
  'A founder once told me:

"I know exactly what I''m building.
I just can''t make anyone else see it."

and that''s the problem. They know what they''re building, they know why it matters.

But when it''s time to explain it to customers, investors, or the market, the message gets buried under generic content, weak positioning, and forgettable storytelling.

That''s where I come in.

I help founders and growing brands communicate their value through content, positioning, and strategic storytelling.
My approach is shaped by an unusual mix of interests: technology, marketing, psychology, and business strategy. I like understanding how things work before deciding how to talk about them.

A little about me?
My dream is to get so good at growing brands that one day I''ll be sitting on a beach, doing a completely unplanned YouTube livestream, yapping about life, while people are still texting me, "Can you help us grow our brand?"

Until the beach-and-YouTube-livestream retirement plan works out, I''m documenting how great brands are built.

Think of it as me publicly sharing all the things I probably should''ve kept in my Notes app.

If you''re a founder trying to figure out how to make more people care about what you''re building, we should probably talk.

Worst case: we exchange ideas. 
Best case: we grow your brand.',
  'shreekalapandey19@gmail.com',
  'Bengaluru, Karnataka, India',
  '{"instagram": "https://www.instagram.com/b.withshree/", "linkedin": "https://www.linkedin.com/", "website": "https://selfmba.lovable.app/"}'
);

-- Insert skills
insert into public.skills (name, category, display_order) values
  ('Copywriting', 'Writing', 1),
  ('Brand Storytelling', 'Strategy', 2),
  ('Conversion Copywriting', 'Writing', 3),
  ('Brand Messaging & Positioning', 'Strategy', 4),
  ('Personal Branding Strategy', 'Strategy', 5);

-- Insert services
insert into public.services (title, description, display_order) values
  ('Social Media Marketing', 'Build a magnetic presence across platforms with content that stops the scroll and starts conversations.', 1),
  ('Marketing Strategy', 'Full-funnel strategy that connects audience insight to real revenue growth.', 2),
  ('Brand Consulting', 'Clarify your positioning, messaging, and visual identity so your brand feels unmistakable.', 3),
  ('Ghostwriting', 'Thought-leadership writing in your voice for LinkedIn, newsletters, and speeches.', 4),
  ('Growth Marketing', 'Data-informed campaigns that scale what already works.', 5),
  ('Content Strategy', 'Editorial systems and content operating models that keep teams consistent.', 6),
  ('Product Marketing', 'Positioning, messaging, and go-to-market planning for new products.', 7),
  ('Marketing Consulting', 'Advisory for teams that need sharper messaging, sharper campaigns, or both.', 8),
  ('Copywriting', 'Website copy, email sequences, and landing pages built to convert.', 9),
  ('Brand Marketing', 'Long-term brand building that makes future marketing easier.', 10);

-- Insert experiences
insert into public.experiences (
  company_name,
  company_logo_url,
  role,
  employment_type,
  start_date,
  end_date,
  is_current,
  location,
  description,
  skills,
  external_url
) values
  (
    'OneMeet',
    null,
    'Brand Growth Strategist | Marketing Manager',
    'Full-time',
    '2026-07-01',
    null,
    true,
    'Bengaluru, Karnataka, India',
    'Driving brand growth and marketing strategy at OneMeet.',
    '{}',
    null
  ),
  (
    'Growzzy Media',
    null,
    'Content Writer',
    'Internship',
    '2026-04-01',
    null,
    true,
    'Remote',
    'Writing content for founders and personal brands - helping them show up consistently and say something worth reading. Took a client''s personal LinkedIn from 100 to 100K impressions in two months through strategic storytelling. Also handled content for a Hollywood event project, from ideation to final execution.',
    '{"Ghostwriting", "Creative Writing"}',
    null
  ),
  (
    'Instagram',
    null,
    'Social Media Content Creator',
    'Self-employed',
    '2026-05-01',
    null,
    true,
    'Remote',
    'Just a girl with too many thoughts and an internet connection.',
    '{}',
    null
  ),
  (
    'LinkedIn',
    null,
    'LinkedIn Creator | Learning Out Loud',
    'Self-employed',
    '2025-07-01',
    null,
    true,
    'Remote',
    'Building a room full of people obsessed with marketing, brands, and business.',
    '{}',
    null
  ),
  (
    'Oz Media Planet',
    null,
    'Marketing & Content Strategist',
    'Internship',
    '2026-01-01',
    '2026-04-01',
    false,
    'Indore, Madhya Pradesh, India',
    'Managed end-to-end marketing for two brands simultaneously - a D2C e-commerce brand and an AI SaaS app. From content strategy and social media management to running marketing campaigns and ad creatives, handled it all. For the SaaS brand, also worked on product positioning, researching and defining features that would actually resonate with the target market.',
    '{"Social Media Marketing", "Content Strategy"}',
    null
  );
