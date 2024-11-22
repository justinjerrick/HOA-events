export const booking = {
  name: 'booking',
  title: 'Booking',
  type: 'document',
  fields: [
    {
      name: 'customer',
      title: 'Customer Information',
      type: 'object',
      fields: [
        { 
          name: 'name', 
          type: 'string', 
          title: 'Name',
          validation: (Rule: any) => Rule.required(),
        },
        { 
          name: 'email', 
          type: 'string', 
          title: 'Email',
          validation: (Rule: any) => Rule.required(),
        },
        { 
          name: 'phone', 
          type: 'string', 
          title: 'Phone',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'eventDetails',
      title: 'Event Details',
      type: 'object',
      fields: [
        { 
          name: 'type', 
          type: 'string', 
          title: 'Event Type',
          validation: (Rule: any) => Rule.required(),
        },
        { 
          name: 'attendees', 
          type: 'number', 
          title: 'Number of Attendees',
          validation: (Rule: any) => Rule.required().min(1).max(500),
        },
        { 
          name: 'notes', 
          type: 'text', 
          title: 'Additional Notes' 
        },
      ],
    },
    {
      name: 'dateRange',
      title: 'Date Range',
      type: 'object',
      fields: [
        { 
          name: 'startDate', 
          type: 'datetime', 
          title: 'Start Date',
          validation: (Rule: any) => Rule.required(),
        },
        { 
          name: 'endDate', 
          type: 'datetime', 
          title: 'End Date',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'services',
      title: 'Additional Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    },
    {
      name: 'status',
      title: 'Booking Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
    },
    {
      name: 'basePrice',
      title: 'Base Price',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'servicesTotal',
      title: 'Services Total',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'depositPaid',
      title: 'Deposit Paid',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'depositAmount',
      title: 'Deposit Amount',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
      initialValue: 500,
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
};