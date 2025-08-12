CREATE DATABASE IF NOT EXISTS thai_restaurant;
USE thai_restaurant;

CREATE TABLE tables (
    table_id INT PRIMARY KEY AUTO_INCREMENT,
    table_number VARCHAR(10) NOT NULL UNIQUE,
    capacity INT NOT NULL DEFAULT 4,
    status ENUM('available', 'occupied', 'reserved') DEFAULT 'available'
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    table_id INT NOT NULL,
    order_details TEXT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('queued', 'preparing', 'ready', 'served', 'cancelled') DEFAULT 'queued',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (table_id) REFERENCES tables(table_id)
);

INSERT INTO tables (table_number, capacity) VALUES
('1', 4), ('2', 6), ('3', 2);
