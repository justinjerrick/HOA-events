import { StructureBuilder } from 'sanity/desk';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Services')
        .child(
          S.documentList()
            .title('Services')
            .filter('_type == "service"')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
      S.listItem()
        .title('Bookings')
        .child(
          S.documentList()
            .title('Bookings')
            .filter('_type == "booking"')
            .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
        ),
      S.listItem()
        .title('Special Pricing')
        .child(
          S.documentList()
            .title('Special Pricing')
            .filter('_type == "pricing"')
        ),
      S.listItem()
        .title('Blackout Dates')
        .child(
          S.documentList()
            .title('Blackout Dates')
            .filter('_type == "blackoutDate"')
        ),
    ]);