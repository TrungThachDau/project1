USE [project_1]
GO
ALTER TABLE [dbo].[user] DROP CONSTRAINT [user_role_id_role_fk]
GO
ALTER TABLE [dbo].[tasks] DROP CONSTRAINT [tasks_bills_bill_id_fk]
GO
ALTER TABLE [dbo].[task_details] DROP CONSTRAINT [task_details_tasks_task_id_fk]
GO
ALTER TABLE [dbo].[role_permission] DROP CONSTRAINT [role_permission_role_id_role_fk]
GO
ALTER TABLE [dbo].[role_permission] DROP CONSTRAINT [role_permission_permissions_id_permission_fk]
GO
ALTER TABLE [dbo].[projects] DROP CONSTRAINT [projects_status_status_id_fk]
GO
ALTER TABLE [dbo].[project_summary] DROP CONSTRAINT [project_summary_projects_project_id_fk]
GO
ALTER TABLE [dbo].[items] DROP CONSTRAINT [items_task_details_task_detail_id_fk]
GO
ALTER TABLE [dbo].[bills] DROP CONSTRAINT [bills_projects_project_id_fk]
GO
/****** Object:  Table [dbo].[user]    Script Date: 06/10/2024 10:30:31 SA ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[user]') AND type in (N'U'))
DROP TABLE [dbo].[user]
GO
/****** Object:  Table [dbo].[tasks]    Script Date: 06/10/2024 10:30:31 SA ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tasks]') AND type in (N'U'))
DROP TABLE [dbo].[tasks]
GO
/****** Object:  Table [dbo].[task_details]    Script Date: 06/10/2024 10:30:31 SA ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[task_details]') AND type in (N'U'))
DROP TABLE [dbo].[task_details]
GO
/****** Object:  Table [dbo].[status]    Script Date: 06/10/2024 10:30:31 SA ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[status]') AND type in (N'U'))
DROP TABLE [dbo].[status]
GO
/****** Object:  Table [dbo].[role_permission]    Script Date: 06/10/2024 10:30:31 SA ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[role_permission]') AND type in (N'U'))
DROP TABLE [dbo].[role_permission]
GO
/****** Object:  Table [dbo].[role]    Script Date: 06/10/2024 10:30:31 SA ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[role]') AND type in (N'U'))
DROP TABLE [dbo].[role]
GO
/****** Object:  Table [dbo].[projects]    Script Date: 06/10/2024 10:30:31 SA ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[projects]') AND type in (N'U'))
DROP TABLE [dbo].[projects]
GO
/****** Object:  Table [dbo].[project_summary]    Script Date: 06/10/2024 10:30:31 SA ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[project_summary]') AND type in (N'U'))
DROP TABLE [dbo].[project_summary]
GO
/****** Object:  Table [dbo].[permissions]    Script Date: 06/10/2024 10:30:31 SA ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[permissions]') AND type in (N'U'))
DROP TABLE [dbo].[permissions]
GO
/****** Object:  Table [dbo].[items]    Script Date: 06/10/2024 10:30:31 SA ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[items]') AND type in (N'U'))
DROP TABLE [dbo].[items]
GO
/****** Object:  Table [dbo].[bills]    Script Date: 06/10/2024 10:30:31 SA ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[bills]') AND type in (N'U'))
DROP TABLE [dbo].[bills]
GO
/****** Object:  Table [dbo].[bills]    Script Date: 06/10/2024 10:30:31 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bills](
	[bill_id] [int] IDENTITY(1,1) NOT NULL,
	[project_id] [int] NULL,
	[name] [nvarchar](255) NULL,
	[date] [date] NULL,
	[description] [nvarchar](255) NULL,
 CONSTRAINT [bills_pk] PRIMARY KEY CLUSTERED 
(
	[bill_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[items]    Script Date: 06/10/2024 10:30:31 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[items](
	[item_id] [int] IDENTITY(1,1) NOT NULL,
	[task_detail_id] [int] NULL,
	[name] [int] NULL,
	[quantity] [int] NULL,
	[code] [nchar](20) NULL,
	[unit] [nvarchar](20) NULL,
	[supply] [decimal](18, 0) NULL,
	[install] [decimal](18, 0) NULL,
	[amount] [decimal](18, 0) NULL,
 CONSTRAINT [items_pk] PRIMARY KEY CLUSTERED 
(
	[item_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[permissions]    Script Date: 06/10/2024 10:30:31 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[permissions](
	[id_permission] [int] NOT NULL,
	[permission_name] [nchar](50) NULL,
	[description] [nvarchar](255) NULL,
 CONSTRAINT [permissions_pk] PRIMARY KEY CLUSTERED 
(
	[id_permission] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[project_summary]    Script Date: 06/10/2024 10:30:31 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[project_summary](
	[project_summary_id] [int] IDENTITY(1,1) NOT NULL,
	[project_id] [int] NULL,
	[total_cost] [decimal](18, 0) NULL,
 CONSTRAINT [project_summary_pk] PRIMARY KEY CLUSTERED 
(
	[project_summary_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[projects]    Script Date: 06/10/2024 10:30:31 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[projects](
	[project_id] [int] IDENTITY(1,1) NOT NULL,
	[project_name] [nvarchar](255) NULL,
	[location] [nvarchar](255) NULL,
	[description] [nvarchar](255) NULL,
	[start_date] [date] NULL,
	[status] [int] NULL,
	[end_date] [date] NULL,
 CONSTRAINT [projects_pk] PRIMARY KEY CLUSTERED 
(
	[project_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role]    Script Date: 06/10/2024 10:30:31 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role](
	[id_role] [int] IDENTITY(1,1) NOT NULL,
	[name_role] [nvarchar](255) NULL,
	[description] [nvarchar](255) NULL,
 CONSTRAINT [role_pk] PRIMARY KEY CLUSTERED 
(
	[id_role] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role_permission]    Script Date: 06/10/2024 10:30:31 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role_permission](
	[id_role_permission] [int] IDENTITY(1,1) NOT NULL,
	[id_role] [int] NULL,
	[id_permission] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[status]    Script Date: 06/10/2024 10:30:31 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[status](
	[status_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](20) NULL,
 CONSTRAINT [status_pk] PRIMARY KEY CLUSTERED 
(
	[status_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[task_details]    Script Date: 06/10/2024 10:30:31 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[task_details](
	[task_detail_id] [int] IDENTITY(1,1) NOT NULL,
	[task_id] [int] NULL,
	[name] [nvarchar](255) NULL,
	[note] [nvarchar](255) NULL,
 CONSTRAINT [task_details_pk] PRIMARY KEY CLUSTERED 
(
	[task_detail_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tasks]    Script Date: 06/10/2024 10:30:31 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tasks](
	[task_id] [int] IDENTITY(1,1) NOT NULL,
	[bill_id] [int] NULL,
	[name] [nvarchar](255) NULL,
	[description] [nvarchar](255) NULL,
	[deadline] [date] NULL,
 CONSTRAINT [tasks_pk] PRIMARY KEY CLUSTERED 
(
	[task_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user]    Script Date: 06/10/2024 10:30:31 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user](
	[id_user] [nvarchar](255) NOT NULL,
	[name] [nvarchar](255) NULL,
	[email] [nvarchar](255) NULL,
	[phone] [nvarchar](255) NULL,
	[address] [nvarchar](255) NULL,
	[id_role] [int] NULL,
 CONSTRAINT [user_pk] PRIMARY KEY CLUSTERED 
(
	[id_user] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[permissions] ([id_permission], [permission_name], [description]) VALUES (1, N'USER_MANAGEMENT                                   ', N'Quản lý người dùng')
INSERT [dbo].[permissions] ([id_permission], [permission_name], [description]) VALUES (2, N'Function2                                         ', NULL)
INSERT [dbo].[permissions] ([id_permission], [permission_name], [description]) VALUES (3, N'ADD_USER                                          ', N'Thêm người dùng')
INSERT [dbo].[permissions] ([id_permission], [permission_name], [description]) VALUES (4, N'EDIT_USER                                         ', N'Sửa người dùng')
INSERT [dbo].[permissions] ([id_permission], [permission_name], [description]) VALUES (5, N'DELETE_USER                                       ', N'Xóa người dùng')
INSERT [dbo].[permissions] ([id_permission], [permission_name], [description]) VALUES (6, N'AUTHORIZATION                                     ', N'Phân quyền')
INSERT [dbo].[permissions] ([id_permission], [permission_name], [description]) VALUES (7, N'FUNCTION3                                         ', NULL)
INSERT [dbo].[permissions] ([id_permission], [permission_name], [description]) VALUES (8, N'ITEM_MANAGEMENT                                   ', N'Quản lý vật tư')
GO
SET IDENTITY_INSERT [dbo].[role] ON 

INSERT [dbo].[role] ([id_role], [name_role], [description]) VALUES (1, N'Giám đốc', NULL)
INSERT [dbo].[role] ([id_role], [name_role], [description]) VALUES (8, N'Vai trò a', NULL)
INSERT [dbo].[role] ([id_role], [name_role], [description]) VALUES (9, N'Vai trò C', NULL)
SET IDENTITY_INSERT [dbo].[role] OFF
GO
SET IDENTITY_INSERT [dbo].[role_permission] ON 

INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (183, 1, 1)
INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (184, 1, 2)
INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (185, 1, 3)
INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (186, 1, 4)
INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (187, 1, 5)
INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (188, 1, 6)
INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (137, 9, 1)
INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (138, 9, 2)
INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (139, 9, 3)
SET IDENTITY_INSERT [dbo].[role_permission] OFF
GO
INSERT [dbo].[user] ([id_user], [name], [email], [phone], [address], [id_role]) VALUES (N'HP1F0EOnIQhqmhLH89hPEDq8bn92', N'Nguyen Quang Trung', N'qtrung1702@outlook.com', N'0369033543', NULL, 1)
INSERT [dbo].[user] ([id_user], [name], [email], [phone], [address], [id_role]) VALUES (N'n95R3v1RgRZaQ8Ff0rYyMFQiKS23', N'Kaka', N'qtrung1702x2@outlook.com', N'0369033543', N'23/36/19 Đ. Nguyễn Hữu Tiến, P. Tây Thạnh', 1)
INSERT [dbo].[user] ([id_user], [name], [email], [phone], [address], [id_role]) VALUES (N'string', N'string', N'string', N'string', N'string', 1)
INSERT [dbo].[user] ([id_user], [name], [email], [phone], [address], [id_role]) VALUES (N'xxxxx', N'test', N'q32321', N'32132', N'140 Lê Trọng Tấn, Tây Thạnh, Tân Phú', 1)
GO
ALTER TABLE [dbo].[bills]  WITH CHECK ADD  CONSTRAINT [bills_projects_project_id_fk] FOREIGN KEY([project_id])
REFERENCES [dbo].[projects] ([project_id])
GO
ALTER TABLE [dbo].[bills] CHECK CONSTRAINT [bills_projects_project_id_fk]
GO
ALTER TABLE [dbo].[items]  WITH CHECK ADD  CONSTRAINT [items_task_details_task_detail_id_fk] FOREIGN KEY([task_detail_id])
REFERENCES [dbo].[task_details] ([task_detail_id])
GO
ALTER TABLE [dbo].[items] CHECK CONSTRAINT [items_task_details_task_detail_id_fk]
GO
ALTER TABLE [dbo].[project_summary]  WITH CHECK ADD  CONSTRAINT [project_summary_projects_project_id_fk] FOREIGN KEY([project_id])
REFERENCES [dbo].[projects] ([project_id])
GO
ALTER TABLE [dbo].[project_summary] CHECK CONSTRAINT [project_summary_projects_project_id_fk]
GO
ALTER TABLE [dbo].[projects]  WITH CHECK ADD  CONSTRAINT [projects_status_status_id_fk] FOREIGN KEY([status])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[projects] CHECK CONSTRAINT [projects_status_status_id_fk]
GO
ALTER TABLE [dbo].[role_permission]  WITH CHECK ADD  CONSTRAINT [role_permission_permissions_id_permission_fk] FOREIGN KEY([id_permission])
REFERENCES [dbo].[permissions] ([id_permission])
GO
ALTER TABLE [dbo].[role_permission] CHECK CONSTRAINT [role_permission_permissions_id_permission_fk]
GO
ALTER TABLE [dbo].[role_permission]  WITH CHECK ADD  CONSTRAINT [role_permission_role_id_role_fk] FOREIGN KEY([id_role])
REFERENCES [dbo].[role] ([id_role])
GO
ALTER TABLE [dbo].[role_permission] CHECK CONSTRAINT [role_permission_role_id_role_fk]
GO
ALTER TABLE [dbo].[task_details]  WITH CHECK ADD  CONSTRAINT [task_details_tasks_task_id_fk] FOREIGN KEY([task_id])
REFERENCES [dbo].[tasks] ([task_id])
GO
ALTER TABLE [dbo].[task_details] CHECK CONSTRAINT [task_details_tasks_task_id_fk]
GO
ALTER TABLE [dbo].[tasks]  WITH CHECK ADD  CONSTRAINT [tasks_bills_bill_id_fk] FOREIGN KEY([bill_id])
REFERENCES [dbo].[bills] ([bill_id])
GO
ALTER TABLE [dbo].[tasks] CHECK CONSTRAINT [tasks_bills_bill_id_fk]
GO
ALTER TABLE [dbo].[user]  WITH CHECK ADD  CONSTRAINT [user_role_id_role_fk] FOREIGN KEY([id_role])
REFERENCES [dbo].[role] ([id_role])
GO
ALTER TABLE [dbo].[user] CHECK CONSTRAINT [user_role_id_role_fk]
GO
