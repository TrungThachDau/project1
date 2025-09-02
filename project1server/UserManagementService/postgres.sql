-- =========================
-- DROP TABLES IF EXISTS
-- =========================
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS task_details CASCADE;
DROP TABLE IF EXISTS status CASCADE;
DROP TABLE IF EXISTS role_permission CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS project_summary CASCADE;
DROP TABLE IF EXISTS permissions CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS bills CASCADE;

-- =========================
-- CREATE TABLES
-- =========================

CREATE TABLE bills (
                       bill_id SERIAL PRIMARY KEY,
                       project_id INT,
                       name VARCHAR(255),
                       date DATE,
                       description VARCHAR(255)
);

CREATE TABLE items (
                       item_id SERIAL PRIMARY KEY,
                       task_detail_id INT,
                       name INT,
                       quantity INT,
                       code CHAR(20),
                       unit VARCHAR(20),
                       supply DECIMAL(18,0),
                       install DECIMAL(18,0),
                       amount DECIMAL(18,0)
);

CREATE TABLE permissions (
                             id_permission INT PRIMARY KEY,
                             permission_name CHAR(50),
                             description VARCHAR(255)
);

CREATE TABLE project_summary (
                                 project_summary_id SERIAL PRIMARY KEY,
                                 project_id INT,
                                 total_cost DECIMAL(18,0)
);

CREATE TABLE projects (
                          project_id SERIAL PRIMARY KEY,
                          project_name VARCHAR(255),
                          location VARCHAR(255),
                          description VARCHAR(255),
                          start_date DATE,
                          status INT,
                          end_date DATE
);

CREATE TABLE role (
                      id_role SERIAL PRIMARY KEY,
                      name_role VARCHAR(255),
                      description VARCHAR(255)
);

CREATE TABLE role_permission (
                                 id_role_permission SERIAL PRIMARY KEY,
                                 id_role INT,
                                 id_permission INT
);

CREATE TABLE status (
                        status_id SERIAL PRIMARY KEY,
                        name VARCHAR(20)
);

CREATE TABLE task_details (
                              task_detail_id SERIAL PRIMARY KEY,
                              task_id INT,
                              name VARCHAR(255),
                              note VARCHAR(255)
);

CREATE TABLE tasks (
                       task_id SERIAL PRIMARY KEY,
                       bill_id INT,
                       name VARCHAR(255),
                       description VARCHAR(255),
                       deadline DATE
);

CREATE TABLE "user" (
                        id_user VARCHAR(255) PRIMARY KEY,
                        name VARCHAR(255),
                        email VARCHAR(255),
                        phone VARCHAR(255),
                        address VARCHAR(255),
                        id_role INT
);

-- =========================
-- INSERT DATA
-- =========================

INSERT INTO permissions (id_permission, permission_name, description) VALUES
                                                                          (1, 'USER_MANAGEMENT', 'Quản lý người dùng'),
                                                                          (2, 'Function2', NULL),
                                                                          (3, 'ADD_USER', 'Thêm người dùng'),
                                                                          (4, 'EDIT_USER', 'Sửa người dùng'),
                                                                          (5, 'DELETE_USER', 'Xóa người dùng'),
                                                                          (6, 'AUTHORIZATION', 'Phân quyền'),
                                                                          (7, 'FUNCTION3', NULL),
                                                                          (8, 'ITEM_MANAGEMENT', 'Quản lý vật tư');

INSERT INTO role (id_role, name_role, description) VALUES
                                                       (1, 'Giám đốc', NULL),
                                                       (8, 'Vai trò a', NULL),
                                                       (9, 'Vai trò C', NULL);

INSERT INTO role_permission (id_role_permission, id_role, id_permission) VALUES
                                                                             (183, 1, 1),
                                                                             (184, 1, 2),
                                                                             (185, 1, 3),
                                                                             (186, 1, 4),
                                                                             (187, 1, 5),
                                                                             (188, 1, 6),
                                                                             (137, 9, 1),
                                                                             (138, 9, 2),
                                                                             (139, 9, 3);

INSERT INTO "user" (id_user, name, email, phone, address, id_role) VALUES
                                                                       ('HP1F0EOnIQhqmhLH89hPEDq8bn92', 'Nguyen Quang Trung', 'qtrung1702@outlook.com', '0369033543', NULL, 1),
                                                                       ('n95R3v1RgRZaQ8Ff0rYyMFQiKS23', 'Kaka', 'qtrung1702x2@outlook.com', '0369033543', '23/36/19 Đ. Nguyễn Hữu Tiến, P. Tây Thạnh', 1),
                                                                       ('string', 'string', 'string', 'string', 'string', 1),
                                                                       ('xxxxx', 'test', 'q32321', '32132', '140 Lê Trọng Tấn, Tây Thạnh, Tân Phú', 1);

-- =========================
-- ADD FOREIGN KEYS
-- =========================

ALTER TABLE bills
    ADD CONSTRAINT bills_projects_project_id_fk
        FOREIGN KEY (project_id) REFERENCES projects (project_id);

ALTER TABLE items
    ADD CONSTRAINT items_task_details_task_detail_id_fk
        FOREIGN KEY (task_detail_id) REFERENCES task_details (task_detail_id);

ALTER TABLE project_summary
    ADD CONSTRAINT project_summary_projects_project_id_fk
        FOREIGN KEY (project_id) REFERENCES projects (project_id);

ALTER TABLE projects
    ADD CONSTRAINT projects_status_status_id_fk
        FOREIGN KEY (status) REFERENCES status (status_id);

ALTER TABLE role_permission
    ADD CONSTRAINT role_permission_permissions_id_permission_fk
        FOREIGN KEY (id_permission) REFERENCES permissions (id_permission);

ALTER TABLE role_permission
    ADD CONSTRAINT role_permission_role_id_role_fk
        FOREIGN KEY (id_role) REFERENCES role (id_role);

ALTER TABLE task_details
    ADD CONSTRAINT task_details_tasks_task_id_fk
        FOREIGN KEY (task_id) REFERENCES tasks (task_id);

ALTER TABLE tasks
    ADD CONSTRAINT tasks_bills_bill_id_fk
        FOREIGN KEY (bill_id) REFERENCES bills (bill_id);

ALTER TABLE "user"
    ADD CONSTRAINT user_role_id_role_fk
        FOREIGN KEY (id_role) REFERENCES role (id_role);
