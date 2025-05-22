create database bookingtravel;
USE bookingtravel;
CREATE TABLE user (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Gender ENUM('male', 'female', 'other') DEFAULT 'other',
    Password TEXT NOT NULL,
    Phone VARCHAR(20),
    Status ENUM('active', 'suspended', 'banned') DEFAULT 'active',
    Email VARCHAR(100) UNIQUE NOT NULL,
    Email_Confirmed BOOLEAN DEFAULT FALSE,
    Image_URL TEXT,
    Is_Active BOOLEAN DEFAULT TRUE,
    Is_Deleted BOOLEAN DEFAULT FALSE,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Deleted_At TIMESTAMP NULL,
    Delete_User_ID INT,
    Edited_At TIMESTAMP NULL,
    Edit_User_ID INT
);
CREATE TABLE role (
	Name VARCHAR(50) PRIMARY KEY,
    Description TEXT,
    Is_Active BOOLEAN DEFAULT TRUE,
    Is_Deleted BOOLEAN DEFAULT FALSE,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Create_User_ID INT,
    Deleted_At TIMESTAMP NULL,
    Delete_User_ID INT,
    Edited_At TIMESTAMP NULL,
    Edit_User_ID INT
);
CREATE TABLE user_role (
    User_Id INT NOT NULL,
    Role_Name VARCHAR(50) NOT NULL,  -- Sửa tên cột cho phù hợp với cột khóa chính trong bảng role
    PRIMARY KEY (User_Id, Role_Name),
    FOREIGN KEY (User_Id) REFERENCES user(Id),
    FOREIGN KEY (Role_Name ) REFERENCES role(Name)  -- tham chiếu đúng cột Name trong bảng role
);
CREATE TABLE permission (
    Name VARCHAR(100) PRIMARY KEY,
    Description TEXT,
    Is_Active BOOLEAN DEFAULT TRUE,
    Is_Deleted BOOLEAN DEFAULT FALSE,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Create_User_ID INT,
    Deleted_At TIMESTAMP NULL,
    Delete_User_ID INT,
    Edited_At TIMESTAMP NULL,
    Edit_User_ID INT
);
CREATE TABLE role_permission (
    Role_Name VARCHAR(50) NOT NULL,
	Permission_Name VARCHAR(100) NOT NULL,
	PRIMARY KEY (Role_Name, Permission_Name),
    FOREIGN KEY (Role_Name) REFERENCES role(Name),
    FOREIGN KEY (Permission_Name) REFERENCES permission(Name)
);
-- Phần 1: Bảng liên quan đến khách sạn
CREATE TABLE hotels (
	 Id INT AUTO_INCREMENT PRIMARY KEY,
     Name VARCHAR(1000) NOT NULL,
     Description TEXT,
     Address TEXT NOT NULL,
     Rating DECIMAL(3,1) NOT NULL,
     City VARCHAR(255) NOT NULL,
     Website_Address VARCHAR(255) NOT NULL,
	 Create_User_Id INT,
     Phone_Num VARCHAR(20) NOT NULL,
     Check_In_Time TIME DEFAULT '14:00:00',
     Check_Out_Time TIME DEFAULT '12:00:00',
	 Is_Active BOOLEAN DEFAULT TRUE,
     Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     Edited_At TIMESTAMP NULL
);

