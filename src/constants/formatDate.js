// chuyển Date sang DD/MM/YYYY

export const formatDate = dateObject => {
  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Tháng được tính từ 0 nên cần cộng thêm 1
  const year = dateObject.getFullYear();
  return `${day}/${month}/${year}`;
};

// chuyển DateFromISOString sang DD/MM/YYYY

export const formatDateFromISOString = isoString => {
  const date = new Date(isoString); // Chuyển đổi chuỗi ISO thành đối tượng Date
  const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và đảm bảo có 2 chữ số
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, cần cộng thêm 1
  const year = date.getFullYear(); // Lấy năm

  return `${day}/${month}/${year}`; // Trả về định dạng dd/mm/yyyy
};
