CREATE DATABASE IF NOT EXISTS restaurant_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE restaurant_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin','staff') DEFAULT 'admin',
    login_attempts INT DEFAULT 0,
    locked_until DATETIME DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@bistromontreal.com', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    price DECIMAL(8,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url VARCHAR(500) DEFAULT '',
    tags VARCHAR(255) DEFAULT '',
    is_available TINYINT(1) DEFAULT 1,
    is_featured TINYINT(1) DEFAULT 0,
    sort_order INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO menu_items (name, description, price, category, image_url, tags, is_available, is_featured, sort_order) VALUES
('Foie Gras Torchon', 'Silky duck liver torchon, Sauternes gelee, brioche toast, fleur de sel', 18.00, 'starters', 'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=600&q=80', 'chefs-pick', 1, 1, 1),
('Soupe a lOignon', 'Classic French onion soup, Gruyere crust, house-baked crouton', 14.00, 'starters', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80', '', 1, 0, 2),
('Tartare de Boeuf', 'Hand-cut AAA beef tartare, capers, shallots, Dijon, egg yolk, crostini', 19.00, 'starters', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', 'chefs-pick', 1, 1, 3),
('Arancini Trio', 'Saffron risotto balls, truffle aioli, shaved Parmesan', 13.00, 'starters', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', '', 1, 0, 4),
('Salade de Betteraves', 'Roasted heirloom beets, goat cheese mousse, candied walnuts, micro greens', 15.00, 'starters', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80', 'vegan,gluten-free', 1, 0, 5),
('Magret de Canard', 'Duck breast, cherry gastrique, celery root puree, haricots verts', 38.00, 'mains', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', 'chefs-pick', 1, 1, 1),
('Filet de Boeuf Wellington', '6oz beef tenderloin, mushroom duxelles, prosciutto, golden pastry, red wine jus', 52.00, 'mains', 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&q=80', 'chefs-pick', 1, 1, 2),
('Saumon de lAtlantique', 'Pan-seared Atlantic salmon, lemon beurre blanc, asparagus, fingerling potatoes', 34.00, 'mains', 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80', 'gluten-free', 1, 0, 3),
('Cotes dAgneau', 'Herb-crusted lamb chops, rosemary jus, ratatouille, polenta cake', 46.00, 'mains', 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80', '', 1, 0, 4),
('Risotto aux Champignons', 'Wild mushroom risotto, truffle oil, Parmesan foam, chive', 28.00, 'mains', 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80', 'vegan,gluten-free', 1, 0, 5),
('Le Classique', 'AAA beef patty, aged cheddar, caramelized onions, house sauce, brioche bun', 18.00, 'burgers', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', '', 1, 1, 1),
('Truffle Royale', 'Wagyu beef, black truffle mayo, Gruyere, arugula, gold brioche', 28.00, 'burgers', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80', 'chefs-pick', 1, 1, 2),
('Burger Vegalien', 'House-made black bean patty, avocado, tomato confit, chipotle aioli', 17.00, 'burgers', 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&q=80', 'vegan', 1, 0, 3),
('Spicy Montrealais', 'Double smash patty, habanero aioli, jalapenos, pepperjack, pickles', 21.00, 'burgers', 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80', 'spicy', 1, 0, 4),
('Margherita Classique', 'San Marzano tomato, fior di latte, fresh basil, extra virgin olive oil', 19.00, 'pizza', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80', 'vegan', 1, 0, 1),
('Truffe Noire', 'Cream base, black truffle, fontina, wild mushrooms, chive', 31.00, 'pizza', 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80', 'chefs-pick', 1, 1, 2),
('Diavola', 'Tomato, spicy Calabrian salami, nduja, fresh chili, mozzarella', 24.00, 'pizza', 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80', 'spicy', 1, 0, 3),
('Quattro Formaggi', 'Mozzarella, gorgonzola, taleggio, Parmesan, honey drizzle', 26.00, 'pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', '', 1, 0, 4),
('Tagliatelle al Ragu', 'Hand-rolled tagliatelle, slow-braised beef ragu, Parmesan, basil', 24.00, 'pasta', 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=600&q=80', '', 1, 1, 1),
('Linguine alle Vongole', 'Fresh clams, white wine, garlic, parsley, chili, linguine', 27.00, 'pasta', 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80', 'spicy', 1, 0, 2),
('Pappardelle ai Funghi', 'Wide pappardelle, wild mushrooms, truffle cream, Parmesan', 23.00, 'pasta', 'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=600&q=80', 'vegan', 1, 0, 3),
('Gnocchi di Patate', 'House-made potato gnocchi, sage brown butter, Parmesan, hazelnuts', 21.00, 'pasta', 'https://images.unsplash.com/photo-1597131628149-5b8b896de20e?w=600&q=80', 'gluten-free', 1, 0, 4),
('Cesar Maison', 'Romaine, house Caesar dressing, Parmesan tuile, house-baked croutons', 16.00, 'salads', 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80', '', 1, 0, 1),
('Salade Nicoise', 'Seared tuna, green beans, Nicoise olives, egg, potato, Dijon vinaigrette', 22.00, 'salads', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80', 'gluten-free', 1, 0, 2),
('Salade de Quinoa', 'Tri-color quinoa, roasted vegetables, pomegranate, tahini dressing', 18.00, 'salads', 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&q=80', 'vegan,gluten-free', 1, 0, 3),
('Creme Brulee', 'Classic Madagascar vanilla bean creme brulee, caramelized sugar crust', 12.00, 'desserts', 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80', 'gluten-free', 1, 1, 1),
('Moelleux au Chocolat', 'Warm dark chocolate fondant, vanilla bean ice cream, salted caramel', 14.00, 'desserts', 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80', 'chefs-pick', 1, 1, 2),
('Tarte Tatin', 'Classic caramelized apple tarte tatin, creme fraiche, calvados caramel', 13.00, 'desserts', 'https://images.unsplash.com/photo-1562007908-17c67e878c88?w=600&q=80', '', 1, 0, 3),
('Profiteroles', 'Choux pastry, vanilla ice cream, warm chocolate ganache', 11.00, 'desserts', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80', '', 1, 0, 4),
('Cocktail Signature', 'Bourbon, maple syrup, Peychauds bitters, smoked rosemary', 16.00, 'drinks', 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80', '', 1, 0, 1),
('Vin Rouge Maison', 'Glass of our house-selected Cotes du Rhone', 12.00, 'drinks', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', 'vegan,gluten-free', 1, 0, 2),
('Eau Petillante', 'Sparkling mineral water, 750ml', 6.00, 'drinks', 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80', 'vegan,gluten-free', 1, 0, 3),
('Cafe Expresso', 'Double shot, locally roasted beans', 4.50, 'drinks', 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80', 'vegan,gluten-free', 1, 0, 4),
('Menu Degustation', '7-course chef tasting menu, wine pairing optional', 95.00, 'specials', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', 'chefs-pick', 1, 1, 1),
('Brunch du Dimanche', 'Sunday brunch plate: eggs benny, smoked salmon, fruit, coffee', 29.00, 'specials', 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80', '', 1, 1, 2),
('Table dhote du Soir', '3-course prix-fixe, changes nightly with seasonal ingredients', 55.00, 'specials', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', 'chefs-pick', 1, 0, 3);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(20) NOT NULL UNIQUE,
    customer_name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL,
    phone VARCHAR(30),
    order_type ENUM('delivery','pickup') DEFAULT 'delivery',
    delivery_address TEXT,
    items_json LONGTEXT NOT NULL,
    subtotal DECIMAL(8,2) NOT NULL,
    discount_code VARCHAR(50) DEFAULT NULL,
    discount_amount DECIMAL(8,2) DEFAULT 0.00,
    taxes DECIMAL(8,2) NOT NULL,
    delivery_fee DECIMAL(8,2) DEFAULT 0.00,
    total DECIMAL(8,2) NOT NULL,
    payment_method VARCHAR(60) NOT NULL,
    stripe_payment_intent_id VARCHAR(120) DEFAULT NULL,
    special_instructions TEXT,
    status ENUM('pending','preparing','ready','delivered','cancelled') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_status_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    status VARCHAR(30) NOT NULL,
    changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL,
    phone VARCHAR(30),
    date DATE NOT NULL,
    time TIME NOT NULL,
    party_size TINYINT NOT NULL,
    seating ENUM('indoor','outdoor','bar') DEFAULT 'indoor',
    special_requests TEXT,
    status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL,
    phone VARCHAR(30),
    subject VARCHAR(100) DEFAULT '',
    message TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS discount_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    type ENUM('percent','fixed') DEFAULT 'percent',
    value DECIMAL(8,2) NOT NULL,
    min_order DECIMAL(8,2) DEFAULT 0.00,
    usage_limit INT DEFAULT 100,
    used_count INT DEFAULT 0,
    expiry_date DATE DEFAULT NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO discount_codes (code, type, value, min_order, usage_limit) VALUES
('WELCOME10', 'percent', 10.00, 20.00, 100),
('BISTRO5', 'fixed', 5.00, 30.00, 50),
('FREESHIP', 'fixed', 3.99, 0.00, 200);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(120) NOT NULL,
    token VARCHAR(64) NOT NULL UNIQUE,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS rate_limits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    action VARCHAR(50) NOT NULL,
    attempts INT DEFAULT 1,
    window_start DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ip_action (ip_address, action)
) ENGINE=InnoDB;