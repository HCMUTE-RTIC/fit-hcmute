import * as fs from 'fs';
import * as path from 'path';

async function runTest() {
    console.log('=============================================');
    console.log('🚀 BẮT ĐẦU TEST CHUỖI API: AUTH & MINIO UPLOAD');
    console.log('=============================================\n');

    try {
        // -----------------------------------------------------------------
        // 1. Gọi API Login để lấy Token
        // -----------------------------------------------------------------
        console.log('1️⃣  Đang đăng nhập tài khoản ADMIN (SysAdmin@Fit25Years!)...');
        const loginReq = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@fit.hcmute.edu.vn',
                password: 'SysAdmin@Fit25Years!'
            })
        });

        if (!loginReq.ok) {
            throw new Error(`Login thất bại! HTTP ${loginReq.status} - ${await loginReq.text()}`);
        }

        const loginRes = await loginReq.json();
        const token = loginRes.data.access_token;
        console.log(`✅  Đăng nhập thành công! Token: ${token.substring(0, 30)}...\n`);


        // -----------------------------------------------------------------
        // TẠO FILE DUMMY TẠM THỜI ĐỂ TEST
        // -----------------------------------------------------------------
        const dummyImage = path.join(__dirname, 'test-image.jpg');
        fs.writeFileSync(dummyImage, 'day_la_1_file_anh_gia'); // Dummy 
        const fileBuffer = fs.readFileSync(dummyImage);
        const blob = new Blob([fileBuffer], { type: 'image/jpeg' });


        // -----------------------------------------------------------------
        // 2. Gọi API Upload Ảnh Lẻ
        // -----------------------------------------------------------------
        console.log('2️⃣  Test API Upload ảnh lẻ: POST /media/upload ...');
        const form1 = new FormData();
        form1.append('file', blob, 'test-image.jpg');
        // form1.append('albumId', 'album-ky-yeu-01');

        const uploadReq = await fetch('http://localhost:3000/media/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: form1
        });

        if (!uploadReq.ok) {
            throw new Error(`Upload ảnh lẻ thất bại! HTTP ${uploadReq.status} - ${await uploadReq.text()}`);
        }

        const uploadRes = await uploadReq.json();
        console.log('✅  Upload ảnh lẻ thành công! Kết quả (URL S3 Public):');
        console.log(uploadRes.data);
        console.log('');


        // -----------------------------------------------------------------
        // 3. Gọi API Upload Lưới Nhiều Ảnh
        // -----------------------------------------------------------------
        console.log('3️⃣  Test API Upload mảng ảnh: POST /media/upload-batch ...');
        const form2 = new FormData();
        // Gắn 3 file giả tạo thành mảng `files`
        form2.append('files', blob, 'hinh_01.jpg');
        form2.append('files', blob, 'hinh_02.jpg');
        form2.append('files', blob, 'hinh_03.jpg');

        const batchReq = await fetch('http://localhost:3000/media/upload-batch', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: form2
        });

        if (!batchReq.ok) {
            throw new Error(`Upload chùm ảnh thất bại! HTTP ${batchReq.status} - ${await batchReq.text()}`);
        }

        const batchRes = await batchReq.json();
        console.log('✅  Upload lưới nhiều ảnh thành công!');
        console.log(`Đã đẩy lên CSDL và S3 minio ${batchRes.data.length} file tĩnh. URLs public:`);
        batchRes.data.forEach((m: any, idx: number) => {
            console.log(`   [${idx}]: ${m.url}`);
        });
        console.log('');
        console.log('🎉 TOÀN BỘ CHỨC NĂNG HOẠT ĐỘNG HOÀN HẢO!');

        // Cleanup
        fs.unlinkSync(dummyImage);

    } catch (error) {
        console.error('\n❌ TEST THẤT BẠI XẢY RA LỖI:');
        console.error(error);
    }
}

runTest();
