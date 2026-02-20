export const getStoredUserInfo = () => {
  try {
    const raw = localStorage.getItem("userInfo");
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed?.token) return null;

    return parsed;
  } catch {
    return null;
  }
};

