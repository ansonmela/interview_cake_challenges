function mergeRanges(meetings) {
  // deep copy of meetings
  const meetingsCopy = JSON.parse(JSON.stringify(meetings));
  
  // sort by startTime
  const sortedMeetings = meetingsCopy.sort((a,b) => {
    return a.startTime - b.startTime
  });
  
  // grab the first one so thats its ready to compare to the next one 
  let readyToMerge = [sortedMeetings[0]];
  
  // loop thru sortedMeetings and compare to determine whether to merge or not
  for (let i = 0; i < sortedMeetings.length; i++) {
    const currentMeeting = sortedMeetings[i];
    const previousMergedMeeting = readyToMerge[readyToMerge.length - 1];
    
    if (currentMeeting.startTime <= previousMergedMeeting.endTime) {
      previousMergedMeeting.endTime = Math.max(currentMeeting.endTime, previousMergedMeeting.endTime);
    }else {
      readyToMerge.push(currentMeeting);
    }
  }
  
  return readyToMerge;
}