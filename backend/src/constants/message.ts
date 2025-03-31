const requiredMessage = (label: string) => {
  return `${label} không được để trống.`;
};

const duplicateMessage = (label: string): string => {
  return `${label} đã tồn tại.`;
};

export const message = {
  requiredMessage,
  duplicateMessage,
};
