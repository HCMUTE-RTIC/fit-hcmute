export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  path: string;
  description: string;
  tag: string;
  auth: boolean;
  body?: Record<string, any>;
  isFormData?: boolean;
}

export const API_ENDPOINTS: ApiEndpoint[] = [
  // --- AUTH ---
  {
    tag: 'Auth',
    method: 'POST',
    path: '/auth/login',
    description: 'Đăng nhập lấy Access Token',
    auth: false,
    body: {
      email: 'admin@hcmute.edu.vn',
      password: 'mypassword123',
    },
  },

  // --- USERS ---
  {
    tag: 'Users',
    method: 'POST',
    path: '/v1/users',
    description: 'Tạo tài khoản người dùng mới (Admin)',
    auth: true,
    body: { name: 'Nguyen Van A', email: 'a@hcmute.edu.vn', role: 'USER' }
  },
  {
    tag: 'Users',
    method: 'GET',
    path: '/v1/users?page=1&limit=10',
    description: 'Lấy danh sách người dùng phân trang',
    auth: true,
  },
  {
    tag: 'Users',
    method: 'GET',
    path: '/v1/users/:id',
    description: 'Lấy thông tin chi tiết của 1 tài khoản',
    auth: true,
  },
  {
    tag: 'Users',
    method: 'PATCH',
    path: '/v1/users/:id',
    description: 'Cập nhật thông tin tài khoản',
    auth: true,
    body: { name: 'Nguyen Van B' }
  },
  {
    tag: 'Users',
    method: 'DELETE',
    path: '/v1/users/:id',
    description: 'Xoá tài khoản khỏi hệ thống',
    auth: true,
  },

  // --- ARTICLES ---
  {
    tag: 'Articles',
    method: 'POST',
    path: '/articles',
    description: 'Tạo bài viết, bản tin mới',
    auth: true,
    body: {
      title: 'Hội thảo khoa học 2024',
      content: '<p>Nội dung HTML bài viết...</p>',
      category: 'EVENT',
    },
  },
  {
    tag: 'Articles',
    method: 'GET',
    path: '/articles?page=1&limit=10',
    description: 'Lấy danh sách bài viết public',
    auth: false,
  },
  {
    tag: 'Articles',
    method: 'GET',
    path: '/articles/:slug',
    description: 'Lấy chi tiết 1 bài viết theo URL Slug',
    auth: false,
  },
  {
    tag: 'Articles',
    method: 'PATCH',
    path: '/articles/:id',
    description: 'Chỉnh sửa bài viết (Chỉ Author/Admin)',
    auth: true,
    body: { title: 'Tiêu đề mới' }
  },
  {
    tag: 'Articles',
    method: 'DELETE',
    path: '/articles/:id',
    description: 'Xoá bài viết',
    auth: true,
  },

  // --- ALBUMS ---
  {
    tag: 'Albums',
    method: 'POST',
    path: '/albums',
    description: 'Tạo Album ảnh kỷ niệm mới',
    auth: true,
    body: { title: 'Khoảnh khắc 25 năm FIT', description: 'Những bức ảnh đẹp' },
  },
  {
    tag: 'Albums',
    method: 'GET',
    path: '/albums',
    description: 'Xem tất cả Album ảnh',
    auth: false,
  },
  {
    tag: 'Albums',
    method: 'GET',
    path: '/albums/:id',
    description: 'Xem chi tiết Album (bao gồm mảng ảnh media)',
    auth: false,
  },
  {
    tag: 'Albums',
    method: 'PATCH',
    path: '/albums/:id',
    description: 'Cập nhật Album ảnh',
    auth: true,
    body: { coverId: 'uuid-123' }
  },
  {
    tag: 'Albums',
    method: 'DELETE',
    path: '/albums/:id',
    description: 'Xoá Album',
    auth: true,
  },

  // --- FORMS ---
  {
    tag: 'Forms',
    method: 'POST',
    path: '/forms',
    description: 'Tạo một form khảo sát động',
    auth: true,
    body: {
      title: 'Đăng ký tham gia Gala 25 năm',
      fields: [{ name: 'phone', label: 'Số điện thoại', type: 'TEXT' }],
    },
  },
  {
    tag: 'Forms',
    method: 'GET',
    path: '/forms',
    description: 'Lấy danh sách các biểu mẫu',
    auth: true,
  },
  {
    tag: 'Forms',
    method: 'GET',
    path: '/forms/:slug',
    description: 'Lấy chi tiết 1 biểu mẫu (dùng cho frontend render thẻ form)',
    auth: false,
  },
  {
    tag: 'Forms',
    method: 'PATCH',
    path: '/forms/:id',
    description: 'Cập nhật cấu trúc của biểu mẫu',
    auth: true,
    body: { isActive: false }
  },
  {
    tag: 'Forms',
    method: 'DELETE',
    path: '/forms/:id',
    description: 'Xoá biểu mẫu',
    auth: true,
  },
  {
    tag: 'Forms',
    method: 'POST',
    path: '/forms/:slug/submit',
    description: 'Khách gửi dữ liệu (response) vào biểu mẫu',
    auth: false,
    body: { data: { phone: '0987654321' } },
  },

  // --- MEDIA ---
  {
    tag: 'Media',
    method: 'POST',
    path: '/media/upload',
    description: 'Tải 1 file lên hệ thống (MinIO)',
    auth: true,
    isFormData: true,
    body: { file: '@path/to/image.jpg' },
  },
  {
    tag: 'Media',
    method: 'POST',
    path: '/media/upload-batch',
    description: 'Tải nhiều file một lúc vào hệ thống',
    auth: true,
    isFormData: true,
    body: { files: '[@path/img1.jpg, @path/img2.jpg]' },
  },

  // --- AUDIT LOGS ---
  {
    tag: 'Audit Logs',
    method: 'GET',
    path: '/v1/audit-logs',
    description: 'Xem lịch sử thao tác hệ thống (Admin Only)',
    auth: true,
  },
];
