export const makeType = (mod) => (type) => `${mod}/${type}`;

// makeActionCreator
export const mac = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};
