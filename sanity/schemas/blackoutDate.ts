export const blackoutDate = {
  name: 'blackoutDate',
  title: 'Blackout Date',
  type: 'document',
  fields: [
    {
      name: 'dateRange',
      title: 'Date Range',
      type: 'object',
      fields: [
        { 
          name: 'startDate', 
          type: 'date', 
          title: 'Start Date',
          validation: (Rule: any) => Rule.required(),
        },
        { 
          name: 'endDate', 
          type: 'date', 
          title: 'End Date',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'reason',
      title: 'Reason',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'isRecurring',
      title: 'Is Recurring',
      type: 'boolean',
      description: 'Set to true if this is a recurring blackout period',
      initialValue: false,
    },
  ],
};