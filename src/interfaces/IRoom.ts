export interface IRoom {
    name: string;
    image: string;
    description: string;
    age_limit: number;
    slots: number;
    availability: {
      monday: {
        morning: boolean;
        afternoon: boolean;
      };
      tuesday: {
        morning: boolean;
        afternoon: boolean;
      };
      wednesday: {
        morning: boolean;
        afternoon: boolean;
      };
      thursday: {
        morning: boolean;
        afternoon: boolean;
      };
      friday: {
        morning: boolean;
        afternoon: boolean;
      };
      saturday: {
        morning: boolean;
        afternoon: boolean;
      };
    };
  }
  