export function bugAdded(description) {
  return {
    type: "bugAdded",
    payload: {
      description: description,
    },
  };
}
