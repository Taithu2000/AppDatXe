export const fetchDataProvince = async () => {
  try {
    const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
    if (!response.ok) {
      throw new Error('Không thể kết nối');
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Lỗi lấy dữ liệu:', error);
  }
};
