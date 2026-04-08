/**
 * Mục đích file:
 * - Tạo axios instance dùng chung cho toàn dự án.
 * - Cấu hình baseURL trỏ tới Spring Boot API chạy ở cổng 8080.
 */
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default http;
