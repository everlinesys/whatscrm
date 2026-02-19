export const templatesByStage = {
  LEAD: [
    "Hi {name}, just following up on your enquiry for {service}.",
    "Hi {name}, we have availability today for {service}.",
  ],

  BOOKED: [
    "Hi {name}, your booking for {service} is confirmed.",
    "Reminder: Your appointment for {service} is today.",
  ],

  ACTIVE: [
    "Hi {name}, your {service} is in progress.",
    "Hi {name}, running slightly late. Thank you for your patience.",
  ],

  DONE: [
    "Thank you {name} for visiting us!",
    "Hi {name}, hope you enjoyed your {service}.",
  ],

  FOLLOW_UP: [
    "Hi {name}, please leave a review if you liked our service.",
    "Hi {name}, looking forward to seeing you again!",
  ],
};
