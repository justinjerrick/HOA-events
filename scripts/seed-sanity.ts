import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-02-14',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const services = [
  {
    _type: 'service',
    name: 'Professional Catering',
    description: 'Full-service catering for your event',
    price: 1500,
    icon: 'UtensilsCrossed',
    isActive: true,
    order: 1,
  },
  {
    _type: 'service',
    name: 'Photography',
    description: 'Professional event photography',
    price: 800,
    icon: 'Camera',
    isActive: true,
    order: 2,
  },
  {
    _type: 'service',
    name: 'DJ Services',
    description: 'Professional DJ and sound equipment',
    price: 600,
    icon: 'Music2',
    isActive: true,
    order: 3,
  },
  {
    _type: 'service',
    name: 'Event Staff',
    description: 'Professional event staff and coordinators',
    price: 400,
    icon: 'Users2',
    isActive: true,
    order: 4,
  },
  {
    _type: 'service',
    name: 'AV Equipment',
    description: 'Professional audio/visual equipment',
    price: 500,
    icon: 'Mic2',
    isActive: true,
    order: 5,
  },
  {
    _type: 'service',
    name: 'Event Decoration',
    description: 'Custom event decoration and setup',
    price: 700,
    icon: 'Palette',
    isActive: true,
    order: 6,
  },
];

async function seedSanity() {
  try {
    console.log('🌱 Seeding Sanity content...');
    
    // Create services
    for (const service of services) {
      await client.create(service);
    }
    
    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding Sanity:', error);
  }
}

seedSanity();