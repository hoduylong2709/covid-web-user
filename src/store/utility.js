export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const convertStringToBoolean = (stringInput) => {
  if (stringInput === 'true')
    return true;
  else
    return false;
}