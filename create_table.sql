CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT null,
    store_id INTEGER not null,
    refresh_token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT users_stores_fk FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT null,
    image_url VARCHAR(255),
    store_id INTEGER not null,
    created_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER,
    updated_at TIMESTAMP,
    CONSTRAINT products_stores_fk FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE ON UPDATE cascade,
    CONSTRAINT products_users_fk FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT products_updated_by_users_fk FOREIGN KEY (updated_by) REFERENCES users(id)
);
-- เพิ่ม constraints ในตาราง products เพื่อให้แน่ใจว่าจำนวนสินค้าคงเหลือไม่เป็นค่าลบ
ALTER TABLE products ADD CONSTRAINT check_quantity CHECK (quantity >= 0);

CREATE TABLE stock_history (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER,
    updated_at TIMESTAMP,
    CONSTRAINT stock_history_products_fk FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE cascade
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    total_price DECIMAL(10, 2) NOT NULL,
    store_id INTEGER,
    created_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER,
    updated_at TIMESTAMP,
    CONSTRAINT orders_users_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE cascade,
    CONSTRAINT orders_stores_fk FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER ,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT null,
    CONSTRAINT order_items_orders_fk FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT order_items_products_fk FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE ON UPDATE CASCADE
);
