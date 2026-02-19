export const stageFlow = [
  "LEAD",
  "BOOKED",
  "ACTIVE",
  "DONE",
  "FOLLOW_UP",
];

export const getNextStage = (current) => {
  const index = stageFlow.indexOf(current);
  return stageFlow[index + 1] || current;
};
