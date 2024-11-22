export interface Service {
  id: string;
  name: string;
  price: number;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  attendees: number;
  notes?: string;
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface BookingState {
  dateRange: DateRange | undefined;
  services: Service[];
  details: BookingDetails | undefined;
}

export interface BookingContextType {
  state: BookingState;
  setDateRange: (range: DateRange) => void;
  addService: (service: Service) => void;
  removeService: (serviceId: string) => void;
  setDetails: (details: BookingDetails) => void;
  reset: () => void;
}