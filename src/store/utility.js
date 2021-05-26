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

export const isConflictItineray = (itineraryList, editItineraryInfo) => {
  const editItineraryWrapper = [editItineraryInfo];
  const tempItineraryList = itineraryList.map(obj => editItineraryWrapper.find(o => o.id === obj.id) || obj);
  const lengthOfTempList = tempItineraryList.length;
  for (let i = 0; i < lengthOfTempList; i++) {
    if (i === 0) {
      if (tempItineraryList[i].landingTime >= tempItineraryList[i + 1].departureTime) {
        return true;
      }
    } else if (i === lengthOfTempList - 1) {
      if (tempItineraryList[i].departureTime <= tempItineraryList[i - 1].landingTime) {
        return true;
      }
    } else {
      if (tempItineraryList[i].departureTime <= tempItineraryList[i - 1].landingTime ||
        tempItineraryList[i].landingTime >= tempItineraryList[i + 1].departureTime) {
        return true;
      }
    }
  }
  return false;
}