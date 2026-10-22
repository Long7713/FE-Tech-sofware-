-- Tao database + bang + du lieu mau cho he thong thuyet minh thao cam vien
CREATE DATABASE IF NOT EXISTS zoo_guide CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE zoo_guide;

CREATE TABLE IF NOT EXISTS languages (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(60) NOT NULL,
  active BIT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(120) NOT NULL,
  role VARCHAR(10) NOT NULL,
  preferred_language VARCHAR(10),
  created_at DATETIME(6) NOT NULL
);

CREATE TABLE IF NOT EXISTS zones (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL,
  polygon_geo_json TEXT
);

CREATE TABLE IF NOT EXISTS animals (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  zone_id BIGINT,
  name VARCHAR(120) NOT NULL,
  scientific_name VARCHAR(120),
  kingdom VARCHAR(60),
  phylum VARCHAR(60),
  class_name VARCHAR(60),
  order_name VARCHAR(60),
  family VARCHAR(60),
  genus VARCHAR(60),
  image_url VARCHAR(500),
  status VARCHAR(20) NOT NULL,
  CONSTRAINT fk_animals_zone FOREIGN KEY (zone_id) REFERENCES zones(id)
);

CREATE TABLE IF NOT EXISTS animal_translations (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  animal_id BIGINT NOT NULL,
  language_id BIGINT NOT NULL,
  name VARCHAR(120) NOT NULL,
  description TEXT,
  size_weight VARCHAR(200),
  lifespan VARCHAR(200),
  behavior TEXT,
  history TEXT,
  narration TEXT,
  UNIQUE KEY uk_animal_lang (animal_id, language_id),
  CONSTRAINT fk_tr_animal FOREIGN KEY (animal_id) REFERENCES animals(id),
  CONSTRAINT fk_tr_lang FOREIGN KEY (language_id) REFERENCES languages(id)
);

CREATE TABLE IF NOT EXISTS gps_zones (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  animal_id BIGINT NOT NULL,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL,
  radius_m DOUBLE NOT NULL,
  status VARCHAR(20) NOT NULL,
  CONSTRAINT fk_gps_animal FOREIGN KEY (animal_id) REFERENCES animals(id)
);

-- ===== Du lieu mau =====
-- (tai khoan admin do ung dung tu tao khi chay lan dau)
INSERT INTO languages (code, name, active) VALUES
  ('vi', 'Tiếng Việt', 1), ('en', 'English', 1), ('ja', '日本語', 1), ('ko', '한국어', 1)
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO zones (id, name, description, status) VALUES
  (1, 'Khu Thú Ăn Thịt', 'Khu trưng bày các loài thú săn mồi lớn.', 'ACTIVE'),
  (2, 'Khu Linh Trưởng', 'Khu các loài khỉ và vượn.', 'ACTIVE'),
  (3, 'Khu Thú Ăn Cỏ', 'Khu các loài thú móng guốc và voi.', 'ACTIVE');

INSERT INTO animals (id, zone_id, name, scientific_name, kingdom, phylum, class_name, order_name, family, genus, image_url, status) VALUES
  (1, 1, 'Hổ Đông Dương', 'Panthera tigris corbetti', 'Animalia', 'Chordata', 'Mammalia', 'Carnivora', 'Felidae', 'Panthera', NULL, 'ACTIVE'),
  (2, 2, 'Đười ươi', 'Pongo pygmaeus', 'Animalia', 'Chordata', 'Mammalia', 'Primates', 'Hominidae', 'Pongo', NULL, 'ACTIVE'),
  (3, 3, 'Voi châu Á', 'Elephas maximus', 'Animalia', 'Chordata', 'Mammalia', 'Proboscidea', 'Elephantidae', 'Elephas', NULL, 'ACTIVE');

INSERT INTO animal_translations (animal_id, language_id, name, description, size_weight, lifespan, behavior, history, narration)
SELECT 1, id, 'Hổ Đông Dương', 'Loài mèo lớn có bộ lông vàng cam với sọc đen đặc trưng.', 'Dài 2,5–2,9 m; nặng 150–190 kg (ước lượng)', '15–20 năm trong tự nhiên', 'Sống đơn độc, săn mồi vào ban đêm, lãnh thổ rộng.', 'Từng phân bố rộng khắp Đông Nam Á, nay số lượng còn rất ít do mất môi trường sống.', 'Đây là hổ Đông Dương, loài săn mồi đỉnh cao của rừng nhiệt đới. Chúng sống đơn độc và hoạt động chủ yếu vào ban đêm.' FROM languages WHERE code = 'vi'
UNION ALL
SELECT 1, id, 'Indochinese Tiger', 'A large cat with an orange coat and bold black stripes.', 'Length 2.5–2.9 m; weight 150–190 kg (estimate)', '15–20 years in the wild', 'Solitary, hunts at night, holds a large territory.', 'Once widespread across Southeast Asia, now critically reduced by habitat loss.', 'This is the Indochinese tiger, an apex predator of tropical forests. It lives alone and hunts mostly at night.' FROM languages WHERE code = 'en'
UNION ALL
SELECT 2, id, 'Đười ươi', 'Vượn lớn có lông đỏ nâu, cánh tay rất dài.', 'Cao 1,2–1,5 m; nặng 40–90 kg (ước lượng)', '35–45 năm', 'Sống trên cây, ăn quả, làm tổ mới mỗi đêm.', 'Có nguồn gốc từ các đảo Borneo và Sumatra, hiện đang bị đe dọa nghiêm trọng.', 'Đây là đười ươi, người họ hàng gần gũi của loài người. Chúng làm tổ trên cây mỗi tối.' FROM languages WHERE code = 'vi'
UNION ALL
SELECT 2, id, 'Orangutan', 'A great ape with reddish-brown hair and very long arms.', 'Height 1.2–1.5 m; weight 40–90 kg (estimate)', '35–45 years', 'Arboreal, eats fruit, builds a new nest every night.', 'Native to Borneo and Sumatra and now seriously endangered.', 'This is an orangutan, one of our closest relatives. It builds a new tree nest every evening.' FROM languages WHERE code = 'en'
UNION ALL
SELECT 3, id, 'Voi châu Á', 'Loài thú trên cạn lớn nhất châu Á, có vòi và ngà.', 'Cao 2,5–3 m; nặng 3–5 tấn (ước lượng)', '60–70 năm', 'Sống theo bầy do voi cái đầu đàn dẫn dắt.', 'Được thuần hóa hàng nghìn năm, nay quần thể hoang dã suy giảm mạnh.', 'Đây là voi châu Á. Chúng sống theo bầy và có trí nhớ rất tốt.' FROM languages WHERE code = 'vi'
UNION ALL
SELECT 3, id, 'Asian Elephant', 'The largest land mammal in Asia, with a trunk and tusks.', 'Height 2.5–3 m; weight 3–5 tonnes (estimate)', '60–70 years', 'Lives in herds led by a matriarch.', 'Domesticated for thousands of years; wild populations are declining sharply.', 'This is the Asian elephant. It lives in herds and has an excellent memory.' FROM languages WHERE code = 'en';

-- Toa do mau (khu vuc Thao Cam Vien Sai Gon). Ban chinh lai bang GPS thuc te tai chuong.
INSERT INTO gps_zones (animal_id, latitude, longitude, radius_m, status) VALUES
  (1, 10.787900, 106.705000, 3, 'ACTIVE'),
  (2, 10.788200, 106.705400, 3, 'ACTIVE'),
  (3, 10.788600, 106.705900, 3, 'ACTIVE');
