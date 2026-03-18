export type Milestone = {
    label: string;
    description: string;
};

export type HistoryStage = {
    id: number;
    title: string;
    period: string;
    summary: string;
    image: string;
    gradient: string;
    milestones: Milestone[];
};

export const historyStages: HistoryStage[] = [
    {
        id: 1,
        title: "Đặt nền móng và Hình thành",
        period: "1990 – 2001",
        summary:
            "Từ Trung tâm Tin học ban đầu đến khi Khoa Công nghệ Thông tin chính thức được thành lập",
        image: "/hanh-trinh-25-nam/ttth_logo.jpg",
        gradient: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
        milestones: [
            {
                label: "1990",
                description:
                    "Tiền thân là Trung tâm Tin học được thành lập nhằm đáp ứng nhu cầu học tập và ứng dụng máy tính trong nhà trường",
            },
            {
                label: "Trước 2001",
                description:
                    "Hoạt động như một đơn vị giảng dạy các môn tin học cơ sở và các chứng chỉ tin học ứng dụng",
            },
            {
                label: "01/04/2001",
                description:
                    "Khoa Công nghệ Thông tin chính thức được thành lập theo quyết định của Hiệu trưởng, đánh dấu bước ngoặt trở thành đơn vị đào tạo chuyên môn sâu về kỹ sư và giáo viên CNTT",
            },
        ],
    },
    {
        id: 2,
        title: "Xây dựng và Phát triển",
        period: "2002 – 2010",
        summary:
            "Mở rộng quy mô đào tạo, tăng cường chất lượng học thuật và bắt đầu ghi dấu ấn tại các sân chơi chuyên môn",
        image: "/thu-vien/CuuSV24-1.jpg",
        gradient: "linear-gradient(135deg, #7E22CE 0%, #A855F7 100%)",
        milestones: [
            {
                label: "2002 – 2004",
                description:
                    "Khoa nhận Bằng khen của Bộ trưởng Bộ Giáo dục và Đào tạo về thành tích xuất sắc trong nhiệm vụ giáo dục",
            },
            {
                label: "Nâng cao quy mô",
                description:
                    "Mở rộng các chuyên ngành đào tạo ban đầu, tập trung vào Kỹ thuật phần mềm và Hệ thống thông tin",
            },
            {
                label: "Hoạt động phong trào",
                description:
                    "Bắt đầu tham gia và đạt giải cao tại các kỳ thi Olympic Tin học Sinh viên Việt Nam và ICPC",
            },
        ],
    },
    {
        id: 3,
        title: "Khẳng định Chất lượng và Hội nhập",
        period: "2011 – 2020",
        summary:
            "Chuẩn hóa chất lượng đào tạo, mở rộng chương trình và đầu tư mạnh cho cơ sở vật chất",
        image: "/hanh-trinh-25-nam/lab.png",
        gradient: "linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)",
        milestones: [
            {
                label: "2011",
                description: "Kỷ niệm 10 năm thành lập Khoa",
            },
            {
                label: "AUN-QA",
                description:
                    "Ngành Công nghệ thông tin trở thành một trong những ngành đầu tiên của trường hoàn thành đánh giá ngoài theo tiêu chuẩn mạng lưới các trường đại học Đông Nam Á",
            },
            {
                label: "Mở rộng chương trình",
                description:
                    "Phát triển hệ đào tạo Chất lượng cao bằng tiếng Việt và tiếng Anh",
            },
            {
                label: "Thạc sĩ",
                description:
                    "Mở chương trình Thạc sĩ Khoa học máy tính để đào tạo nguồn nhân lực trình độ cao",
            },
            {
                label: "Cơ sở vật chất",
                description:
                    "Đầu tư hệ thống 6 phòng máy tính hiện đại và các phòng Lab chuyên sâu như Software Engineering, Cyber Security, AI Lab",
            },
        ],
    },
    {
        id: 4,
        title: "Đột phá Công nghệ và Chuyển đổi số",
        period: "2021 – Nay",
        summary:
            "Đẩy mạnh đổi mới sáng tạo, tái cấu trúc bộ máy và khẳng định vị thế bằng các thành tích nổi bật",
        image: "/thu-vien/thuvienkiniem2.jpg",
        gradient: "linear-gradient(135deg, #B91C1C 0%, #F59E0B 100%)",
        milestones: [
            {
                label: "01/04/2021",
                description:
                    "Kỷ niệm 20 năm thành lập Khoa, xác định tầm nhìn trở thành đơn vị đào tạo, nghiên cứu khoa học và đổi mới sáng tạo hàng đầu Việt Nam",
            },
            {
                label: "Tái cấu trúc bộ máy",
                description:
                    "Hiện tại Khoa có 4 bộ môn mũi nhọn: Công nghệ phần mềm, Hệ thống Thông tin, Mạng và An ninh mạng, Trí tuệ Nhân tạo",
            },
            {
                label: "2022",
                description:
                    "Đăng cai tổ chức thành công kỳ thi Olympic Tin học Sinh viên Việt Nam lần thứ 31 và ICPC Asia Ho Chi Minh City",
            },
            {
                label: "2023",
                description: "Kỷ niệm 22 năm thành lập khoa",
            },
            {
                label: "2024",
                description:
                    "Kỷ niệm 23 năm thành lập, tiếp tục gặt hái thành tích cao tại ICPC Asia-Pacific Championship",
            },
            {
                label: "Hướng tới 2026",
                description:
                    "Hoàn thiện hệ sinh thái đào tạo với các ngành mới như An toàn thông tin và Kỹ thuật dữ liệu; đẩy mạnh AI và Chuyển đổi số; hệ thống máy móc hiện có hơn 460 máy tính kết nối server mạnh mẽ phục vụ đào tạo kỹ sư chất lượng cao",
            },
        ],
    },
];
