// src/utils/randomize.ts
// Used to randomize the order of the answers and pick random strings from the "Chat messages" section of constants.ts

export const randomizeStrings = (strings: string[]) => {
  for (let i = strings.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [strings[i], strings[j]] = [strings[j], strings[i]];
  }
  return strings;
};