CREATE TABLE hotel_images (
    Id INTEGER NOT NULL AUTO_INCREMENT,
    Hotels_Id INTEGER NOT NULL,
    Image_Url VARCHAR(255) NOT NULL,
    Is_Primary BOOLEAN NOT NULL DEFAULT 0,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(Id),
    FOREIGN KEY(Hotels_Id) REFERENCES hotels(Id) ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE hotel_amenities (
	Name VARCHAR(50) PRIMARY KEY,
    Description TINYTEXT,
    Icon VARCHAR(255),
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE hotels_hotel_amenities (
    Hotels_Id INTEGER NOT NULL,
    Hotel_Amenities_Name VARCHAR(50) NOT NULL,
    PRIMARY KEY(Hotels_Id, Hotel_Amenities_Name),
    FOREIGN KEY(Hotels_Id) REFERENCES hotels(Id),
    FOREIGN KEY(Hotel_Amenities_Name) REFERENCES hotel_amenities(Name)
);

-- Phần 2: Bảng liên quan đến phòng
CREATE TABLE room_type (
    Id INT AUTO_INCREMENT PRIMARY KEY,                           -- Mã định danh loại phòng
   --  Hotels_Id INT NOT NULL,  
    Hotels_Id INT NULL,                                       -- ID khách sạn liên kết
    Name VARCHAR(255) NOT NULL,                                  -- Tên loại phòng (VD: Deluxe, Suite)
    Description TEXT,                                            -- Mô tả loại phòng
    Available_Rooms INT NOT NULL DEFAULT 0,
    Price DECIMAL(10,2) NOT NULL,                                -- Giá phòng (VD: 1200000.00)
    Max_Adults INT NOT NULL DEFAULT 2,                           -- Số người lớn tối đa
    Max_Children INT NOT NULL DEFAULT 0,                         -- Số trẻ em tối đa
    Is_Active BOOLEAN DEFAULT TRUE,                     -- Trạng thái hoạt động
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,              -- Thời điểm tạo bản ghi
    Updated_At TIMESTAMP NULL,                      -- Thời điểm chỉnh sửa gần nhất
    FOREIGN KEY (Hotels_Id) REFERENCES hotels(Id) 
        ON DELETE CASCADE 
        ON UPDATE NO ACTION                                      -- Ràng buộc với bảng Hotels
);
CREATE TABLE room_images (
    Id INTEGER NOT NULL AUTO_INCREMENT,
    Room_Type_Id INTEGER NOT NULL,
    Image_Url VARCHAR(255) NOT NULL,
    Is_Primary BOOLEAN NOT NULL DEFAULT 0,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(Id),
    FOREIGN KEY(Room_Type_Id) REFERENCES room_type(Id) ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE room_amenities (
	Name VARCHAR(50) PRIMARY KEY,
    Description TINYTEXT,
    Icon VARCHAR(255),
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE room_type_room_amenities(
    Room_Type_Id INTEGER NOT NULL,
    Room_Amenities_Name VARCHAR(50) NOT NULL,
    PRIMARY KEY(Room_Type_Id, Room_Amenities_Name),
    FOREIGN KEY(Room_Type_Id) REFERENCES room_type(Id) ON DELETE CASCADE,
    FOREIGN KEY(Room_Amenities_Name) REFERENCES room_amenities(Name) ON DELETE CASCADE
);

-- Phần 3: Bảng liên quan đến đặt phòng
CREATE TABLE room_booking (
    Id INTEGER NOT NULL AUTO_INCREMENT,
    User_Id INTEGER NOT NULL,
    Room_Type_Id INTEGER NOT NULL,
    Check_In DATE NOT NULL,
    Check_Out DATE NOT NULL,
    Status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    Number_Of_Rooms INTEGER NOT NULL DEFAULT 1,
    Adults INTEGER NOT NULL DEFAULT 1,
    Children INTEGER NOT NULL DEFAULT 0,
    Total_Price DECIMAL(10,2) NOT NULL,
    Booking_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Is_Deleted BOOLEAN DEFAULT FALSE,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    Deleted_At TIMESTAMP NULL,
    PRIMARY KEY(Id),
    FOREIGN KEY(User_Id) REFERENCES user(Id),
    FOREIGN KEY(Room_Type_Id) REFERENCES room_type(Id)
);
CREATE TABLE transport_company (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Phone VARCHAR(50),
    Email VARCHAR(100),
    Website VARCHAR(255),
	Create_User_Id INT,
    Is_Active BOOLEAN DEFAULT TRUE,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE transport_type (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Is_Active BOOLEAN DEFAULT TRUE,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE transport (
    Id INT AUTO_INCREMENT PRIMARY KEY, 	
    Transport_Type_Id INT NULL,
    Transport_Company_Id INT NULL,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Departure_Location VARCHAR(255) NOT NULL,
    Arrival_Location VARCHAR(255) NOT NULL,
    Departure_Time DATETIME NOT NULL,
    Arrival_Time DATETIME NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    Available_Seats INT NOT NULL,
    Is_Active BOOLEAN DEFAULT TRUE,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (Transport_Type_Id) REFERENCES transport_type(Id) ON DELETE RESTRICT,
    FOREIGN KEY (Transport_Company_Id) REFERENCES transport_company(Id) ON DELETE SET NULL
);

CREATE TABLE transport_booking (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    User_Id INT NOT NULL,
    Transport_Id INT NOT NULL,
    Booking_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    Number_Of_Seats INT NOT NULL DEFAULT 1,
    Total_Price DECIMAL(10,2) NOT NULL,
    Is_Deleted BOOLEAN DEFAULT FALSE,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    Deleted_At TIMESTAMP NULL,
    FOREIGN KEY (User_Id) REFERENCES user(Id),
    FOREIGN KEY (Transport_Id) REFERENCES transport(Id)
);
-- Phần 4: Tạo các chỉ mục (indexes) để tối ưu truy vấn
CREATE INDEX idx_hotel_city ON hotels (City);
CREATE INDEX idx_hotel_name ON hotels (Name(255));
CREATE INDEX idx_room_booking_dates ON room_booking (Check_In, Check_Out);
CREATE INDEX idx_room_booking_status ON room_booking (Status);
CREATE INDEX idx_room_type_hotel ON room_type (Hotels_Id);
CREATE INDEX idx_room_type_price ON room_type (Price);