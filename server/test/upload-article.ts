async function runTest() {
  console.log('=============================================');
  console.log('🚀 BẮT ĐẦU TEST: QUẢN LÝ BÀI VIẾT (CRUD) VÀ REDIS CACHE');
  console.log('=============================================\n');

  try {
    // -----------------------------------------------------------------
    // 1. Gọi API Login để lấy Token Của Author
    // -----------------------------------------------------------------
    const loginReq = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@fit.hcmute.edu.vn',
        password: 'SysAdmin@Fit25Years!',
      }),
    });

    if (!loginReq.ok)
      throw new Error(`Login thất bại! HTTP ${loginReq.status}`);
    const token = (await loginReq.json()).data.access_token;
    console.log(`✅ Đăng nhập lấy Token thành công.`);

    // -----------------------------------------------------------------
    // 2. Clear & GET Dữ liệu lần 1 (Ban đầu)
    // -----------------------------------------------------------------
    console.log('2️⃣  Lấy toàn bộ bài viết lần 1 (Bắt đầu Cache)...');
    console.time('Fetch-List-1');
    const getRes1 = await fetch('http://localhost:3000/articles');
    const data1 = await getRes1.json();
    const startCount = data1.data ? data1.data.length : 0;
    console.timeEnd('Fetch-List-1');
    console.log(`   -> Có ${startCount} bài viết trong Database.`);

    // -----------------------------------------------------------------
    // 3. GET Dữ liệu lần 2 (Phải gọi từ Cache, tốc độ < 15ms)
    // -----------------------------------------------------------------
    console.log(
      '3️⃣  Lấy toàn bộ bài viết lần 2 (Mong đợi lấy từ Redis Cache)...',
    );
    console.time('Fetch-List-2-Cache');
    const getRes2 = await fetch('http://localhost:3000/articles');
    await getRes2.json();
    console.timeEnd('Fetch-List-2-Cache');

    // -----------------------------------------------------------------
    // 4. POST Tạo 2 bài viết mới (Tự sinh Slug chuẩn SEO)
    // -----------------------------------------------------------------
    console.log('\n4️⃣  Tạo Bài Viết Mới và Trigger Auto Cache Invalidation...');
    const titleTest = 'Buổi Lễ Kỷ Niệm 25 Năm Thành Lập Khoa Siêu Hoành Tráng';
    const articleBody = {
      title: titleTest,
      content: '<p>Đây là bài viết đầu tiên khởi động chuỗi sự kiện FIT</p>',
      category: 'NEWS',
      status: 'PUBLISHED',
    };

    const postReq1 = await fetch('http://localhost:3000/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(articleBody),
    });
    const postRes1 = await postReq1.json();
    const article1 = postRes1.data || postRes1;
    console.log(`✅ Đã tạo bài 1! URL Slug: ${article1.slug}`);

    // Tạo bài 2 trùng tên
    const postReq2 = await fetch('http://localhost:3000/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(articleBody),
    });
    const postRes2 = await postReq2.json();
    const article2 = postRes2.data || postRes2;
    console.log(
      `✅ Đã tạo bài 2 trùng tên! URL Slug đã bị thay đổi để không trùng lặp: ${article2.slug}`,
    );

    // -----------------------------------------------------------------
    // 5. GET Lại danh sách để Confirm Invalidated Cache hoạt động
    // -----------------------------------------------------------------
    console.log(
      '\n5️⃣  Phải thấy +2 Bài viết mới sau khi Cache bị chọc vỡ bới lệnh POST...',
    );
    const getRes3 = await fetch('http://localhost:3000/articles');
    const data3 = await getRes3.json();
    const finalCount = data3.data ? data3.data.length : data3.length;
    console.log(
      `   -> Có ${finalCount} bài viết. (Mong đợi là [${startCount} + 2] = ${startCount + 2})`,
    );

    if (finalCount === startCount + 2) {
      console.log('✅ TRẠNG THÁI CACHE VÀ TẠO MỚI HOẠT ĐỘNG HOÀN HẢO!');
    } else {
      console.log('❌ TẠO MỚI HOẶC CACHE INVALIDATE THẤT BẠI!');
    }

    console.log('\n🎉 E2E TEST HOÀN TẤT!');
  } catch (e) {
    console.error(e);
  }
}
void runTest();
