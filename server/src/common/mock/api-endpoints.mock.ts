export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  description: string;
  tag: string;
  auth: boolean;
  body?: Record<string, any>;
  isFormData?: boolean;
}

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    tag: 'Auth',
    method: 'POST',
    path: '/auth/login',
    description: 'Đăng nhập lấy Token',
    auth: false,
    body: {
      email: '<NHẬP_EMAIL_CỦA_BẠN>',
      password: '<NHẬP_PASSWORD_CỦA_BẠN>',
    },
  },
  {
    tag: 'Users',
    method: 'GET',
    path: '/v1/users?page=1&limit=10',
    description: 'Lấy danh sách người dùng',
    auth: true,
  },
  {
    tag: 'Articles',
    method: 'POST',
    path: '/articles',
    description: 'Tạo bài viết mới',
    auth: true,
    body: {
      title: 'Lễ kỷ niệm 25 năm',
      content: 'Nội dung...',
      category: 'EVENT',
    },
  },
  {
    tag: 'Albums',
    method: 'POST',
    path: '/albums',
    description: 'Tạo Album ảnh',
    auth: true,
    body: { title: 'Hội thao 2024', mediaIds: ['uuid-1', 'uuid-2'] },
  },
  {
    tag: 'Media',
    method: 'POST',
    path: '/media/upload',
    description: 'Upload file (Multipart)',
    auth: true,
    isFormData: true,
    body: { file: '@path/to/image.jpg' },
  },
  {
    tag: 'Forms',
    method: 'POST',
    path: '/forms',
    description: 'Tạo cấu trúc Form động',
    auth: true,
    body: {
      title: 'Khảo sát',
      fields: [{ name: 'fullname', label: 'Họ tên', type: 'TEXT' }],
    },
  },
  {
    tag: 'Forms',
    method: 'POST',
    path: '/forms/:slug/submit',
    description: 'Người dùng nộp biểu mẫu',
    auth: false,
    body: { data: { fullname: 'Nguyen Van A' } },
  },
];
