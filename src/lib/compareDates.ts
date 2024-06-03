export const compareDates = (targetDate: string) => {
  const now = new Date();
  const target = new Date(targetDate);

  // 현재 날짜와 타겟 날짜의 연도, 월, 일을 가져옵니다.
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  const nowDay = now.getDate();

  const targetYear = target.getFullYear();
  const targetMonth = target.getMonth();
  const targetDay = target.getDate();

  // 연도 비교
  if (nowYear < targetYear) {
    return false; // 타겟 날짜가 미래입니다.
  } else if (nowYear > targetYear) {
    return true; // 타겟 날짜가 과거입니다.
  }

  // 연도가 같으면 월 비교
  if (nowMonth < targetMonth) {
    return false; // 타겟 날짜가 미래입니다.
  } else if (nowMonth > targetMonth) {
    return true; // 타겟 날짜가 과거입니다.
  }

  // 연도와 월이 같으면 일 비교
  if (nowDay < targetDay) {
    return false; // 타겟 날짜가 미래입니다.
  } else if (nowDay > targetDay) {
    return true; // 타겟 날짜가 과거입니다.
  }

  // 연도, 월, 일이 모두 같으면 현재 날짜와 타겟 날짜가 같습니다.
  return false;
};
