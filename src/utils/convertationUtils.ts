export const convertStatusToString = (status: number): string => {
  switch (status) {
    case 0:
      return "Jarayonda";
    case 1:
      return "Tasdiqlangan";
    case 2:
      return "Bekor qilingan";
    default:
      return "Noma'lum";
  }
};
