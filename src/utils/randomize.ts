export const randomizeStrings = (strings: string[]) => {
  for (let i = strings.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap the elements at index i and j
    [strings[i], strings[j]] = [strings[j], strings[i]];
  }
  return strings;
};
