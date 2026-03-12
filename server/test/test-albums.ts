import * as fs from 'fs';
import * as path from 'path';

async function runTest() {
    console.log('====================================================');
    console.log('🚀 BẮT ĐẦU TEST: LUỒNG QUẢN LÝ ALBUMS VÀ MEDIA (CRUD)');
    console.log('====================================================\n');

    try {
        // CHÚ Ý: NestJS đang chạy ở cổng 3001 (lấy từ .env) và có prefix /api (trong main.ts)
        const BASE_URL = 'http://localhost:3001/api'; 

        // -----------------------------------------------------------------
        // 1. LOGIN LẤY TOKEN
        // -----------------------------------------------------------------
        console.log('1️⃣  Đang đăng nhập...');
        const loginReq = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@fit.hcmute.edu.vn', password: 'SysAdmin@Fit25Years!' })
        });
        
        if (!loginReq.ok) throw new Error(`Login thất bại! HTTP ${loginReq.status} - ${await loginReq.text()}`);
        
        const tokenData = await loginReq.json();
        const token = tokenData.data?.access_token || tokenData.access_token;
        console.log(`✅  Login thành công.`);

        // -----------------------------------------------------------------
        // 2. UPLOAD ẢNH ĐỂ LẤY MEDIA IDs (Giống file upload-minio.ts)
        // -----------------------------------------------------------------
        console.log('\n2️⃣  Đang tạo giả lập ảnh và Upload lên MinIO...');
        const dummyPath = path.join(__dirname, 'dummy-album-img.jpg');
        fs.writeFileSync(dummyPath, 'fake_image_data');
        const blob = new Blob([fs.readFileSync(dummyPath)], { type: 'image/jpeg' });

        const form = new FormData();
        form.append('files', blob, 'album_img_1.jpg');
        form.append('files', blob, 'album_img_2.jpg');

        const uploadReq = await fetch(`${BASE_URL}/media/upload-batch`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: form
        });
        
        if (!uploadReq.ok) throw new Error(`Upload thất bại! HTTP ${uploadReq.status}`);
        
        const uploadRes = await uploadReq.json();
        const mediaIds = uploadRes.data.map((m: any) => m.id); // Lấy danh sách ID thật từ DB
        console.log(`✅  Upload thành công ${mediaIds.length} ảnh. IDs:`, mediaIds);

        // -----------------------------------------------------------------
        // 3. TẠO ALBUM MỚI (POST)
        // -----------------------------------------------------------------
        console.log('\n3️⃣  Tạo Album mới...');
        const createReq = await fetch(`${BASE_URL}/albums`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                title: 'Album Test Hội Thao Sinh Viên 2026',
                description: 'Giao lưu thể thao toàn Khoa',
                mediaIds: mediaIds // Nhét mảng ảnh thật vào
            })
        });

        if (!createReq.ok) throw new Error(`Tạo Album thất bại: ${await createReq.text()}`);
        const newAlbum = await createReq.json();
        console.log(`✅  Tạo Album thành công!`);
        console.log(`   -> ID: ${newAlbum.id}`);
        console.log(`   -> Slug sinh tự động: ${newAlbum.slug}`);
        console.log(`   -> Auto Cover Photo: ${newAlbum.coverPhotoId === mediaIds[0] ? 'ĐÚNG (Lấy ảnh đầu tiên)' : 'SAI'}`);

        // -----------------------------------------------------------------
        // 4. LẤY CHI TIẾT ALBUM THEO SLUG (GET)
        // -----------------------------------------------------------------
        console.log('\n4️⃣  Lấy chi tiết Album cho người dùng xem (Public)...');
        const getReq = await fetch(`${BASE_URL}/albums/${newAlbum.slug}`);
        if (!getReq.ok) throw new Error(`Lấy chi tiết Album thất bại: ${await getReq.text()}`);
        const fetchedAlbum = await getReq.json();
        console.log(`✅  Fetch thành công! Album có chứa ${fetchedAlbum.medias?.length || 0} tấm ảnh đính kèm.`);

        // -----------------------------------------------------------------
        // 5. UPDATE ALBUM (PATCH)
        // -----------------------------------------------------------------
        console.log('\n5️⃣  Cập nhật Tên Album (Đổi title để xem slug có đổi không)...');
        const updateReq = await fetch(`${BASE_URL}/albums/${newAlbum.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ title: 'Tên Album Đã Bị Sửa Đổi Mới' })
        });
        if (!updateReq.ok) throw new Error(`Cập nhật Album thất bại: ${await updateReq.text()}`);
        const updatedAlbum = await updateReq.json();
        console.log(`✅  Cập nhật thành công! Slug mới: ${updatedAlbum.slug}`);

        // -----------------------------------------------------------------
        // 6. XÓA ALBUM (DELETE)
        // -----------------------------------------------------------------
        console.log('\n6️⃣  Xóa Album dọn dẹp DB...');
        const deleteReq = await fetch(`${BASE_URL}/albums/${newAlbum.id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!deleteReq.ok) {
            throw new Error(`Xóa Album thất bại: ${await deleteReq.text()}`);
        }
        console.log(`✅  Xóa thành công Album.`);

        // Cleanup
        fs.unlinkSync(dummyPath);
        console.log('\n🎉 E2E TEST HOÀN TẤT, API HOẠT ĐỘNG HOÀN HẢO!');

    } catch (error) {
        console.error('\n❌ TEST THẤT BẠI!');
        console.error(error);
    }
}

runTest();