export const pricing = {
  name: 'pricing',
  title: 'Special Pricing',
  type: 'document',
  fields: [
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'reason',
      title: 'Reason',
      type: 'string',
      options: {
        list: [
          { title: 'Holiday', value: 'holiday' },
          { title: 'Peak Season', value: 'peak' },
          { title: 'Special Event', value: 'special' },
          { title: 'Other', value: 'other' },
        ],
      },
    },
  ],
};